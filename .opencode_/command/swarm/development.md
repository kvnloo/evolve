---
description: "Coordinated development swarm strategy for building features and applications"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
strategy_type: development
topology: hierarchical
agent_roles:
  - architect
  - coder
  - specialist
  - tester
---

# Development Swarm Strategy

Coordinated development through specialized agent teams.

## Purpose

Deploy specialized development agents for:
- System architecture and design
- Frontend and backend implementation
- Database design and optimization
- Testing and quality assurance
- Code review and validation

## Activation

### Using MCP Tools (Primary)
```javascript
// Initialize development swarm
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 8,
  "strategy": "balanced"
})

// Orchestrate development task
mcp__claude-flow__task_orchestrate({
  "task": "build feature X",
  "strategy": "parallel",
  "priority": "high"
})
```

### Using CLI (Fallback)
```bash
npx claude-flow swarm "build feature X" --strategy development
```

## Agent Roles

### Agent Spawning with MCP
```javascript
// Spawn System Architect
mcp__claude-flow__agent_spawn({
  "type": "architect",
  "name": "System Designer",
  "capabilities": ["system-design", "api-design", "architecture"]
})

// Spawn Frontend Developer
mcp__claude-flow__agent_spawn({
  "type": "coder",
  "name": "Frontend Developer",
  "capabilities": ["react", "typescript", "ui", "css"]
})

// Spawn Backend Developer
mcp__claude-flow__agent_spawn({
  "type": "coder",
  "name": "Backend Developer",
  "capabilities": ["nodejs", "api", "authentication", "security"]
})

// Spawn Database Expert
mcp__claude-flow__agent_spawn({
  "type": "specialist",
  "name": "Database Expert",
  "capabilities": ["sql", "nosql", "optimization", "schema-design"]
})

// Spawn Integration Tester
mcp__claude-flow__agent_spawn({
  "type": "tester",
  "name": "Integration Tester",
  "capabilities": ["integration", "e2e", "api-testing"]
})
```

## Development Workflow

### Phase 1: Design
```javascript
// System architecture design
mcp__claude-flow__task_orchestrate({
  "task": "design system architecture",
  "strategy": "sequential",
  "dependencies": ["requirements", "architecture", "api-spec"]
})
```

### Phase 2: Implementation
```javascript
// Parallel implementation across teams
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "frontend", "command": "implement UI components" },
    { "id": "backend", "command": "build API endpoints" },
    { "id": "database", "command": "create schema and migrations" }
  ]
})
```

### Phase 3: Integration
```javascript
// Integration and testing
mcp__claude-flow__task_orchestrate({
  "task": "integrate components",
  "strategy": "sequential",
  "dependencies": ["integrate", "test", "validate"]
})
```

### Phase 4: Validation
```javascript
// Quality assurance
mcp__claude-flow__quality_assess({
  "target": "application",
  "criteria": ["functionality", "performance", "security", "maintainability"]
})
```

## Coordination Patterns

### Hierarchical Mode (Recommended)
- Clear command structure
- Efficient resource allocation
- Scalable organization
- Best for large projects

```javascript
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 10,
  "strategy": "balanced"
})
```

### Parallel Execution
- Enable concurrent development
- Reduce development time
- Maximize team efficiency

```javascript
mcp__claude-flow__task_orchestrate({
  "task": "develop application",
  "strategy": "parallel",
  "priority": "high"
})
```

## Best Practices

### 1. Use Hierarchical Topology
- Clear responsibility delegation
- Efficient communication
- Scalable for large teams

### 2. Enable Parallel Execution
- Concurrent feature development
- Faster iteration cycles
- Better resource utilization

### 3. Implement Continuous Testing
- Test during development
- Early bug detection
- Maintain code quality

### 4. Monitor Swarm Health
- Track agent performance
- Identify bottlenecks
- Optimize resource allocation

## Status Monitoring

### Check Swarm Status
```javascript
// Get development swarm status
mcp__claude-flow__swarm_status({
  "swarmId": "development-swarm",
  "verbose": true
})
```

### Monitor Agent Performance
```javascript
// Track architect agent
mcp__claude-flow__agent_metrics({
  "agentId": "architect-001",
  "metric": "all"
})

// Monitor all agents
mcp__claude-flow__agent_list({
  "filter": "active"
})
```

### Real-time Monitoring
```javascript
// Enable live monitoring
mcp__claude-flow__swarm_monitor({
  "swarmId": "development-swarm",
  "interval": 5000
})
```

## Error Handling

### Enable Fault Tolerance
```javascript
// Auto-recovery for agents
mcp__claude-flow__daa_fault_tolerance({
  "agentId": "all",
  "strategy": "auto-recovery"
})
```

### Error Analysis
```javascript
// Analyze development errors
mcp__claude-flow__error_analysis({
  "logs": buildLogs
})
```

## Complete Development Workflow

```javascript
// 1. Initialize development swarm
mcp__claude-flow__swarm_init({
  "topology": "hierarchical",
  "maxAgents": 8,
  "strategy": "balanced"
})

// 2. Spawn development team
const devTeam = [
  { type: "architect", name: "System Architect", capabilities: ["system-design", "api-design"] },
  { type: "coder", name: "Frontend Dev", capabilities: ["react", "typescript"] },
  { type: "coder", name: "Backend Dev", capabilities: ["nodejs", "api"] },
  { type: "specialist", name: "DB Expert", capabilities: ["postgresql", "optimization"] },
  { type: "tester", name: "QA Engineer", capabilities: ["testing", "automation"] }
]

devTeam.forEach(agent => {
  mcp__claude-flow__agent_spawn({
    "type": agent.type,
    "name": agent.name,
    "capabilities": agent.capabilities
  })
})

// 3. Design phase
await mcp__claude-flow__task_orchestrate({
  "task": "design system architecture",
  "strategy": "sequential",
  "priority": "high"
})

// 4. Development phase (parallel)
await mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "frontend", "command": "build UI" },
    { "id": "backend", "command": "build API" },
    { "id": "database", "command": "create schema" }
  ]
})

// 5. Integration phase
await mcp__claude-flow__task_orchestrate({
  "task": "integrate and test",
  "strategy": "sequential",
  "dependencies": ["integrate", "test", "validate"]
})

// 6. Quality check
await mcp__claude-flow__quality_assess({
  "target": "application",
  "criteria": ["functionality", "performance", "security"]
})

// 7. Generate report
await mcp__claude-flow__performance_report({
  "format": "detailed",
  "timeframe": "current"
})
```

## Testing Integration

```javascript
// Run tests during development
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "unit", "command": "npm run test:unit" },
    { "id": "integration", "command": "npm run test:integration" },
    { "id": "e2e", "command": "npm run test:e2e" }
  ]
})
```

## Memory Integration

```javascript
// Store design decisions
mcp__claude-flow__memory_usage({
  "action": "store",
  "key": "architecture-decisions",
  "value": JSON.stringify(decisions),
  "namespace": "development"
})

// Track progress
mcp__claude-flow__memory_usage({
  "action": "store",
  "key": "dev-progress-" + Date.now(),
  "value": JSON.stringify(progress),
  "namespace": "development"
})
```

## GitHub Integration

```javascript
// Analyze repository
mcp__claude-flow__github_repo_analyze({
  "repo": "user/repository",
  "analysis_type": "code_quality"
})

// Manage pull requests
mcp__claude-flow__github_pr_manage({
  "repo": "user/repository",
  "action": "review",
  "pr_number": 123
})
```

## Next Steps

After development:
1. Deploy with deployment swarm
2. Monitor with monitoring swarm
3. Maintain with maintenance swarm
4. Optimize with optimization swarm
