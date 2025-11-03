# Detailed Command Categories

## Category: PM (Project Management) - 37 Commands
**Priority:** CRITICAL
**Purpose:** CCPM (Claude Code Project Management) workflow from PRD to implementation

### Commands by Workflow Stage:

#### Stage 1: Initialization (2 commands)
- `init.md` - Initialize CCPM system in project
- `help.md` - CCPM documentation and usage

#### Stage 2: PRD Management (5 commands)
- `prd-new.md` - Create new product requirement document
- `prd-edit.md` - Edit existing PRD
- `prd-list.md` - List all PRDs
- `prd-parse.md` - Parse PRD into epic
- `prd-status.md` - Show PRD status

#### Stage 3: Epic Management (13 commands)
- `epic-start.md` - Start new epic from PRD
- `epic-decompose.md` - Break epic into tasks
- `epic-sync.md` - Sync epic to GitHub
- `epic-oneshot.md` - Decompose + sync in one operation (⭐ HIGH VALUE)
- `epic-edit.md` - Edit epic content
- `epic-list.md` - List all epics
- `epic-show.md` - Display epic details
- `epic-status.md` - Show epic progress
- `epic-refresh.md` - Refresh epic from GitHub
- `epic-start-worktree.md` - Create git worktree for epic
- `epic-merge.md` - Merge epic back to main
- `epic-close.md` - Close completed epic
- `import.md` - Import external epic

#### Stage 4: Issue/Task Management (9 commands)
- `issue-start.md` - Start work on specific issue
- `issue-analyze.md` - Analyze issue and create work streams (⭐ KEY)
- `issue-sync.md` - Sync issue status to GitHub
- `issue-show.md` - Display issue details
- `issue-status.md` - Show issue progress
- `issue-edit.md` - Edit issue content
- `issue-close.md` - Close completed issue
- `issue-reopen.md` - Reopen closed issue
- `next.md` - Get next priority task

#### Stage 5: Monitoring & Reports (6 commands)
- `status.md` - Overall CCPM status
- `in-progress.md` - List in-progress work
- `blocked.md` - List blocked issues
- `standup.md` - Generate standup report
- `search.md` - Search across CCPM data
- `sync.md` - General sync operations

#### Stage 6: Utilities (2 commands)
- `validate.md` - Validate CCPM state
- `clean.md` - Clean up CCPM artifacts
- `test-reference-update.md` - Update test references

### Key Dependencies:
- Git (for worktree management)
- GitHub CLI (for issue sync)
- Bash (for file operations)

### Critical Workflows:

**Quick Start:**
```
/pm:init → /pm:prd-new → /pm:epic-oneshot → /pm:issue-start
```

**Full Workflow:**
```
/pm:init
  ↓
/pm:prd-new "Feature Name"
  ↓
/pm:epic-start feature-name
  ↓
/pm:epic-decompose feature-name
  ↓
/pm:epic-sync feature-name
  ↓
/pm:issue-start {issue-number}
  ↓
/pm:issue-analyze {issue-number}
  ↓
[development work]
  ↓
/pm:issue-sync {issue-number}
  ↓
/pm:epic-merge feature-name
```

---

## Category: SPARC - 18 Commands
**Priority:** CRITICAL
**Purpose:** Test-driven development with AI agent coordination

### Agent Types:

#### Core Development Agents (4 commands)
- `coder.md` - Code implementation agent (⭐ CRITICAL)
- `tester.md` - Test creation and execution (⭐ CRITICAL)
- `reviewer.md` - Code review agent
- `debugger.md` - Debugging specialist

#### Architecture & Design (3 commands)
- `architect.md` - System architecture design
- `designer.md` - Interface and component design
- `researcher.md` - Research and investigation

#### Quality & Optimization (3 commands)
- `analyzer.md` - Code analysis
- `optimizer.md` - Performance optimization
- `documenter.md` - Documentation generation

#### Coordination (4 commands)
- `orchestrator.md` - Agent coordination (⭐ CRITICAL)
- `swarm-coordinator.md` - Multi-agent swarm coordination
- `workflow-manager.md` - Workflow orchestration
- `batch-executor.md` - Batch operation execution

#### Specialized (4 commands)
- `tdd.md` - Test-driven development mode (⭐ CRITICAL)
- `memory-manager.md` - SPARC memory management
- `innovator.md` - Innovation and ideation
- `sparc-modes.md` - Mode documentation

### TDD Workflow:
```
/sparc:tdd "feature name"
  ↓
orchestrator spawns:
  ├→ tester (writes failing tests)
  ├→ coder (implements minimum code)
  ├→ tester (verifies tests pass)
  ├→ reviewer (code review)
  └→ optimizer (refactoring)
```

---

## Category: GitHub - 20 Commands
**Priority:** HIGH
**Purpose:** GitHub integration and automation

### Issue Management (4 commands)
- `issue-tracker.md` - Issue tracking automation
- `issue-triage.md` - Automatic issue triage
- `swarm-issue.md` - Multi-agent issue handling
- `project-board-sync.md` - Project board synchronization

### Pull Request Management (4 commands)
- `pr-manager.md` - PR workflow management (⭐ KEY)
- `pr-enhance.md` - PR enhancement automation
- `swarm-pr.md` - Multi-agent PR handling
- `sync-coordinator.md` - PR/issue sync coordination

### Code Review (2 commands)
- `code-review.md` - Code review automation
- `code-review-swarm.md` - Multi-agent code review (⭐ PREFERRED)

### Repository Operations (4 commands)
- `repo-analyze.md` - Repository analysis
- `repo-architect.md` - Repository architecture planning
- `multi-repo-swarm.md` - Multi-repository coordination
- `workflow-automation.md` - GitHub Actions automation

### Release Management (2 commands)
- `release-manager.md` - Release workflow
- `release-swarm.md` - Multi-agent release coordination

### Meta (4 commands)
- `github-modes.md` - GitHub operation modes
- `github-swarm.md` - General swarm operations
- `README.md` - Category documentation

### Integration with CCPM:
```
CCPM epic-sync → GitHub issue creation
CCPM issue-sync → GitHub issue updates
GitHub PR → Code review swarm → Merge coordination
```

---

## Category: Swarm - 18 Commands
**Priority:** CRITICAL
**Purpose:** Multi-agent coordination and orchestration

### Core Operations (5 commands)
- `init.md` - Swarm initialization (⭐ CRITICAL)
- `spawn.md` - Agent spawning
- `status.md` - Swarm status monitoring
- `monitor.md` - Real-time swarm monitoring
- `overview.md` - Swarm system overview

### Workflow Types (6 commands)
- `development.md` - Development workflows
- `analysis.md` - Analysis workflows
- `research.md` - Research workflows
- `testing.md` - Testing workflows
- `maintenance.md` - Maintenance workflows
- `optimization.md` - Optimization workflows

### Configuration (4 commands)
- `modes.md` - Swarm operation modes
- `strategies.md` - Coordination strategies
- `background.md` - Background processing
- `examples.md` - Usage examples

### Meta (3 commands)
- `swarm.md` - Swarm overview (duplicate of overview.md?)
- `swarm-analysis.md` - Analysis workflows (duplicate of analysis.md?)
- `README.md` - Category documentation

### Topology Types:
- **Mesh:** Peer-to-peer coordination
- **Hierarchical:** Tree-based delegation
- **Ring:** Circular processing
- **Star:** Centralized coordination

---

## Category: Hive Mind - 13 Commands
**Priority:** HIGH
**Purpose:** Collective intelligence and distributed consensus

### Lifecycle (6 commands)
- `init.md` - System initialization (⭐ CRITICAL)
- `spawn.md` - Agent spawning for hive
- `status.md` - Hive status
- `resume.md` - Session restoration
- `stop.md` - Hive shutdown
- `wizard.md` - Setup wizard

### Core Features (4 commands)
- `consensus.md` - Consensus mechanisms
- `memory.md` - Collective memory
- `sessions.md` - Session management
- `metrics.md` - Performance metrics

### Meta (3 commands)
- `overview.md` - Hive Mind overview
- `hive-mind.md` - General documentation (duplicate?)
- `README.md` - Category documentation

### Consensus Algorithms:
- Byzantine Fault Tolerance
- Raft
- Proof-of-Learning
- Gossip Protocol

---

## Category: Coordination - 8 Commands (after deduplication: 5)
**Priority:** CRITICAL
**Purpose:** Foundation for all multi-agent operations

### Core (3 commands)
- `init.md` - Coordination initialization
- `swarm-init.md` - Swarm-specific initialization
- `README.md` - Category documentation

### Agent Management (3 commands - CONSOLIDATE TO 1)
- `agent-spawn.md` - Agent spawning
- `spawn.md` - Agent spawning (DUPLICATE)
- **Recommendation:** Keep `agent-spawn.md`

### Task Orchestration (2 commands - CONSOLIDATE TO 1)
- `orchestrate.md` - Task orchestration
- `task-orchestrate.md` - Task orchestration (DUPLICATE)
- **Recommendation:** Keep `task-orchestrate.md` (more specific)

### Post-Deduplication:
1. `init.md`
2. `swarm-init.md`
3. `agent-spawn.md`
4. `task-orchestrate.md`
5. `README.md`

---

## Category: Hooks - 8 Commands
**Priority:** HIGH
**Purpose:** Automated lifecycle event handling

### Setup (2 commands)
- `setup.md` - Hook system configuration (⭐ MUST RUN FIRST)
- `overview.md` - Hook system overview

### Task Lifecycle (2 commands)
- `pre-task.md` - Before task execution
- `post-task.md` - After task completion

### Edit Lifecycle (2 commands)
- `pre-edit.md` - Before file edits
- `post-edit.md` - After file edits

### Session Lifecycle (1 command)
- `session-end.md` - Session completion

### Meta (1 command)
- `README.md` - Category documentation

### Hook Examples:
```bash
pre-task: Agent assignment, validation, resource prep
post-edit: Auto-format, pattern training, memory update
session-end: Summary generation, metrics tracking
```

---

## Category: Automation - 8 Commands
**Priority:** HIGH
**Purpose:** Intelligent automation and self-optimization

### Agent Automation (3 commands)
- `auto-agent.md` - Automatic agent spawning (⭐ KEY)
- `smart-agents.md` - Intelligent agent behaviors
- `smart-spawn.md` - Smart spawning strategies

### Workflow Automation (2 commands)
- `workflow-select.md` - Automatic workflow selection
- `self-healing.md` - Automated error recovery

### Session Management (1 command)
- `session-memory.md` - Session context persistence

### Meta (2 commands)
- `README.md` - Category documentation

### Auto-Spawning Triggers:
- File type detection (`.py` → python specialist)
- Complexity analysis (high → multi-agent swarm)
- Error patterns (failures → debugger + reviewer)
- Performance issues (slow → optimizer + profiler)

---

## Category: Monitoring - 6 Commands
**Priority:** MEDIUM
**Purpose:** System observability and performance tracking

### Agent Monitoring (2 commands)
- `agents.md` - Agent status monitoring
- `agent-metrics.md` - Agent performance metrics

### Swarm Monitoring (1 command)
- `swarm-monitor.md` - Swarm health monitoring

### General Monitoring (2 commands)
- `status.md` - Overall system status
- `real-time-view.md` - Live monitoring dashboard

### Meta (1 command)
- `README.md` - Category documentation

### Metrics Tracked:
- Token usage
- Execution time
- Error rates
- Agent utilization
- Memory consumption
- Success rates

---

## Category: Analysis - 7 Commands (after dedup: 5)
**Priority:** MEDIUM
**Purpose:** Performance analysis and optimization insights

### Performance Analysis (3 commands - CONSOLIDATE TO 1)
- `bottleneck-detect.md` - Bottleneck detection
- `performance-bottlenecks.md` - Performance analysis (PREFERRED)
- `performance-report.md` - Performance reporting

### Token Analysis (2 commands)
- `token-efficiency.md` - Token efficiency analysis
- `token-usage.md` - Token usage tracking

### Meta (2 commands)
- `README.md` - Category documentation
- `COMMAND_COMPLIANCE_REPORT.md` - Move to /docs (not a command)

### Post-Deduplication:
1. `performance-bottlenecks.md`
2. `performance-report.md`
3. `token-efficiency.md`
4. `token-usage.md`
5. `README.md`

---

## Category: Optimization - 6 Commands (after dedup: 5)
**Priority:** MEDIUM
**Purpose:** Execution optimization and performance enhancement

### Parallel Execution (2 commands - CONSOLIDATE TO 1)
- `parallel-execute.md` - Parallel execution
- `parallel-execution.md` - Parallel execution (PREFERRED - noun form)

### Topology Optimization (2 commands)
- `auto-topology.md` - Automatic topology selection
- `topology-optimize.md` - Topology optimization

### Resource Management (1 command)
- `cache-manage.md` - Cache management

### Meta (1 command)
- `README.md` - Category documentation

### Post-Deduplication:
1. `parallel-execution.md`
2. `auto-topology.md`
3. `topology-optimize.md`
4. `cache-manage.md`
5. `README.md`

---

## Category: Memory - 6 Commands (after dedup: 5)
**Priority:** HIGH
**Purpose:** Context persistence and retrieval

### Core Operations (3 commands)
- `persist.md` - Memory persistence
- `search.md` - Memory search
- `neural.md` - Neural memory features

### Usage Tracking (2 commands - CONSOLIDATE TO 1)
- `usage.md` - Memory usage
- `memory-usage.md` - Memory usage (PREFERRED - consistent naming)

### Meta (1 command)
- `README.md` - Category documentation

### Post-Deduplication:
1. `persist.md`
2. `search.md`
3. `neural.md`
4. `memory-usage.md`
5. `README.md`

---

## Category: Training - 6 Commands
**Priority:** MEDIUM
**Purpose:** Neural model training and pattern learning

### Neural Training (2 commands)
- `neural-train.md` - Neural network training
- `model-update.md` - Model updates

### Pattern Learning (2 commands)
- `pattern-learn.md` - Pattern learning from successes
- `neural-patterns.md` - Neural pattern recognition

### Specialization (1 command)
- `specialization.md` - Agent specialization training

### Meta (1 command)
- `README.md` - Category documentation

---

## Category: Context - 3 Commands
**Priority:** HIGH
**Purpose:** Session context management

### Lifecycle (3 commands)
- `create.md` - Create new context
- `prime.md` - Prime context with information
- `update.md` - Update existing context

### Usage Pattern:
```
create → prime → update (throughout session)
```

---

## Category: Workflows - 6 Commands
**Priority:** HIGH
**Purpose:** High-level workflow orchestration

### Core Operations (3 commands)
- `create.md` - Create workflow definition
- `execute.md` - Execute workflow
- `export.md` - Export workflow template

### Workflow Types (2 commands)
- `development.md` - Development workflows
- `research.md` - Research workflows

### Meta (1 command)
- `README.md` - Category documentation

---

## Category: Flow-Nexus - 9 Commands
**Priority:** MEDIUM
**Purpose:** Flow-Nexus platform integration

### Authentication (1 command)
- `login-registration.md` → `auth.md`

### Core Features (4 commands)
- `sandbox.md` - Sandbox management
- `swarm.md` - Swarm features
- `neural-network.md` → `neural.md`
- `workflow.md` - Workflow features

### Marketplace (2 commands)
- `app-store.md` - App store integration
- `challenges.md` - Coding challenges

### Utilities (2 commands)
- `payments.md` - Payment features
- `user-tools.md` - User management tools

---

## Categories: Utilities (Low Priority)

### Pair Programming - 6 Commands
- `start.md`, `session.md`, `config.md`, `modes.md`, `commands.md`, `examples.md`

### Statusline - 6 Commands
- `config.md`, `get-agents.md`, `refresh.md`, `scroll-left.md`, `scroll-right.md`, `switch-workspace.md`

### Learning - 2 Commands
- `curriculum.md`, `skill.md`

### Stream Chain - 2 Commands
- `pipeline.md`, `run.md`

### Research - 1 Command
- `plan-only.md`

### Truth - 1 Command
- `start.md`

### Verify - 2 Commands
- `check.md`, `start.md`

---

## System - 2 Commands + 5 Docs
**Priority:** HIGH (core utilities)

### Core Commands:
- `agents-list.md` - List all available agents
- `safety-check.md` - System safety validation (⭐ CRITICAL)

### Documentation (in agents/):
- `agent-capabilities.md`
- `agent-coordination.md`
- `agent-spawning.md`
- `agent-types.md`
- `README.md`

---

## Summary Statistics

### By Priority:
- **CRITICAL:** 15 categories (PM, SPARC, Coordination, Swarm, Hooks, Context)
- **HIGH:** 6 categories (GitHub, Hive Mind, Automation, Workflows, Memory, System)
- **MEDIUM:** 7 categories (Monitoring, Analysis, Optimization, Training, Flow-Nexus, Research, Stream Chain)
- **LOW:** 5 categories (Pair, Statusline, Learning, Truth, Verify)

### By Command Count:
- **PM:** 37 commands (largest)
- **GitHub:** 20 commands
- **SPARC:** 18 commands
- **Swarm:** 18 commands
- **Hive Mind:** 13 commands
- **Others:** < 10 commands each

### Deduplication Impact:
- **Before:** 196 files
- **After consolidation:** ~184 files (12 duplicates removed)
- **Percentage reduction:** ~6%
