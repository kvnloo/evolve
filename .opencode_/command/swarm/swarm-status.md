---
description: "Check current swarm status, agent health, and task progress"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
---

# swarm-status

Check current swarm status, agent health, and task progress.

## MCP Tool Integration

### Basic Status Check
```javascript
// Get swarm status
mcp__claude-flow__swarm_status({
  "verbose": false
})
```

### Detailed Status
```javascript
// Get detailed swarm status with agent information
mcp__claude-flow__swarm_status({
  "verbose": true
})
```

### Specific Swarm Status
```javascript
// Check status of a specific swarm
mcp__claude-flow__swarm_status({
  "swarmId": "development-swarm",
  "verbose": true
})
```

## Agent Status

### List All Agents
```javascript
// List all active agents
mcp__claude-flow__agent_list({
  "filter": "all"
})

// List only active agents
mcp__claude-flow__agent_list({
  "filter": "active"
})

// List idle agents
mcp__claude-flow__agent_list({
  "filter": "idle"
})

// List busy agents
mcp__claude-flow__agent_list({
  "filter": "busy"
})
```

### Agent Metrics
```javascript
// Get metrics for specific agent
mcp__claude-flow__agent_metrics({
  "agentId": "agent-001",
  "metric": "all"
})

// Get CPU metrics
mcp__claude-flow__agent_metrics({
  "agentId": "agent-001",
  "metric": "cpu"
})

// Get memory metrics
mcp__claude-flow__agent_metrics({
  "agentId": "agent-001",
  "metric": "memory"
})

// Get task metrics
mcp__claude-flow__agent_metrics({
  "agentId": "agent-001",
  "metric": "tasks"
})

// Get performance metrics
mcp__claude-flow__agent_metrics({
  "agentId": "agent-001",
  "metric": "performance"
})
```

### All Agents Metrics
```javascript
// Get metrics for all agents
mcp__claude-flow__agent_metrics({
  "metric": "all"
})
```

## Task Status

### Check Task Progress
```javascript
// Get task status
mcp__claude-flow__task_status({
  "taskId": "task-001"
})

// Get detailed task progress
mcp__claude-flow__task_status({
  "taskId": "task-001",
  "detailed": true
})
```

### Get Task Results
```javascript
// Get summary results
mcp__claude-flow__task_results({
  "taskId": "task-001",
  "format": "summary"
})

// Get detailed results
mcp__claude-flow__task_results({
  "taskId": "task-001",
  "format": "detailed"
})

// Get raw results
mcp__claude-flow__task_results({
  "taskId": "task-001",
  "format": "raw"
})
```

## System Health

### Health Check
```javascript
// Check overall system health
mcp__claude-flow__health_check({
  "components": ["swarm", "agents", "tasks", "memory"]
})
```

### Memory Usage
```javascript
// Get summary of memory usage
mcp__claude-flow__memory_usage({
  "detail": "summary"
})

// Get detailed memory usage
mcp__claude-flow__memory_usage({
  "detail": "detailed"
})

// Get memory usage by agent
mcp__claude-flow__memory_usage({
  "detail": "by-agent"
})
```

## Performance Metrics

### Performance Report
```javascript
// Get summary performance report
mcp__claude-flow__performance_report({
  "format": "summary",
  "timeframe": "24h"
})

// Get detailed performance report
mcp__claude-flow__performance_report({
  "format": "detailed",
  "timeframe": "7d"
})

// Get JSON performance data
mcp__claude-flow__performance_report({
  "format": "json",
  "timeframe": "30d"
})
```

### Usage Statistics
```javascript
// Get usage stats for specific component
mcp__claude-flow__usage_stats({
  "component": "swarm"
})

// Get agent usage stats
mcp__claude-flow__usage_stats({
  "component": "agents"
})

// Get task usage stats
mcp__claude-flow__usage_stats({
  "component": "tasks"
})
```

## Neural Status

### Neural Agent Status
```javascript
// Get status of all neural agents
mcp__claude-flow__neural_status({})

// Get status of specific neural agent
mcp__claude-flow__neural_status({
  "agentId": "neural-agent-001"
})
```

### Neural Patterns
```javascript
// Get all cognitive patterns
mcp__claude-flow__neural_patterns({
  "pattern": "all"
})

// Get specific pattern
mcp__claude-flow__neural_patterns({
  "pattern": "convergent"
})
```

## CLI Fallback (if MCP unavailable)

```bash
# Get basic swarm status
npx claude-flow swarm status

# Get detailed status
npx claude-flow swarm status --verbose

# Get specific swarm status
npx claude-flow swarm status --swarm-id development-swarm

# List agents
npx claude-flow swarm agents

# Get agent metrics
npx claude-flow swarm metrics --agent-id agent-001
```

## Status Response Format

```javascript
{
  "swarmId": "swarm-001",
  "topology": "hierarchical",
  "status": "active",
  "agents": {
    "total": 8,
    "active": 7,
    "idle": 1,
    "busy": 6
  },
  "tasks": {
    "total": 15,
    "completed": 10,
    "in_progress": 4,
    "pending": 1
  },
  "performance": {
    "uptime": "2h 45m",
    "cpu_usage": "45%",
    "memory_usage": "2.1GB",
    "task_completion_rate": "87%"
  },
  "health": "healthy"
}
```

## Next Steps

Based on status:
1. If agents idle: Assign more tasks
2. If overloaded: Scale swarm with `swarm_scale`
3. If errors: Check `error_analysis` MCP tool
4. If slow: Use `bottleneck_analyze` MCP tool
