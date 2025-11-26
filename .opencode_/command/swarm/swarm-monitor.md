---
description: "Real-time monitoring of swarm activity, agent performance, and task execution"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
---

# swarm-monitor

Real-time monitoring of swarm activity, agent performance, and task execution.

## MCP Tool Integration

### Basic Monitoring
```javascript
// Monitor swarm in real-time (default 1 second interval)
mcp__claude-flow__swarm_monitor({
  "duration": 10,     // Monitor for 10 seconds
  "interval": 1       // Update every 1 second
})
```

### Custom Monitoring Interval
```javascript
// Monitor with 5-second updates for 30 seconds
mcp__claude-flow__swarm_monitor({
  "duration": 30,
  "interval": 5
})
```

### Specific Swarm Monitoring
```javascript
// Monitor a specific swarm
mcp__claude-flow__swarm_monitor({
  "swarmId": "development-swarm",
  "duration": 20,
  "interval": 2
})
```

### Alternative Tool: ruv-swarm
```javascript
// Monitor with ruv-swarm
mcp__ruv-swarm__swarm_monitor({
  "duration": 15,
  "interval": 1,
  "verbose": true
})
```

## Real-Time Metrics

### Agent Performance Monitoring
```javascript
// Monitor all agents
mcp__claude-flow__agent_metrics({
  "metric": "all"
})

// Monitor specific metrics continuously
setInterval(() => {
  mcp__claude-flow__agent_metrics({
    "metric": "performance"
  })
}, 3000)  // Every 3 seconds
```

### Task Progress Monitoring
```javascript
// Monitor task progress
const monitorTask = (taskId) => {
  const check = setInterval(async () => {
    const status = await mcp__claude-flow__task_status({
      "taskId": taskId,
      "detailed": true
    })

    if (status.state === "completed" || status.state === "failed") {
      clearInterval(check)
    }
  }, 2000)
}

monitorTask("task-001")
```

### Memory Usage Monitoring
```javascript
// Monitor memory usage
mcp__claude-flow__memory_usage({
  "detail": "by-agent"
})
```

## Performance Tracking

### Continuous Performance Reports
```javascript
// Generate performance reports periodically
setInterval(() => {
  mcp__claude-flow__performance_report({
    "format": "summary",
    "timeframe": "24h"
  })
}, 60000)  // Every minute
```

### Bottleneck Detection
```javascript
// Monitor for bottlenecks
mcp__claude-flow__bottleneck_analyze({
  "component": "all",
  "metrics": ["response-time", "throughput", "memory"]
})
```

### Trend Analysis
```javascript
// Analyze performance trends
mcp__claude-flow__trend_analysis({
  "metric": "performance",
  "period": "30d"
})
```

## Health Monitoring

### System Health Checks
```javascript
// Continuous health monitoring
const healthCheck = setInterval(() => {
  mcp__claude-flow__health_check({
    "components": ["swarm", "agents", "tasks", "memory"]
  })
}, 10000)  // Every 10 seconds
```

### Agent Health Status
```javascript
// Monitor agent health
mcp__claude-flow__agent_list({
  "filter": "all"
})

// Check for unhealthy agents
mcp__claude-flow__agent_metrics({
  "metric": "all"
})
```

## Event Monitoring

### Task Events
```javascript
// Monitor task execution events
mcp__claude-flow__task_status({
  "detailed": true
})
```

### Error Monitoring
```javascript
// Monitor and analyze errors
mcp__claude-flow__error_analysis({
  "logs": recentLogs
})
```

## Cost Monitoring

### Resource Cost Analysis
```javascript
// Monitor resource costs
mcp__claude-flow__cost_analysis({
  "timeframe": "24h"
})

// Token usage tracking
mcp__claude-flow__token_usage({
  "timeframe": "24h"
})
```

## Monitoring Dashboards

### Comprehensive Dashboard
```javascript
// Create monitoring dashboard
const monitorDashboard = async () => {
  // Swarm status
  const swarmStatus = await mcp__claude-flow__swarm_status({
    "verbose": true
  })

  // Agent metrics
  const agentMetrics = await mcp__claude-flow__agent_metrics({
    "metric": "all"
  })

  // Performance report
  const performance = await mcp__claude-flow__performance_report({
    "format": "summary",
    "timeframe": "24h"
  })

  // Memory usage
  const memory = await mcp__claude-flow__memory_usage({
    "detail": "summary"
  })

  return {
    swarmStatus,
    agentMetrics,
    performance,
    memory,
    timestamp: Date.now()
  }
}

// Update dashboard every 5 seconds
setInterval(() => {
  const dashboard = await monitorDashboard()
  console.log(dashboard)
}, 5000)
```

### Focused Monitoring
```javascript
// Monitor specific aspects
const focusedMonitoring = {
  // CPU monitoring
  cpu: async () => {
    return await mcp__claude-flow__agent_metrics({
      "metric": "cpu"
    })
  },

  // Memory monitoring
  memory: async () => {
    return await mcp__claude-flow__agent_metrics({
      "metric": "memory"
    })
  },

  // Task monitoring
  tasks: async () => {
    return await mcp__claude-flow__agent_metrics({
      "metric": "tasks"
    })
  }
}
```

## Alert Conditions

### Performance Alerts
```javascript
// Monitor for performance issues
const checkPerformance = async () => {
  const metrics = await mcp__claude-flow__agent_metrics({
    "metric": "performance"
  })

  // Alert if CPU > 80%
  if (metrics.cpu > 80) {
    console.warn("⚠️ High CPU usage detected")
  }

  // Alert if memory > 4GB
  if (metrics.memory > 4096) {
    console.warn("⚠️ High memory usage detected")
  }
}
```

### Task Completion Monitoring
```javascript
// Monitor task completion rates
const monitorCompletionRate = async () => {
  const report = await mcp__claude-flow__performance_report({
    "format": "summary",
    "timeframe": "1h"
  })

  if (report.taskCompletionRate < 50) {
    console.warn("⚠️ Low task completion rate")
  }
}
```

## CLI Fallback (if MCP unavailable)

```bash
# Monitor swarm
npx claude-flow swarm monitor

# Monitor with interval
npx claude-flow swarm monitor --interval 5

# Monitor for specific duration
npx claude-flow swarm monitor --duration 30

# Monitor specific swarm
npx claude-flow swarm monitor --swarm-id development-swarm
```

## Monitoring Output Format

```javascript
{
  "timestamp": "2025-01-22T10:30:00Z",
  "swarm": {
    "id": "swarm-001",
    "status": "active",
    "uptime": "3h 15m"
  },
  "agents": {
    "total": 8,
    "active": 7,
    "idle": 1,
    "metrics": {
      "avg_cpu": "45%",
      "avg_memory": "2.1GB",
      "avg_tasks": 12
    }
  },
  "tasks": {
    "total": 96,
    "completed": 84,
    "in_progress": 8,
    "pending": 4,
    "completion_rate": "87.5%"
  },
  "performance": {
    "throughput": "28 tasks/min",
    "avg_response_time": "1.2s",
    "error_rate": "0.5%"
  }
}
```

## Next Steps

Based on monitoring results:
1. If performance degraded: Use `bottleneck_analyze` MCP tool
2. If errors increasing: Use `error_analysis` MCP tool
3. If overloaded: Scale with `swarm_scale` MCP tool
4. If underutilized: Assign more tasks with `task_orchestrate`
