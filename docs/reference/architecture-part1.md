# Architecture Overview

This document describes the architecture of the Claude Code Extended Framework, explaining how components work together to enable AI-powered software development.

## Table of Contents

- [System Architecture](#system-architecture)
- [Component Overview](#component-overview)
- [Data Flow](#data-flow)
- [Integration Points](#integration-points)
- [Design Principles](#design-principles)
- [Scalability & Performance](#scalability--performance)

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User / Developer                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code CLI                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Extended Framework Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  CLAUDE.md   │  │   .claude/   │  │   Scripts    │      │
│  │ Config File  │  │ Directory    │  │   Helpers    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│ MCP Servers  │ │  SPARC   │ │   PM System  │
│              │ │ Workflow │ │    (CCPM)    │
│ - claude-flow│ │          │ │              │
│ - ruv-swarm  │ │          │ │  - PRDs      │
│ - flow-nexus │ │          │ │  - Epics     │
└──────────────┘ └──────────┘ │  - Issues    │
                               └──────────────┘
         │           │           │
         └───────────┼───────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Multi-Agent System                         │
│  54+ Specialized Agents with Coordination                    │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              External Integrations                           │
│   GitHub  │  Git  │  Shell  │  File System                  │
└─────────────────────────────────────────────────────────────┘
```

## Component Overview

### 1. Configuration Layer

#### CLAUDE.md
Main configuration file loaded by Claude Code CLI:
- Project overview and instructions
- Concurrent execution rules
- File organization standards
- Agent coordination protocol
- MCP server integration settings

#### .claude/ Directory Structure

```
.claude/
├── commands/              # Custom slash commands
│   └── sc/                # SuperClaude command namespace
│       ├── research.md
│       ├── implement.md
│       └── test.md
├── rules/                 # Operational rules
│   ├── agent-coordination.md
│   ├── path-standards.md
│   └── github-operations.md
├── helpers/               # Shell utilities
│   ├── setup-mcp.sh
│   ├── github-setup.sh
│   └── checkpoint-manager.sh
├── prds/                  # Product requirements
├── epics/                 # Epic management (gitignored)
├── context/               # Project context
└── statusline/            # Status line config
```

### 2. SPARC Methodology Engine

The SPARC engine orchestrates systematic development:

```
Specification ──→ Pseudocode ──→ Architecture ──→ Refinement ──→ Completion
     │                │               │               │              │
     ▼                ▼               ▼               ▼              ▼
 Requirements     Algorithm        System          TDD:          Integration
  Analysis         Design           Design      Test→Code        Validation
```

**Implementation**:
- Provided by `claude-flow` MCP server
- Commands: `npx claude-flow sparc <mode>`
- Supports batch and pipeline execution
- Integrates with agent coordination

### 3. Project Management System (CCPM)

Spec-driven development workflow:

```
┌─────────────┐
│    PRD      │  Product Requirement Document
│  (.claude/  │  Stored in .claude/prds/
│   prds/)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Epic     │  Decomposed into tasks
│  (.claude/  │  Managed in .claude/epics/ (gitignored)
│   epics/)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   GitHub    │  Synced to repository
│   Issues    │  Tracked and managed
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Git Worktree│  Parallel development
│ + Agent     │  Isolated work environment
└─────────────┘
```

**Key Features**:
- PRD creation: `/pm:prd-new`
- Epic decomposition: `/pm:epic-oneshot`
- Issue tracking: `/pm:issue-start`
- Priority management: `/pm:next`

### 4. Multi-Agent Coordination

#### Agent Categories

**Core Development** (5 agents):
- coder, reviewer, tester, planner, researcher

**Swarm Coordination** (5 agents):
- hierarchical-coordinator
- mesh-coordinator
- adaptive-coordinator
- collective-intelligence-coordinator
- swarm-memory-manager

**Consensus & Distributed** (7 agents):
- byzantine-coordinator, raft-manager
- gossip-coordinator, consensus-builder
- crdt-synchronizer, quorum-manager
- security-manager

**GitHub & Repository** (9 agents):
- github-modes, pr-manager
- code-review-swarm, issue-tracker
- release-manager, workflow-automation
- project-board-sync, repo-architect
- multi-repo-swarm

**Specialized Development** (8 agents):
- backend-dev, mobile-dev, ml-developer
- cicd-engineer, api-docs, system-architect
- code-analyzer, base-template-generator

**And more** (20+ additional agents)

#### Coordination Patterns

**Hierarchical** (Queen-Worker):
```
     Queen Coordinator
           │
    ┌──────┼──────┐
    │      │      │
Worker  Worker  Worker
  A       B       C
```

**Mesh** (Peer-to-Peer):
```
Agent ←→ Agent
  ↕       ↕
Agent ←→ Agent
```

**Adaptive** (Dynamic):
```
Starts: Hierarchical
  │
  ▼ (if conditions change)
Switches to: Mesh
  │
  ▼ (if needed)
Back to: Hierarchical
```

### 5. MCP Server Integration

#### Claude Flow (Required)
- SPARC methodology execution
- Agent spawning and coordination
- Hooks system (pre/post operations)
- Memory management
- Neural pattern training

#### Ruv-Swarm (Optional)
- Enhanced swarm coordination
- Advanced topology management
- Performance optimization

#### Flow-Nexus (Optional - Cloud)
- Cloud-based execution
- Distributed sandboxes
- Template marketplace
- Real-time collaboration

### 6. GitHub Integration Layer

Automated workflows and operations:

```
Developer Action
     │
     ▼
GitHub Event
     │
     ├──→ Workflows (CI/CD)
     │    ├─ shellcheck.yml
     │    ├─ health-check.yml
     │    ├─ auto-label.yml
     │    └─ stale.yml
     │
     ├──→ Issue Templates
     │    ├─ bug_report.md
     │    └─ feature_request.md
     │
     └──→ PR Template
          └─ PULL_REQUEST_TEMPLATE.md
```

## Data Flow

### Typical Development Flow

```
1. User requests feature
      │
      ▼
2. /pm:prd-new creates PRD
      │
      ▼
3. /pm:epic-oneshot decomposes
      │
      ▼
4. GitHub issues created
      │
      ▼
5. /pm:issue-start begins work
      │
      ▼
6. SPARC workflow executes
      │
      ├─→ Specification phase
      ├─→ Pseudocode phase
      ├─→ Architecture phase
      ├─→ Refinement (TDD) phase
      └─→ Completion phase
      │
      ▼
7. Agent coordination
      │
      ├─→ Parallel execution
      ├─→ Memory sharing
      └─→ Hooks integration
      │
      ▼
8. Code generation & testing
      │
      ▼
9. PR creation & review
      │
      ▼
10. Merge & deployment
```

### Memory Flow

```
Agent A
  │ writes
  ▼
Memory Store ←─── reads ──── Agent B
  │
  │ persists
  ▼
Session State
  │
  │ restores
  ▼
Next Session
```

## Integration Points

### File System Integration

```
.claude/
  ├─ Read by: Claude Code CLI on startup
  ├─ Modified by: PM commands, user edits
  └─ Used by: All agents for configuration

scripts/
  ├─ Executed by: Users, workflows, agents
  └─ Coordinated via: Hook system

.github/
  ├─ Processed by: GitHub Actions
  └─ Triggered by: Git events
```

### Git Integration

```
Git Operations
  │
  ├─→ Branch management
  │   └─ Worktrees for parallel work
  │
  ├─→ Commit hooks
  │   └─ Pre-commit: validation
  │   └─ Post-commit: notifications
  │
  └─→ Remote sync
      └─ Push/Pull coordination
```

### GitHub API Integration

Through `gh` CLI and GitHub Actions:
- Issue creation/management
- PR creation/review
- Label management
- Project boards
- Discussions

## Design Principles

### 1. Concurrent Execution First

**Principle**: All operations should be parallel unless dependencies require sequential execution.

**Implementation**:
- Batch file operations
- Parallel agent spawning
- Single-message multi-tool calls

### 2. Evidence-Based Development

**Principle**: Code > Documentation, Evidence > Assumptions

**Implementation**:
- Tests before implementation
- Validation gates
- Measurement-driven decisions

### 3. File Organization Discipline

**Principle**: Never pollute root directory, always use subdirectories.

**Implementation**:
- Enforced directory structure
- Path standardization
- Gitignore patterns

### 4. Agent Autonomy with Coordination

**Principle**: Agents work independently but coordinate through shared memory and hooks.

**Implementation**:
- Work stream assignment
- File-level parallelism
- Atomic commits
- Progress tracking

### 5. Security by Default

**Principle**: No secrets, validate inputs, protect privacy.

**Implementation**:
- Path normalization (no usernames)
- Repository validation
- Input sanitization
- No hardcoded credentials

## Scalability & Performance

### Performance Metrics

- **84.8% SWE-Bench solve rate**
- **32.3% token reduction** (via compression)
- **2.8-4.4x speed improvement** (via parallelization)
- **27+ neural models** for pattern learning

### Scalability Features

**Horizontal Scaling**:
- Multiple agents work in parallel
- Git worktrees for isolation
- Distributed coordination

**Vertical Scaling**:
- Adaptive topology switching
- Resource-aware execution
- Token efficiency modes

**Caching Strategy**:
- Search result caching (1 hour)
- Pattern reuse
- Session persistence
- Neural training

### Bottleneck Mitigation

```
Bottleneck: Sequential operations
Solution: Parallel-first execution

Bottleneck: Token limits
Solution: Ultra-compressed mode

Bottleneck: File conflicts
Solution: Worktree isolation

Bottleneck: API rate limits
Solution: Batch operations
```

## Extension Points

### Adding Custom Commands

```
.claude/commands/my-namespace/my-command.md
```

### Adding Helper Scripts

```
.claude/helpers/my-helper.sh
```

### Adding Coordination Rules

```
.claude/rules/my-rule.md
```

### Extending Workflows

```
.github/workflows/my-workflow.yml
```

## Future Architecture

Planned improvements:
- Web interface for PM system
- Real-time collaboration
- AI-powered code review
- Performance analytics dashboard
- Plugin system for extensions

---

For implementation details, see:
- [Configuration Reference](configuration-reference.md)
- [Script Reference](script-reference.md)
- [Getting Started](getting-started.md)
