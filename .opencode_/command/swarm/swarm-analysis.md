---
description: "Quick reference for analysis swarm strategy"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
---

# swarm-analysis

Quick reference for analysis swarm operations.

## Quick Start
```javascript
// Initialize and run analysis
mcp__claude-flow__swarm_init({ topology: "mesh", strategy: "adaptive" })
mcp__claude-flow__task_orchestrate({ task: "analyze system", strategy: "parallel" })
```

## CLI Usage
```bash
npx claude-flow swarm "analyze system performance" --strategy analysis
```

## See Full Guide
For comprehensive analysis swarm documentation, see: `analysis.md`

## Key Features
- Parallel data collection
- Pattern recognition
- Bottleneck detection
- Comprehensive reporting
