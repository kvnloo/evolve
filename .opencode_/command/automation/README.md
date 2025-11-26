---
description: Automation commands for intelligent agent management and workflow orchestration
agent: automation-agent
tags: [automation, overview, commands, index]
---

# Automation Commands

Advanced automation operations for Claude Flow with intelligent agent management, self-healing workflows, and continuous learning.

## Available Commands

### Agent Management

- **[auto-agent](./auto-agent.md)** - Automatically spawn and manage agents based on task requirements
- **[smart-spawn](./smart-spawn.md)** - Intelligently spawn agents based on workload analysis
- **[workflow-select](./workflow-select.md)** - Automatically select optimal workflow based on task type

### Advanced Automation

- **[ARM](./ARM.md)** - Autonomous Resource Manager for continuous AI system improvement
- **[discovery-mode](./discovery-mode.md)** - Autonomous scientific research with parallel agents
- **[AKPM-reference](./AKPM-reference.md)** - Reference to external Autonomous Knowledge Process Manager

### System Features

- **[self-healing](./self-healing.md)** - Automatically detect and recover from errors
- **[session-memory](./session-memory.md)** - Maintain context across sessions for continuous learning

## Quick Start

### Automatic Agent Spawning

```auto-shell
npx claude-flow auto agent --task "Build authentication system"
```

### Self-Healing Workflows

Enable automatic error recovery:

```auto-shell
npx claude-flow config set self-healing.enabled true
```

### Autonomous Research

Execute scientific discovery:

```
/automation:discovery-mode "research question"
```

## Key Features

### 🤖 Intelligent Agent Management

- Automatic agent spawning based on task analysis
- Dynamic scaling based on workload
- Optimal topology selection

### 🛡️ Self-Healing

- Automatic error detection
- Intelligent recovery strategies
- Learning from failures

### 🧠 Cross-Session Memory

- Persistent state across sessions
- Continuous learning and improvement
- Performance optimization over time

### 🔬 Autonomous Research

- Parallel multi-agent coordination
- Complete research pipeline
- Scientific methodology

## Integration with Claude Code

All automation commands integrate seamlessly with Claude Code through:

1. **MCP Tools**: Claude Flow MCP server for coordination
2. **Task Tool**: Claude Code's native Task tool for agent execution
3. **Auto-shell**: Automatic workflow execution
4. **Memory System**: Persistent learning across sessions

## Configuration

### Enable All Automation Features

```auto-shell
npx claude-flow config set automation.enabled true
npx claude-flow config set automation.features "auto-agent,smart-spawn,self-healing,session-memory"
```

### Configure Agent Limits

```auto-shell
npx claude-flow config set automation.max-agents 10
npx claude-flow config set automation.strategy "balanced"
```

## See Also

- **Claude Flow Documentation**: https://github.com/ruvnet/claude-flow
- **Agent Coordination**: Core agent management patterns
- **Workflow Management**: Custom workflow creation
