---
description: "Common swarm patterns and usage examples for various scenarios"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
---

# Swarm Examples and Common Patterns

Practical examples of swarm coordination for various use cases.

## Common Swarm Patterns

### Research Swarm

#### Using MCP Tools (Primary)
```javascript
// Initialize research swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})

// Spawn research agents
mcp__claude-flow__agent_spawn({
  "type": "researcher",
  "name": "AI Trends Researcher",
  "capabilities": ["web-search", "analysis", "synthesis"]
})

// Orchestrate research
mcp__claude-flow__task_orchestrate({
  "task": "research AI trends",
  "strategy": "parallel",
  "priority": "medium"
})

// Monitor progress
mcp__claude-flow__swarm_status({
  "swarmId": "research-swarm"
})
```

#### Using CLI (Fallback)
```bash
npx claude-flow swarm "research AI trends" \
  --strategy research \
  --mode distributed \
  --max-agents 6 \
  --parallel
```

### Development Swarm

#### Using MCP Tools (Primary)
```javascript
// Initialize development swarm
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 8,
  "strategy": "balanced"
})

// Spawn development team
const devAgents = [
  { type: "architect", name: "API Designer", capabilities: ["api-design", "system-design"] },
  { type: "coder", name: "Backend Developer", capabilities: ["nodejs", "api", "database"] },
  { type: "tester", name: "API Tester", capabilities: ["api-testing", "integration"] },
  { type: "documenter", name: "API Documenter", capabilities: ["documentation", "openapi"] }
]

devAgents.forEach(agent => {
  mcp__claude-flow__agent_spawn({
    "type": agent.type,
    "name": agent.name,
    "capabilities": agent.capabilities,
    "swarmId": "dev-swarm"
  })
})

// Orchestrate development
mcp__claude-flow__task_orchestrate({
  "task": "build REST API",
  "strategy": "sequential",
  "dependencies": ["design", "implement", "test", "document"]
})

// Enable monitoring
mcp__claude-flow__swarm_monitor({
  "swarmId": "dev-swarm",
  "interval": 5000
})
```

#### Using CLI (Fallback)
```bash
npx claude-flow swarm "build REST API" \
  --strategy development \
  --mode hierarchical \
  --monitor \
  --output sqlite
```

### Analysis Swarm

#### Using MCP Tools (Primary)
```javascript
// Initialize analysis swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 5,
  "strategy": "adaptive"
})

// Spawn analysis agents
mcp__claude-flow__agent_spawn({
  "type": "analyst",
  "name": "Code Analyzer",
  "capabilities": ["static-analysis", "complexity-analysis"]
})

mcp__claude-flow__agent_spawn({
  "type": "analyst",
  "name": "Security Analyzer",
  "capabilities": ["security-scan", "vulnerability-detection"]
})

// Parallel analysis execution
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "analyze-code", "command": "analyze codebase structure" },
    { "id": "analyze-security", "command": "scan for vulnerabilities" },
    { "id": "analyze-performance", "command": "identify bottlenecks" }
  ]
})

// Generate comprehensive report
mcp__claude-flow__performance_report({
  "format": "detailed",
  "timeframe": "current"
})
```

#### Using CLI (Fallback)
```bash
npx claude-flow swarm "analyze codebase" \
  --strategy analysis \
  --mode mesh \
  --parallel \
  --timeout 300
```

### Testing Swarm

#### Using MCP Tools (Primary)
```javascript
// Initialize testing swarm
mcp__claude-flow__swarm_init({
  "topology": "star",
  "maxAgents": 7,
  "strategy": "parallel"
})

// Spawn testing agents
const testers = [
  { type: "tester", name: "Unit Tester", capabilities: ["unit-testing", "mocking"] },
  { type: "tester", name: "Integration Tester", capabilities: ["integration", "api-testing"] },
  { type: "tester", name: "E2E Tester", capabilities: ["e2e", "ui-testing"] },
  { type: "tester", name: "Performance Tester", capabilities: ["load-testing", "benchmarking"] }
]

testers.forEach(agent => {
  mcp__claude-flow__agent_spawn({
    "type": agent.type,
    "name": agent.name,
    "capabilities": agent.capabilities
  })
})

// Execute tests in parallel
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "unit", "command": "npm run test:unit" },
    { "id": "integration", "command": "npm run test:integration" },
    { "id": "e2e", "command": "npm run test:e2e" }
  ]
})

// Quality assessment
mcp__claude-flow__quality_assess({
  "target": "test-coverage",
  "criteria": ["line-coverage", "branch-coverage"]
})
```

### Optimization Swarm

#### Using MCP Tools (Primary)
```javascript
// Initialize optimization swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})

// Spawn optimization agents
const optimizers = [
  { type: "optimizer", name: "Performance Profiler", capabilities: ["profiling"] },
  { type: "analyst", name: "Memory Analyzer", capabilities: ["memory-analysis"] },
  { type: "optimizer", name: "Code Optimizer", capabilities: ["code-optimization"] }
]

optimizers.forEach(agent => {
  mcp__claude-flow__agent_spawn({
    "type": agent.type,
    "name": agent.name,
    "capabilities": agent.capabilities
  })
})

// Parallel optimization tasks
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "profile", "command": "profile system performance" },
    { "id": "memory", "command": "analyze memory usage" },
    { "id": "bottlenecks", "command": "identify bottlenecks" }
  ]
})

// Run benchmarks
mcp__claude-flow__benchmark_run({
  "suite": "performance"
})

// Optimize topology
mcp__claude-flow__topology_optimize({
  "swarmId": "optimization-swarm"
})
```

## Error Handling Examples

### Setup Fault Tolerance
```javascript
// Enable auto-recovery for all agents
mcp__claude-flow__daa_fault_tolerance({
  "agentId": "all",
  "strategy": "auto-recovery"
})
```

### Graceful Error Handling
```javascript
// Handle errors with analysis
try {
  await mcp__claude-flow__task_orchestrate({
    "task": "complex operation",
    "strategy": "parallel"
  })
} catch (error) {
  // Check swarm health
  const status = await mcp__claude-flow__swarm_status({})

  // Log error patterns
  await mcp__claude-flow__error_analysis({
    "logs": [error.message]
  })

  // Attempt recovery
  await mcp__claude-flow__daa_fault_tolerance({
    "agentId": "all",
    "strategy": "auto-recovery"
  })
}
```

## Advanced Patterns

### Multi-Stage Pipeline
```javascript
// 1. Research phase
mcp__claude-flow__swarm_init({ topology: "mesh" })
await mcp__claude-flow__task_orchestrate({
  task: "research requirements",
  strategy: "parallel"
})

// 2. Design phase
mcp__claude-flow__swarm_scale({ targetSize: 8 })
await mcp__claude-flow__task_orchestrate({
  task: "design architecture",
  strategy: "sequential"
})

// 3. Development phase
await mcp__claude-flow__parallel_execute({
  tasks: [
    { id: "frontend", command: "build UI" },
    { id: "backend", command: "build API" }
  ]
})

// 4. Testing phase
await mcp__claude-flow__task_orchestrate({
  task: "comprehensive testing",
  strategy: "parallel"
})
```

### Adaptive Swarm Scaling
```javascript
// Monitor and auto-scale based on load
const adaptiveScale = async () => {
  const status = await mcp__claude-flow__swarm_status({})

  if (status.agents.busy / status.agents.total > 0.8) {
    // Scale up if > 80% agents busy
    await mcp__claude-flow__swarm_scale({
      targetSize: status.agents.total + 3
    })
  } else if (status.agents.idle / status.agents.total > 0.5) {
    // Scale down if > 50% agents idle
    await mcp__claude-flow__swarm_scale({
      targetSize: Math.max(3, status.agents.total - 2)
    })
  }
}

// Run adaptive scaling every 30 seconds
setInterval(adaptiveScale, 30000)
```

### Memory-Backed Coordination
```javascript
// Store coordination state
mcp__claude-flow__memory_usage({
  action: "store",
  key: "swarm-coordination-state",
  value: JSON.stringify({
    phase: "development",
    progress: 65,
    tasks_completed: 12,
    tasks_pending: 6
  }),
  namespace: "coordination"
})

// Retrieve state for resumption
const state = await mcp__claude-flow__memory_usage({
  action: "retrieve",
  key: "swarm-coordination-state",
  namespace: "coordination"
})
```

### Cross-Swarm Collaboration
```javascript
// Research swarm
mcp__claude-flow__swarm_init({
  topology: "mesh",
  maxAgents: 5
})
const researchResults = await mcp__claude-flow__task_orchestrate({
  task: "research technology stack"
})

// Store results for dev swarm
mcp__claude-flow__memory_usage({
  action: "store",
  key: "research-findings",
  value: JSON.stringify(researchResults),
  namespace: "cross-swarm"
})

// Development swarm retrieves research
const findings = await mcp__claude-flow__memory_usage({
  action: "retrieve",
  key: "research-findings",
  namespace: "cross-swarm"
})

// Use findings in development
mcp__claude-flow__task_orchestrate({
  task: "implement based on research",
  context: findings
})
```

## Best Practices Summary

1. **Choose appropriate topology**:
   - Mesh: Exploratory, research, analysis
   - Hierarchical: Large projects, structured development
   - Star: Testing, centralized control
   - Ring: Sequential pipelines

2. **Enable parallel execution** for independent tasks

3. **Monitor continuously** with `swarm_monitor`

4. **Enable fault tolerance** for production workloads

5. **Store state in memory** for cross-session persistence

6. **Scale dynamically** based on workload

7. **Use sequential strategy** for safety-critical operations

8. **Batch agent spawning** for efficiency

9. **Document workflows** for team collaboration

10. **Test thoroughly** after swarm operations
