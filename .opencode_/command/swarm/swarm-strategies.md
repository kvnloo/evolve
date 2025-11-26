---
description: "Swarm execution strategies: research, development, analysis, testing, optimization, maintenance"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
---

# swarm-strategies

Swarm execution strategies for different task types.

## Available Strategies

### Research Strategy
```javascript
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "strategy": "adaptive"
})
```
- Deep information gathering
- Parallel research agents
- Best for: Literature review, market research, technology evaluation
- See: `research.md` for detailed guide

### Development Strategy
```javascript
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "strategy": "balanced"
})
```
- Structured development workflow
- Coordinated implementation
- Best for: Feature development, application building
- See: `development.md` for detailed guide

### Analysis Strategy
```javascript
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "strategy": "adaptive"
})
```
- Comprehensive system analysis
- Pattern recognition
- Best for: Performance analysis, code quality assessment
- See: `analysis.md` for detailed guide

### Testing Strategy
```javascript
mcp__claude-flow__swarm_init({
  "topology": "star",
  "strategy": "parallel"
})
```
- Distributed test execution
- Comprehensive coverage
- Best for: Unit, integration, E2E, performance testing
- See: `testing.md` for detailed guide

### Optimization Strategy
```javascript
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "strategy": "adaptive"
})
```
- Performance profiling
- Bottleneck detection
- Best for: Performance tuning, resource optimization
- See: `optimization.md` for detailed guide

### Maintenance Strategy
```javascript
mcp__claude-flow__swarm_init({
  "topology": "star",
  "strategy": "sequential"
})
```
- Safe system updates
- Backup and recovery
- Best for: Dependency updates, security patches
- See: `maintenance.md` for detailed guide

## CLI Usage
```bash
npx claude-flow swarm "task" --strategy <research|development|analysis|testing|optimization|maintenance>
```

## See Also
- `swarm-init` - Initialize swarm
- `swarm` - Main orchestration
- Strategy detail files: `research.md`, `development.md`, etc.
