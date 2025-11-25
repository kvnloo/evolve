---
description: "Initialize a new swarm with specified topology for multi-agent coordination"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
topology_modes:
  - mesh
  - hierarchical
  - ring
  - star
---

# swarm-init

Initialize a new swarm with specified topology for distributed agent coordination.

## MCP Tool Integration

### Primary Tool: claude-flow
```javascript
// Initialize swarm with topology
mcp__claude-flow__swarm_init({
  "topology": "mesh",        // mesh, hierarchical, ring, star
  "maxAgents": 8,
  "strategy": "balanced"     // balanced, specialized, adaptive
})
```

### Alternative Tool: ruv-swarm
```javascript
// Initialize with ruv-swarm for enhanced coordination
mcp__ruv-swarm__swarm_init({
  "topology": "mesh",
  "maxAgents": 8,
  "strategy": "balanced"
})
```

## Topology Configurations

### Mesh Topology
Best for: Exploratory work, parallel research, distributed analysis
- All agents communicate peer-to-peer
- No single point of failure
- Maximum flexibility
```javascript
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})
```

### Hierarchical Topology
Best for: Large projects, complex coordination, structured workflows
- Clear command structure
- Efficient resource allocation
- Scalable organization
```javascript
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 10,
  "strategy": "balanced"
})
```

### Ring Topology
Best for: Pipeline processing, sequential workflows, round-robin tasks
- Circular communication pattern
- Fair resource distribution
- Sequential processing
```javascript
mcp__claude-flow__swarm_init({
  "topology": "ring",
  "maxAgents": 5,
  "strategy": "sequential"
})
```

### Star Topology
Best for: Centralized control, testing workflows, simple coordination
- Central coordinator hub
- Easy monitoring
- Simplified communication
```javascript
mcp__claude-flow__swarm_init({
  "topology": "star",
  "maxAgents": 7,
  "strategy": "centralized"
})
```

## CLI Fallback (if MCP unavailable)

```bash
# Initialize mesh swarm
npx claude-flow swarm init --topology mesh

# Initialize hierarchical with max agents
npx claude-flow swarm init --topology hierarchical --max-agents 8

# Initialize with specific strategy
npx claude-flow swarm init --topology mesh --strategy adaptive
```

## Options

- `--topology <type>` - Swarm topology: mesh, hierarchical, ring, star
- `--max-agents <n>` - Maximum number of agents (default: 5, max: 100)
- `--strategy <type>` - Distribution strategy: balanced, specialized, adaptive

## Status Verification

```javascript
// Verify swarm initialization
mcp__claude-flow__swarm_status({
  "verbose": true
})
```

## Next Steps

After initialization:
1. Spawn agents: Use `swarm-spawn` command
2. Orchestrate tasks: Use `task_orchestrate` MCP tool
3. Monitor progress: Use `swarm-monitor` command
