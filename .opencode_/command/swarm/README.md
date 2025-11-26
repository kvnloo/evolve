---
description: "Swarm Coordination Commands - Multi-agent orchestration for distributed task execution"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
---

# Swarm Coordination Commands

Multi-agent orchestration system for distributed task execution using Claude Flow and ruv-swarm MCP tools.

## Overview

Swarm coordination enables multiple specialized agents to work together efficiently through:
- **Distributed execution** across parallel agents
- **Topology-based communication** patterns (mesh, hierarchical, star, ring)
- **Specialized agent roles** (researcher, coder, analyst, tester, optimizer, etc.)
- **Fault tolerance** with automatic recovery
- **Real-time monitoring** and performance tracking

## Core Commands

### Initialization & Spawning
- **[swarm-init](./swarm-init.md)** - Initialize swarm with topology
- **[swarm-spawn](./swarm-spawn.md)** - Spawn specialized agents
- **[swarm](./swarm.md)** - Main orchestration command

### Monitoring & Status
- **[swarm-status](./swarm-status.md)** - Check swarm health and agent status
- **[swarm-monitor](./swarm-monitor.md)** - Real-time monitoring

### Configuration
- **[swarm-modes](./swarm-modes.md)** - Coordination modes (centralized, distributed, hierarchical, mesh)
- **[swarm-strategies](./swarm-strategies.md)** - Execution strategies
- **[swarm-background](./swarm-background.md)** - Background information
- **[swarm-analysis](./swarm-analysis.md)** - Quick analysis reference

## Strategy Guides

### Comprehensive Strategy Documentation
- **[research](./research.md)** - Deep research through parallel information gathering
- **[development](./development.md)** - Coordinated feature development
- **[analysis](./analysis.md)** - Comprehensive system analysis
- **[testing](./testing.md)** - Distributed test execution
- **[optimization](./optimization.md)** - Performance enhancement
- **[maintenance](./maintenance.md)** - Safe system updates

### Additional Resources
- **[examples](./examples.md)** - Common patterns and usage examples

## Quick Start

### Using MCP Tools (Recommended)
```javascript
// 1. Initialize swarm
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 8,
  "strategy": "balanced"
})

// 2. Spawn agents
mcp__claude-flow__agent_spawn({
  "type": "coder",
  "name": "Backend Developer",
  "capabilities": ["nodejs", "api", "database"]
})

// 3. Orchestrate task
mcp__claude-flow__task_orchestrate({
  "task": "Build REST API",
  "strategy": "parallel",
  "priority": "high"
})

// 4. Monitor progress
mcp__claude-flow__swarm_monitor({
  "interval": 5000
})
```

### Using CLI (Fallback)
```bash
# Initialize and run
npx claude-flow swarm "Build REST API" --strategy development

# With specific topology
npx claude-flow swarm init --topology hierarchical --max-agents 8

# Monitor swarm
npx claude-flow swarm monitor --interval 5
```

## Swarm Topologies

### Mesh Topology
- **Use for**: Research, analysis, exploratory work
- **Benefits**: Peer-to-peer flexibility, fault tolerance
- **Trade-offs**: Scaling complexity

```javascript
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})
```

### Hierarchical Topology
- **Use for**: Large projects, structured development
- **Benefits**: Clear organization, efficient resource allocation
- **Trade-offs**: More setup required

```javascript
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 10,
  "strategy": "balanced"
})
```

### Star Topology
- **Use for**: Testing, centralized control
- **Benefits**: Simple coordination, easy monitoring
- **Trade-offs**: Single point of failure

```javascript
mcp__claude-flow__swarm_init({
  "topology": "star",
  "maxAgents": 7,
  "strategy": "centralized"
})
```

### Ring Topology
- **Use for**: Pipeline processing, sequential workflows
- **Benefits**: Fair distribution, ordered processing
- **Trade-offs**: Limited parallelism

```javascript
mcp__claude-flow__swarm_init({
  "topology": "ring",
  "maxAgents": 5,
  "strategy": "sequential"
})
```

## Agent Types

- **researcher** - Information gathering, web search, analysis
- **coder** - Implementation, programming, feature development
- **analyst** - Data analysis, pattern recognition, insights
- **optimizer** - Performance tuning, bottleneck detection
- **coordinator** - Task orchestration, resource allocation
- **tester** - Testing, quality assurance, validation
- **reviewer** - Code review, security audit
- **monitor** - System monitoring, health checks
- **specialist** - Domain-specific expertise
- **documenter** - Documentation, reporting
- **architect** - System design, architecture

## MCP Tool Integration

All swarm commands integrate with MCP servers:

### Claude Flow (Primary)
- `mcp__claude-flow__swarm_init` - Initialize swarm
- `mcp__claude-flow__agent_spawn` - Spawn agents
- `mcp__claude-flow__task_orchestrate` - Orchestrate tasks
- `mcp__claude-flow__swarm_status` - Check status
- `mcp__claude-flow__swarm_monitor` - Monitor activity

### ruv-swarm (Enhanced)
- `mcp__ruv-swarm__swarm_init` - Alternative initialization
- `mcp__ruv-swarm__agent_spawn` - Enhanced agent spawning
- `mcp__ruv-swarm__swarm_monitor` - Advanced monitoring

See individual command files for complete MCP tool documentation.

## Features

### Parallel Execution
Execute multiple independent tasks simultaneously:
```javascript
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "frontend", "command": "build UI" },
    { "id": "backend", "command": "build API" },
    { "id": "database", "command": "setup schema" }
  ]
})
```

### Fault Tolerance
Automatic recovery and error handling:
```javascript
mcp__claude-flow__daa_fault_tolerance({
  "agentId": "all",
  "strategy": "auto-recovery"
})
```

### Real-time Monitoring
Track swarm progress and agent health:
```javascript
mcp__claude-flow__swarm_monitor({
  "interval": 5000  // Update every 5 seconds
})
```

### Dynamic Scaling
Adjust agent count based on workload:
```javascript
mcp__claude-flow__swarm_scale({
  "targetSize": 12
})
```

## Migration Notes

**Migrated from**: `.claude/commands/swarm/`
**Target location**: `.opencode/command/swarm/`
**Migration date**: 2025-01-22

### Key Changes
1. Added frontmatter with `description` and `agent` fields
2. Integrated MCP tool references (claude-flow, ruv-swarm)
3. Preserved multi-agent orchestration logic
4. Enhanced with topology configurations
5. Added comprehensive examples and best practices

### Files Migrated (17 total)
- Core commands: 5 files (swarm-init, swarm-spawn, swarm, swarm-status, swarm-monitor)
- Strategy guides: 6 files (analysis, development, research, testing, optimization, maintenance)
- Reference: 4 files (examples, swarm-modes, swarm-strategies, swarm-background)
- Quick ref: 1 file (swarm-analysis)
- Documentation: 1 file (README.md)

## Best Practices

1. **Choose appropriate topology** based on task type
2. **Enable parallel execution** for independent tasks
3. **Monitor continuously** with real-time updates
4. **Enable fault tolerance** for production workloads
5. **Store state in memory** for cross-session persistence
6. **Scale dynamically** based on workload
7. **Use sequential strategy** for safety-critical operations
8. **Document workflows** for team collaboration
9. **Test thoroughly** after swarm operations

## See Also

- [Claude Flow Documentation](https://github.com/ruvnet/claude-flow)
- [ruv-swarm MCP Server](https://github.com/ruvnet/ruv-swarm)
- Main project: [CLAUDE.md](../../../CLAUDE.md)

---

**Agent**: swarm-coordinator
**MCP Tools**: claude-flow, ruv-swarm
**Status**: Production-ready ✅
