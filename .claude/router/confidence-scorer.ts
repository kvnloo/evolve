/**
 * Bayesian Confidence Scorer for Command Routing
 *
 * Uses historical success data and Bayesian inference to score routing decisions
 * with confidence levels. Combines multiple signals:
 * - Keyword match strength (40%)
 * - Historical success rate (40%)
 * - Complexity match (20%)
 */

import { execSync } from 'child_process';

/**
 * Represents a routing decision with confidence metrics
 */
export interface RouteDecision {
  /** Recommended command to execute */
  command: string;

  /** Overall confidence score (0-1) */
  confidence: number;

  /** Historical success rate from memory (0-1), if available */
  historicalSuccess?: number;

  /** Keyword match strength (0-1) */
  keywordStrength?: number;

  /** Complexity match score (0-1) */
  complexityMatch?: number;

  /** Human-readable explanation */
  reasoning: string;

  /** Alternative commands if confidence is low */
  alternatives?: string[];
}

/**
 * Historical data point from memory
 */
interface HistoricalData {
  command: string;
  totalUses: number;
  successfulUses: number;
  failedUses: number;
  avgComplexity?: number;
  commonKeywords?: string[];
}

/**
 * Request analysis result
 */
interface RequestAnalysis {
  keywords: string[];
  estimatedComplexity: number; // 0-1 scale
  primaryIntent: string;
}

/**
 * Weights for combining confidence signals (must sum to 1.0)
 */
const WEIGHTS = {
  keyword: 0.4,
  historical: 0.4,
  complexity: 0.2,
} as const;

/**
 * Bayesian prior for unknown commands
 * Based on empirical success rate of new commands
 */
const BAYESIAN_PRIOR = {
  successRate: 0.65, // 65% default success rate for untested commands
  effectiveSampleSize: 5, // Equivalent to 5 prior observations
} as const;

/**
 * Main confidence scoring function
 *
 * @param baseRoute - The command recommended by classifier
 * @param request - Original user request text
 * @returns Promise<RouteDecision> with confidence and reasoning
 */
export async function scoreConfidence(
  baseRoute: string,
  request: string
): Promise<RouteDecision> {
  // Step 1: Analyze the request
  const analysis = analyzeRequest(request);

  // Step 2: Query memory for historical data
  const historicalData = await queryHistoricalData(baseRoute);

  // Step 3: Calculate individual confidence components
  const keywordScore = calculateKeywordConfidence(baseRoute, analysis);
  const historicalScore = calculateHistoricalConfidence(historicalData);
  const complexityScore = calculateComplexityMatch(baseRoute, analysis);

  // Step 4: Combine scores using weighted average
  const overallConfidence =
    WEIGHTS.keyword * keywordScore +
    WEIGHTS.historical * historicalScore +
    WEIGHTS.complexity * complexityScore;

  // Step 5: Generate reasoning and alternatives
  const reasoning = generateReasoning({
    command: baseRoute,
    keywordScore,
    historicalScore,
    complexityScore,
    historicalData,
    analysis,
  });

  const alternatives =
    overallConfidence < 0.7
      ? await suggestAlternatives(baseRoute, analysis, historicalData)
      : undefined;

  return {
    command: baseRoute,
    confidence: Math.round(overallConfidence * 1000) / 1000, // Round to 3 decimals
    historicalSuccess: historicalData?.successfulUses
      ? historicalData.successfulUses / historicalData.totalUses
      : undefined,
    keywordStrength: keywordScore,
    complexityMatch: complexityScore,
    reasoning,
    alternatives,
  };
}

/**
 * Analyze request to extract keywords, complexity, and intent
 */
function analyzeRequest(request: string): RequestAnalysis {
  const lowerRequest = request.toLowerCase();

  // Extract keywords (words >3 chars, excluding common words)
  const commonWords = new Set(['the', 'and', 'for', 'with', 'this', 'that', 'from', 'have', 'will', 'what', 'when', 'where', 'how']);
  const keywords = lowerRequest
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word))
    .map(word => word.replace(/[^a-z0-9]/g, ''));

  // Estimate complexity based on request characteristics
  let complexity = 0.3; // Base complexity

  // Indicators of higher complexity
  if (keywords.length > 8) complexity += 0.2;
  if (lowerRequest.includes('multi') || lowerRequest.includes('parallel')) complexity += 0.15;
  if (lowerRequest.includes('complex') || lowerRequest.includes('comprehensive')) complexity += 0.15;
  if (lowerRequest.includes('swarm') || lowerRequest.includes('coordinate')) complexity += 0.2;

  // Indicators of lower complexity
  if (keywords.length < 4) complexity -= 0.1;
  if (lowerRequest.includes('simple') || lowerRequest.includes('quick')) complexity -= 0.15;

  complexity = Math.max(0, Math.min(1, complexity)); // Clamp to [0,1]

  // Determine primary intent
  let primaryIntent = 'general';
  if (lowerRequest.match(/implement|create|build|add/)) primaryIntent = 'implementation';
  else if (lowerRequest.match(/analyze|review|check|audit/)) primaryIntent = 'analysis';
  else if (lowerRequest.match(/fix|debug|error|bug/)) primaryIntent = 'troubleshoot';
  else if (lowerRequest.match(/test|verify|validate/)) primaryIntent = 'testing';
  else if (lowerRequest.match(/research|investigate|explore/)) primaryIntent = 'research';
  else if (lowerRequest.match(/design|architect|plan/)) primaryIntent = 'architecture';

  return {
    keywords: Array.from(new Set(keywords)), // Deduplicate
    estimatedComplexity: complexity,
    primaryIntent,
  };
}

/**
 * Query memory system for historical command usage data
 *
 * Uses claude-flow memory commands to retrieve past success/failure rates
 */
async function queryHistoricalData(command: string): Promise<HistoricalData | null> {
  try {
    // Query memory for command history
    const memoryKey = `router/history/${command.replace(/[/:]/g, '_')}`;

    const result = execSync(
      `npx claude-flow@alpha memory retrieve --key "${memoryKey}" --namespace "routing" 2>/dev/null || echo "null"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();

    if (result === 'null' || !result) {
      return null;
    }

    // Parse stored JSON data
    const data = JSON.parse(result) as HistoricalData;
    return data;

  } catch (error) {
    // Memory query failed - return null (will use Bayesian prior)
    return null;
  }
}

/**
 * Calculate keyword match confidence
 *
 * Scores how well the command matches the request keywords
 */
function calculateKeywordConfidence(
  command: string,
  analysis: RequestAnalysis
): number {
  const commandParts = command.toLowerCase().split(/[/:_-]/);

  // Count keyword matches
  let matches = 0;
  for (const keyword of analysis.keywords) {
    if (commandParts.some(part => part.includes(keyword) || keyword.includes(part))) {
      matches++;
    }
  }

  // Base confidence on match ratio
  const matchRatio = analysis.keywords.length > 0
    ? matches / analysis.keywords.length
    : 0.5; // Neutral if no keywords

  // Boost if primary intent matches command category
  let intentBonus = 0;
  if (command.includes(analysis.primaryIntent)) {
    intentBonus = 0.2;
  }

  const confidence = Math.min(1, matchRatio * 0.8 + intentBonus);
  return confidence;
}

/**
 * Calculate historical success confidence using Bayesian inference
 *
 * Combines historical data with Bayesian prior to handle:
 * - New commands (use prior)
 * - Commands with few uses (weight prior more heavily)
 * - Commands with many uses (weight data more heavily)
 *
 * Uses Beta distribution for Bayesian update:
 * posterior = Beta(α + successes, β + failures)
 * where α = prior successes, β = prior failures
 */
function calculateHistoricalConfidence(data: HistoricalData | null): number {
  if (!data || data.totalUses === 0) {
    // No historical data - use Bayesian prior
    return BAYESIAN_PRIOR.successRate;
  }

  // Bayesian update with Beta distribution
  // Prior: Beta(α, β) where α + β = effective sample size
  const priorSuccesses = BAYESIAN_PRIOR.successRate * BAYESIAN_PRIOR.effectiveSampleSize;
  const priorFailures = (1 - BAYESIAN_PRIOR.successRate) * BAYESIAN_PRIOR.effectiveSampleSize;

  // Posterior mean: (α + successes) / (α + β + total)
  const posteriorSuccesses = priorSuccesses + data.successfulUses;
  const posteriorTotal = BAYESIAN_PRIOR.effectiveSampleSize + data.totalUses;

  const confidence = posteriorSuccesses / posteriorTotal;

  return confidence;
}

/**
 * Calculate complexity match score
 *
 * Scores how well the command's typical complexity matches the request
 */
function calculateComplexityMatch(
  command: string,
  analysis: RequestAnalysis
): number {
  // Estimate command complexity based on category
  let commandComplexity = 0.5; // Default

  // High complexity commands
  if (command.match(/swarm|coordination|hive-mind|multi/)) {
    commandComplexity = 0.8;
  }
  // Medium-high complexity
  else if (command.match(/architect|design|orchestrate/)) {
    commandComplexity = 0.65;
  }
  // Medium complexity
  else if (command.match(/implement|analyze|research/)) {
    commandComplexity = 0.5;
  }
  // Lower complexity
  else if (command.match(/simple|quick|basic/)) {
    commandComplexity = 0.3;
  }

  // Calculate match as inverse of difference
  const difference = Math.abs(commandComplexity - analysis.estimatedComplexity);
  const match = 1 - difference; // Perfect match = 1, max mismatch = 0

  return match;
}

/**
 * Generate human-readable reasoning for the confidence score
 */
function generateReasoning(params: {
  command: string;
  keywordScore: number;
  historicalScore: number;
  complexityScore: number;
  historicalData: HistoricalData | null;
  analysis: RequestAnalysis;
}): string {
  const { command, keywordScore, historicalScore, complexityScore, historicalData, analysis } = params;

  const parts: string[] = [];

  // Overall assessment
  const overallConfidence =
    WEIGHTS.keyword * keywordScore +
    WEIGHTS.historical * historicalScore +
    WEIGHTS.complexity * complexityScore;

  if (overallConfidence >= 0.8) {
    parts.push(`High confidence recommendation for ${command}.`);
  } else if (overallConfidence >= 0.6) {
    parts.push(`Moderate confidence recommendation for ${command}.`);
  } else {
    parts.push(`Low confidence recommendation for ${command}.`);
  }

  // Keyword analysis
  if (keywordScore >= 0.7) {
    parts.push(`Strong keyword match with request (${Math.round(keywordScore * 100)}%).`);
  } else if (keywordScore >= 0.4) {
    parts.push(`Partial keyword match (${Math.round(keywordScore * 100)}%).`);
  } else {
    parts.push(`Weak keyword match (${Math.round(keywordScore * 100)}%).`);
  }

  // Historical analysis
  if (historicalData && historicalData.totalUses > 0) {
    const successRate = historicalData.successfulUses / historicalData.totalUses;
    parts.push(
      `Historical success rate: ${Math.round(successRate * 100)}% ` +
      `(${historicalData.successfulUses}/${historicalData.totalUses} uses).`
    );
  } else {
    parts.push(
      `No historical data available. Using Bayesian prior ` +
      `(${Math.round(BAYESIAN_PRIOR.successRate * 100)}% expected success).`
    );
  }

  // Complexity analysis
  if (complexityScore >= 0.7) {
    parts.push(`Good complexity match for ${analysis.primaryIntent} task.`);
  } else if (complexityScore < 0.5) {
    parts.push(`Complexity mismatch: command may be ${
      analysis.estimatedComplexity > 0.5 ? 'too simple' : 'too complex'
    } for request.`);
  }

  return parts.join(' ');
}

/**
 * Suggest alternative commands when confidence is low
 */
async function suggestAlternatives(
  baseRoute: string,
  analysis: RequestAnalysis,
  historicalData: HistoricalData | null
): Promise<string[]> {
  const alternatives: string[] = [];

  // Suggest /sc:pm as fallback for low confidence
  if (!baseRoute.startsWith('/sc:pm')) {
    alternatives.push('/sc:pm');
  }

  // Suggest mode listing commands based on category
  if (baseRoute.startsWith('/sparc:') && !alternatives.includes('/sparc:sparc-modes')) {
    alternatives.push('/sparc:sparc-modes');
  }
  if (baseRoute.startsWith('/swarm:') && !alternatives.includes('/swarm:swarm-modes')) {
    alternatives.push('/swarm:swarm-modes');
  }

  // Suggest based on primary intent
  switch (analysis.primaryIntent) {
    case 'implementation':
      if (!baseRoute.includes('implement')) alternatives.push('/sc:implement');
      break;
    case 'analysis':
      if (!baseRoute.includes('analyze')) alternatives.push('/sc:analyze');
      break;
    case 'troubleshoot':
      if (!baseRoute.includes('troubleshoot')) alternatives.push('/sc:troubleshoot');
      break;
    case 'research':
      if (!baseRoute.includes('research')) alternatives.push('/sc:research');
      break;
  }

  return alternatives.slice(0, 3); // Limit to 3 alternatives
}

/**
 * Update memory with routing outcome
 *
 * Call this after command execution to record success/failure
 */
export async function recordRoutingOutcome(
  command: string,
  success: boolean,
  complexity?: number
): Promise<void> {
  try {
    const memoryKey = `router/history/${command.replace(/[/:]/g, '_')}`;

    // Retrieve existing data
    const existing = await queryHistoricalData(command);

    const updated: HistoricalData = {
      command,
      totalUses: (existing?.totalUses || 0) + 1,
      successfulUses: (existing?.successfulUses || 0) + (success ? 1 : 0),
      failedUses: (existing?.failedUses || 0) + (success ? 0 : 1),
      avgComplexity: complexity
        ? (existing?.avgComplexity || 0.5) * 0.9 + complexity * 0.1 // Exponential moving average
        : existing?.avgComplexity,
    };

    // Store updated data
    execSync(
      `npx claude-flow@alpha memory store --key "${memoryKey}" --namespace "routing" --value '${JSON.stringify(updated)}' 2>/dev/null`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );

  } catch (error) {
    // Silently fail - don't block on memory updates
    console.error('Failed to record routing outcome:', error);
  }
}
