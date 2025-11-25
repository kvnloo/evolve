---
description: "Comprehensive analysis swarm strategy for distributed system analysis"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
strategy_type: analysis
topology: mesh
agent_roles:
  - analyst
  - documenter
  - coordinator
---

# Analysis Swarm Strategy

Comprehensive analysis through distributed agent coordination.

## Purpose

Deploy specialized analysis agents in a mesh topology for:
- System performance analysis
- Code quality assessment
- Pattern recognition and anomaly detection
- Data analysis and insights generation
- Report synthesis and documentation

## Activation

### Using MCP Tools (Primary)
```javascript
// Initialize analysis swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})

// Orchestrate analysis task
mcp__claude-flow__task_orchestrate({
  "task": "analyze system performance",
  "strategy": "parallel",
  "priority": "medium"
})
```

### Using CLI (Fallback)
```bash
npx claude-flow swarm "analyze system performance" --strategy analysis
```

## Agent Roles

### Agent Spawning with MCP
```javascript
// Spawn Data Collector
mcp__claude-flow__agent_spawn({
  "type": "analyst",
  "name": "Data Collector",
  "capabilities": ["metrics", "logging", "monitoring"]
})

// Spawn Pattern Analyzer
mcp__claude-flow__agent_spawn({
  "type": "analyst",
  "name": "Pattern Analyzer",
  "capabilities": ["pattern-recognition", "anomaly-detection"]
})

// Spawn Report Generator
mcp__claude-flow__agent_spawn({
  "type": "documenter",
  "name": "Report Generator",
  "capabilities": ["reporting", "visualization"]
})

// Spawn Insight Synthesizer
mcp__claude-flow__agent_spawn({
  "type": "coordinator",
  "name": "Insight Synthesizer",
  "capabilities": ["synthesis", "correlation"]
})
```

## Coordination Modes

### Mesh Topology (Recommended)
- Best for exploratory analysis
- Enables peer-to-peer insight sharing
- Maximum flexibility for cross-referencing findings

### Pipeline Topology
- For sequential data processing
- Linear flow through analysis stages
- Clear data transformation chain

### Hierarchical Topology
- For complex system analysis
- Structured reporting hierarchy
- Clear responsibility delegation

## Analysis Operations

### Performance Analysis
```javascript
// Run comprehensive performance analysis
mcp__claude-flow__performance_report({
  "format": "detailed",
  "timeframe": "24h"
})

// Identify bottlenecks
mcp__claude-flow__bottleneck_analyze({
  "component": "api",
  "metrics": ["response-time", "throughput"]
})

// Trend analysis
mcp__claude-flow__trend_analysis({
  "metric": "performance",
  "period": "30d"
})
```

### Pattern Recognition
```javascript
// Detect patterns in data
mcp__claude-flow__pattern_recognize({
  "data": performanceData,
  "patterns": ["anomaly", "trend", "cycle"]
})

// Cognitive analysis
mcp__claude-flow__cognitive_analyze({
  "behavior": "system-patterns"
})
```

### Quality Assessment
```javascript
// Assess code quality
mcp__claude-flow__quality_assess({
  "target": "codebase",
  "criteria": ["maintainability", "complexity", "coverage"]
})
```

### Error Analysis
```javascript
// Analyze error patterns
mcp__claude-flow__error_analysis({
  "logs": errorLogs
})
```

## Data Collection & Processing

### Parallel Data Collection
```javascript
// Collect data from multiple sources in parallel
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "metrics", "command": "collect system metrics" },
    { "id": "logs", "command": "aggregate logs" },
    { "id": "traces", "command": "gather traces" }
  ]
})
```

### Batch Processing
```javascript
// Process large datasets
mcp__claude-flow__batch_process({
  "items": dataPoints,
  "operation": "analyze-metrics"
})
```

## Status Monitoring

### Track Analysis Progress
```javascript
// Monitor analysis progress
mcp__claude-flow__task_status({
  "taskId": "analysis-task-001"
})

// Get real-time updates
mcp__claude-flow__swarm_monitor({
  "interval": 3000
})
```

### Get Analysis Results
```javascript
// Retrieve completed analysis
mcp__claude-flow__task_results({
  "taskId": "analysis-task-001",
  "format": "detailed"
})
```

## Complete Analysis Workflow

```javascript
// 1. Initialize analysis swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})

// 2. Spawn analysis agents
const analysts = [
  { type: "analyst", name: "Metric Collector", capabilities: ["metrics", "monitoring"] },
  { type: "analyst", name: "Pattern Detector", capabilities: ["pattern-recognition"] },
  { type: "analyst", name: "Anomaly Hunter", capabilities: ["anomaly-detection"] },
  { type: "documenter", name: "Report Writer", capabilities: ["reporting", "visualization"] }
]

analysts.forEach(agent => {
  mcp__claude-flow__agent_spawn({
    "type": agent.type,
    "name": agent.name,
    "capabilities": agent.capabilities
  })
})

// 3. Execute parallel analysis
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "collect", "command": "collect performance data" },
    { "id": "analyze", "command": "analyze patterns" },
    { "id": "report", "command": "generate insights report" }
  ]
})

// 4. Generate comprehensive report
mcp__claude-flow__performance_report({
  "format": "detailed",
  "timeframe": "7d"
})

// 5. Synthesize findings
mcp__claude-flow__task_results({
  "taskId": "analysis-task-001",
  "format": "detailed"
})
```

## Best Practices

1. **Use mesh topology** for maximum analysis flexibility
2. **Enable parallel execution** for faster data collection
3. **Monitor progress** with real-time updates
4. **Store findings** in memory for cross-session analysis
5. **Generate reports** with visualization support

## Error Handling

```javascript
// Enable fault tolerance
mcp__claude-flow__daa_fault_tolerance({
  "agentId": "all",
  "strategy": "auto-recovery"
})

// Handle analysis failures
try {
  await mcp__claude-flow__task_orchestrate({
    "task": "analyze system",
    "strategy": "parallel"
  })
} catch (error) {
  await mcp__claude-flow__error_analysis({
    "logs": [error.message]
  })
}
```

## Memory Integration

```javascript
// Store analysis results
mcp__claude-flow__memory_usage({
  "action": "store",
  "key": "analysis-results-" + Date.now(),
  "value": JSON.stringify(results),
  "namespace": "analysis",
  "ttl": 604800  // 7 days
})

// Retrieve previous analysis
mcp__claude-flow__memory_search({
  "pattern": "analysis-results",
  "namespace": "analysis",
  "limit": 10
})
```

## Next Steps

After analysis:
1. Review generated reports
2. Act on identified bottlenecks
3. Schedule follow-up analysis
4. Share insights with team
