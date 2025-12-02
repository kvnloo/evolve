# Command Routing Architecture

## Overview

This document explains the architecture of the dynamic command routing system. For the actual routing rules and command reference, see `.claude/rules/command-routing.md`.

The system provides intelligent routing across **214+ commands in 25 categories**.

## Category Reference

| Category | Prefix | Purpose | Trigger Keywords |
|----------|--------|---------|------------------|
| **agents** | `/agents:*` | Agent definitions, capabilities | "agent", "spawn", "specialist" |
| **analysis** | `/analysis:*` | Performance, token, bottleneck | "analyze", "performance", "bottleneck", "token" |
| **automation** | `/automation:*` | Self-healing, smart agents | "automate", "smart", "self-healing" |
| **context** | `/context:*` | Context management | "context", "session" |
| **coordination** | `/coordination:*` | Swarm init, orchestration | "coordinate", "orchestrate", "swarm init" |
| **flow-nexus** | `/flow-nexus:*` | Cloud sandboxes, neural | "cloud", "sandbox", "deploy" |
| **github** | `/github:*` | PRs, issues, releases | "pr", "issue", "release", "github" |
| **hive-mind** | `/hive-mind:*` | Collective intelligence | "collective", "hive", "consensus" |
| **hooks** | `/hooks:*` | Hook configuration | "hook", "trigger", "lifecycle" |
| **memory** | `/memory:*` | Persistent memory | "memory", "remember", "persist" |
| **monitoring** | `/monitoring:*` | Status, agent health | "status", "monitor", "health" |
| **optimization** | `/optimization:*` | Performance tuning | "optimize", "speed", "parallel" |
| **pair** | `/pair:*` | Pair programming | "pair", "collaborate", "together" |
| **pm** | `/pm:*` | Project management | "prd", "epic", "issue", "sprint" |
| **sparc** | `/sparc:*` | SPARC methodology | "architect", "design", "tdd", "review" |
| **statusline** | `/statusline:*` | Status display | "statusline", "display" |
| **stream-chain** | `/stream-chain:*` | Pipeline processing | "pipeline", "stream", "chain" |
| **swarm** | `/swarm:*` | Swarm strategies | "swarm", "development", "research" |
| **system** | `/system:*` | System commands | "system", "config" |
| **training** | `/training:*` | Neural training | "train", "learn", "pattern" |
| **truth** | `/truth:*` | Ground truth | "truth", "verify", "ground" |
| **ui** | `/ui:*` | UI design | "ui", "design", "clone", "frontend" |
| **verify** | `/verify:*` | Verification | "verify", "check", "validate" |
| **workflows** | `/workflows:*` | Workflow templates | "workflow", "process" |
| **sc** | `/sc:*` | SuperClaude commands | (meta-router) |

## Request Classification → Command Routing

### Tier 1: High-Level Classification

```yaml
CLASSIFICATION_RULES:

  # Development Tasks
  development:
    triggers: ["implement", "create", "build", "add", "make", "code", "develop"]
    primary_routes:
      - /sc:implement        # Feature implementation
      - /sparc:coder         # Autonomous coding
      - /swarm:development   # Multi-agent development
      - /coordination:orchestrate  # Task orchestration

  # Architecture & Design
  architecture:
    triggers: ["design", "architect", "structure", "system", "schema"]
    primary_routes:
      - /sc:design           # System design
      - /sparc:architect     # Architecture mode
      - /swarm:development   # With architect agents

  # Analysis & Research
  analysis:
    triggers: ["analyze", "research", "investigate", "explore", "understand"]
    primary_routes:
      - /sc:analyze          # Code analysis
      - /sc:research         # Deep research
      - /sparc:analyzer      # Analysis mode
      - /sparc:researcher    # Research mode
      - /swarm:research      # Research swarm

  # Testing & Verification
  testing:
    triggers: ["test", "verify", "validate", "check", "ensure"]
    primary_routes:
      - /sc:test             # Test execution
      - /sparc:tdd           # Test-driven development
      - /sparc:tester        # Testing mode
      - /swarm:testing       # Testing swarm
      - /verify:check        # Verification

  # Troubleshooting & Debugging
  troubleshooting:
    triggers: ["fix", "debug", "error", "broken", "issue", "problem", "bug"]
    primary_routes:
      - /sc:troubleshoot     # Issue diagnosis
      - /sparc:debugger      # Debugging mode
      - /analysis:bottleneck-detect  # Performance issues

  # Documentation
  documentation:
    triggers: ["document", "explain", "describe", "readme", "docs"]
    primary_routes:
      - /sc:document         # Generate docs
      - /sparc:documenter    # Documentation mode

  # Performance & Optimization
  optimization:
    triggers: ["optimize", "performance", "speed", "faster", "efficient"]
    primary_routes:
      - /sparc:optimizer     # Optimization mode
      - /optimization:parallel-execution
      - /optimization:auto-topology
      - /analysis:performance-report

  # GitHub Operations
  github:
    triggers: ["pr", "pull request", "issue", "release", "merge", "review", "github"]
    primary_routes:
      - /github:pr-manager   # PR operations
      - /github:issue-tracker
      - /github:release-manager
      - /github:code-review-swarm

  # Project Management
  project_management:
    triggers: ["prd", "epic", "sprint", "backlog", "requirement", "story"]
    primary_routes:
      - /pm:prd-new          # New PRD
      - /pm:epic-oneshot     # Epic decomposition
      - /pm:issue-start      # Start work
      - /pm:next             # Next task

  # UI/Frontend
  ui_frontend:
    triggers: ["ui", "frontend", "component", "layout", "design", "clone"]
    primary_routes:
      - /ui:clone            # Clone websites
      - /ui:uied-analysis    # UI analysis
      - /sparc:designer      # Design mode

  # Swarm/Coordination
  coordination:
    triggers: ["swarm", "coordinate", "parallel", "multi-agent", "orchestrate"]
    primary_routes:
      - /coordination:swarm-init
      - /coordination:agent-spawn
      - /coordination:task-orchestrate
      - /swarm:swarm-modes   # Strategy selection

  # Memory & Context
  memory:
    triggers: ["remember", "context", "session", "persist", "memory"]
    primary_routes:
      - /memory:usage
      - /automation:session-memory

  # Brainstorming & Discovery
  brainstorming:
    triggers: ["maybe", "thinking", "not sure", "explore", "ideas", "brainstorm"]
    primary_routes:
      - /sc:brainstorm       # Discovery mode
      - /sparc:innovator     # Innovation mode
```

### Tier 2: Complexity-Based Routing

```yaml
COMPLEXITY_ROUTING:

  simple:  # Single file, clear scope
    route_to: Direct command execution
    examples:
      - "Fix typo in README" → Direct Edit
      - "Add console.log" → Direct Edit

  moderate:  # Multi-file, clear requirements
    route_to: Single SPARC mode or /sc command
    examples:
      - "Add user validation" → /sparc:coder or /sc:implement
      - "Review auth code" → /sparc:reviewer or /sc:analyze

  complex:  # Multi-component, unclear scope
    route_to: Swarm coordination
    examples:
      - "Build authentication system" → /swarm:development
      - "Refactor entire codebase" → /coordination:orchestrate

  enterprise:  # Cross-project, long-running
    route_to: PM Agent with wave mode
    examples:
      - "Implement microservices" → /sc:pm --strategy wave
      - "Security audit" → /sc:pm with multiple specialists
```

### Tier 3: SPARC Mode Selection

When task requires SPARC methodology:

```yaml
SPARC_MODE_ROUTING:

  # Orchestration
  orchestrator: "Multi-agent coordination needed"
  swarm-coordinator: "Swarm-specific management"
  workflow-manager: "Process automation"
  batch-executor: "Parallel task execution"

  # Development
  coder: "Autonomous code generation"
  architect: "System design needed"
  reviewer: "Code review required"
  tdd: "Test-driven development"

  # Analysis
  researcher: "Deep research required"
  analyzer: "Code/data analysis"
  optimizer: "Performance optimization"

  # Creative
  designer: "UI/UX design"
  innovator: "Creative problem solving"
  documenter: "Documentation generation"
  debugger: "Systematic debugging"
  tester: "Comprehensive testing"
  memory-manager: "Knowledge management"
```

### Tier 4: Swarm Strategy Selection

When task requires multi-agent coordination:

```yaml
SWARM_STRATEGY_ROUTING:

  development:
    when: "Building features, implementation work"
    topology: hierarchical
    agents: [architect, coder, tester, reviewer]

  research:
    when: "Investigation, exploration, learning"
    topology: mesh
    agents: [researcher, analyzer, documenter]

  testing:
    when: "Comprehensive test coverage"
    topology: star
    agents: [tester, reviewer, coder]

  maintenance:
    when: "Refactoring, cleanup, optimization"
    topology: ring
    agents: [analyzer, optimizer, reviewer]

  analysis:
    when: "Deep code analysis, audits"
    topology: mesh
    agents: [analyzer, researcher, reviewer]
```

## Dynamic Routing Algorithm

```yaml
ROUTING_ALGORITHM:

  step_1_classify:
    action: "Parse user message for trigger keywords"
    output: "primary_category"

  step_2_assess_complexity:
    action: "Evaluate scope and requirements"
    factors:
      - file_count
      - directory_scope
      - dependency_complexity
      - clarity_of_requirements
    output: "complexity_level"

  step_3_select_route:
    if: complexity == "simple"
      then: "Use direct tool (Edit, Write, Bash)"
    elif: complexity == "moderate"
      then: "Use single SPARC mode or /sc command"
    elif: complexity == "complex"
      then: "Use swarm coordination"
    elif: complexity == "enterprise"
      then: "Use /sc:pm with wave strategy"

  step_4_validate_selection:
    action: "Check if selected command exists"
    fallback: "Route to /sc:pm for intelligent delegation"

  step_5_execute:
    action: "Execute selected command"
    with: "TodoWrite for tracking"
```

## Quick Reference: Request → Command

| Request Type | Recommended Command |
|-------------|---------------------|
| "Build feature X" | `/swarm:development` or `/sparc:coder` |
| "Design system for Y" | `/sparc:architect` or `/sc:design` |
| "Research best practices" | `/sc:research` or `/sparc:researcher` |
| "Fix bug in file.js" | `/sparc:debugger` or `/sc:troubleshoot` |
| "Review this PR" | `/github:code-review-swarm` |
| "Create tests for module" | `/sparc:tdd` or `/swarm:testing` |
| "Document this API" | `/sparc:documenter` or `/sc:document` |
| "Optimize performance" | `/sparc:optimizer` or `/analysis:performance-report` |
| "Create new PRD" | `/pm:prd-new` |
| "Start work on issue #123" | `/pm:issue-start` |
| "Clone this website" | `/ui:clone` |
| "Initialize swarm" | `/coordination:swarm-init` |
| "Check swarm status" | `/monitoring:status` |
| "What should I work on next" | `/pm:next` |

## Fallback Hierarchy

When unsure which command to use:

```
1. /sc:pm         → Default meta-router (handles all cases)
2. /sparc:sparc-modes → Lists SPARC options
3. /swarm:swarm-modes → Lists swarm strategies
4. /sc:help       → Lists all /sc commands
```

## Integration with Pre-Response Gates

The pre-response behavioral gates in CLAUDE.md reference `.claude/rules/command-routing.md` using the `@` syntax, which tells Claude Code to actually load the file contents.

### How It Works

1. **CLAUDE.md** contains `@.claude/rules/command-routing.md` reference
2. Claude Code loads the full routing rules at the start of each session
3. Before responding, Claude classifies the request using trigger keywords
4. The routing map guides selection of the optimal command
5. Execution proceeds with TodoWrite tracking for complex tasks
6. Verification ensures completion before marking done

### File Organization

```
CLAUDE.md                              # Entry point with @ reference
├── @.claude/rules/command-routing.md  # Full 214+ command routing rules (LOADED)
├── @.claude/rules/agent-coordination.md
├── @.claude/rules/path-standards.md
└── @.claude/rules/github-operations.md

docs/architecture/
└── command-routing-map.md             # This file - architecture explanation
```

This architecture ensures intelligent, dynamic routing based on actual command documentation rather than hardcoded assumptions. The full command reference lives in `.claude/rules/` where it gets loaded, while this document provides architectural context.
