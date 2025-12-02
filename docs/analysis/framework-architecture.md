# Framework Architecture Analysis

**Analysis Date**: 2025-11-28
**Scope**: Complete architecture mapping of Evolve's integrated AI development framework
**Analyst**: System Architecture Designer

---

## Executive Summary

Evolve integrates **3 core frameworks** (SuperClaude, Claude Flow, CCPM) with **4 MCP servers** to create an autonomous AI development environment featuring:

- **214+ commands** across 25 categories
- **78+ specialized agents** for development tasks
- **Multi-layer architecture** spanning behavioral rules → coordination → execution → lifecycle hooks
- **4 execution topologies** (mesh/hierarchical/ring/star) for different workload patterns
- **Cross-session persistence** via ReasoningBank memory with semantic search

**Key Innovation**: Separation of concerns where MCP tools coordinate strategy while Claude Code's Task tool executes actual work through concurrent agent spawning.

---

## Architecture Overview (ASCII Diagram)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER INTENT LAYER                              │
│  User Request → Command Routing (.claude/rules/command-routing.md)     │
│  214+ Commands across 25 Categories                                     │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────────┐
│                    BEHAVIORAL FRAMEWORK LAYER                           │
│  SuperClaude v4.1.9 (Global: ~/.claude + Local: .claude/superclaude)  │
│  ├─ PRINCIPLES.md - Software engineering standards                     │
│  ├─ RULES.md - 11 behavioral rule categories (🔴🟡🟢 priorities)        │
│  ├─ FLAGS.md - Mode activation triggers (--brainstorm, --introspect)   │
│  └─ MODES/ - 7 behavioral modes (Brainstorming, DeepResearch, etc.)    │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────────┐
│                      MCP COORDINATION LAYER                             │
│  4 MCP Servers (Optional - Strategy/Topology Setup Only)               │
│  ├─ claude-flow@alpha (Required)                                       │
│  │   • swarm_init - Initialize coordination topology                   │
│  │   • agent_spawn - Define agent types for coordination               │
│  │   • task_orchestrate - High-level workflow planning                 │
│  │   • memory_usage - Cross-agent coordination memory                  │
│  │   • neural_train - Pattern learning and optimization                │
│  ├─ ruv-swarm (Optional - Enhanced coordination)                       │
│  ├─ flow-nexus (Optional - Cloud features, 70+ tools)                  │
│  └─ agentic-payments (Optional - Payment authorization)                │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────────┐
│                   CLAUDE CODE EXECUTION LAYER                           │
│  Claude Code's Task Tool - Spawns ACTUAL Agents (Concurrent)           │
│  ├─ Task("Researcher", "Analyze...", "researcher")                     │
│  ├─ Task("Coder", "Implement...", "coder")                             │
│  ├─ Task("Tester", "Test...", "tester")                                │
│  └─ Task("Reviewer", "Review...", "reviewer")                          │
│  78+ Agent Definitions (.claude/agents/*)                              │
│  ├─ core/ (5) - Basic development agents                               │
│  ├─ sparc/ (17) - SPARC methodology agents                             │
│  ├─ swarm/ (12) - Swarm coordination agents                            │
│  ├─ github/ (15) - Repository management agents                        │
│  └─ specialized/ (29) - Domain-specific agents                         │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────────┐
│                    PROJECT MANAGEMENT LAYER                             │
│  CCPM (Claude Code Project Manager)                                    │
│  ├─ PRDs (.claude/prds/) - Product requirements                        │
│  ├─ Epics (.claude/epics/) - Feature decomposition                     │
│  ├─ Issues (GitHub) - Task tracking with git worktrees                 │
│  └─ Workflow: PRD → Epic → Decompose → GitHub Sync → Worktree         │
│  38 PM Commands (/pm:prd-new, /pm:epic-oneshot, /pm:issue-start, etc.)│
└────────────────────────────┬────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────────┐
│                      LIFECYCLE HOOKS LAYER                              │
│  Pre/Post Operation Automation (.claude/settings.json)                 │
│  ├─ PreToolUse Hooks                                                   │
│  │   • pre-edit - Agent assignment by file type                        │
│  │   • pre-bash - Command safety validation                            │
│  │   • pre-task - Auto-spawn agents for complex tasks                  │
│  ├─ PostToolUse Hooks                                                  │
│  │   • post-edit - Auto-format, neural training, memory update         │
│  │   • post-bash - Execution logging and metrics                       │
│  │   • post-search - Result caching and pattern improvement            │
│  └─ Session Hooks                                                      │
│      • session-end - State persistence and summary generation          │
│      • session-restore - Context restoration across sessions           │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────────┐
│                    PERSISTENT MEMORY LAYER                              │
│  ReasoningBank (.swarm/memory.db)                                      │
│  ├─ Semantic search with embeddings (384-dim vectors)                  │
│  ├─ Cross-session context preservation                                 │
│  ├─ Agent coordination memory (swarm/agent/*)                          │
│  ├─ Neural pattern storage and learning                                │
│  └─ API key redaction and security features                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Core Component Relationships

### 1. **SuperClaude Framework** (Behavioral Layer)

**Location**:
- Global: `~/.claude/` (applied to all Claude Code sessions)
- Local: `.claude/superclaude/` (project-specific reference)

**Purpose**: Define behavioral rules, operational principles, and mode-based adaptations

**Key Components**:
```yaml
core/:
  PRINCIPLES.md: Software engineering philosophy (SOLID, DRY, YAGNI)
  RULES.md: 11 behavioral rule categories
    - Agent Orchestration (🔴)
    - Workflow Rules (🟡)
    - Implementation Completeness (🟡)
    - Scope Discipline (🟡)
    - Failure Investigation (🔴)
    - Professional Honesty (🟡)
    - Git Workflow (🔴)
    - Tool Optimization (🟢)
    - File Organization (🟡)
    - Safety Rules (🔴)
    - Temporal Awareness (🔴)
  FLAGS.md: Mode activation flags
    - --brainstorm, --introspect, --task-manage
    - --think, --think-hard, --ultrathink
    - MCP server selection (--c7, --seq, --magic)
  RESEARCH_CONFIG.md: Deep research configuration
  BUSINESS_*.md: Business analysis framework

modes/:
  MODE_Brainstorming.md: Collaborative requirements discovery
  MODE_Business_Panel.md: Multi-expert business analysis
  MODE_DeepResearch.md: Systematic investigation
  MODE_Introspection.md: Meta-cognitive reasoning
  MODE_Orchestration.md: Tool selection optimization
  MODE_Task_Management.md: Hierarchical task tracking
  MODE_Token_Efficiency.md: Symbol-based compression
```

**Integration Pattern**: Automatically applied to all Claude Code sessions, supplemented by project-specific `CLAUDE.md`

---

### 2. **Claude Flow** (Coordination Layer)

**MCP Server**: `claude-flow@alpha` (Required)

**Purpose**: Multi-agent coordination, memory management, neural pattern learning

**Core MCP Tools**:
```yaml
Swarm Coordination:
  swarm_init: Initialize topology (mesh/hierarchical/ring/star)
  agent_spawn: Define agent types for coordination
  task_orchestrate: High-level workflow planning
  swarm_status: Monitor swarm health
  swarm_monitor: Real-time performance tracking

Memory Management:
  memory_usage: Store/retrieve coordination data
  memory_persist: Cross-session persistence
  memory_search: Semantic search with patterns

Neural Features:
  neural_status: Check neural network status
  neural_train: Train patterns with WASM SIMD
  neural_patterns: Analyze cognitive patterns

GitHub Integration:
  repo_analyze: Repository analysis
  pr_enhance: Pull request improvement
  issue_triage: Issue prioritization
```

**Execution Flow**:
```
1. Optional MCP Setup (for complex tasks)
   mcp__claude-flow__swarm_init { topology: "hierarchical", maxAgents: 8 }

2. Claude Code Task Tool Spawns Agents (ACTUAL WORK)
   Task("Backend Dev", "Build API...", "backend-dev")
   Task("Frontend Dev", "Create UI...", "coder")
   Task("Tester", "Write tests...", "tester")

3. Agents Coordinate via Memory
   npx claude-flow hooks post-edit --memory-key "swarm/agent/progress"

4. Hooks Trigger Automation
   • Auto-format code
   • Train neural patterns
   • Update cross-agent memory
```

**Critical Distinction**:
- **MCP tools = Strategy/Coordination** (setup topology, define agent types)
- **Claude Code Task tool = Execution** (spawn actual agents with full instructions)

---

### 3. **CCPM** (Project Management Layer)

**Location**: `.claude/prds/`, `.claude/epics/`, `.claude/commands/pm/`

**Purpose**: Spec-driven development with GitHub integration and git worktrees

**Workflow Stages**:
```yaml
Stage 1 - Requirements:
  Command: /pm:prd-new <feature_name>
  Output: .claude/prds/<feature_name>.md
  Content: Product requirements, user stories, acceptance criteria

Stage 2 - Decomposition:
  Command: /pm:prd-parse <feature_name>
  Output: .claude/epics/<feature_name>/epic.md
  Content: Epic summary, technical approach, dependencies

Stage 3 - Task Breakdown:
  Command: /pm:epic-decompose <feature_name>
  Output: .claude/epics/<feature_name>/{1..N}.md
  Content: Individual tasks with file patterns and agent assignments

Stage 4 - GitHub Sync:
  Command: /pm:epic-sync <feature_name>
  Actions:
    - Create GitHub epic issue
    - Create sub-issues for each task
    - Rename task files to issue IDs (1.md → 123.md)
    - Create git worktree (../epic-<feature_name>)
  Output: .claude/epics/<feature_name>/github-mapping.md

Stage 5 - Development:
  Command: /pm:issue-start <issue_number>
  Actions:
    - Analyze issue requirements
    - Decompose into work streams
    - Spawn specialized agents (via Task tool)
    - Coordinate via memory and commits

Stage 6 - Completion:
  Command: /pm:issue-sync <issue_number>
  Actions:
    - Update GitHub issue with progress
    - Clean file paths (relative, not absolute)
    - Mark deliverables complete
```

**38 PM Commands**:
```
PRD Management: prd-new, prd-edit, prd-list, prd-status, prd-parse
Epic Management: epic-oneshot, epic-start, epic-status, epic-sync, epic-decompose
                 epic-show, epic-list, epic-edit, epic-close, epic-merge, epic-refresh
Issue Management: issue-start, issue-analyze, issue-status, issue-sync
                  issue-show, issue-edit, issue-close, issue-reopen
Workflow: next, status, standup, blocked, in-progress, search, sync
System: init, import, clean, validate, help, test-reference-update
```

**Agent Coordination Pattern**:
```yaml
# From issue-analyze output
Stream A: Database Layer
  Files: src/db/*, migrations/*
  Agent: backend-specialist

Stream B: API Layer
  Files: src/api/*
  Agent: api-specialist

Stream C: Testing
  Files: tests/*
  Agent: tester
```

Agents work in parallel on different file patterns, coordinating through commits and memory.

---

### 4. **SPARC Methodology** (Development Workflow)

**Integration**: Via Claude Flow MCP tools + 17 SPARC-specific agents

**Purpose**: Systematic 5-phase development ensuring quality and consistency

**Phases**:
```yaml
1. Specification:
   Agent: sparc-specification
   Output: Requirements analysis, user stories, acceptance criteria
   Command: /sparc:specification OR mcp__claude-flow__sparc_mode { mode: "specification" }

2. Pseudocode:
   Agent: sparc-pseudocode
   Output: Algorithm design, data structures, flow diagrams
   Command: /sparc:architect OR mcp__claude-flow__sparc_mode { mode: "architect" }

3. Architecture:
   Agent: sparc-architecture
   Output: System design, component interaction, technology choices
   Command: /sparc:architect

4. Refinement:
   Agent: sparc-refinement
   Output: TDD implementation, iterative testing
   Command: /sparc:tdd OR /sparc:coder

5. Completion:
   Agent: sparc-coder
   Output: Integration, deployment, validation
   Command: /sparc:reviewer
```

**17 SPARC Modes**:
```
Core Orchestration: orchestrator, swarm-coordinator, workflow-manager, batch-executor
Development: coder, architect, reviewer, tdd
Analysis: researcher, analyzer, optimizer
Creative: designer, innovator, documenter, debugger, tester
Support: memory-manager
```

**MCP Integration**:
```javascript
// Initialize SPARC swarm
mcp__claude-flow__swarm_init {
  topology: "hierarchical",
  maxAgents: 12
}

// Execute SPARC phases
mcp__claude-flow__sparc_mode {
  mode: "architect",
  task_description: "design microservices architecture"
}

// Then Claude Code Task tool spawns actual agents
Task("Architect", "Design services...", "system-architect")
Task("Coder", "Implement...", "coder")
Task("Tester", "Test...", "tester")
```

---

## Command Routing Architecture

**Central Router**: `.claude/rules/command-routing.md`

**Classification Triggers**:
```yaml
brainstorm:
  keywords: [maybe, thinking about, not sure, explore, ideas]
  route_to: /sc:brainstorm OR /sparc:innovator

implementation:
  keywords: [implement, create, build, add, make, code]
  route_to: /sc:implement OR /sparc:coder OR /swarm:development

analysis:
  keywords: [analyze, review, check, audit, examine]
  route_to: /sc:analyze OR /sparc:analyzer OR /swarm:analysis

research:
  keywords: [investigate, explore, find, discover, research]
  route_to: /sc:research OR /sparc:researcher OR /swarm:research

troubleshoot:
  keywords: [fix, debug, error, broken, not working, bug]
  route_to: /sc:troubleshoot OR /sparc:debugger

project_management:
  keywords: [prd, epic, sprint, requirement, story, task, next]
  route_to: /pm:* commands

github:
  keywords: [pr, pull request, issue, release, merge, review]
  route_to: /github:* commands

ui_frontend:
  keywords: [ui, frontend, component, layout, clone, website]
  route_to: /ui:clone OR /ui:uied-analysis OR /sparc:designer

coordination:
  keywords: [swarm, coordinate, parallel, multi-agent, orchestrate]
  route_to: /coordination:swarm-init OR /swarm:swarm-modes
```

**214+ Commands Across 25 Categories**:
```
/sc:* (26)         - SuperClaude meta-commands
/sparc:* (18)      - SPARC methodology
/swarm:* (17)      - Swarm strategies
/pm:* (38)         - Project management
/github:* (19)     - GitHub operations
/coordination:* (7) - Swarm coordination
/hive-mind:* (12)  - Collective intelligence
/analysis:* (7)    - Performance analysis
/automation:* (10) - Workflow automation
/memory:* (6)      - Memory management
/monitoring:* (6)  - System monitoring
/optimization:* (6) - Performance optimization
/ui:* (6)          - UI/Frontend
/flow-nexus:* (9)  - Cloud operations
/hooks:* (8)       - Hook configuration
/training:* (6)    - Neural training
/pair:* (9)        - Pair programming
/workflows:* (6)   - Workflow templates
/statusline:* (8)  - Status display
/stream-chain:* (2) - Pipeline processing
/agents:* (5)      - Agent reference
/verify:* (2)      - Verification
/truth:* (1)       - Ground truth
/system:* (1)      - System commands
/context:* (?)     - Context operations
```

**Routing Algorithm**:
```yaml
1. Classify Request:
   Match keywords → primary_category

2. Assess Complexity:
   simple: Single file, clear scope → Direct tool use
   moderate: Multi-file, clear requirements → Single SPARC mode or /sc command
   complex: Multi-component, unclear scope → Swarm coordination
   enterprise: Cross-project, long-running → /sc:pm with wave strategy

3. Select Command:
   Check category-specific commands
   For SPARC: consult /sparc:sparc-modes
   For swarm: consult /swarm:swarm-modes
   For unclear: use /sc:pm (default meta-router)

4. Execute:
   Use TodoWrite for >2 steps
   Batch operations in single messages
   Verify completion before marking done
```

**Fallback Hierarchy**:
```
1. /sc:pm         → Default meta-router (handles all cases)
2. /sparc:sparc-modes → Lists all SPARC mode options
3. /swarm:swarm-modes → Lists all swarm strategy options
4. /sc:help       → Lists all /sc commands
```

---

## Agent Execution Model

### Agent Categories (78+ Total)

```yaml
Core Development (5):
  - coder: General-purpose implementation
  - reviewer: Code review and quality
  - tester: Test creation and execution
  - planner: Task planning and breakdown
  - researcher: Investigation and analysis

SPARC Methodology (17):
  - orchestrator: Multi-agent task orchestration
  - swarm-coordinator: Specialized swarm management
  - workflow-manager: Process automation
  - batch-executor: Parallel task execution
  - coder: Autonomous code generation
  - architect: System design
  - reviewer: Code review
  - tdd: Test-driven development
  - researcher: Deep research capabilities
  - analyzer: Code and data analysis
  - optimizer: Performance optimization
  - designer: UI/UX design
  - innovator: Creative problem solving
  - documenter: Documentation generation
  - debugger: Systematic debugging
  - tester: Comprehensive testing
  - memory-manager: Knowledge management

Swarm Coordination (12):
  - hierarchical-coordinator
  - mesh-coordinator
  - adaptive-coordinator
  - collective-intelligence-coordinator
  - swarm-memory-manager
  - (plus 7 more specialized coordinators)

Consensus & Distributed (9):
  - byzantine-coordinator
  - raft-manager
  - gossip-coordinator
  - consensus-builder
  - crdt-synchronizer
  - quorum-manager
  - security-manager
  - (plus 2 more)

Performance & Optimization (5):
  - perf-analyzer
  - performance-benchmarker
  - task-orchestrator
  - memory-coordinator
  - smart-agent

GitHub & Repository (15):
  - github-modes
  - pr-manager
  - code-review-swarm
  - issue-tracker
  - release-manager
  - workflow-automation
  - project-board-sync
  - repo-architect
  - multi-repo-swarm
  - (plus 6 more)

Specialized Development (15):
  - backend-dev
  - mobile-dev
  - ml-developer
  - cicd-engineer
  - api-docs
  - system-architect
  - code-analyzer
  - base-template-generator
  - (plus 7 more)
```

### Concurrent Execution Pattern

**Critical Rule**: "1 MESSAGE = ALL RELATED OPERATIONS"

**Correct Pattern**:
```javascript
// Single message with all operations
[Parallel Execution]:
  // 1. Optional MCP coordination setup
  mcp__claude-flow__swarm_init { topology: "mesh", maxAgents: 6 }

  // 2. Claude Code Task tool spawns ALL agents concurrently
  Task("Research", "Analyze API patterns...", "researcher")
  Task("Backend", "Implement REST endpoints...", "backend-dev")
  Task("Database", "Design schema...", "code-analyzer")
  Task("Tester", "Create test suite...", "tester")
  Task("Reviewer", "Review quality...", "reviewer")

  // 3. Batch all todos
  TodoWrite { todos: [
    {id: "1", content: "Research API patterns", status: "in_progress"},
    {id: "2", content: "Design database schema", status: "in_progress"},
    {id: "3", content: "Implement authentication", status: "pending"},
    // ... 5-10+ todos
  ]}

  // 4. Parallel file operations
  Bash "mkdir -p app/{src,tests,docs}"
  Write "app/package.json"
  Write "app/src/server.js"
  Write "app/tests/server.test.js"
```

**Incorrect Pattern** (Multiple Messages):
```javascript
Message 1: mcp__claude-flow__swarm_init { ... }
Message 2: Task("agent 1", ...)
Message 3: TodoWrite { todos: [single todo] }
Message 4: Write "file.js"
// ❌ Breaks parallel coordination!
```

---

## Lifecycle Hooks Architecture

**Configuration**: `.claude/settings.json`

**Hook Types**:

```yaml
PreToolUse Hooks:
  pre-edit:
    Matcher: ^(Write|Edit|MultiEdit)$
    Command: npx claude-flow hook pre-edit --file '{file}' --memory-key 'swarm/editor/current'
    Purpose: Agent assignment, file validation

  pre-bash:
    Matcher: ^Bash$
    Command: npx claude-flow hook pre-command --command '{command}' --validate-safety
    Purpose: Command safety validation, resource preparation

  pre-task:
    Matcher: Task creation
    Purpose: Auto-spawn agents based on task complexity

PostToolUse Hooks:
  post-edit:
    Matcher: ^(Write|Edit|MultiEdit)$
    Command: npx claude-flow hook post-edit --file '{file}' --memory-key 'swarm/editor/complete'
    Actions:
      - Auto-format code (Prettier, ESLint)
      - Train neural patterns from edit
      - Update coordination memory
      - Log metrics

  post-bash:
    Purpose: Execution logging, metrics tracking

  post-search:
    Purpose: Cache results, improve search patterns

Session Hooks:
  session-end:
    Command: npx claude-flow hook session-end --export-metrics
    Actions:
      - Generate session summary
      - Persist state to ReasoningBank
      - Export metrics and patterns

  session-restore:
    Command: npx claude-flow hook session-restore --session-id '{id}'
    Actions:
      - Load previous session state
      - Restore agent memory
      - Resume task context
```

**Memory Coordination Protocol**:
```javascript
// 1. STATUS - Hook starts
mcp__claude-flow__memory_usage {
  action: "store",
  key: "swarm/hooks/pre-edit/status",
  namespace: "coordination",
  value: JSON.stringify({ status: "running", hook: "pre-edit" })
}

// 2. PROGRESS - Hook processes
mcp__claude-flow__memory_usage {
  action: "store",
  key: "swarm/hooks/pre-edit/progress",
  value: JSON.stringify({ progress: 50, action: "validating" })
}

// 3. COMPLETE - Hook finishes
mcp__claude-flow__memory_usage {
  action: "store",
  key: "swarm/hooks/pre-edit/complete",
  value: JSON.stringify({ status: "complete", result: "success" })
}
```

**Benefits**:
- 🤖 Automatic agent assignment by file type
- 🎨 Consistent code formatting
- 🧠 Continuous neural pattern improvement
- 💾 Cross-session memory persistence
- 📊 Performance metrics tracking
- 🔄 Automatic memory coordination
- 🎯 Smart agent spawning

---

## Memory Architecture

**Storage**: ReasoningBank (`.swarm/memory.db`)

**Features**:
```yaml
Semantic Search:
  - 384-dimensional embeddings (Xenova/all-MiniLM-L6-v2)
  - NPX mode: Hash-based (fast, offline)
  - Local install: Transformer embeddings (semantic AI)

Cross-Session Persistence:
  - Session state restoration
  - Agent memory continuity
  - Task context preservation

Security:
  - API key redaction (Anthropic, OpenRouter, Gemini)
  - Auto-validation of sensitive data
  - Display redaction with --redact flag

Namespaces:
  - coordination: Agent coordination data
  - sparc: SPARC methodology state
  - swarm: Swarm coordination
  - session: Session-specific data
  - neural: Pattern learning data
```

**Memory Operations**:
```bash
# Store coordination data
npx claude-flow memory store "swarm/agent/progress" "Agent completed analysis" --namespace coordination

# Semantic search
npx claude-flow memory query "API configuration" --reasoningbank --limit 5

# Cross-session persistence
npx claude-flow memory persist --session-id "swarm-{id}"

# Export for backup
npx claude-flow memory export backup.json --format json
```

**Integration with Agents**:
```yaml
Agent Coordination:
  - Agents write progress to swarm/agent/* keys
  - Coordinators read from swarm/coordinator/* keys
  - Memory acts as shared blackboard

Neural Learning:
  - Hooks store patterns in neural/* namespace
  - Patterns improve over time with usage
  - Semantic search finds related patterns

Session Continuity:
  - session-end hook persists full state
  - session-restore retrieves context
  - Zero information loss across sessions
```

---

## Swarm Topologies

**4 Coordination Patterns**:

### 1. Mesh
```
Agent1 ←→ Agent2
  ↕         ↕
Agent3 ←→ Agent4
```
- All agents connect to all others
- Best for: Research, exploration, brainstorming
- Communication: High overhead, maximum information sharing
- Use case: `/swarm:research`, complex problem-solving

### 2. Hierarchical
```
    Coordinator
    ↙    ↓    ↘
  A1    A2    A3
  ↓     ↓     ↓
 A4-A5 A6-A7 A8-A9
```
- Tree structure with clear command chain
- Best for: Development, structured tasks, large projects
- Communication: Efficient, clear responsibilities
- Use case: `/swarm:development`, SPARC workflows

### 3. Ring
```
A1 → A2 → A3
↑          ↓
A6 ← A5 ← A4
```
- Agents connect in a circle
- Best for: Pipeline processing, sequential workflows
- Communication: Low overhead, ordered processing
- Use case: Data processing pipelines

### 4. Star
```
      Central
    ↙  ↓  ↓  ↘
   A1  A2 A3  A4
```
- Central coordinator with satellite agents
- Best for: Simple tasks, centralized control
- Communication: Minimal overhead, clear coordination
- Use case: Quick tasks, centralized orchestration

**Topology Selection**:
```javascript
// MCP tool initialization (optional)
mcp__claude-flow__swarm_init {
  topology: "hierarchical",  // or "mesh", "ring", "star"
  maxAgents: 8,
  strategy: "balanced"  // or "parallel", "sequential"
}

// Claude Code Task tool spawns agents regardless of topology
Task("Coordinator", "Orchestrate...", "orchestrator")
Task("Worker1", "Process...", "coder")
Task("Worker2", "Test...", "tester")
```

---

## Extension Points for AI/ML Workflow Automation

### 1. **Neural Pattern Learning Extension**

**Current State**: Basic neural training via hooks

**Extension Opportunity**:
```yaml
Location: .claude/agents/neural/
Entry Points:
  - hooks/post-edit.md: Add pattern recognition
  - commands/training/neural-patterns.md: Extend with custom patterns

Integration Pattern:
  1. Create custom neural agent in .claude/agents/neural/ml-optimizer.md
  2. Add MCP tool: mcp__claude-flow__neural_train_custom
  3. Hook into post-edit for automatic pattern capture
  4. Store patterns in memory namespace: neural/ml-patterns/*

Example Use Case:
  - Auto-detect ML model performance patterns
  - Suggest hyperparameter optimizations
  - Predict resource requirements
```

### 2. **Custom Agent Type Extension**

**Current State**: 78 predefined agents

**Extension Opportunity**:
```yaml
Location: .claude/agents/specialized/
Steps:
  1. Create agent definition: .claude/agents/specialized/ml-engineer.md
  2. Define capabilities, file patterns, coordination protocol
  3. Add to command routing: .claude/rules/command-routing.md
  4. Create command: .claude/commands/ml/train-model.md

Agent Template:
  ---
  name: ml-engineer
  capabilities: [model_training, hyperparameter_tuning, evaluation]
  file_patterns: [*.py, *.ipynb, *.pkl, *.h5]
  coordination: Uses memory key ml/training/*
  ---

Integration:
  - Automatically spawned for ML-related files
  - Coordinates with data agents for preprocessing
  - Uses neural_train MCP tool for pattern learning
```

### 3. **Custom SPARC Mode Extension**

**Current State**: 17 SPARC modes

**Extension Opportunity**:
```yaml
Location: .claude/commands/sparc/
Steps:
  1. Create mode: .claude/commands/sparc/ml-pipeline.md
  2. Define phases: data-prep → training → evaluation → deployment
  3. Add MCP integration: mcp__claude-flow__sparc_mode { mode: "ml-pipeline" }

ML Pipeline Mode:
  Phase 1 - Data Preparation:
    Agent: data-engineer
    Tasks: Data cleaning, feature engineering, validation

  Phase 2 - Model Training:
    Agent: ml-engineer
    Tasks: Model selection, training, hyperparameter tuning

  Phase 3 - Evaluation:
    Agent: ml-tester
    Tasks: Metrics calculation, cross-validation, A/B testing

  Phase 4 - Deployment:
    Agent: ml-ops
    Tasks: Model serving, monitoring, A/B deployment
```

### 4. **Custom Swarm Strategy Extension**

**Current State**: Development, Research, Testing, Analysis, Maintenance, Optimization

**Extension Opportunity**:
```yaml
Location: .claude/commands/swarm/
Steps:
  1. Create strategy: .claude/commands/swarm/ml-experiment.md
  2. Define topology: Hierarchical with experiment coordinator
  3. Add coordination protocol: Memory namespace ml/experiments/*

ML Experiment Swarm:
  Topology: Hierarchical
  Agents:
    - Experiment Coordinator (orchestrator)
    - Data Preprocessor (data agent)
    - Model Trainer (ml-engineer) x N
    - Evaluator (ml-tester)
    - Results Aggregator (analyzer)

  Coordination:
    - Coordinator spawns N parallel training agents
    - Each agent trains different hyperparameter set
    - Results stored in ml/experiments/{experiment_id}
    - Aggregator finds best configuration
    - Auto-generates experiment report
```

### 5. **Custom Hook Extension**

**Current State**: Pre/Post edit, bash, search, session hooks

**Extension Opportunity**:
```yaml
Location: .claude/settings.json
Steps:
  1. Add hook matcher in settings.json
  2. Create hook script: scripts/hooks/ml-metrics.sh
  3. Integrate with MCP memory for coordination

ML Metrics Hook:
  Matcher: "^(Write|Edit)$" + file_pattern: "*.py"
  Hook: scripts/hooks/ml-metrics.sh

  Actions:
    - Detect model training code
    - Auto-inject logging statements
    - Add performance metrics collection
    - Store metrics in memory: ml/metrics/{model_name}
    - Trigger neural_train for pattern learning

  Integration:
    npx claude-flow hook post-edit \
      --file "{file}" \
      --memory-key "ml/metrics/{model}" \
      --action "extract_metrics"
```

### 6. **Custom Memory Namespace Extension**

**Current State**: coordination, sparc, swarm, session, neural

**Extension Opportunity**:
```yaml
New Namespaces:
  ml/experiments/*: Experiment tracking
  ml/models/*: Model registry
  ml/datasets/*: Dataset metadata
  ml/metrics/*: Performance metrics
  ml/deployments/*: Deployment history

Integration Pattern:
  # Store experiment
  npx claude-flow memory store \
    "ml/experiments/{exp_id}" \
    "{config_and_results}" \
    --namespace ml-experiments

  # Semantic search for similar experiments
  npx claude-flow memory query \
    "image classification CNN experiments" \
    --namespace ml-experiments \
    --reasoningbank \
    --limit 5

  # Retrieve best model for task
  npx claude-flow memory search \
    "best performing sentiment analysis model" \
    --namespace ml-models
```

### 7. **GitHub Integration Extension**

**Current State**: 19 GitHub commands for PRs, issues, releases

**Extension Opportunity**:
```yaml
Location: .claude/commands/github/
New Commands:
  /github:ml-experiment-track: Create GitHub issue for each experiment
  /github:model-release: Release trained models as GitHub releases
  /github:dataset-sync: Sync datasets with GitHub LFS

Example: ML Experiment Tracking
  1. Create experiment issue on GitHub
  2. Track metrics as issue comments
  3. Store model artifacts in release
  4. Link to deployment via issue labels

Integration with CCPM:
  PRD: ML Model Requirements
  Epic: Model Training and Deployment
  Tasks: Data prep, training, evaluation, deployment
  Sync: Auto-create GitHub issues with experiment tracking
```

---

## Performance Characteristics

**Token Efficiency**: 32.3% reduction via symbol compression (MODE_Token_Efficiency)

**Speed Improvements**: 2.8-4.4x faster through:
- Parallel agent execution (1 message = all operations)
- MCP coordination overhead minimization
- Efficient memory operations (ReasoningBank)
- Hook-based automation (no manual steps)

**Problem-Solving Accuracy**: 84.8% SWE-Bench solve rate

**Scalability**:
```yaml
Agents: 78+ predefined, unlimited custom agents
Commands: 214+ across 25 categories
Concurrent Tasks: Limited by Claude Code, not framework
Memory: Unlimited (SQLite-based ReasoningBank)
Sessions: Cross-session persistence via memory
```

**Resource Usage**:
```yaml
MCP Servers: 4 available (1 required, 3 optional)
Memory Footprint: ~100MB for typical project
Hooks: Minimal overhead (~50ms per operation)
Neural Training: Background processing, non-blocking
```

---

## Integration Best Practices

### 1. **Start Simple, Scale Up**
```
Level 1: Direct tool use (Read, Write, Bash)
Level 2: Single SPARC mode (/sparc:coder)
Level 3: Swarm coordination (/swarm:development)
Level 4: Full CCPM workflow (PRD → Epic → Tasks → Worktrees)
Level 5: Custom agents + neural training
```

### 2. **Command Selection Priority**
```
1. Check command-routing.md for optimal command
2. Use /sc:pm for complex/unclear requests (default meta-router)
3. Use SPARC modes for systematic development
4. Use swarm strategies for multi-component tasks
5. Use PM commands for spec-driven workflows
```

### 3. **Memory Management**
```yaml
Always:
  - Write coordination data to memory
  - Use semantic search for related context
  - Persist state at session boundaries

Namespaces:
  - coordination: Agent communication
  - sparc: SPARC methodology state
  - swarm: Swarm coordination
  - [custom]: Domain-specific data
```

### 4. **Hook Configuration**
```yaml
Enable for:
  - Code formatting (post-edit)
  - Safety validation (pre-bash)
  - Pattern learning (post-edit)
  - Session persistence (session-end/restore)

Disable for:
  - Performance-critical operations
  - Testing/debugging
  - One-off scripts
```

### 5. **Agent Coordination**
```yaml
File-Level Parallelism:
  - Assign agents to different file patterns
  - Communicate via commits and memory
  - Fail fast on conflicts

Work Stream Assignment:
  - Decompose tasks into independent streams
  - Each stream = agent + file patterns
  - Progress tracked in .claude/epics/{epic}/updates/
```

---

## Troubleshooting Common Issues

### Issue: Agents Not Coordinating
```yaml
Symptoms: Agents working independently, no shared context
Diagnosis:
  - Check memory namespace: npx claude-flow memory list
  - Verify hooks enabled: cat .claude/settings.json
  - Check MCP server status: echo $CLAUDE_FLOW_HOOKS_ENABLED
Solution:
  - Enable hooks in settings.json
  - Use memory_usage MCP tool explicitly
  - Add coordination keys to agent instructions
```

### Issue: Commands Not Routing
```yaml
Symptoms: User intent not matching to correct command
Diagnosis:
  - Check command-routing.md classification triggers
  - Verify request contains expected keywords
  - Check fallback hierarchy
Solution:
  - Use explicit command: /sparc:coder instead of "implement"
  - Update command-routing.md with new patterns
  - Use /sc:pm as fallback (handles all cases)
```

### Issue: Memory Not Persisting
```yaml
Symptoms: Session context lost between sessions
Diagnosis:
  - Check ReasoningBank initialization: ls .swarm/memory.db
  - Verify session-end hook executed
  - Check memory namespace
Solution:
  - Initialize ReasoningBank: npx claude-flow memory init --reasoningbank
  - Enable session hooks in settings.json
  - Use explicit persist: npx claude-flow hook session-end
```

### Issue: Parallel Execution Failing
```yaml
Symptoms: Operations executing sequentially
Diagnosis:
  - Check if multiple messages sent instead of one
  - Verify TodoWrite batching all todos
  - Check Task tool usage
Solution:
  - Batch ALL operations in single message
  - Use TodoWrite with 5-10+ todos at once
  - Spawn ALL agents in single Task tool invocation
```

---

## Future Architecture Considerations

### Planned Enhancements

1. **Enhanced Neural Learning**
   - Pattern library for common ML workflows
   - Auto-tuning of agent coordination strategies
   - Predictive agent spawning based on task analysis

2. **Advanced Memory Features**
   - Vector similarity search across all namespaces
   - Automatic memory cleanup and archival
   - Cross-project memory sharing

3. **Improved CCPM Integration**
   - Automatic epic decomposition using AI
   - GitHub Actions integration for CI/CD
   - Multi-repository epic coordination

4. **Extended MCP Ecosystem**
   - Custom MCP server for domain-specific tools
   - Third-party MCP server integration
   - MCP tool composition and chaining

5. **Enterprise Features**
   - Multi-tenant memory isolation
   - Role-based access control for commands
   - Audit logging and compliance tracking

---

## Conclusion

Evolve's framework architecture demonstrates a sophisticated multi-layer approach to AI-driven development:

**Key Strengths**:
1. **Clear Separation of Concerns**: Behavioral rules → Coordination → Execution → Lifecycle
2. **Extensibility**: 78+ agents, 214+ commands, 4 MCP servers, custom hooks
3. **Scalability**: Parallel execution, semantic memory, cross-session persistence
4. **Systematic Quality**: SPARC methodology, TDD enforcement, validation gates
5. **Developer Experience**: Command routing, intelligent defaults, comprehensive documentation

**Extension Points**: Neural learning, custom agents, SPARC modes, swarm strategies, hooks, memory namespaces, GitHub integration

**Performance**: 2.8-4.4x speed improvement, 84.8% problem-solving accuracy, 32.3% token reduction

**Recommendation**: Framework is production-ready for AI/ML workflow automation. Extension points are well-defined and documented. Consider prioritizing neural learning enhancements and custom ML agent development as next steps.

---

**Generated by**: System Architecture Designer
**Stored in memory**: `swarm/architect/findings` (coordination namespace)
**Architecture analysis complete**: 2025-11-28
