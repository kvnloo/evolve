/**
 * Outcome Tracker - Continuous Learning System
 *
 * Tracks routing outcomes and learns from success/failure patterns
 * using Bayesian statistics and persistent memory.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

// ============================================================================
// Types
// ============================================================================

export interface TaskExecution {
  routedCommand: string;
  request: string;
  success: boolean;
  duration: number;
  timestamp: string;
  userFeedback?: 'positive' | 'negative' | 'neutral';
  actualCommand?: string; // What user actually used if different
}

export interface RoutingPattern {
  command: string;
  usageCount: number;
  successCount: number;
  successRate: number;
  avgDuration: number;
  lastUsed: string;
  failedAlternatives?: FailedAlternative[];
  bayesianPrior?: BayesianPrior;
}

export interface FailedAlternative {
  failedFor: string;
  userChose: string;
  timestamp: string;
}

export interface BayesianPrior {
  alpha: number; // Prior successes (starts at 1)
  beta: number;  // Prior failures (starts at 1)
}

export interface LearningMetrics {
  totalExecutions: number;
  totalSuccesses: number;
  totalFailures: number;
  averageSuccessRate: number;
  mostReliableCommand: string;
  leastReliableCommand: string;
  recentTrends: TrendData[];
}

export interface TrendData {
  command: string;
  trend: 'improving' | 'declining' | 'stable';
  recentSuccessRate: number;
  historicalSuccessRate: number;
}

// ============================================================================
// Constants
// ============================================================================

const MEMORY_DIR = '.swarm/routing/learning';
const PATTERN_TTL = 7776000; // 90 days in seconds
const RECENT_WINDOW = 20; // Last N executions for trend analysis
const MIN_DATA_POINTS = 5; // Minimum executions before reliable stats

// Bayesian priors (representing initial belief)
const DEFAULT_ALPHA = 1; // Assume 1 prior success
const DEFAULT_BETA = 1;  // Assume 1 prior failure

// ============================================================================
// Memory Integration
// ============================================================================

/**
 * Initialize memory directory structure
 */
async function initMemory(): Promise<void> {
  try {
    await fs.mkdir(MEMORY_DIR, { recursive: true });
    await fs.mkdir(path.join(MEMORY_DIR, 'patterns'), { recursive: true });
    await fs.mkdir(path.join(MEMORY_DIR, 'executions'), { recursive: true });
    await fs.mkdir(path.join(MEMORY_DIR, 'metrics'), { recursive: true });
  } catch (error) {
    console.error('Failed to initialize memory:', error);
  }
}

/**
 * Get pattern key for memory storage
 */
function getPatternKey(command: string): string {
  return `pattern_${command.replace(/[^a-zA-Z0-9-]/g, '_')}`;
}

/**
 * Load pattern from memory
 */
async function loadPattern(command: string): Promise<RoutingPattern | null> {
  const key = getPatternKey(command);
  const filePath = path.join(MEMORY_DIR, 'patterns', `${key}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const pattern = JSON.parse(data);

    // Check TTL
    const age = Date.now() - new Date(pattern.lastUsed).getTime();
    if (age > PATTERN_TTL * 1000) {
      // Pattern expired, delete it
      await fs.unlink(filePath);
      return null;
    }

    return pattern;
  } catch (error) {
    return null; // Pattern doesn't exist yet
  }
}

/**
 * Save pattern to memory
 */
async function savePattern(pattern: RoutingPattern): Promise<void> {
  await initMemory();
  const key = getPatternKey(pattern.command);
  const filePath = path.join(MEMORY_DIR, 'patterns', `${key}.json`);

  await fs.writeFile(filePath, JSON.stringify(pattern, null, 2), 'utf-8');
}

/**
 * Save execution record
 */
async function saveExecution(execution: TaskExecution): Promise<void> {
  await initMemory();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `exec_${timestamp}.json`;
  const filePath = path.join(MEMORY_DIR, 'executions', fileName);

  await fs.writeFile(filePath, JSON.stringify(execution, null, 2), 'utf-8');
}

// ============================================================================
// Bayesian Update Logic
// ============================================================================

/**
 * Calculate Bayesian success rate using Beta distribution
 *
 * Beta(α, β) where:
 * - α = prior successes + observed successes
 * - β = prior failures + observed failures
 * - Success rate = α / (α + β)
 */
function calculateBayesianSuccessRate(
  successCount: number,
  failureCount: number,
  prior?: BayesianPrior
): number {
  const alpha = (prior?.alpha || DEFAULT_ALPHA) + successCount;
  const beta = (prior?.beta || DEFAULT_BETA) + failureCount;

  return alpha / (alpha + beta);
}

/**
 * Update Bayesian prior based on new observation
 */
function updateBayesianPrior(
  prior: BayesianPrior | undefined,
  success: boolean
): BayesianPrior {
  const currentPrior = prior || { alpha: DEFAULT_ALPHA, beta: DEFAULT_BETA };

  return {
    alpha: currentPrior.alpha + (success ? 1 : 0),
    beta: currentPrior.beta + (success ? 0 : 1)
  };
}

// ============================================================================
// Pattern Learning
// ============================================================================

/**
 * Learn from execution outcome and update pattern
 */
export async function learnFromOutcome(
  execution: TaskExecution
): Promise<RoutingPattern> {
  // 1. Load existing pattern or create new one
  let pattern = await loadPattern(execution.routedCommand);

  if (!pattern) {
    pattern = {
      command: execution.routedCommand,
      usageCount: 0,
      successCount: 0,
      successRate: 0.5, // Neutral prior
      avgDuration: 0,
      lastUsed: execution.timestamp,
      failedAlternatives: [],
      bayesianPrior: { alpha: DEFAULT_ALPHA, beta: DEFAULT_BETA }
    };
  }

  // 2. Update usage statistics
  pattern.usageCount += 1;
  if (execution.success) {
    pattern.successCount += 1;
  }

  // 3. Update Bayesian prior
  pattern.bayesianPrior = updateBayesianPrior(
    pattern.bayesianPrior,
    execution.success
  );

  // 4. Calculate new success rate using Bayesian approach
  const failureCount = pattern.usageCount - pattern.successCount;
  pattern.successRate = calculateBayesianSuccessRate(
    pattern.successCount,
    failureCount,
    pattern.bayesianPrior
  );

  // 5. Update average duration (exponential moving average)
  if (pattern.avgDuration === 0) {
    pattern.avgDuration = execution.duration;
  } else {
    const alpha = 0.3; // Weight for new observation
    pattern.avgDuration = alpha * execution.duration + (1 - alpha) * pattern.avgDuration;
  }

  // 6. Update last used timestamp
  pattern.lastUsed = execution.timestamp;

  // 7. Track failed alternatives
  if (!execution.success && execution.actualCommand &&
      execution.actualCommand !== execution.routedCommand) {
    if (!pattern.failedAlternatives) {
      pattern.failedAlternatives = [];
    }

    pattern.failedAlternatives.push({
      failedFor: execution.request,
      userChose: execution.actualCommand,
      timestamp: execution.timestamp
    });

    // Keep only recent failures (last 10)
    if (pattern.failedAlternatives.length > 10) {
      pattern.failedAlternatives = pattern.failedAlternatives.slice(-10);
    }
  }

  // 8. Save updated pattern
  await savePattern(pattern);

  // 9. Save execution record
  await saveExecution(execution);

  return pattern;
}

/**
 * Get pattern for a command
 */
export async function getPattern(command: string): Promise<RoutingPattern | null> {
  return loadPattern(command);
}

/**
 * Get all patterns
 */
export async function getAllPatterns(): Promise<RoutingPattern[]> {
  await initMemory();
  const patternsDir = path.join(MEMORY_DIR, 'patterns');

  try {
    const files = await fs.readdir(patternsDir);
    const patterns: RoutingPattern[] = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const data = await fs.readFile(path.join(patternsDir, file), 'utf-8');
          const pattern = JSON.parse(data);

          // Check TTL
          const age = Date.now() - new Date(pattern.lastUsed).getTime();
          if (age <= PATTERN_TTL * 1000) {
            patterns.push(pattern);
          }
        } catch (error) {
          // Skip invalid files
        }
      }
    }

    return patterns;
  } catch (error) {
    return [];
  }
}

// ============================================================================
// Analytics & Metrics
// ============================================================================

/**
 * Calculate learning metrics across all patterns
 */
export async function getLearningMetrics(): Promise<LearningMetrics> {
  const patterns = await getAllPatterns();

  if (patterns.length === 0) {
    return {
      totalExecutions: 0,
      totalSuccesses: 0,
      totalFailures: 0,
      averageSuccessRate: 0,
      mostReliableCommand: 'N/A',
      leastReliableCommand: 'N/A',
      recentTrends: []
    };
  }

  const totalExecutions = patterns.reduce((sum, p) => sum + p.usageCount, 0);
  const totalSuccesses = patterns.reduce((sum, p) => sum + p.successCount, 0);
  const totalFailures = totalExecutions - totalSuccesses;
  const averageSuccessRate = totalExecutions > 0 ? totalSuccesses / totalExecutions : 0;

  // Find most/least reliable (minimum data points required)
  const reliablePatterns = patterns.filter(p => p.usageCount >= MIN_DATA_POINTS);
  const mostReliable = reliablePatterns.sort((a, b) => b.successRate - a.successRate)[0];
  const leastReliable = reliablePatterns.sort((a, b) => a.successRate - b.successRate)[0];

  // Calculate trends (simplified - compare recent vs historical)
  const trends: TrendData[] = await calculateTrends(patterns);

  return {
    totalExecutions,
    totalSuccesses,
    totalFailures,
    averageSuccessRate,
    mostReliableCommand: mostReliable?.command || 'N/A',
    leastReliableCommand: leastReliable?.command || 'N/A',
    recentTrends: trends
  };
}

/**
 * Calculate trend data for patterns
 */
async function calculateTrends(patterns: RoutingPattern[]): Promise<TrendData[]> {
  const trends: TrendData[] = [];

  for (const pattern of patterns) {
    if (pattern.usageCount < MIN_DATA_POINTS * 2) {
      continue; // Not enough data for trend
    }

    // For simplification, compare current success rate with historical
    // In a full implementation, we'd analyze execution history
    const currentRate = pattern.successRate;
    const historicalRate = pattern.successCount / pattern.usageCount;

    let trend: 'improving' | 'declining' | 'stable';
    const difference = currentRate - historicalRate;

    if (Math.abs(difference) < 0.05) {
      trend = 'stable';
    } else if (difference > 0) {
      trend = 'improving';
    } else {
      trend = 'declining';
    }

    trends.push({
      command: pattern.command,
      trend,
      recentSuccessRate: currentRate,
      historicalSuccessRate: historicalRate
    });
  }

  return trends;
}

/**
 * Get recommendations based on learning
 */
export async function getRecommendations(): Promise<{
  command: string;
  reason: string;
  confidence: number;
}[]> {
  const patterns = await getAllPatterns();
  const recommendations: { command: string; reason: string; confidence: number }[] = [];

  // Recommend highly successful commands
  const highPerformers = patterns
    .filter(p => p.usageCount >= MIN_DATA_POINTS && p.successRate > 0.8)
    .sort((a, b) => b.successRate - a.successRate)
    .slice(0, 3);

  for (const pattern of highPerformers) {
    recommendations.push({
      command: pattern.command,
      reason: `High success rate: ${(pattern.successRate * 100).toFixed(1)}% over ${pattern.usageCount} uses`,
      confidence: pattern.successRate
    });
  }

  // Flag low performers for review
  const lowPerformers = patterns
    .filter(p => p.usageCount >= MIN_DATA_POINTS && p.successRate < 0.5);

  for (const pattern of lowPerformers) {
    const alternatives = pattern.failedAlternatives
      ?.map(f => f.userChose)
      .filter((v, i, a) => a.indexOf(v) === i) // Unique
      .slice(0, 2);

    if (alternatives && alternatives.length > 0) {
      recommendations.push({
        command: pattern.command,
        reason: `Low success rate (${(pattern.successRate * 100).toFixed(1)}%). Consider: ${alternatives.join(', ')}`,
        confidence: 1 - pattern.successRate
      });
    }
  }

  return recommendations;
}

// ============================================================================
// Cleanup & Maintenance
// ============================================================================

/**
 * Clean up expired patterns (TTL > 90 days)
 */
export async function cleanupExpiredPatterns(): Promise<number> {
  await initMemory();
  const patternsDir = path.join(MEMORY_DIR, 'patterns');
  let cleaned = 0;

  try {
    const files = await fs.readdir(patternsDir);

    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filePath = path.join(patternsDir, file);
          const data = await fs.readFile(filePath, 'utf-8');
          const pattern = JSON.parse(data);

          const age = Date.now() - new Date(pattern.lastUsed).getTime();
          if (age > PATTERN_TTL * 1000) {
            await fs.unlink(filePath);
            cleaned++;
          }
        } catch (error) {
          // Skip invalid files
        }
      }
    }
  } catch (error) {
    console.error('Cleanup failed:', error);
  }

  return cleaned;
}

/**
 * Export learning data for analysis
 */
export async function exportLearningData(): Promise<{
  patterns: RoutingPattern[];
  metrics: LearningMetrics;
  exportedAt: string;
}> {
  const patterns = await getAllPatterns();
  const metrics = await getLearningMetrics();

  return {
    patterns,
    metrics,
    exportedAt: new Date().toISOString()
  };
}

// ============================================================================
// Exports
// ============================================================================

export default {
  learnFromOutcome,
  getPattern,
  getAllPatterns,
  getLearningMetrics,
  getRecommendations,
  cleanupExpiredPatterns,
  exportLearningData
};
