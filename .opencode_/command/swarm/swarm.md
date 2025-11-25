---
description: "Main swarm orchestration command for multi-agent task coordination"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
strategies:
  - research
  - development
  - analysis
  - testing
  - optimization
  - maintenance
coordination_modes:
  - centralized
  - distributed
  - hierarchical
  - mesh
---

# swarm

Main swarm orchestration command for Claude Flow multi-agent coordination.

## MCP Tool Integration

### Task Orchestration (Primary)
```javascript
// Orchestrate a task across the swarm
mcp__claude-flow__task_orchestrate({
  "task": "Build REST API with authentication",
  "strategy": "parallel",        // parallel, sequential, adaptive, balanced
  "priority": "high",            // low, medium, high, critical
  "maxAgents": 8
})
```

### Advanced Orchestration
```javascript
// Orchestrate with dependencies
mcp__claude-flow__task_orchestrate({
  "task": "Deploy application",
  "strategy": "sequential",
  "dependencies": ["build", "test", "package", "deploy"],
  "priority": "critical"
})
```

## Strategy Modes

### Research Strategy
```javascript
// Initialize research swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})

// Orchestrate research
mcp__claude-flow__task_orchestrate({
  "task": "Research AI trends and patterns",
  "strategy": "parallel",
  "priority": "medium"
})
```

### Development Strategy
```javascript
// Initialize development swarm
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 8,
  "strategy": "balanced"
})

// Orchestrate development
mcp__claude-flow__task_orchestrate({
  "task": "Build full-stack application",
  "strategy": "parallel",
  "priority": "high"
})
```

### Analysis Strategy
```javascript
// Initialize analysis swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 5,
  "strategy": "adaptive"
})

// Orchestrate analysis
mcp__claude-flow__task_orchestrate({
  "task": "Analyze system performance",
  "strategy": "parallel",
  "priority": "medium"
})
```

### Testing Strategy
```javascript
// Initialize testing swarm
mcp__claude-flow__swarm_init({
  "topology": "star",
  "maxAgents": 7,
  "strategy": "parallel"
})

// Orchestrate testing
mcp__claude-flow__task_orchestrate({
  "task": "Comprehensive application testing",
  "strategy": "parallel",
  "priority": "high"
})
```

### Optimization Strategy
```javascript
// Initialize optimization swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})

// Orchestrate optimization
mcp__claude-flow__task_orchestrate({
  "task": "Optimize application performance",
  "strategy": "parallel",
  "priority": "high"
})
```

### Maintenance Strategy
```javascript
// Initialize maintenance swarm
mcp__claude-flow__swarm_init({
  "topology": "star",
  "maxAgents": 5,
  "strategy": "sequential"
})

// Orchestrate maintenance
mcp__claude-flow__task_orchestrate({
  "task": "Update dependencies and security patches",
  "strategy": "sequential",
  "dependencies": ["backup", "test", "update", "verify"],
  "priority": "medium"
})
```

## Coordination Modes

### Centralized Mode
```javascript
// Star topology with central coordinator
mcp__claude-flow__swarm_init({
  "topology": "star",
  "maxAgents": 7,
  "strategy": "centralized"
})
```

### Distributed Mode
```javascript
// Mesh topology for distributed coordination
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 8,
  "strategy": "distributed"
})
```

### Hierarchical Mode
```javascript
// Hierarchical topology for structured coordination
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 10,
  "strategy": "hierarchical"
})
```

### Mesh Mode
```javascript
// Pure mesh for maximum flexibility
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})
```

## Parallel Execution

```javascript
// Enable parallel task execution
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "task-1", "command": "analyze codebase" },
    { "id": "task-2", "command": "run tests" },
    { "id": "task-3", "command": "build documentation" }
  ]
})
```

## Monitoring & Status

```javascript
// Check swarm status
mcp__claude-flow__swarm_status({
  "verbose": true
})

// Monitor in real-time
mcp__claude-flow__swarm_monitor({
  "interval": 5000
})

// Check task status
mcp__claude-flow__task_status({
  "taskId": "task-001"
})

// Get task results
mcp__claude-flow__task_results({
  "taskId": "task-001"
})
```

## CLI Fallback (if MCP unavailable)

```bash
# Basic swarm orchestration
npx claude-flow swarm "Build REST API"

# With strategy
npx claude-flow swarm "Research AI patterns" --strategy research

# With coordination mode
npx claude-flow swarm "Build API" --mode hierarchical

# With max agents
npx claude-flow swarm "Analyze codebase" --max-agents 8

# Enable parallel execution
npx claude-flow swarm "Deploy app" --parallel

# Open in Claude Code
npx claude-flow swarm "Build feature X" --claude
```

## Options

- `--strategy <type>` - Execution strategy (research, development, analysis, testing, optimization, maintenance)
- `--mode <type>` - Coordination mode (centralized, distributed, hierarchical, mesh)
- `--max-agents <n>` - Maximum number of agents (default: 5, max: 100)
- `--claude` - Open Claude Code CLI with swarm prompt
- `--parallel` - Enable parallel execution
- `--priority <level>` - Task priority (low, medium, high, critical)

## Complete Workflow Example

```javascript
// 1. Initialize swarm
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 8,
  "strategy": "balanced"
})

// 2. Spawn agents
mcp__claude-flow__agent_spawn({
  "type": "architect",
  "name": "System Designer",
  "capabilities": ["system-design", "api-design"]
})

mcp__claude-flow__agent_spawn({
  "type": "coder",
  "name": "Backend Developer",
  "capabilities": ["nodejs", "api", "database"]
})

mcp__claude-flow__agent_spawn({
  "type": "tester",
  "name": "QA Engineer",
  "capabilities": ["testing", "automation"]
})

// 3. Orchestrate task
mcp__claude-flow__task_orchestrate({
  "task": "Build and test REST API",
  "strategy": "parallel",
  "priority": "high"
})

// 4. Monitor progress
mcp__claude-flow__swarm_monitor({
  "interval": 5000
})

// 5. Get results
mcp__claude-flow__task_results({
  "taskId": "task-001"
})
```

## Error Handling

```javascript
// Enable fault tolerance
mcp__claude-flow__daa_fault_tolerance({
  "agentId": "all",
  "strategy": "auto-recovery"
})

// Error analysis
mcp__claude-flow__error_analysis({
  "logs": errorLogs
})
```

## Next Steps

After orchestration:
1. Monitor with `swarm-monitor` command
2. Check status with `swarm-status` command
3. Review metrics with `agent_metrics` MCP tool
4. Scale swarm if needed with `swarm_scale` MCP tool
