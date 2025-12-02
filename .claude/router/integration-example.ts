/**
 * Integration Example: Command Router + Parallel Analyzer
 *
 * Demonstrates how to integrate the parallel analyzer with the command router
 * to create an intelligent request handling system.
 */

import { analyzeParallelization, formatPlan, type ParallelPlan } from './parallel-analyzer';

// Mock command router (replace with actual implementation)
async function routeCommand(request: string): Promise<string> {
  // Simple routing logic for demonstration
  const lower = request.toLowerCase();

  if (lower.includes('test')) return '/sparc:tdd';
  if (lower.includes('analyze')) return '/sparc:analyzer';
  if (lower.includes('fix') || lower.includes('debug')) return '/sparc:debugger';
  if (lower.includes('implement') || lower.includes('create')) return '/sparc:coder';
  if (lower.includes('design') || lower.includes('architect')) return '/sparc:architect';
  if (lower.includes('review')) return '/sparc:reviewer';

  return '/sparc:coder';  // Default
}

// Mock TodoWrite (replace with actual implementation)
async function TodoWrite(data: { todos: any[] }): Promise<void> {
  console.log('\n📝 TodoWrite Call:');
  console.log(JSON.stringify(data, null, 2));
}

// ============================================================================
// Main Integration Handler
// ============================================================================

/**
 * Intelligent request handler that:
 * 1. Routes command based on request content
 * 2. Analyzes parallelization opportunities
 * 3. Executes with optimal strategy (parallel vs sequential)
 * 4. Returns execution plan
 */
export async function handleRequest(
  request: string,
  options?: {
    speedupThreshold?: number;
    verbose?: boolean;
  }
): Promise<{
  command: string;
  plan: ParallelPlan;
  executed: boolean;
}> {
  const { speedupThreshold = 10, verbose = true } = options || {};

  // Step 1: Route to appropriate command
  const command = await routeCommand(request);

  if (verbose) {
    console.log('\n🎯 Request:', request);
    console.log('📍 Routed to:', command);
  }

  // Step 2: Analyze parallelization opportunities
  const plan = await analyzeParallelization(request, command, speedupThreshold);

  if (verbose) {
    console.log('\n' + formatPlan(plan));
  }

  // Step 3: Execute based on strategy
  let executed = false;

  switch (plan.strategy) {
    case 'parallel':
      if (plan.todos) {
        console.log(`\n✨ Parallel execution: ${plan.speedup}`);
        await TodoWrite({ todos: plan.todos });
        executed = true;
      }
      break;

    case 'sequential':
      console.log(`\n🔄 Sequential execution: ${plan.reason}`);
      if (plan.todos) {
        await TodoWrite({ todos: plan.todos });
        executed = true;
      }
      break;

    case 'single_step':
      console.log(`\n⚡ Single step execution: ${plan.reason}`);
      // No TodoWrite needed for single steps
      executed = false;
      break;
  }

  return { command, plan, executed };
}

// ============================================================================
// Example Workflows
// ============================================================================

/**
 * Example 1: Full-Stack Development Task
 */
export async function exampleFullStackDevelopment() {
  console.log('\n' + '='.repeat(80));
  console.log('Example 1: Full-Stack Development Task');
  console.log('='.repeat(80));

  await handleRequest(
    "Read auth.ts, database.ts, and api.ts, analyze them for security issues, " +
    "then update config.json with new security settings, and finally test the authentication flow"
  );
}

/**
 * Example 2: Code Review Workflow
 */
export async function exampleCodeReview() {
  console.log('\n' + '='.repeat(80));
  console.log('Example 2: Code Review Workflow');
  console.log('='.repeat(80));

  await handleRequest(
    "Review the pull request: check code quality, run all tests, verify documentation is updated"
  );
}

/**
 * Example 3: Debugging Task (Sequential)
 */
export async function exampleDebugging() {
  console.log('\n' + '='.repeat(80));
  console.log('Example 3: Debugging Task');
  console.log('='.repeat(80));

  await handleRequest(
    "Debug the login issue: read error logs, analyze the auth flow, then fix the bug and test it"
  );
}

/**
 * Example 4: Batch File Processing (High Parallelization)
 */
export async function exampleBatchProcessing() {
  console.log('\n' + '='.repeat(80));
  console.log('Example 4: Batch File Processing');
  console.log('='.repeat(80));

  await handleRequest(
    "Read all TypeScript files in src/, analyze each for type errors, and update the tsconfig.json"
  );
}

/**
 * Example 5: Architecture Design (Single Step)
 */
export async function exampleArchitectureDesign() {
  console.log('\n' + '='.repeat(80));
  console.log('Example 5: Architecture Design');
  console.log('='.repeat(80));

  await handleRequest(
    "Design the microservices architecture for the new payment system"
  );
}

// ============================================================================
// Advanced Integration: Speedup Threshold Tuning
// ============================================================================

/**
 * Experiment with different speedup thresholds to find optimal value
 */
export async function experimentThresholds() {
  console.log('\n' + '='.repeat(80));
  console.log('Speedup Threshold Tuning');
  console.log('='.repeat(80));

  const request = "Read a.ts, b.ts, c.ts, analyze them, update config.json";
  const thresholds = [0, 10, 25, 50, 75];

  console.log(`\nRequest: ${request}\n`);

  for (const threshold of thresholds) {
    const result = await handleRequest(request, {
      speedupThreshold: threshold,
      verbose: false
    });

    console.log(`Threshold ${threshold}%: ${result.plan.strategy}`);
    if (result.plan.estimate) {
      console.log(`  Speedup: ${result.plan.estimate.speedup}%`);
    }
  }
}

// ============================================================================
// Advanced Integration: User Preference System
// ============================================================================

interface UserPreferences {
  defaultSpeedupThreshold: number;
  preferParallel: boolean;
  verboseOutput: boolean;
  autoExecute: boolean;
}

const defaultPreferences: UserPreferences = {
  defaultSpeedupThreshold: 10,
  preferParallel: true,
  verboseOutput: true,
  autoExecute: true
};

/**
 * Handle request with user preferences
 */
export async function handleRequestWithPreferences(
  request: string,
  userPrefs: Partial<UserPreferences> = {}
): Promise<{
  command: string;
  plan: ParallelPlan;
  executed: boolean;
  recommendation: string;
}> {
  const prefs = { ...defaultPreferences, ...userPrefs };

  // Route and analyze
  const command = await routeCommand(request);
  const plan = await analyzeParallelization(request, command, prefs.defaultSpeedupThreshold);

  if (prefs.verboseOutput) {
    console.log('\n🎯 Request:', request);
    console.log('📍 Command:', command);
    console.log('\n' + formatPlan(plan));
  }

  // Generate recommendation
  let recommendation = '';

  if (plan.strategy === 'parallel' && plan.estimate) {
    if (plan.estimate.speedup > 50) {
      recommendation = '🚀 High speedup! Strongly recommend parallel execution.';
    } else if (plan.estimate.speedup > 25) {
      recommendation = '⚡ Moderate speedup. Parallel execution recommended.';
    } else {
      recommendation = '✅ Minor speedup. Parallel execution optional.';
    }
  } else if (plan.strategy === 'sequential') {
    recommendation = '🔄 Sequential execution recommended due to dependencies.';
  } else {
    recommendation = '⚡ Single step execution - no parallelization needed.';
  }

  // Auto-execute if enabled
  let executed = false;
  if (prefs.autoExecute && plan.todos) {
    await TodoWrite({ todos: plan.todos });
    executed = true;
  }

  return { command, plan, executed, recommendation };
}

/**
 * Example with user preferences
 */
export async function exampleUserPreferences() {
  console.log('\n' + '='.repeat(80));
  console.log('User Preferences Example');
  console.log('='.repeat(80));

  // User prefers high speedup threshold (conservative)
  const conservativeUser: Partial<UserPreferences> = {
    defaultSpeedupThreshold: 30,
    preferParallel: false,
    verboseOutput: true,
    autoExecute: false
  };

  const result = await handleRequestWithPreferences(
    "Read auth.ts and config.json, analyze them both",
    conservativeUser
  );

  console.log('\n💡 Recommendation:', result.recommendation);
}

// ============================================================================
// Advanced Integration: Cost-Benefit Analysis
// ============================================================================

/**
 * Calculate cost-benefit of parallel execution including overhead
 */
export async function costBenefitAnalysis(request: string): Promise<{
  worthParallel: boolean;
  netBenefit: number;
  breakdown: {
    sequentialTime: number;
    parallelTime: number;
    swarmOverhead: number;
    netTime: number;
  };
}> {
  const command = await routeCommand(request);
  const plan = await analyzeParallelization(request, command);

  // Assume 1 minute overhead for swarm initialization
  const SWARM_OVERHEAD = 1.0;

  if (!plan.estimate) {
    return {
      worthParallel: false,
      netBenefit: 0,
      breakdown: {
        sequentialTime: 0,
        parallelTime: 0,
        swarmOverhead: 0,
        netTime: 0
      }
    };
  }

  const parallelWithOverhead = plan.estimate.parallel + SWARM_OVERHEAD;
  const netBenefit = plan.estimate.sequential - parallelWithOverhead;
  const worthParallel = netBenefit > 0;

  return {
    worthParallel,
    netBenefit,
    breakdown: {
      sequentialTime: plan.estimate.sequential,
      parallelTime: plan.estimate.parallel,
      swarmOverhead: SWARM_OVERHEAD,
      netTime: parallelWithOverhead
    }
  };
}

/**
 * Example cost-benefit analysis
 */
export async function exampleCostBenefit() {
  console.log('\n' + '='.repeat(80));
  console.log('Cost-Benefit Analysis');
  console.log('='.repeat(80));

  const requests = [
    "Read a.ts and b.ts",  // Fast task
    "Read a.ts, b.ts, c.ts, d.ts, e.ts, analyze them all"  // Slower task
  ];

  for (const request of requests) {
    const analysis = await costBenefitAnalysis(request);

    console.log(`\nRequest: ${request}`);
    console.log('Breakdown:');
    console.log(`  Sequential time:    ${analysis.breakdown.sequentialTime} min`);
    console.log(`  Parallel time:      ${analysis.breakdown.parallelTime} min`);
    console.log(`  Swarm overhead:     ${analysis.breakdown.swarmOverhead} min`);
    console.log(`  Net parallel time:  ${analysis.breakdown.netTime} min`);
    console.log(`  Net benefit:        ${analysis.netBenefit.toFixed(1)} min`);
    console.log(`  Worth parallel:     ${analysis.worthParallel ? '✅ Yes' : '❌ No'}`);
  }
}

// ============================================================================
// Main Runner
// ============================================================================

async function main() {
  console.clear();
  console.log('\n' + '='.repeat(80));
  console.log('  COMMAND ROUTER + PARALLEL ANALYZER INTEGRATION EXAMPLES');
  console.log('='.repeat(80));

  // Run all examples
  await exampleFullStackDevelopment();
  await exampleCodeReview();
  await exampleDebugging();
  await exampleBatchProcessing();
  await exampleArchitectureDesign();
  await experimentThresholds();
  await exampleUserPreferences();
  await exampleCostBenefit();

  console.log('\n' + '='.repeat(80));
  console.log('  INTEGRATION EXAMPLES COMPLETE');
  console.log('='.repeat(80) + '\n');
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main as runIntegrationExamples };
