/**
 * LLM-based routing fallback for ambiguous cases
 * Uses Claude Code's internal Task tool (zero additional cost)
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * LLM routing decision structure
 */
export interface LLMDecision {
  selectedCommand: string;
  confidence: number;
  reasoning: string;
  alternatives?: string[];
}

/**
 * Command catalog entry
 */
interface CommandEntry {
  command: string;
  purpose: string;
  keywords: string[];
}

/**
 * Load command catalog from routing rules
 */
function loadCommandCatalog(): CommandEntry[] {
  const routingPath = join(__dirname, '../rules/command-routing.md');

  if (!existsSync(routingPath)) {
    console.warn('⚠️ Command routing rules not found, using minimal catalog');
    return getMinimalCatalog();
  }

  try {
    const content = readFileSync(routingPath, 'utf-8');
    return parseCommandCatalog(content);
  } catch (error) {
    console.error('❌ Failed to load command catalog:', error);
    return getMinimalCatalog();
  }
}

/**
 * Parse command catalog from markdown
 */
function parseCommandCatalog(markdown: string): CommandEntry[] {
  const commands: CommandEntry[] = [];
  const lines = markdown.split('\n');
  let currentCategory = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Category headers (e.g., "### /sc:* - SuperClaude Commands")
    if (line.startsWith('### /')) {
      currentCategory = line.split(' - ')[0].replace('### ', '');
      continue;
    }

    // Command table rows (e.g., "| `/sc:implement` | Feature implementation | ...")
    const match = line.match(/^\|\s*`(\/[^`]+)`\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/);
    if (match) {
      const [, command, purpose, keywordStr] = match;
      const keywords = keywordStr
        .split(/[,;]/)
        .map(k => k.trim().replace(/["""]/g, ''))
        .filter(k => k.length > 0);

      commands.push({
        command: command.trim(),
        purpose: purpose.trim(),
        keywords
      });
    }
  }

  return commands;
}

/**
 * Minimal fallback catalog
 */
function getMinimalCatalog(): CommandEntry[] {
  return [
    { command: '/sc:pm', purpose: 'Project management meta-router', keywords: ['default', 'unclear', 'complex'] },
    { command: '/sc:implement', purpose: 'Feature implementation', keywords: ['implement', 'create', 'build'] },
    { command: '/sc:analyze', purpose: 'Code analysis', keywords: ['analyze', 'review', 'check'] },
    { command: '/sc:troubleshoot', purpose: 'Debugging', keywords: ['fix', 'debug', 'error', 'broken'] },
    { command: '/sparc:coder', purpose: 'Autonomous coding', keywords: ['code', 'develop', 'program'] },
    { command: '/swarm:development', purpose: 'Dev swarm', keywords: ['swarm', 'parallel', 'multi-agent'] }
  ];
}

/**
 * Format command catalog for LLM prompt
 */
function formatCatalogForPrompt(catalog: CommandEntry[], maxCommands: number = 50): string {
  // Prioritize common commands and take top N
  const prioritized = catalog.slice(0, maxCommands);

  return prioritized.map(({ command, purpose, keywords }) => {
    const keywordList = keywords.slice(0, 5).join(', ');
    return `${command} - ${purpose} [${keywordList}]`;
  }).join('\n');
}

/**
 * Classify request using Claude Code's internal Task tool
 *
 * @param request - User request to classify
 * @param baseRoute - Current keyword-based suggestion
 * @param lowConfidence - Current confidence score (< 0.6)
 * @param commandCatalog - Available commands
 * @returns LLM routing decision
 */
export async function classifyWithLLM(
  request: string,
  baseRoute: string,
  lowConfidence: number,
  customCatalog?: string[]
): Promise<LLMDecision> {
  try {
    // Load command catalog
    const catalog = loadCommandCatalog();
    const catalogText = formatCatalogForPrompt(catalog);

    // Build classification prompt
    const prompt = buildClassificationPrompt(request, baseRoute, lowConfidence, catalogText);

    // Execute using Claude Code Task tool (internal, zero cost)
    const result = await executeTaskClassification(prompt);

    // Parse and validate response
    const decision = parseAndValidate(result, catalog, baseRoute);

    console.log(`🧠 LLM Classification: ${decision.selectedCommand} (confidence: ${decision.confidence})`);
    return decision;

  } catch (error) {
    console.error('❌ LLM classification failed:', error);
    return fallbackDecision(baseRoute, lowConfidence);
  }
}

/**
 * Build classification prompt for LLM
 */
function buildClassificationPrompt(
  request: string,
  baseRoute: string,
  confidence: number,
  catalog: string
): string {
  return `INTERNAL ROUTING CLASSIFICATION

**User Request**: "${request}"

**Current Keyword-Based Suggestion**: ${baseRoute} (confidence: ${confidence.toFixed(2)})

**Available Commands**:
${catalog}

**Your Task**:
Select the BEST command from the catalog above that matches the user's intent.

**Rules**:
1. Choose a command that EXISTS in the catalog
2. Consider the user's exact words and intent
3. Prefer specific commands over generic ones
4. If truly ambiguous, use /sc:pm as fallback

**Output Format** (JSON only):
{
  "selectedCommand": "/sc:implement",
  "confidence": 0.85,
  "reasoning": "User wants to create/build something new",
  "alternatives": ["/sparc:coder", "/swarm:development"]
}

Output ONLY valid JSON, no additional text.`;
}

/**
 * Execute classification using Claude Code's Task tool
 * This uses the existing Claude subscription (zero additional cost)
 */
async function executeTaskClassification(prompt: string): Promise<string> {
  // IMPLEMENTATION NOTE: This function signature expects integration with Claude Code's
  // internal Task execution system. The actual implementation will depend on how
  // Claude Code exposes task execution to TypeScript modules.

  // For now, we'll define the expected interface and throw if not available

  // Check if global claudeCode task executor is available
  if (typeof (globalThis as any).claudeCode?.executeTask === 'function') {
    const result = await (globalThis as any).claudeCode.executeTask({
      prompt,
      model: 'claude-3-haiku-20240307', // Fast and cost-efficient
      maxTokens: 500,
      temperature: 0.3, // Lower temperature for more deterministic routing
      systemPrompt: 'You are a command routing classifier. Output only valid JSON.'
    });

    return result.content || result.text || JSON.stringify(result);
  }

  // Fallback: If Task tool not available, attempt to read from stdin/mock
  console.warn('⚠️ Claude Code Task tool not available, using mock classification');
  return mockClassification(prompt);
}

/**
 * Mock classification for development/testing
 */
function mockClassification(prompt: string): string {
  // Extract request from prompt
  const requestMatch = prompt.match(/\*\*User Request\*\*: "([^"]+)"/);
  const request = requestMatch?.[1] || '';

  // Simple keyword-based fallback
  const keywords = request.toLowerCase();

  if (keywords.includes('implement') || keywords.includes('create')) {
    return JSON.stringify({
      selectedCommand: '/sc:implement',
      confidence: 0.75,
      reasoning: 'User wants to implement/create something',
      alternatives: ['/sparc:coder', '/swarm:development']
    });
  }

  if (keywords.includes('analyze') || keywords.includes('review')) {
    return JSON.stringify({
      selectedCommand: '/sc:analyze',
      confidence: 0.70,
      reasoning: 'User wants to analyze/review code',
      alternatives: ['/sparc:analyzer']
    });
  }

  // Default to pm meta-router
  return JSON.stringify({
    selectedCommand: '/sc:pm',
    confidence: 0.60,
    reasoning: 'Ambiguous request, using meta-router',
    alternatives: []
  });
}

/**
 * Parse LLM response and validate
 */
function parseAndValidate(
  response: string,
  catalog: CommandEntry[],
  fallbackRoute: string
): LLMDecision {
  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) ||
                     response.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const decision: LLMDecision = JSON.parse(jsonMatch[1]);

    // Validate required fields
    if (!decision.selectedCommand || typeof decision.confidence !== 'number') {
      throw new Error('Invalid decision structure');
    }

    // Validate command exists in catalog
    const validCommands = catalog.map(c => c.command);
    if (!validCommands.includes(decision.selectedCommand)) {
      console.warn(`⚠️ LLM selected unknown command: ${decision.selectedCommand}`);
      decision.selectedCommand = fallbackRoute;
      decision.confidence = Math.max(0.5, decision.confidence - 0.2);
    }

    // Ensure confidence is in valid range
    decision.confidence = Math.max(0.0, Math.min(1.0, decision.confidence));

    return decision;

  } catch (error) {
    console.error('❌ Failed to parse LLM response:', error);
    return fallbackDecision(fallbackRoute, 0.5);
  }
}

/**
 * Create fallback decision when LLM fails
 */
function fallbackDecision(route: string, confidence: number): LLMDecision {
  return {
    selectedCommand: route || '/sc:pm',
    confidence: Math.max(0.4, confidence),
    reasoning: 'LLM classification unavailable, using keyword-based routing',
    alternatives: ['/sc:pm']
  };
}

/**
 * Batch classification for multiple requests (optimization)
 */
export async function classifyBatch(
  requests: Array<{
    request: string;
    baseRoute: string;
    confidence: number;
  }>
): Promise<LLMDecision[]> {
  // Process in parallel with concurrency limit
  const BATCH_SIZE = 3;
  const results: LLMDecision[] = [];

  for (let i = 0; i < requests.length; i += BATCH_SIZE) {
    const batch = requests.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(({ request, baseRoute, confidence }) =>
        classifyWithLLM(request, baseRoute, confidence)
      )
    );
    results.push(...batchResults);
  }

  return results;
}

/**
 * Validate LLM decision quality
 */
export function validateDecision(decision: LLMDecision): boolean {
  return (
    decision.confidence >= 0.4 &&
    decision.selectedCommand.startsWith('/') &&
    decision.reasoning.length > 10
  );
}
