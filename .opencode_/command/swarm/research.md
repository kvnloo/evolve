---
description: "Deep research swarm strategy for parallel information gathering and analysis"
agent: swarm-coordinator
mcp_tools:
  - claude-flow
  - ruv-swarm
strategy_type: research
topology: mesh
agent_roles:
  - researcher
  - analyst
  - documenter
---

# Research Swarm Strategy

Deep research through parallel information gathering and distributed analysis.

## Purpose

Deploy specialized research agents for:
- Web and academic research
- Data collection and processing
- Source validation and credibility assessment
- Pattern recognition and synthesis
- Comprehensive report generation

## Activation

### Using MCP Tools (Primary)
```javascript
// Initialize research swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})

// Orchestrate research task
mcp__claude-flow__task_orchestrate({
  "task": "research topic X",
  "strategy": "parallel",
  "priority": "medium"
})
```

### Using CLI (Fallback)
```bash
npx claude-flow swarm "research topic X" --strategy research
```

## Agent Roles

### Agent Spawning with MCP
```javascript
// Spawn Web Researcher
mcp__claude-flow__agent_spawn({
  "type": "researcher",
  "name": "Web Researcher",
  "capabilities": ["web-search", "content-extraction", "source-validation"]
})

// Spawn Academic Researcher
mcp__claude-flow__agent_spawn({
  "type": "researcher",
  "name": "Academic Researcher",
  "capabilities": ["paper-analysis", "citation-tracking", "literature-review"]
})

// Spawn Data Analyst
mcp__claude-flow__agent_spawn({
  "type": "analyst",
  "name": "Data Analyst",
  "capabilities": ["data-processing", "statistical-analysis", "visualization"]
})

// Spawn Report Writer
mcp__claude-flow__agent_spawn({
  "type": "documenter",
  "name": "Report Writer",
  "capabilities": ["synthesis", "technical-writing", "formatting"]
})
```

## Research Methods

### Information Gathering
```javascript
// Parallel information collection
mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "web-search", "command": "search recent publications" },
    { "id": "academic-search", "command": "search academic databases" },
    { "id": "data-collection", "command": "gather relevant datasets" }
  ]
})
```

### Source Validation
```javascript
// Assess source credibility
mcp__claude-flow__quality_assess({
  "target": "research-sources",
  "criteria": ["credibility", "relevance", "recency"]
})
```

## Analysis and Validation

### Pattern Recognition
```javascript
// Identify patterns in research findings
mcp__claude-flow__pattern_recognize({
  "data": researchData,
  "patterns": ["trend", "correlation", "outlier"]
})
```

### Cognitive Analysis
```javascript
// Deep analysis of research synthesis
mcp__claude-flow__cognitive_analyze({
  "behavior": "research-synthesis"
})
```

### Cross-reference Validation
```javascript
// Validate findings across sources
mcp__claude-flow__quality_assess({
  "target": "findings",
  "criteria": ["consistency", "reliability", "completeness"]
})
```

## Knowledge Management

### Store Research Findings
```javascript
// Save research results
mcp__claude-flow__memory_usage({
  "action": "store",
  "key": "research-findings-" + Date.now(),
  "value": JSON.stringify(findings),
  "namespace": "research",
  "ttl": 604800  // 7 days
})
```

### Search Existing Knowledge
```javascript
// Query previous research
mcp__claude-flow__memory_search({
  "pattern": "topic X",
  "namespace": "research",
  "limit": 20
})
```

### Create Knowledge Connections
```javascript
// Build knowledge graph
mcp__claude-flow__neural_patterns({
  "action": "learn",
  "operation": "knowledge-graph",
  "metadata": {
    "topic": "X",
    "connections": relatedTopics
  }
})
```

## Reporting

### Generate Research Report
```javascript
// Create comprehensive report
mcp__claude-flow__workflow_execute({
  "workflowId": "research-report-generation",
  "params": {
    "findings": findings,
    "format": "comprehensive"
  }
})
```

### Monitor Progress
```javascript
// Track research progress
mcp__claude-flow__swarm_status({
  "swarmId": "research-swarm",
  "verbose": true
})
```

## Complete Research Workflow

```javascript
// 1. Initialize research swarm
mcp__claude-flow__swarm_init({
  "topology": "mesh",
  "maxAgents": 6,
  "strategy": "adaptive"
})

// 2. Spawn research team
const researchers = [
  { type: "researcher", name: "Web Researcher", capabilities: ["web-search", "extraction"] },
  { type: "researcher", name: "Academic Researcher", capabilities: ["paper-analysis", "citations"] },
  { type: "analyst", name: "Data Analyst", capabilities: ["analysis", "visualization"] },
  { type: "documenter", name: "Report Writer", capabilities: ["synthesis", "writing"] }
]

researchers.forEach(agent => {
  mcp__claude-flow__agent_spawn({
    "type": agent.type,
    "name": agent.name,
    "capabilities": agent.capabilities
  })
})

// 3. Parallel information gathering
await mcp__claude-flow__parallel_execute({
  "tasks": [
    { "id": "web", "command": "search web sources" },
    { "id": "academic", "command": "search academic sources" },
    { "id": "data", "command": "collect datasets" }
  ]
})

// 4. Analyze and validate
await mcp__claude-flow__pattern_recognize({
  "data": collectedData,
  "patterns": ["trend", "correlation"]
})

// 5. Store findings
await mcp__claude-flow__memory_usage({
  "action": "store",
  "key": "research-results",
  "value": JSON.stringify(results),
  "namespace": "research"
})

// 6. Generate report
await mcp__claude-flow__workflow_execute({
  "workflowId": "research-report",
  "params": { findings: results }
})
```

## Best Practices

1. **Use mesh topology** for flexible information gathering
2. **Enable parallel execution** for faster research
3. **Validate sources** thoroughly before inclusion
4. **Store findings** in memory for future reference
5. **Cross-reference** findings across multiple sources
6. **Generate comprehensive reports** with citations

## Error Handling

```javascript
// Enable fault tolerance
mcp__claude-flow__daa_fault_tolerance({
  "agentId": "all",
  "strategy": "auto-recovery"
})

// Handle research failures gracefully
try {
  await mcp__claude-flow__task_orchestrate({
    "task": "research topic",
    "strategy": "parallel"
  })
} catch (error) {
  await mcp__claude-flow__error_analysis({
    "logs": [error.message]
  })
}
```

## Integration with External Tools

### Web Search Integration
- Leverage web search capabilities
- Extract content from sources
- Validate URL authenticity

### Document Processing
- Parse academic papers
- Extract citations and references
- Analyze document structure

### Data Collection
- Gather quantitative data
- Process datasets
- Generate visualizations

## Next Steps

After research:
1. Review generated reports
2. Share findings with team
3. Schedule follow-up research
4. Update knowledge base
