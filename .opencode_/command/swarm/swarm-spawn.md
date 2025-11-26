---
description: "Spawn specialized agents in the swarm with defined capabilities"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
agent_types:
  - researcher
  - coder
  - analyst
  - optimizer
  - coordinator
  - tester
  - reviewer
---

# swarm-spawn

Spawn specialized agents in the swarm with defined capabilities and roles.

## MCP Tool Integration

### Primary Tool: claude-flow
```javascript
// Spawn a single agent
mcp__claude-flow__agent_spawn({
  "type": "coder",
  "name": "Backend Developer",
  "capabilities": ["nodejs", "api", "database"]
})

// Spawn multiple agents
mcp__claude-flow__agent_spawn({
  "type": "researcher",
  "name": "Web Researcher",
  "capabilities": ["web-search", "analysis", "synthesis"]
})

mcp__claude-flow__agent_spawn({
  "type": "analyst",
  "name": "Data Analyst",
  "capabilities": ["data-processing", "visualization"]
})
```

### Alternative Tool: ruv-swarm
```javascript
// Spawn with ruv-swarm
mcp__ruv-swarm__agent_spawn({
  "type": "coder",
  "name": "Frontend Developer",
  "capabilities": ["react", "typescript", "ui"]
})
```

## Agent Types & Capabilities

### Researcher Agents
```javascript
mcp__claude-flow__agent_spawn({
  "type": "researcher",
  "name": "Academic Researcher",
  "capabilities": [
    "web-search",
    "paper-analysis",
    "citation-tracking",
    "literature-review",
    "source-validation"
  ]
})
```

### Coder Agents
```javascript
mcp__claude-flow__agent_spawn({
  "type": "coder",
  "name": "Full Stack Developer",
  "capabilities": [
    "react",
    "nodejs",
    "typescript",
    "api-design",
    "database",
    "testing"
  ]
})
```

### Analyst Agents
```javascript
mcp__claude-flow__agent_spawn({
  "type": "analyst",
  "name": "Performance Analyzer",
  "capabilities": [
    "profiling",
    "bottleneck-detection",
    "metrics-analysis",
    "optimization"
  ]
})
```

### Optimizer Agents
```javascript
mcp__claude-flow__agent_spawn({
  "type": "optimizer",
  "name": "Code Optimizer",
  "capabilities": [
    "code-optimization",
    "refactoring",
    "performance-tuning",
    "memory-management"
  ]
})
```

### Coordinator Agents
```javascript
mcp__claude-flow__agent_spawn({
  "type": "coordinator",
  "name": "Task Coordinator",
  "capabilities": [
    "task-orchestration",
    "resource-allocation",
    "priority-management",
    "workflow-coordination"
  ]
})
```

### Tester Agents
```javascript
mcp__claude-flow__agent_spawn({
  "type": "tester",
  "name": "QA Engineer",
  "capabilities": [
    "unit-testing",
    "integration-testing",
    "e2e-testing",
    "performance-testing",
    "security-testing"
  ]
})
```

### Reviewer Agents
```javascript
mcp__claude-flow__agent_spawn({
  "type": "reviewer",
  "name": "Code Reviewer",
  "capabilities": [
    "code-review",
    "security-audit",
    "best-practices",
    "documentation-review"
  ]
})
```

## Batch Spawning Pattern

```javascript
// Spawn a complete development team
const devTeam = [
  { type: "architect", name: "System Architect", capabilities: ["system-design", "api-design"] },
  { type: "coder", name: "Backend Dev", capabilities: ["nodejs", "api", "database"] },
  { type: "coder", name: "Frontend Dev", capabilities: ["react", "typescript", "ui"] },
  { type: "tester", name: "QA Engineer", capabilities: ["testing", "automation"] },
  { type: "reviewer", name: "Code Reviewer", capabilities: ["code-review", "security"] }
]

devTeam.forEach(agent => {
  mcp__claude-flow__agent_spawn({
    "type": agent.type,
    "name": agent.name,
    "capabilities": agent.capabilities
  })
})
```

## CLI Fallback (if MCP unavailable)

```bash
# Spawn single agent
npx claude-flow swarm spawn --type coder --count 3

# Spawn with capabilities
npx claude-flow swarm spawn --type researcher --capabilities "web-search,analysis"

# Spawn named agent
npx claude-flow swarm spawn --type analyst --name "Performance Analyzer"
```

## Options

- `--type <type>` - Agent type (researcher, coder, analyst, optimizer, coordinator, tester, reviewer)
- `--count <n>` - Number of agents to spawn (default: 1)
- `--capabilities <list>` - Comma-separated list of agent capabilities
- `--name <name>` - Custom agent name

## Agent Verification

```javascript
// List all spawned agents
mcp__claude-flow__agent_list({
  "filter": "all"
})

// Get agent metrics
mcp__claude-flow__agent_metrics({
  "agentId": "agent-001"
})
```

## Next Steps

After spawning agents:
1. Orchestrate tasks: Use `task_orchestrate` MCP tool
2. Monitor agents: Use `agent_metrics` MCP tool
3. Coordinate work: Use coordination patterns from swarm topology
