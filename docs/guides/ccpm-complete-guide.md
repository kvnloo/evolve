# CCPM Complete Guide

**Version**: 1.0 Consolidated
**Source**: Merged from 5 documentation files
**Purpose**: Comprehensive reference for Claude Code PM system

---

## Table of Contents

- [1. Overview](#1-overview)
  - [1.1 Background](#11-background)
  - [1.2 The Workflow](#12-the-workflow)
  - [1.3 What Makes This Different](#13-what-makes-this-different)
  - [1.4 Why GitHub Issues](#14-why-github-issues)
  - [1.5 Core Principle: No Vibe Coding](#15-core-principle-no-vibe-coding)
- [2. Getting Started](#2-getting-started)
  - [2.1 Quick Setup](#21-quick-setup)
  - [2.2 System Architecture](#22-system-architecture)
  - [2.3 Local vs Remote](#23-local-vs-remote)
- [3. Workflows](#3-workflows)
  - [3.1 Workflow Phases](#31-workflow-phases)
  - [3.2 Complete Epic Workflow Example](#32-complete-epic-workflow-example)
  - [3.3 Agent Coordination Patterns](#33-agent-coordination-patterns)
  - [3.4 Memory Coordination](#34-memory-coordination)
- [4. Development Planning](#4-development-planning)
  - [4.1 PRD to Epic Conversion](#41-prd-to-epic-conversion)
  - [4.2 Story-to-Agent Mapping](#42-story-to-agent-mapping)
  - [4.3 Progress Tracking](#43-progress-tracking)
  - [4.4 Best Practices](#44-best-practices)
- [5. Reference](#5-reference)
  - [5.1 PM Commands](#51-pm-commands)
  - [5.2 Context Commands](#52-context-commands)
  - [5.3 Testing Commands](#53-testing-commands)
  - [5.4 Utility Commands](#54-utility-commands)
  - [5.5 Agents](#55-agents)
- [6. Parallel Execution System](#6-parallel-execution-system)
- [7. Troubleshooting](#7-troubleshooting)

---

## 1. Overview

### 1.1 Background

Every team struggles with the same problems:
- **Context evaporates** between sessions, forcing constant re-discovery
- **Parallel work creates conflicts** when multiple developers touch the same code
- **Requirements drift** as verbal decisions override written specs
- **Progress becomes invisible** until the very end

CCPM solves all of that through spec-driven development, GitHub Issues integration, Git worktrees, and multiple AI agents running in parallel.

### 1.2 The Workflow

```mermaid
graph LR
    A[PRD Creation] --> B[Epic Planning]
    B --> C[Task Decomposition]
    C --> D[GitHub Sync]
    D --> E[Parallel Execution]
```

**Quick Example (60 seconds)**:
```bash
# Create a comprehensive PRD through guided brainstorming
/pm:prd-new memory-system

# Transform PRD into a technical epic with task breakdown
/pm:prd-parse memory-system

# Push to GitHub and start parallel execution
/pm:epic-oneshot memory-system
/pm:issue-start 1235
```

### 1.3 What Makes This Different

| Traditional Development | Claude Code PM System |
|------------------------|----------------------|
| Context lost between sessions | **Persistent context** across all work |
| Serial task execution | **Parallel agents** on independent tasks |
| "Vibe coding" from memory | **Spec-driven** with full traceability |
| Progress hidden in branches | **Transparent audit trail** in GitHub |
| Manual task coordination | **Intelligent prioritization** with `/pm:next` |

### 1.4 Why GitHub Issues

Most Claude Code workflows operate in isolation – a single developer working with AI in their local environment. By using GitHub Issues as our database, we unlock:

**True Team Collaboration**
- Multiple Claude instances can work on the same project simultaneously
- Human developers see AI progress in real-time through issue comments
- Team members can jump in anywhere – the context is always visible

**Seamless Human-AI Handoffs**
- AI can start a task, human can finish it (or vice versa)
- Progress updates are visible to everyone, not trapped in chat logs
- Code reviews happen naturally through PR comments

**Single Source of Truth**
- No separate databases or project management tools
- Issue state is the project state
- Comments are the audit trail
- Labels provide organization

### 1.5 Core Principle: No Vibe Coding

> **Every line of code must trace back to a specification.**

We follow a strict 5-phase discipline:
1. **Brainstorm** - Think deeper than comfortable
2. **Document** - Write specs that leave nothing to interpretation
3. **Plan** - Architect with explicit technical decisions
4. **Execute** - Build exactly what was specified
5. **Track** - Maintain transparent progress at every step

---

## 2. Getting Started

### 2.1 Quick Setup

**Step 1: Install the repository**

Unix/Linux/macOS:
```bash
cd path/to/your/project/
curl -sSL https://automaze.io/ccpm/install | bash
```

Windows (PowerShell):
```bash
cd path/to/your/project/
iwr -useb https://automaze.io/ccpm/install | iex
```

**Step 2: Initialize the PM system**
```bash
/pm:init
```
This installs GitHub CLI (if needed), authenticates with GitHub, installs the gh-sub-issue extension, creates required directories, and updates .gitignore.

**Step 3: Create CLAUDE.md**
```bash
/init include rules from .claude/CLAUDE.md
```

**Step 4: Prime the system**
```bash
/context:create
```

**Step 5: Start your first feature**
```bash
/pm:prd-new your-feature-name
```

### 2.2 System Architecture

```
.claude/
├── CLAUDE.md          # Always-on instructions
├── agents/            # Task-oriented agents (context preservation)
├── commands/          # Command definitions
│   ├── context/       # Create, update, and prime context
│   ├── pm/            # Project management commands
│   └── testing/       # Test commands
├── context/           # Project-wide context files
├── epics/             # PM's local workspace (.gitignore)
│   └── [epic-name]/   # Epic and related tasks
│       ├── epic.md    # Implementation plan
│       ├── [#].md     # Individual task files
│       └── updates/   # Work-in-progress updates
├── prds/              # PRD files
├── rules/             # Rule files
└── scripts/           # Script files
```

### 2.3 Local vs Remote

| Operation | Local | GitHub |
|-----------|-------|--------|
| PRD Creation | ✅ | — |
| Implementation Planning | ✅ | — |
| Task Breakdown | ✅ | ✅ (sync) |
| Execution | ✅ | — |
| Status Updates | ✅ | ✅ (sync) |
| Final Deliverables | — | ✅ |

---

## 3. Workflows

### 3.1 Workflow Phases

**Phase 1: Product Planning**
```bash
/pm:prd-new feature-name
```
Launches comprehensive brainstorming to create a Product Requirements Document.
**Output:** `.claude/prds/feature-name.md`

**Phase 2: Implementation Planning**
```bash
/pm:prd-parse feature-name
```
Transforms PRD into a technical implementation plan with architectural decisions.
**Output:** `.claude/epics/feature-name/epic.md`

**Phase 3: Task Decomposition**
```bash
/pm:epic-decompose feature-name
```
Breaks epic into concrete, actionable tasks with acceptance criteria and effort estimates.
**Output:** `.claude/epics/feature-name/[task].md`

**Phase 4: GitHub Synchronization**
```bash
/pm:epic-sync feature-name
# Or for confident workflows:
/pm:epic-oneshot feature-name
```
Pushes epic and tasks to GitHub as issues with appropriate labels and relationships.

**Phase 5: Execution**
```bash
/pm:issue-start 1234  # Launch specialized agent
/pm:issue-sync 1234   # Push progress updates
/pm:next             # Get next priority task
```

### 3.2 Complete Epic Workflow Example

**Week 1: Starting Work**
```bash
# Start Story 1.1
/pm:issue-start 2

# Agent spawns in worktree
cd ../epic-foundation-infrastructure/

# Agent executes tasks, commits, syncs progress
/pm:issue-sync 2
```

**Parallel Execution**
```bash
# Story 1.3 continues in worktree-1
cd ../epic-foundation-infrastructure/

# Start Epic 2 in parallel worktree-2
/pm:issue-start 6
cd ../epic-mcp-integration/

# Both agents coordinate via memory
# No conflicts (different file paths)
```

### 3.3 Agent Coordination Patterns

**Pattern 1: Sequential Stories**
When stories have dependencies:
```bash
/pm:issue-start A
# Work completes
/pm:issue-sync A  # Marks complete

/pm:next  # Returns Story B (dependency satisfied)
/pm:issue-start B
```

**Pattern 2: Parallel Stories**
When stories are independent:
```bash
# Terminal 1:
/pm:issue-start X
cd ../epic-name-X/

# Terminal 2:
/pm:issue-start Y
cd ../epic-name-Y/

# Different worktrees = no conflicts
```

**Pattern 3: Multi-Agent Story**
When a story needs multiple specialists:
```bash
/pm:issue-start Z

# System spawns multiple agents:
# - Architect designs system
# - Backend-dev implements APIs
# - Tester writes test suite
# All coordinate via memory
```

### 3.4 Memory Coordination

**Agent 1** (ml-developer) stores decision:
```bash
npx claude-flow@alpha hooks post-edit \
  --file "database/schema.sql" \
  --memory-key "swarm/ml-dev/schema-design"
```

**Agent 2** (backend-dev) reads decision:
```bash
npx claude-flow@alpha hooks session-restore \
  --session-id "swarm-foundation"
```

Result: Coordinated without communication overhead, all decisions preserved in memory.

---

## 4. Development Planning

### 4.1 PRD to Epic Conversion

**PRD Structure:**
```markdown
# PRD: Feature Name

## Vision
[High-level description]

## Business Value
[ROI metrics]

## Success Metrics
[Measurable criteria]

## Technical Requirements
[Epics from development plan]
```

**Epic Decomposition:**
```yaml
Epic: Foundation Infrastructure
Status: not_started
Priority: HIGH
Timeline: Weeks 1-4

Stories:
  - 1.1: Framework Integration
  - 1.2: Multi-Agent Setup
  - 1.3: Security Framework
  - 1.4: CCPM Integration

Success Criteria:
  - 70% token reduction
  - 3-5 parallel agents
```

### 4.2 Story-to-Agent Mapping

| Story Type | Primary Agent | Secondary Agent |
|------------|---------------|-----------------|
| Framework Integration | `coder` | `researcher` |
| Architecture Design | `system-architect` | `planner` |
| Security Implementation | `security-manager` | `reviewer` |
| API Development | `backend-dev` | `api-docs` |
| Database Design | `code-analyzer` | `backend-dev` |
| ML/AI Implementation | `ml-developer` | `researcher` |
| Testing | `tester` | `tdd-london-swarm` |
| DevOps/Infrastructure | `cicd-engineer` | `system-architect` |
| Documentation | `api-docs` | `coder` |

**Manual Override:**
```bash
/pm:issue-start 15 --agent system-architect
/pm:issue-start 20 --agents backend-dev,tester,reviewer
```

### 4.3 Progress Tracking

**Epic-Level View:**
```bash
/pm:epic-show foundation-infrastructure
```

Output:
```
Epic: Foundation Infrastructure
Status: in_progress (60% complete)

Stories:
  ✅ 1.1: SuperClaude Integration (completed)
  ✅ 1.2: Multi-Agent Orchestration (completed)
  🔄 1.3: Constitutional AI Safety (in_progress, 70%)
  ⏳ 1.4: BMAD/CCPM Integration (not_started)
```

**Story-Level View:**
```bash
/pm:issue-sync 4 --status
```

### 4.4 Best Practices

**Epic Organization**
- One epic per week for smaller projects
- 2-4 weeks per epic for larger features
- Maximum 5 stories per epic
- Clear dependencies documented

**Story Sizing**
- 1-3 days per story (ideal)
- Maximum 5 days (split if larger)
- 6-8 tasks per story

**Agent Coordination**
- Start with 2-3 agents for new epics
- Scale to 5-8 agents as coordination improves
- Monitor coordination overhead (<20%)
- Use memory for all inter-agent communication

**Quality Assurance**
- Test coverage >80% before story completion
- Code review required for all changes
- Documentation updated with every story
- Security scan passed before merge

---

## 5. Reference

### 5.1 PM Commands

**Initial Setup**
- `/pm:init` - Install dependencies and configure GitHub
- `/pm:help` - Concise command summary

**PRD Commands**
- `/pm:prd-new` - Launch brainstorming for new product requirement
- `/pm:prd-parse` - Convert PRD to implementation epic
- `/pm:prd-list` - List all PRDs
- `/pm:prd-edit` - Edit existing PRD
- `/pm:prd-status` - Show PRD implementation status

**Epic Commands**
- `/pm:epic-decompose` - Break epic into task files
- `/pm:epic-sync` - Push epic and tasks to GitHub
- `/pm:epic-oneshot` - Decompose and sync in one command
- `/pm:epic-list` - List all epics
- `/pm:epic-show` - Display epic and its tasks
- `/pm:epic-close` - Mark epic as complete
- `/pm:epic-edit` - Edit epic details
- `/pm:epic-refresh` - Update epic progress from tasks

**Issue Commands**
- `/pm:issue-show` - Display issue and sub-issues
- `/pm:issue-status` - Check issue status
- `/pm:issue-start` - Begin work with specialized agent
- `/pm:issue-sync` - Push updates to GitHub
- `/pm:issue-close` - Mark issue as complete
- `/pm:issue-reopen` - Reopen closed issue
- `/pm:issue-edit` - Edit issue details

**Workflow Commands**
- `/pm:next` - Show next priority issue with epic context
- `/pm:status` - Overall project dashboard
- `/pm:standup` - Daily standup report
- `/pm:blocked` - Show blocked tasks
- `/pm:in-progress` - List work in progress

**Sync Commands**
- `/pm:sync` - Full bidirectional sync with GitHub
- `/pm:import` - Import existing GitHub issues

**Maintenance Commands**
- `/pm:validate` - Check system integrity
- `/pm:clean` - Archive completed work
- `/pm:search` - Search across all content

### 5.2 Context Commands

- `/context:create` - Create initial project context documentation
- `/context:update` - Update existing context with recent changes
- `/context:prime` - Load context into current conversation

### 5.3 Testing Commands

- `/testing:prime` - Configure testing setup
- `/testing:run [test_target]` - Execute tests with intelligent analysis

### 5.4 Utility Commands

- `/prompt` - Handle complex prompts with multiple references
- `/re-init` - Update or create CLAUDE.md with PM rules
- `/code-rabbit` - Process CodeRabbit review comments intelligently

### 5.5 Agents

Agents are **context firewalls** that protect the main conversation from information overload.

**Available Agents:**

| Agent | Purpose | Returns |
|-------|---------|---------|
| `code-analyzer` | Hunt bugs across multiple files | Concise bug report |
| `file-analyzer` | Read and summarize verbose files | Key findings (80-90% reduction) |
| `test-runner` | Execute tests without verbose output | Test summary with failures |
| `parallel-worker` | Coordinate parallel work streams | Consolidated status |

**Core Philosophy:**
> "Don't anthropomorphize subagents. Use them to organize your prompts and elide context. Subagents are best when they can do lots of work but then provide small amounts of information back to the main conversation thread."
> – Adam Wolff, Anthropic

**Anti-Patterns to Avoid:**
- Creating "specialist" agents (agents don't have different knowledge)
- Returning verbose output (defeats context preservation)
- Making agents communicate directly with each other
- Using agents for simple tasks

---

## 6. Parallel Execution System

### Issues Aren't Atomic

Traditional thinking: One issue = One developer = One task

**Reality: One issue = Multiple parallel work streams**

A single "Implement user authentication" issue becomes:
- **Agent 1**: Database tables and migrations
- **Agent 2**: Service layer and business logic
- **Agent 3**: API endpoints and middleware
- **Agent 4**: UI components and forms
- **Agent 5**: Test suites and documentation

All running **simultaneously** in the same worktree.

### The Math of Velocity

**Traditional Approach:**
- Epic with 3 issues
- Sequential execution

**This System:**
- Same epic with 3 issues
- Each issue splits into ~4 parallel streams
- **12 agents working simultaneously**

### Context Optimization

**Traditional single-thread approach:**
- Main conversation carries ALL implementation details
- Context window fills with code
- Eventually hits limits and loses coherence

**Parallel agent approach:**
- Main thread stays clean and strategic
- Each agent handles its own context
- Implementation details never pollute main conversation
- Main thread maintains oversight without drowning in code

### The Command Flow

```bash
# Analyze what can be parallelized
/pm:issue-analyze 1234

# Launch the swarm
/pm:epic-start memory-system

# Watch the magic (12 agents across 3 issues)
# All in: ../epic-memory-system/

# One clean merge when done
/pm:epic-merge memory-system
```

---

## 7. Troubleshooting

### Agent Coordination Conflicts
**Symptom**: Multiple agents editing same file
**Solution**: Use path-based agent assignment
```yaml
Agent A: src/api/*
Agent B: src/database/*
Agent C: src/ui/*
```

### Memory Synchronization Lag
**Symptom**: Agents not seeing latest decisions
**Solution**: Explicit memory refresh
```bash
npx claude-flow@alpha hooks session-restore --force
```

### Story Estimation Drift
**Symptom**: Stories taking 2x estimated time
**Solution**: Track velocity, adjust estimates
```bash
/pm:epic-show <epic> --metrics
```

### GitHub Sync Failures
**Symptom**: Issues not updating in GitHub
**Solution**: Manual sync with debug
```bash
/pm:issue-sync <issue> --debug
gh auth status
```

---

## Technical Notes

### GitHub Integration
- Uses **gh-sub-issue extension** for parent-child relationships
- Falls back to task lists if extension not installed
- Epic issues track sub-task completion automatically
- Labels provide organization (`epic:feature`, `task:feature`)

### File Naming Convention
- Tasks start as `001.md`, `002.md` during decomposition
- After GitHub sync, renamed to `{issue-id}.md` (e.g., `1234.md`)

### Design Decisions
- Intentionally avoids GitHub Projects API complexity
- All commands operate on local files first for speed
- Synchronization with GitHub is explicit and controlled
- Worktrees provide clean git isolation for parallel work

---

## Proven Results

Teams using this system report:
- **89% less time** lost to context switching
- **5-8 parallel tasks** vs 1 previously
- **75% reduction** in bug rates
- **Up to 3x faster** feature delivery

---

*This guide consolidates documentation from: ccpm-readme.md, ccpm-workflow.md, ccpm-development.md, ccpm-commands.md, ccpm-agents.md*
