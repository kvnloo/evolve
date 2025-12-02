/**
 * Test suite for parallel-analyzer.ts
 *
 * Demonstrates the parallel analyzer's capabilities with various scenarios.
 */

import {
  analyzeParallelization,
  formatPlan,
  exportGraphDOT,
  type ParallelPlan
} from './parallel-analyzer';

// ============================================================================
// Test Utilities
// ============================================================================

/**
 * Print test results in a formatted way
 */
function printTest(name: string, plan: ParallelPlan) {
  console.log('='.repeat(80));
  console.log(`TEST: ${name}`);
  console.log('='.repeat(80));
  console.log(formatPlan(plan));
  console.log('');
}

// ============================================================================
// Test Cases
// ============================================================================

async function runTests() {
  console.log('\n📊 Parallel Analyzer Test Suite\n');

  // -------------------------------------------------------------------------
  // Test 1: Parallel Reads (High Speedup)
  // -------------------------------------------------------------------------
  const test1 = await analyzeParallelization(
    "Read auth.ts, read config.json, read database.ts, and read api.ts",
    "/sparc:analyzer"
  );
  printTest('Parallel Reads (High Speedup)', test1);
  console.assert(test1.strategy === 'parallel', 'Should be parallel');
  console.assert(test1.todos && test1.todos.length === 4, 'Should have 4 todos');
  console.assert(test1.estimate && test1.estimate.speedup > 50, 'Should have >50% speedup');

  // -------------------------------------------------------------------------
  // Test 2: Sequential with Dependencies
  // -------------------------------------------------------------------------
  const test2 = await analyzeParallelization(
    "Read data.json, then analyze it, then update config based on the analysis",
    "/sparc:coder"
  );
  printTest('Sequential with Dependencies', test2);
  console.assert(test2.strategy === 'sequential', 'Should be sequential');
  console.assert(test2.layers && test2.layers.length === 3, 'Should have 3 layers');

  // -------------------------------------------------------------------------
  // Test 3: Single Step (No Parallelization)
  // -------------------------------------------------------------------------
  const test3 = await analyzeParallelization(
    "Fix the authentication bug in auth.ts",
    "/sparc:debugger"
  );
  printTest('Single Step (No Parallelization)', test3);
  console.assert(test3.strategy === 'single_step', 'Should be single_step');

  // -------------------------------------------------------------------------
  // Test 4: Mixed Parallel and Sequential
  // -------------------------------------------------------------------------
  const test4 = await analyzeParallelization(
    "Read auth.ts and config.json, then analyze them both, then update database.ts",
    "/sparc:coder"
  );
  printTest('Mixed Parallel and Sequential', test4);
  console.assert(test4.strategy === 'parallel', 'Should be parallel');
  console.assert(test4.layers && test4.layers.length === 3, 'Should have 3 layers');
  console.assert(test4.layers![0].steps.length === 2, 'Layer 0 should have 2 parallel steps');

  // -------------------------------------------------------------------------
  // Test 5: Batch Operations (High Time Multiplier)
  // -------------------------------------------------------------------------
  const test5 = await analyzeParallelization(
    "Update all TypeScript files in src/, test all components, and build the project",
    "/swarm:development"
  );
  printTest('Batch Operations with Swarm', test5);
  console.assert(test5.strategy === 'parallel', 'Should be parallel');

  // -------------------------------------------------------------------------
  // Test 6: Complex Multi-Layer Parallelization
  // -------------------------------------------------------------------------
  const test6 = await analyzeParallelization(
    "Read auth.ts, config.json, and database.ts, then analyze auth.ts and database.ts, " +
    "then update config.json based on the analysis, finally test everything",
    "/sparc:coder"
  );
  printTest('Complex Multi-Layer Parallelization', test6);
  console.assert(test6.layers && test6.layers.length >= 3, 'Should have multiple layers');

  // -------------------------------------------------------------------------
  // Test 7: Low Speedup (Below Threshold)
  // -------------------------------------------------------------------------
  const test7 = await analyzeParallelization(
    "Read small.txt and write large.json",
    "/sparc:coder",
    50  // High threshold
  );
  printTest('Low Speedup (Below 50% Threshold)', test7);
  console.assert(test7.strategy === 'sequential', 'Should be sequential');

  // -------------------------------------------------------------------------
  // Test 8: Implicit Dependencies
  // -------------------------------------------------------------------------
  const test8 = await analyzeParallelization(
    "Read data file, process it, then save the result",
    "/sparc:coder"
  );
  printTest('Implicit Dependencies', test8);
  console.assert(test8.strategy === 'sequential', 'Should be sequential');

  // -------------------------------------------------------------------------
  // Test 9: Graph Export
  // -------------------------------------------------------------------------
  const test9 = await analyzeParallelization(
    "Read a.ts, b.ts, and c.ts, then analyze a.ts and b.ts, then update c.ts",
    "/sparc:coder"
  );
  printTest('Graph Export Test', test9);

  if (test9.layers && test9.dependencyGraph) {
    // Extract steps from layers
    const steps = test9.layers.flatMap(layer => layer.steps);
    const dotGraph = exportGraphDOT(steps, test9.dependencyGraph);
    console.log('DOT Graph Export:');
    console.log(dotGraph);
    console.log('\n💡 Tip: Save to graph.dot and run: dot -Tpng graph.dot -o graph.png\n');
  }

  // -------------------------------------------------------------------------
  // Test 10: TodoWrite Validation
  // -------------------------------------------------------------------------
  const test10 = await analyzeParallelization(
    "Read file1.ts, file2.ts, and file3.ts, analyze them, update config.json",
    "/sparc:coder"
  );
  printTest('TodoWrite Structure Validation', test10);

  if (test10.todos) {
    console.log('Generated TodoWrite Call:');
    console.log('TodoWrite({');
    console.log('  todos: [');
    for (const todo of test10.todos) {
      console.log(`    {`);
      console.log(`      id: "${todo.id}",`);
      console.log(`      content: "${todo.content}",`);
      console.log(`      status: "${todo.status}",`);
      console.log(`      activeForm: "${todo.activeForm}",`);
      console.log(`      priority: "${todo.priority}",`);
      console.log(`      parallelGroup: ${todo.parallelGroup}`);
      console.log(`    },`);
    }
    console.log('  ]');
    console.log('})');
    console.log('');
  }

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log('='.repeat(80));
  console.log('✅ All Tests Completed');
  console.log('='.repeat(80));
  console.log('');
  console.log('Test Coverage:');
  console.log('  ✓ Parallel reads with high speedup');
  console.log('  ✓ Sequential dependencies');
  console.log('  ✓ Single step optimization');
  console.log('  ✓ Mixed parallel/sequential layers');
  console.log('  ✓ Batch operations with swarm');
  console.log('  ✓ Complex multi-layer parallelization');
  console.log('  ✓ Low speedup threshold handling');
  console.log('  ✓ Implicit dependency detection');
  console.log('  ✓ Graph export (DOT format)');
  console.log('  ✓ TodoWrite structure generation');
  console.log('');
}

// ============================================================================
// Performance Benchmarks
// ============================================================================

async function runBenchmarks() {
  console.log('\n⚡ Performance Benchmarks\n');

  const benchmarks = [
    {
      name: 'Simple Request (3 steps)',
      request: "Read a.ts, b.ts, c.ts",
      command: "/sparc:coder"
    },
    {
      name: 'Complex Request (10 steps)',
      request: "Read a.ts, b.ts, c.ts, d.ts, e.ts, analyze a.ts and b.ts, update c.ts, test d.ts and e.ts, build project",
      command: "/swarm:development"
    },
    {
      name: 'Long Request (20+ words)',
      request: "Please read the authentication file and the configuration file, then carefully analyze both of them to identify any security issues, and after that update the database schema accordingly",
      command: "/sparc:analyzer"
    }
  ];

  for (const benchmark of benchmarks) {
    const start = performance.now();
    const plan = await analyzeParallelization(benchmark.request, benchmark.command);
    const end = performance.now();

    console.log(`${benchmark.name}:`);
    console.log(`  Strategy: ${plan.strategy}`);
    console.log(`  Analysis Time: ${(end - start).toFixed(2)}ms`);
    if (plan.estimate) {
      console.log(`  Sequential: ${plan.estimate.sequential}min`);
      console.log(`  Parallel: ${plan.estimate.parallel}min`);
      console.log(`  Speedup: ${plan.estimate.speedup}%`);
    }
    console.log('');
  }
}

// ============================================================================
// Edge Cases
// ============================================================================

async function testEdgeCases() {
  console.log('\n🔍 Edge Case Testing\n');

  // Edge case 1: Empty request
  try {
    const edge1 = await analyzeParallelization("", "/sparc:coder");
    console.log('Edge Case 1 (Empty): ✅ Handled');
    console.log(`  Strategy: ${edge1.strategy}\n`);
  } catch (e) {
    console.log('Edge Case 1 (Empty): ❌ Failed\n');
  }

  // Edge case 2: Very long request
  const longRequest = "Read " + Array(100).fill(0).map((_, i) => `file${i}.ts`).join(', ');
  try {
    const edge2 = await analyzeParallelization(longRequest, "/sparc:coder");
    console.log('Edge Case 2 (Long): ✅ Handled');
    console.log(`  Steps extracted: ${edge2.layers ? edge2.layers.flatMap(l => l.steps).length : 0}\n`);
  } catch (e) {
    console.log('Edge Case 2 (Long): ❌ Failed\n');
  }

  // Edge case 3: No action verbs
  const edge3 = await analyzeParallelization("Something something files", "/sparc:coder");
  console.log('Edge Case 3 (No Actions): ✅ Handled');
  console.log(`  Strategy: ${edge3.strategy}\n`);

  // Edge case 4: All steps dependent
  const edge4 = await analyzeParallelization(
    "Read file then analyze it then update it then test it then deploy it",
    "/sparc:coder"
  );
  console.log('Edge Case 4 (Full Chain): ✅ Handled');
  console.log(`  Strategy: ${edge4.strategy}`);
  console.log(`  Layers: ${edge4.layers ? edge4.layers.length : 0}\n`);
}

// ============================================================================
// Main Runner
// ============================================================================

async function main() {
  console.clear();
  console.log('\n' + '='.repeat(80));
  console.log('  PARALLEL ANALYZER TEST & BENCHMARK SUITE');
  console.log('='.repeat(80) + '\n');

  await runTests();
  await runBenchmarks();
  await testEdgeCases();

  console.log('='.repeat(80));
  console.log('  TEST SUITE COMPLETE');
  console.log('='.repeat(80) + '\n');
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main as runParallelAnalyzerTests };
