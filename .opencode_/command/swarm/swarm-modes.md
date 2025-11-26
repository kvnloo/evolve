---
description: "Swarm coordination modes: centralized, distributed, hierarchical, mesh"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
---

# swarm-modes

Swarm coordination modes for different organizational patterns.

## Available Modes

### Centralized Mode (Star Topology)
```javascript
mcp__claude-flow__swarm_init({
  "topology": "star",
  "strategy": "centralized"
})
```
- Single coordinator hub
- Best for: Testing, simple coordination, monitoring
- Trade-offs: Single point of failure, limited scalability

### Distributed Mode (Mesh Topology)
```javascript
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "strategy": "distributed"
})
```
- Peer-to-peer communication
- Best for: Research, analysis, exploratory work
- Trade-offs: Complex coordination, higher communication overhead

### Hierarchical Mode
```javascript
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "strategy": "hierarchical"
})
```
- Tree-like structure with levels
- Best for: Large projects, structured workflows
- Trade-offs: More setup, potential bottlenecks at higher levels

### Mesh Mode
```javascript
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "strategy": "adaptive"
})
```
- Fully connected network
- Best for: Flexibility, fault tolerance
- Trade-offs: Scaling challenges with large swarms

## CLI Usage
```bash
npx claude-flow swarm "task" --mode <centralized|distributed|hierarchical|mesh>
```

## See Also
- `swarm-init` - Initialize swarm with topology
- `swarm` - Main orchestration command
- `swarm-strategies` - Execution strategies
