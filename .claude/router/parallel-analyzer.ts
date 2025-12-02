/**
 * Parallel Execution Analyzer
 *
 * Analyzes user requests for parallelization opportunities using dependency graph analysis.
 * Determines if tasks can be executed in parallel and generates optimized execution plans.
 *
 * Core Algorithm:
 * 1. Extract discrete steps from natural language request
 * 2. Build dependency graph between steps (which steps depend on outputs of others)
 * 3. Perform topological sort to identify parallel execution layers
 * 4. Calculate speedup estimate (sequential vs parallel execution time)
 * 5. Generate TodoWrite structure with parallel group assignments
 *
 * @module parallel-analyzer
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * A discrete step extracted from the user request
 */
interface Step {
  id: string;              // Unique identifier (e.g., "step_1")
  description: string;     // Natural language description
  estimatedTime: number;   // Estimated execution time in minutes
  dependencies: string[];  // IDs of steps this depends on
  category?: string;       // Optional categorization (read, write, analyze, etc.)
}

/**
 * A parallel execution layer (steps that can run simultaneously)
 */
interface ParallelLayer {
  layerId: number;              // Layer number (0 = first layer)
  steps: Step[];                // Steps that can execute in parallel
  maxTime: number;              // Longest step time in this layer
  description: string;          // Human-readable layer description
}

/**
 * Time estimate comparison
 */
interface TimeEstimate {
  sequential: number;     // Total time if all steps run sequentially
  parallel: number;       // Total time with parallel execution
  speedup: number;        // Percentage improvement (0-100)
  speedupRatio: string;   // Human-readable ratio (e.g., "2.5x faster")
}

/**
 * Todo item for TodoWrite tool
 */
interface TodoItem {
  id: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  activeForm: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  parallelGroup?: number;  // Which parallel layer this belongs to
}

/**
 * Complete parallelization analysis result
 */
export interface ParallelPlan {
  strategy: 'parallel' | 'sequential' | 'single_step';
  reason: string;                    // Why this strategy was chosen
  speedup?: string;                  // Human-readable speedup (e.g., "2.5x faster, 60% time saved")
  layers?: ParallelLayer[];          // Parallel execution layers
  todos?: TodoItem[];                // TodoWrite-compatible task list
  estimate?: TimeEstimate;           // Detailed time estimates
  dependencyGraph?: Map<string, string[]>;  // For debugging/visualization
}

// ============================================================================
// Step Extraction
// ============================================================================

/**
 * Extract discrete steps from a natural language request.
 * Uses pattern matching and NLP heuristics to identify actionable tasks.
 *
 * Examples:
 * - "Read file.ts and analyze it" → 2 steps (read, analyze)
 * - "Update all config files and test them" → 2 steps (update, test)
 * - "Fix the bug" → 1 step (single action)
 *
 * @param request - Natural language user request
 * @param routedCommand - The command selected by command router
 * @returns Array of extracted steps with dependencies
 */
function extractSteps(request: string, routedCommand: string): Step[] {
  const steps: Step[] = [];

  // Common action verbs that indicate discrete steps
  const actionVerbs = [
    'read', 'write', 'edit', 'create', 'delete', 'update', 'analyze', 'review',
    'test', 'validate', 'check', 'verify', 'implement', 'refactor', 'optimize',
    'build', 'compile', 'deploy', 'install', 'configure', 'setup', 'initialize',
    'search', 'find', 'grep', 'glob', 'list', 'show', 'display'
  ];

  // Split request into sentences and clauses
  const clauses = request
    .toLowerCase()
    .split(/[,;]|\band\b|\bthen\b/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  let stepCounter = 1;
  const previousSteps: string[] = [];

  for (const clause of clauses) {
    // Check if clause contains an action verb
    const containsAction = actionVerbs.some(verb =>
      new RegExp(`\\b${verb}\\b`).test(clause)
    );

    if (!containsAction && steps.length === 0) {
      // If no clear actions found, treat entire request as single step
      steps.push({
        id: `step_${stepCounter}`,
        description: request.trim(),
        estimatedTime: estimateStepTime(request, routedCommand),
        dependencies: [],
        category: categorizeStep(request)
      });
      return steps;
    }

    if (containsAction) {
      const stepId = `step_${stepCounter}`;

      // Determine dependencies based on sequential ordering and keywords
      const dependencies: string[] = [];

      // Check for explicit dependency keywords
      if (/\bthen\b|\bafter\b|\bonce\b/.test(clause)) {
        // Depends on all previous steps
        dependencies.push(...previousSteps);
      } else if (previousSteps.length > 0) {
        // Check if this step logically depends on previous steps
        const needsPreviousOutput =
          /\bit\b|\bthem\b|\bthose\b|\bthe (result|output|file)/.test(clause);

        if (needsPreviousOutput) {
          // Depends on immediately previous step
          dependencies.push(previousSteps[previousSteps.length - 1]);
        }
      }

      steps.push({
        id: stepId,
        description: clause.trim(),
        estimatedTime: estimateStepTime(clause, routedCommand),
        dependencies,
        category: categorizeStep(clause)
      });

      previousSteps.push(stepId);
      stepCounter++;
    }
  }

  // If no steps extracted, create single step
  if (steps.length === 0) {
    steps.push({
      id: 'step_1',
      description: request.trim(),
      estimatedTime: estimateStepTime(request, routedCommand),
      dependencies: [],
      category: categorizeStep(request)
    });
  }

  return steps;
}

/**
 * Categorize a step based on its action type
 */
function categorizeStep(stepDescription: string): string {
  const lower = stepDescription.toLowerCase();

  if (/\bread\b|\bview\b|\bshow\b|\blist\b|\bgrep\b|\bglob\b|\bfind\b/.test(lower)) {
    return 'read';
  }
  if (/\bwrite\b|\bcreate\b|\bedit\b|\bupdate\b|\bdelete\b|\bmodify\b/.test(lower)) {
    return 'write';
  }
  if (/\banalyze\b|\breview\b|\bcheck\b|\bverify\b|\bvalidate\b|\btest\b/.test(lower)) {
    return 'analyze';
  }
  if (/\bbuild\b|\bcompile\b|\bdeploy\b|\binstall\b|\bsetup\b/.test(lower)) {
    return 'build';
  }

  return 'other';
}

/**
 * Estimate execution time for a step (in minutes)
 * Based on step category and command complexity
 */
function estimateStepTime(stepDescription: string, command: string): number {
  const category = categorizeStep(stepDescription);

  // Base time estimates by category
  const baseTimes: Record<string, number> = {
    read: 0.5,      // Reading is fast
    write: 2,       // Writing takes moderate time
    analyze: 3,     // Analysis is slower
    build: 5,       // Building is slowest
    other: 2        // Default
  };

  let time = baseTimes[category] || 2;

  // Adjust based on scope indicators
  if (/\ball\b|\bmultiple\b|\bevery\b/.test(stepDescription.toLowerCase())) {
    time *= 2;  // Batch operations take longer
  }

  // Adjust based on command complexity
  if (command.includes('swarm') || command.includes('parallel')) {
    time *= 0.6;  // Swarm/parallel execution is faster
  }

  return Math.max(0.5, time);  // Minimum 0.5 minutes
}

// ============================================================================
// Dependency Graph Analysis
// ============================================================================

/**
 * Build a dependency graph from steps.
 * Graph is represented as adjacency list: step_id -> [dependent_step_ids]
 *
 * @param steps - Array of steps with dependencies
 * @returns Dependency graph as Map
 */
function buildDependencyGraph(steps: Step[]): Map<string, string[]> {
  const graph = new Map<string, string[]>();

  // Initialize graph nodes
  for (const step of steps) {
    if (!graph.has(step.id)) {
      graph.set(step.id, []);
    }
  }

  // Add edges (dependencies)
  for (const step of steps) {
    for (const depId of step.dependencies) {
      const dependents = graph.get(depId) || [];
      dependents.push(step.id);
      graph.set(depId, dependents);
    }
  }

  return graph;
}

/**
 * Perform topological sort to identify parallel execution layers.
 * Uses Kahn's algorithm for topological sorting.
 *
 * Algorithm:
 * 1. Find all nodes with in-degree 0 (no dependencies) → Layer 0
 * 2. Remove Layer 0 nodes, recalculate in-degrees
 * 3. Find new nodes with in-degree 0 → Layer 1
 * 4. Repeat until all nodes processed
 *
 * @param steps - Array of steps
 * @param graph - Dependency graph
 * @returns Array of parallel execution layers
 */
function topologicalSort(steps: Step[], graph: Map<string, string[]>): ParallelLayer[] {
  const layers: ParallelLayer[] = [];
  const stepMap = new Map(steps.map(s => [s.id, s]));

  // Calculate in-degrees (number of dependencies for each step)
  const inDegree = new Map<string, number>();
  for (const step of steps) {
    inDegree.set(step.id, step.dependencies.length);
  }

  const processed = new Set<string>();
  let layerId = 0;

  // Process layers until all steps are assigned
  while (processed.size < steps.length) {
    // Find all steps with in-degree 0 (ready to execute)
    const currentLayer: Step[] = [];

    for (const step of steps) {
      if (!processed.has(step.id) && inDegree.get(step.id) === 0) {
        currentLayer.push(step);
      }
    }

    if (currentLayer.length === 0) {
      // Circular dependency detected
      console.error('Circular dependency detected in steps');
      break;
    }

    // Calculate max time for this layer (bottleneck)
    const maxTime = Math.max(...currentLayer.map(s => s.estimatedTime));

    // Create layer description
    const description = currentLayer.length === 1
      ? currentLayer[0].description
      : `Parallel: ${currentLayer.map(s => s.description).join(', ')}`;

    layers.push({
      layerId,
      steps: currentLayer,
      maxTime,
      description
    });

    // Mark steps as processed and reduce in-degrees of dependent steps
    for (const step of currentLayer) {
      processed.add(step.id);

      const dependents = graph.get(step.id) || [];
      for (const depId of dependents) {
        const currentDegree = inDegree.get(depId) || 0;
        inDegree.set(depId, currentDegree - 1);
      }
    }

    layerId++;
  }

  return layers;
}

// ============================================================================
// Time Estimation & Speedup Calculation
// ============================================================================

/**
 * Calculate time estimates for sequential vs parallel execution
 *
 * Sequential: Sum of all step times
 * Parallel: Sum of each layer's max time (bottleneck in each layer)
 * Speedup: (Sequential - Parallel) / Sequential * 100
 *
 * @param steps - All steps
 * @param layers - Parallel execution layers
 * @returns Time estimate comparison
 */
function calculateSpeedup(steps: Step[], layers: ParallelLayer[]): TimeEstimate {
  // Sequential time: sum of all steps
  const sequential = steps.reduce((sum, step) => sum + step.estimatedTime, 0);

  // Parallel time: sum of max time in each layer
  const parallel = layers.reduce((sum, layer) => sum + layer.maxTime, 0);

  // Calculate speedup percentage
  const speedup = sequential > 0
    ? ((sequential - parallel) / sequential) * 100
    : 0;

  // Calculate speedup ratio
  const ratio = sequential > 0 ? sequential / parallel : 1;
  const speedupRatio = `${ratio.toFixed(1)}x faster`;

  return {
    sequential: Math.round(sequential * 10) / 10,
    parallel: Math.round(parallel * 10) / 10,
    speedup: Math.round(speedup),
    speedupRatio
  };
}

// ============================================================================
// TodoWrite Generation
// ============================================================================

/**
 * Generate TodoWrite-compatible task list with parallel group assignments
 *
 * @param layers - Parallel execution layers
 * @returns Array of TodoItem objects
 */
function generateTodos(layers: ParallelLayer[]): TodoItem[] {
  const todos: TodoItem[] = [];

  for (const layer of layers) {
    for (const step of layer.steps) {
      // Convert step description to imperative form for content
      const content = step.description.trim();

      // Convert to present continuous for activeForm
      const activeForm = toActiveForn(content);

      // Determine priority based on dependencies and layer
      const priority = layer.layerId === 0 ? 'high' : 'medium';

      todos.push({
        id: step.id,
        content,
        status: 'pending',
        activeForm,
        priority,
        parallelGroup: layer.layerId
      });
    }
  }

  return todos;
}

/**
 * Convert imperative command to present continuous form
 * Examples:
 * - "Read file.ts" → "Reading file.ts"
 * - "Update config" → "Updating config"
 * - "Analyze code" → "Analyzing code"
 */
function toActiveForn(imperative: string): string {
  // Common verb transformations
  const transformations: [RegExp, string][] = [
    [/^read\b/i, 'Reading'],
    [/^write\b/i, 'Writing'],
    [/^edit\b/i, 'Editing'],
    [/^create\b/i, 'Creating'],
    [/^update\b/i, 'Updating'],
    [/^delete\b/i, 'Deleting'],
    [/^analyze\b/i, 'Analyzing'],
    [/^review\b/i, 'Reviewing'],
    [/^test\b/i, 'Testing'],
    [/^build\b/i, 'Building'],
    [/^implement\b/i, 'Implementing'],
    [/^refactor\b/i, 'Refactoring'],
    [/^optimize\b/i, 'Optimizing'],
    [/^fix\b/i, 'Fixing'],
    [/^check\b/i, 'Checking'],
    [/^verify\b/i, 'Verifying'],
    [/^validate\b/i, 'Validating']
  ];

  for (const [pattern, replacement] of transformations) {
    if (pattern.test(imperative)) {
      return imperative.replace(pattern, replacement);
    }
  }

  // Default: capitalize first letter and add "Processing"
  return `Processing: ${imperative}`;
}

// ============================================================================
// Main Analysis Function
// ============================================================================

/**
 * Analyze a user request for parallelization opportunities.
 *
 * This is the main entry point for the parallel analyzer.
 *
 * Decision Logic:
 * - Single step → 'single_step' strategy (no TodoWrite needed)
 * - Multiple steps with no parallelization opportunity → 'sequential' strategy
 * - Multiple steps with >10% speedup → 'parallel' strategy with TodoWrite
 *
 * @param request - Natural language user request
 * @param routedCommand - Selected command from command router
 * @param speedupThreshold - Minimum speedup % to suggest parallel (default: 10)
 * @returns Complete parallelization plan
 *
 * @example
 * ```typescript
 * const plan = await analyzeParallelization(
 *   "Read auth.ts, analyze it, then update config.json",
 *   "/sparc:coder"
 * );
 *
 * console.log(plan.strategy);  // "parallel"
 * console.log(plan.speedup);   // "2.5x faster, 60% time saved"
 * console.log(plan.todos);     // TodoWrite-compatible array
 * ```
 */
export async function analyzeParallelization(
  request: string,
  routedCommand: string,
  speedupThreshold: number = 10
): Promise<ParallelPlan> {

  // Step 1: Extract discrete steps from request
  const steps = extractSteps(request, routedCommand);

  // Single step → no parallelization needed
  if (steps.length === 1) {
    return {
      strategy: 'single_step',
      reason: 'Request contains only one step, no parallelization possible'
    };
  }

  // Step 2: Build dependency graph
  const graph = buildDependencyGraph(steps);

  // Step 3: Topological sort to find parallel execution layers
  const layers = topologicalSort(steps, graph);

  // Step 4: Calculate speedup estimate
  const estimate = calculateSpeedup(steps, layers);

  // Step 5: Decide strategy based on speedup threshold
  if (estimate.speedup < speedupThreshold) {
    return {
      strategy: 'sequential',
      reason: `Parallelization provides only ${estimate.speedup}% speedup (threshold: ${speedupThreshold}%)`,
      estimate,
      layers,
      dependencyGraph: graph
    };
  }

  // Step 6: Generate TodoWrite structure for parallel execution
  const todos = generateTodos(layers);

  const speedupDescription = `${estimate.speedupRatio}, ${estimate.speedup}% time saved`;

  return {
    strategy: 'parallel',
    reason: `${estimate.speedup}% speedup exceeds ${speedupThreshold}% threshold`,
    speedup: speedupDescription,
    layers,
    todos,
    estimate,
    dependencyGraph: graph
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format ParallelPlan for human-readable display
 */
export function formatPlan(plan: ParallelPlan): string {
  const lines: string[] = [];

  lines.push(`Strategy: ${plan.strategy}`);
  lines.push(`Reason: ${plan.reason}`);

  if (plan.estimate) {
    lines.push('');
    lines.push('Time Estimates:');
    lines.push(`  Sequential: ${plan.estimate.sequential} min`);
    lines.push(`  Parallel:   ${plan.estimate.parallel} min`);
    lines.push(`  Speedup:    ${plan.speedup}`);
  }

  if (plan.layers) {
    lines.push('');
    lines.push('Execution Layers:');
    for (const layer of plan.layers) {
      const stepCount = layer.steps.length;
      const parallel = stepCount > 1 ? `[${stepCount} parallel]` : '';
      lines.push(`  Layer ${layer.layerId} ${parallel}: ${layer.description}`);
    }
  }

  if (plan.todos) {
    lines.push('');
    lines.push('TodoWrite Structure:');
    for (const todo of plan.todos) {
      const group = todo.parallelGroup !== undefined ? `[Group ${todo.parallelGroup}]` : '';
      lines.push(`  - ${todo.content} ${group}`);
    }
  }

  return lines.join('\n');
}

/**
 * Export dependency graph in DOT format for visualization
 * Can be rendered with Graphviz: dot -Tpng graph.dot -o graph.png
 */
export function exportGraphDOT(
  steps: Step[],
  graph: Map<string, string[]>
): string {
  const lines: string[] = [];

  lines.push('digraph ParallelPlan {');
  lines.push('  rankdir=LR;');
  lines.push('  node [shape=box];');
  lines.push('');

  // Add nodes
  for (const step of steps) {
    const label = `${step.id}\\n${step.description}\\n(${step.estimatedTime}min)`;
    lines.push(`  ${step.id} [label="${label}"];`);
  }

  lines.push('');

  // Add edges
  for (const [fromId, toIds] of graph.entries()) {
    for (const toId of toIds) {
      lines.push(`  ${fromId} -> ${toId};`);
    }
  }

  lines.push('}');

  return lines.join('\n');
}

// ============================================================================
// Example Usage (for testing)
// ============================================================================

/**
 * Example usage and test cases
 */
async function exampleUsage() {
  // Example 1: Sequential request with parallelization opportunity
  const plan1 = await analyzeParallelization(
    "Read auth.ts, read config.json, and analyze both files",
    "/sparc:analyzer"
  );
  console.log('Example 1: Parallel reads');
  console.log(formatPlan(plan1));
  console.log('');

  // Example 2: Sequential request with dependencies
  const plan2 = await analyzeParallelization(
    "Read data.json, then analyze it, then update config based on the analysis",
    "/sparc:coder"
  );
  console.log('Example 2: Sequential with dependencies');
  console.log(formatPlan(plan2));
  console.log('');

  // Example 3: Single step request
  const plan3 = await analyzeParallelization(
    "Fix the authentication bug",
    "/sparc:debugger"
  );
  console.log('Example 3: Single step');
  console.log(formatPlan(plan3));
}

// Uncomment to run examples:
// exampleUsage();
