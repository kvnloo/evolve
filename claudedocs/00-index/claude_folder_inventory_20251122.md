# .claude Folder Migration Inventory
**Generated**: 2025-11-22
**Purpose**: Comprehensive catalog for SuperClaude slash command migration

---

## Executive Summary

### Migration Scope
- **Total Files**: 341 files
- **Command Files**: 214 markdown files
- **Agent Definitions**: 78 markdown files
- **Shell Scripts**: 10 scripts
- **Configuration Files**: 8 JSON files
- **Supporting Directories**: 68 directories

### File Distribution
```
.claude/
├── commands/     214 MD files (24 categories)
├── agents/       78 MD files (20 categories)
├── rules/        11 MD files
├── helpers/      6 shell scripts
├── context/      9 MD files
├── prds/         5 MD files
├── epics/        1 active epic (9 files)
├── sessions/     3 MD files
├── statusline/   4 JSON + scripts
└── tools/        UIED directory
```

---

## 1. Command Categories (24 Categories, 214 Files)

### 1.1 Project Management (38 files) ⚠️ HIGH COMPLEXITY
**Location**: `.claude/commands/pm/`
**Complexity**: 5/5 (Highest priority, most complex)

**Files**:
- Epic Management (14): `epic-oneshot.md`, `epic-decompose.md`, `epic-start.md`, `epic-status.md`, `epic-sync.md`, `epic-close.md`, `epic-edit.md`, `epic-list.md`, `epic-merge.md`, `epic-refresh.md`, `epic-show.md`, `epic-start-worktree.md`
- Issue Management (8): `issue-analyze.md`, `issue-start.md`, `issue-close.md`, `issue-edit.md`, `issue-reopen.md`, `issue-show.md`, `issue-status.md`, `issue-sync.md`
- PRD Management (5): `prd-new.md`, `prd-edit.md`, `prd-list.md`, `prd-parse.md`, `prd-status.md`
- Workflow (5): `next.md`, `status.md`, `standup.md`, `sync.md`, `search.md`
- Utilities (6): `blocked.md`, `clean.md`, `help.md`, `import.md`, `init.md`, `in-progress.md`, `validate.md`, `test-reference-update.md`

**Dependencies**:
- GitHub CLI (`gh`)
- Git worktrees
- `.claude/epics/` directory structure
- `.claude/prds/` directory structure
- `.claude/rules/` validation rules

**Migration Complexity**:
- Deep GitHub integration
- Worktree coordination
- Frontmatter parsing
- Multi-file orchestration

---

### 1.2 GitHub Integration (19 files) 🔴 CRITICAL
**Location**: `.claude/commands/github/`
**Complexity**: 4/5

**Files**:
- Core: `github-swarm.md`, `github-modes.md`
- PR Management: `pr-enhance.md`, `pr-manager.md`, `code-review.md`, `code-review-swarm.md`
- Issue Management: `issue-tracker.md`, `issue-triage.md`, `swarm-issue.md`
- Repository: `repo-analyze.md`, `repo-architect.md`, `multi-repo-swarm.md`
- Workflow: `workflow-automation.md`, `release-manager.md`, `release-swarm.md`, `project-board-sync.md`, `sync-coordinator.md`, `swarm-pr.md`
- README.md

**Dependencies**:
- GitHub CLI (`gh`)
- MCP `claude-flow` tools
- Swarm coordination system
- Agent spawning infrastructure

**Cross-References**:
- Uses agents from `.claude/agents/github/`
- Integrates with PM commands
- Requires swarm initialization

---

### 1.3 SPARC Methodology (18 files) 🟡 MEDIUM-HIGH
**Location**: `.claude/commands/sparc/`
**Complexity**: 4/5

**Files**:
- Core SPARC: `sparc-modes.md`, `orchestrator.md`, `swarm-coordinator.md`
- Phases: `analyzer.md`, `architect.md`, `coder.md`, `designer.md`, `tester.md`, `reviewer.md`, `debugger.md`
- Specialized: `researcher.md`, `documenter.md`, `optimizer.md`, `innovator.md`
- Utilities: `batch-executor.md`, `memory-manager.md`, `workflow-manager.md`
- TDD: `tdd.md`

**Dependencies**:
- SPARC agent definitions in `.claude/agents/sparc/`
- Memory system
- Batch execution framework

---

### 1.4 Swarm Coordination (17 files) 🟡 MEDIUM
**Location**: `.claude/commands/swarm/`
**Complexity**: 4/5

**Files**:
- Core: `swarm.md`, `swarm-init.md`, `swarm-modes.md`, `swarm-strategies.md`, `swarm-background.md`
- Operations: `swarm-spawn.md`, `swarm-status.md`, `swarm-monitor.md`, `swarm-analysis.md`
- Use Cases: `analysis.md`, `development.md`, `research.md`, `testing.md`, `maintenance.md`, `optimization.md`
- Documentation: `README.md`, `examples.md`

**Dependencies**:
- MCP `claude-flow` server
- Agent coordination infrastructure
- Topology configurations

---

### 1.5 Hive-Mind Operations (12 files) 🟢 MEDIUM
**Location**: `.claude/commands/hive-mind/`
**Complexity**: 3/5

**Files**:
- Core: `hive-mind.md`, `hive-mind-init.md`, `hive-mind-wizard.md`
- Operations: `hive-mind-spawn.md`, `hive-mind-status.md`, `hive-mind-stop.md`
- Advanced: `hive-mind-consensus.md`, `hive-mind-memory.md`, `hive-mind-metrics.md`
- Session: `hive-mind-sessions.md`, `hive-mind-resume.md`
- README.md

**Dependencies**:
- Hive-mind agents in `.claude/agents/hive-mind/`
- Consensus mechanisms
- Memory persistence

---

### 1.6 Automation (10 files) 🟡 MEDIUM
**Location**: `.claude/commands/automation/`
**Complexity**: 3/5

**Files**:
- Core: `auto-agent.md`, `smart-agents.md`, `smart-spawn.md`
- Workflows: `workflow-select.md`, `discovery_mode_command.md`
- Management: `session-memory.md`, `self-healing.md`
- Advanced: `AKPM.md` (symlink), `ARM.md`
- README.md

**Special Notes**:
- `AKPM.md` is a symlink to `../../../repos/orchestra/.claude/commands/AKPM.md`
- Contains `.claude-flow/` subdirectory with metrics

---

### 1.7 Pair Programming (9 files) 🟢 LOW-MEDIUM
**Location**: `.claude/commands/pair/`
**Complexity**: 2/5

**Files**:
- Setup: `start.md`, `config.md`, `session.md`
- Features: `modes.md`, `commands.md`, `templates.md`, `shortcuts.md`, `examples.md`
- README.md

**Dependencies**: Minimal, self-contained

---

### 1.8 Flow-Nexus Integration (9 files) 🟢 MEDIUM
**Location**: `.claude/commands/flow-nexus/`
**Complexity**: 3/5

**Files**:
- Core: `swarm.md`, `sandbox.md`, `workflow.md`
- Cloud Services: `app-store.md`, `neural-network.md`, `user-tools.md`, `challenges.md`
- Auth: `login-registration.md`, `payments.md`

**Dependencies**:
- MCP `flow-nexus` server
- Cloud account/authentication

---

### 1.9 Hooks System (8 files) 🔴 CRITICAL
**Location**: `.claude/commands/hooks/`
**Complexity**: 4/5

**Files**:
- Core: `overview.md`, `setup.md`
- Lifecycle: `pre-task.md`, `post-task.md`, `pre-edit.md`, `post-edit.md`, `session-end.md`
- README.md

**Dependencies**:
- `.claude/settings.json` hook configurations
- `claude-flow` hooks infrastructure

---

### 1.10 Statusline (8 files) 🟢 LOW
**Location**: `.claude/commands/statusline/`
**Complexity**: 2/5

**Files**:
- Core: `config.md`, `refresh.md`
- Workspace: `list-workspaces.md`, `switch-workspace.md`, `assign-instance.md`
- Navigation: `scroll-left.md`, `scroll-right.md`
- Agents: `get-agents.md`

**Dependencies**:
- `.claude/statusline/` directory with JSON configs
- `.claude/statusline-command.sh` script

---

### 1.11 Analysis (7 files) 🟢 LOW-MEDIUM
**Location**: `.claude/commands/analysis/`
**Complexity**: 2/5

**Files**:
- Performance: `performance-report.md`, `performance-bottlenecks.md`, `bottleneck-detect.md`
- Optimization: `token-usage.md`, `token-efficiency.md`
- Compliance: `COMMAND_COMPLIANCE_REPORT.md`
- README.md

---

### 1.12 Coordination (7 files) 🟡 MEDIUM
**Location**: `.claude/commands/coordination/`
**Complexity**: 3/5

**Files**:
- Core: `init.md`, `swarm-init.md`
- Operations: `spawn.md`, `agent-spawn.md`, `orchestrate.md`, `task-orchestrate.md`
- README.md

**Dependencies**:
- MCP coordination tools
- Agent infrastructure

---

### 1.13 Memory Management (6 files) 🟢 MEDIUM
**Location**: `.claude/commands/memory/`
**Complexity**: 3/5

**Files**:
- Core: `memory-usage.md`, `usage.md`
- Operations: `memory-persist.md`, `memory-search.md`
- Advanced: `neural.md`
- README.md

---

### 1.14 Monitoring (6 files) 🟢 LOW
**Location**: `.claude/commands/monitoring/`
**Complexity**: 2/5

**Files**:
- Core: `status.md`, `swarm-monitor.md`, `real-time-view.md`
- Agents: `agents.md`, `agent-metrics.md`
- README.md

---

### 1.15 Optimization (6 files) 🟢 MEDIUM
**Location**: `.claude/commands/optimization/`
**Complexity**: 3/5

**Files**:
- Core: `topology-optimize.md`, `auto-topology.md`
- Execution: `parallel-execute.md`, `parallel-execution.md`
- Cache: `cache-manage.md`
- README.md

---

### 1.16 Training (6 files) 🟢 MEDIUM
**Location**: `.claude/commands/training/`
**Complexity**: 3/5

**Files**:
- Core: `neural-train.md`, `neural-patterns.md`
- Learning: `pattern-learn.md`, `specialization.md`
- Management: `model-update.md`
- README.md

---

### 1.17 Workflows (6 files) 🟢 LOW-MEDIUM
**Location**: `.claude/commands/workflows/`
**Complexity**: 2/5

**Files**:
- Core: `workflow-create.md`, `workflow-execute.md`, `workflow-export.md`
- Use Cases: `development.md`, `research.md`
- README.md

---

### 1.18 Agents (5 files) 🟢 LOW
**Location**: `.claude/commands/agents/`
**Complexity**: 2/5

**Files**:
- Documentation: `agent-types.md`, `agent-capabilities.md`, `agent-coordination.md`, `agent-spawning.md`
- README.md

---

### 1.19 UI Commands (5 files) 🟡 MEDIUM-HIGH
**Location**: `.claude/commands/ui/`
**Complexity**: 4/5

**Files**:
- Core: `clone.md`, `clone-website.md`, `design.md`
- Analysis: `uied-analysis.md`
- Style: `style-guide.md`
- Setup: `_setup-screenshot-tools.sh`

**Dependencies**:
- UIED tools in `.claude/tools/UIED/`
- Playwright/screenshot capabilities
- Python dependencies

---

### 1.20 Context Management (3 files) 🟢 LOW
**Location**: `.claude/commands/context/`
**Complexity**: 1/5

**Files**: `create.md`, `update.md`, `prime.md`

---

### 1.21 Stream Chain (2 files) 🟢 LOW-MEDIUM
**Location**: `.claude/commands/stream-chain/`
**Complexity**: 2/5

**Files**: `pipeline.md`, `run.md`

---

### 1.22 Verify (2 files) 🟢 LOW
**Location**: `.claude/commands/verify/`
**Complexity**: 1/5

**Files**: `check.md`, `start.md`

---

### 1.23 Learning (2 files) 🟢 LOW
**Location**: `.claude/commands/` (root level)
**Complexity**: 1/5

**Files**: `learn-curriculum.md`, `learn-skill.md`

---

### 1.24 Miscellaneous (3 files) 🟢 LOW
**Location**: `.claude/commands/` (root level)
**Complexity**: 1/5

**Files**:
- `research-plan-only.md` (20KB, comprehensive research framework)
- `safety-check.md`
- `.claude/commands/system/agents-list.md`
- `.claude/commands/truth/start.md`

---

## 2. Agent Definitions (20 Categories, 78 Files)

### 2.1 Core Agents (5 files) 🔴 CRITICAL
**Location**: `.claude/agents/core/`
**Complexity**: 3/5

**Files**: `coder.md`, `planner.md`, `researcher.md`, `reviewer.md`, `tester.md`

**Structure**: YAML frontmatter + markdown documentation

---

### 2.2 GitHub Agents (13 files) 🟡 MEDIUM
**Location**: `.claude/agents/github/`

**Files**: `github-modes.md`, `code-review-swarm.md`, `issue-tracker.md`, `multi-repo-swarm.md`, `pr-manager.md`, `project-board-sync.md`, `release-manager.md`, `release-swarm.md`, `repo-architect.md`, `swarm-issue.md`, `swarm-pr.md`, `sync-coordinator.md`, `workflow-automation.md`

---

### 2.3 Flow-Nexus Agents (9 files) 🟢 MEDIUM
**Location**: `.claude/agents/flow-nexus/`

**Files**: `app-store.md`, `authentication.md`, `challenges.md`, `neural-network.md`, `payments.md`, `sandbox.md`, `swarm.md`, `user-tools.md`, `workflow.md`

---

### 2.4 Templates (9 files) 🟢 MEDIUM
**Location**: `.claude/agents/templates/`

**Files**: `automation-smart-agent.md`, `coordinator-swarm-init.md`, `github-pr-manager.md`, `implementer-sparc-coder.md`, `memory-coordinator.md`, `migration-plan.md`, `orchestrator-task.md`, `performance-analyzer.md`, `sparc-coordinator.md`

---

### 2.5 Consensus Agents (7 files) 🟡 MEDIUM-HIGH
**Location**: `.claude/agents/consensus/`

**Files**: `byzantine-coordinator.md`, `crdt-synchronizer.md`, `gossip-coordinator.md`, `performance-benchmarker.md`, `quorum-manager.md`, `raft-manager.md`, `security-manager.md`

---

### 2.6 Hive-Mind Agents (5 files) 🟢 MEDIUM
**Location**: `.claude/agents/hive-mind/`

**Files**: `collective-intelligence-coordinator.md`, `queen-coordinator.md`, `scout-explorer.md`, `swarm-memory-manager.md`, `worker-specialist.md`

---

### 2.7 Optimization Agents (5 files) 🟢 MEDIUM
**Location**: `.claude/agents/optimization/`

**Files**: `benchmark-suite.md`, `load-balancer.md`, `performance-monitor.md`, `resource-allocator.md`, `topology-optimizer.md`

---

### 2.8 SPARC Agents (4 files) 🟢 MEDIUM
**Location**: `.claude/agents/sparc/`

**Files**: `architecture.md`, `pseudocode.md`, `refinement.md`, `specification.md`

---

### 2.9 Reasoning Agents (4 files) 🟢 LOW-MEDIUM
**Location**: `.claude/agents/reasoning/`

**Files**: `README.md`, `agent.md`, `example-reasoning-agent-template.md`, `goal-planner.md`

---

### 2.10 Swarm Agents (3 files) 🟢 MEDIUM
**Location**: `.claude/agents/swarm/`

**Files**: `adaptive-coordinator.md`, `hierarchical-coordinator.md`, `mesh-coordinator.md`

---

### 2.11-2.20 Specialized Agents (Remaining 19 files)
- **Analysis** (2): code-analyzer, code-review/analyze-code-quality
- **Architecture** (1): system-design/arch-system-design
- **Data/ML** (1): ml/data-ml-model
- **Development** (1): backend/dev-backend-api
- **DevOps** (1): ci-cd/ops-cicd-github
- **Documentation** (1): api-docs/docs-api-openapi
- **Goal** (2): code-goal-planner, goal-planner
- **Neural** (1): safla-neural
- **Specialized** (1): mobile/spec-mobile-react-native
- **Testing** (2): unit/tdd-london-swarm, validation/production-validator
- **Base** (1): base-template-generator

---

## 3. Supporting Infrastructure

### 3.1 Rules (11 files) 🔴 CRITICAL
**Location**: `.claude/rules/`

**Files**:
- Operations: `worktree-operations.md`, `branch-operations.md`, `github-operations.md`, `test-execution.md`
- Standards: `path-standards.md`, `standard-patterns.md`, `agent-coordination.md`
- Utilities: `frontmatter-operations.md`, `strip-frontmatter.md`, `use-ast-grep.md`
- Infrastructure: `datetime.md`

**Complexity**: 4/5 (Critical for command execution)

---

### 3.2 Helpers (6 shell scripts) 🔴 CRITICAL
**Location**: `.claude/helpers/`

**Files**:
- `checkpoint-manager.sh`
- `github-safe.js` (JavaScript)
- `github-setup.sh`
- `quick-start.sh`
- `setup-mcp.sh`
- `standard-checkpoint-hooks.sh`

**Complexity**: 3/5

---

### 3.3 Context Files (9 files) 🟢 LOW
**Location**: `.claude/context/`

**Files**: `product-context.md`, `progress.md`, `project-brief.md`, `project-overview.md`, `project-structure.md`, `project-style-guide.md`, `project-vision.md`, `system-patterns.md`, `tech-context.md`

**Complexity**: 1/5 (Documentation, can migrate later)

---

### 3.4 PRDs (5 files) 🟢 LOW
**Location**: `.claude/prds/`

**Files**: `ccpm-framework-installation.md`, `mcp-ecosystem.md`, `multi-agent-orchestration.md`, `project-reorganization.md`, `superclaude-integration.md`

**Complexity**: 1/5 (Reference documentation)

---

### 3.5 Configuration Files (8 JSON files) 🔴 CRITICAL
**Files**:
- `.claude/settings.json` ⭐ **Most Critical**
- `.claude/settings.local.json`
- `.claude/settings.json.example`
- `.claude/statusline/config.json`
- `.claude/statusline/state.json`
- `.claude/statusline/workspace-assignments.json`
- `.claude/ccpm.config`
- Metrics: `.claude/commands/automation/.claude-flow/metrics/*.json`

**Complexity**: 5/5 (Hooks, permissions, environment)

---

### 3.6 Active Epics (1 epic, 9 files) ⚠️ HANDLE WITH CARE
**Location**: `.claude/epics/multi-agent-orchestration/`

**Files**: `epic.md`, `github-mapping.md`, `2.md` through `8.md`

**Note**: Should NOT be migrated (gitignored, project-specific)

---

### 3.7 Sessions (3 files) 🟢 LOW
**Location**: `.claude/sessions/`

**Files**: `NEXT-SESSION.md`, `RECOVERY-CHECKPOINT.md`, `session-2025-10-20-context-setup.md`

**Note**: Gitignored, project-specific state

---

### 3.8 Statusline Infrastructure 🟢 LOW-MEDIUM
**Location**: `.claude/statusline/`

**Structure**:
- `README.md`
- `config.json`, `state.json`, `workspace-assignments.json`
- `scripts/`: `assign-instance.sh`, `list-workspaces.sh`, `switch-workspace.sh`
- `.claude/statusline-command.sh` (root level)

**Complexity**: 2/5

---

### 3.9 Tools Directory 🟡 MEDIUM
**Location**: `.claude/tools/`

**Contents**: `README.md`, `UIED/` subdirectory

**Note**: UIED (UI Element Detection) tool integration

---

## 4. Batch Grouping Strategy

### Phase 1: Foundation (Priority 1) 🔴
**Estimated Effort**: 2-3 days
**Parallel Batches**: 3

**Batch 1A - Core Infrastructure**:
- `.claude/settings.json` → SuperClaude framework integration
- `.claude/rules/*.md` (all 11 files)
- `.claude/helpers/*.sh` (6 scripts)

**Batch 1B - Essential Agents**:
- `.claude/agents/core/*.md` (5 files)
- `.claude/agents/templates/*.md` (9 files)

**Batch 1C - Hooks System**:
- `.claude/commands/hooks/*.md` (8 files)
- Hook configurations from settings.json

---

### Phase 2: Core Commands (Priority 2) 🔴
**Estimated Effort**: 3-4 days
**Parallel Batches**: 4

**Batch 2A - Coordination**:
- `.claude/commands/coordination/*.md` (7 files)
- `.claude/commands/swarm/*.md` (17 files)
- Related agents: `.claude/agents/swarm/*.md` (3 files)

**Batch 2B - Project Management**:
- `.claude/commands/pm/*.md` (38 files)
- Complex dependencies, staged migration

**Batch 2C - GitHub Integration**:
- `.claude/commands/github/*.md` (19 files)
- `.claude/agents/github/*.md` (13 files)

**Batch 2D - SPARC Methodology**:
- `.claude/commands/sparc/*.md` (18 files)
- `.claude/agents/sparc/*.md` (4 files)

---

### Phase 3: Advanced Features (Priority 3) 🟡
**Estimated Effort**: 2-3 days
**Parallel Batches**: 4

**Batch 3A - Hive-Mind**:
- `.claude/commands/hive-mind/*.md` (12 files)
- `.claude/agents/hive-mind/*.md` (5 files)

**Batch 3B - Automation & Optimization**:
- `.claude/commands/automation/*.md` (10 files)
- `.claude/commands/optimization/*.md` (6 files)
- `.claude/agents/optimization/*.md` (5 files)

**Batch 3C - Analysis & Monitoring**:
- `.claude/commands/analysis/*.md` (7 files)
- `.claude/commands/monitoring/*.md` (6 files)
- `.claude/commands/training/*.md` (6 files)

**Batch 3D - Memory & Neural**:
- `.claude/commands/memory/*.md` (6 files)
- `.claude/agents/consensus/*.md` (7 files)
- `.claude/agents/neural/*.md` (1 file)

---

### Phase 4: Specialized Systems (Priority 4) 🟢
**Estimated Effort**: 2-3 days
**Parallel Batches**: 3

**Batch 4A - Flow-Nexus**:
- `.claude/commands/flow-nexus/*.md` (9 files)
- `.claude/agents/flow-nexus/*.md` (9 files)

**Batch 4B - UI & Workflows**:
- `.claude/commands/ui/*.md` (5 files + setup script)
- `.claude/commands/workflows/*.md` (6 files)
- `.claude/commands/pair/*.md` (9 files)

**Batch 4C - Specialized Agents**:
- `.claude/agents/analysis/*.md` (2 files)
- `.claude/agents/architecture/*.md` (1 file)
- `.claude/agents/data/*.md` (1 file)
- `.claude/agents/development/*.md` (1 file)
- `.claude/agents/devops/*.md` (1 file)
- `.claude/agents/documentation/*.md` (1 file)
- `.claude/agents/goal/*.md` (2 files)
- `.claude/agents/reasoning/*.md` (4 files)
- `.claude/agents/specialized/*.md` (1 file)
- `.claude/agents/testing/*.md` (2 files)

---

### Phase 5: Supporting Features (Priority 5) 🟢
**Estimated Effort**: 1-2 days
**Parallel Batches**: 2

**Batch 5A - Utilities**:
- `.claude/commands/statusline/*.md` (8 files)
- `.claude/statusline/*` (directory structure)
- `.claude/commands/context/*.md` (3 files)
- `.claude/commands/stream-chain/*.md` (2 files)
- `.claude/commands/verify/*.md` (2 files)
- `.claude/commands/agents/*.md` (5 files)
- `.claude/commands/system/agents-list.md`

**Batch 5B - Learning & Documentation**:
- `.claude/commands/learn-*.md` (2 files)
- `.claude/commands/research-plan-only.md`
- `.claude/commands/safety-check.md`
- `.claude/commands/truth/start.md`
- `.claude/tools/` directory
- `.claude/context/*.md` (9 files)

---

## 5. Dependency Graph

### Critical Dependencies
```
settings.json (hooks, permissions)
    ↓
rules/*.md (operational patterns)
    ↓
helpers/*.sh (core scripts)
    ↓
agents/core/*.md (base agents)
    ↓
commands/coordination/*.md (swarm init)
    ↓
[ALL OTHER COMMANDS]
```

### Cross-Category Dependencies
- **PM Commands** → GitHub CLI, Git worktrees, Rules
- **GitHub Commands** → MCP claude-flow, PM system, Swarm agents
- **SPARC Commands** → Agents, Memory system, Batch execution
- **Swarm Commands** → MCP tools, Agent infrastructure, Topology configs
- **Hive-Mind** → Consensus agents, Memory persistence
- **UI Commands** → UIED tools, Playwright, Python deps
- **Flow-Nexus** → MCP flow-nexus server, Cloud auth

---

## 6. Complexity Scoring System

### Complexity Levels (1-5)

**Level 1 - Trivial** 🟢:
- Self-contained markdown
- No external dependencies
- Documentation only
- Examples: context files, learning docs, verify commands

**Level 2 - Simple** 🟢:
- Basic tool usage
- Single-file operations
- Minimal coordination
- Examples: monitoring, statusline, workflows

**Level 3 - Moderate** 🟡:
- Multi-file coordination
- MCP tool integration
- Agent spawning
- Examples: memory, optimization, automation, hive-mind

**Level 4 - Complex** 🟡:
- Deep GitHub integration
- Worktree management
- Multi-agent orchestration
- Hook system integration
- Examples: GitHub commands, SPARC, hooks, UI commands

**Level 5 - Critical** 🔴:
- Core infrastructure
- PM system with worktrees
- Settings/configuration management
- Cross-system dependencies
- Examples: settings.json, PM commands, rules, helpers

---

## 7. Migration Risk Assessment

### High Risk (Requires Careful Migration) 🔴
1. **Settings.json**: Hooks, permissions, environment variables
2. **PM System**: GitHub integration, worktree coordination
3. **Rules Directory**: Critical operational patterns
4. **Helpers**: Core bash/JS scripts with complex logic
5. **Hooks System**: Lifecycle management, auto-formatting

### Medium Risk (Test Thoroughly) 🟡
1. **GitHub Commands**: External API dependencies
2. **SPARC System**: Multi-phase coordination
3. **Swarm Coordination**: MCP tool integration
4. **UI Commands**: Python/UIED tool dependencies
5. **Consensus Agents**: Distributed coordination logic

### Low Risk (Straightforward Migration) 🟢
1. **Documentation**: Context, PRDs, learning materials
2. **Simple Commands**: Monitoring, statusline, verify
3. **Basic Agents**: Core agents with standard structure
4. **Workflows**: Self-contained workflow definitions
5. **Pair Programming**: Session management only

---

## 8. Testing Strategy

### Per-Batch Testing
After each batch migration:
1. **Syntax Validation**: SuperClaude command parser
2. **Dependency Check**: All referenced files exist
3. **Agent Loading**: YAML frontmatter parses correctly
4. **Command Execution**: Test with sample inputs
5. **Hook Integration**: Pre/post hooks trigger correctly

### Integration Testing (Per Phase)
After each phase:
1. **Cross-Command**: Commands work together
2. **Agent Coordination**: Multi-agent workflows succeed
3. **MCP Integration**: Tools respond correctly
4. **GitHub Operations**: API calls work (if applicable)
5. **Performance**: No degradation from current system

### Final System Testing
Complete system migration:
1. **End-to-End Workflows**: PM → GitHub → Agents
2. **SPARC Pipeline**: Full TDD cycle
3. **Swarm Coordination**: Multi-agent orchestration
4. **Hook Lifecycle**: All hooks fire correctly
5. **Backward Compatibility**: Existing workflows unbroken

---

## 9. Migration Timeline Estimate

### Total Duration: 10-15 days (2-3 weeks)

**Phase 1 (Foundation)**: 2-3 days
- Critical infrastructure
- Cannot proceed without completion
- High complexity, careful migration

**Phase 2 (Core Commands)**: 3-4 days
- Largest file count
- PM system most complex
- Parallel migration possible

**Phase 3 (Advanced Features)**: 2-3 days
- Moderate complexity
- High parallelization potential
- Hive-mind, automation, analysis

**Phase 4 (Specialized Systems)**: 2-3 days
- Flow-Nexus, UI, specialized agents
- Medium complexity
- Good parallelization

**Phase 5 (Supporting Features)**: 1-2 days
- Utilities, documentation
- Low complexity
- Final cleanup

---

## 10. Success Metrics

### Quantitative Metrics
- ✅ 100% of command files migrated
- ✅ 100% of agent definitions migrated
- ✅ All tests passing
- ✅ No broken cross-references
- ✅ Hooks functioning correctly

### Qualitative Metrics
- ✅ SuperClaude commands work as expected
- ✅ Agent coordination maintains quality
- ✅ PM workflows unchanged for users
- ✅ Performance maintained or improved
- ✅ Documentation updated

---

## 11. Rollback Strategy

### Per-Batch Rollback
If batch migration fails:
1. Revert SuperClaude command additions
2. Restore original .claude/ structure
3. Document failure reason
4. Fix issues before retry

### Phase Rollback
If phase integration fails:
1. Keep completed batches
2. Revert incomplete batches
3. Test previous phase functionality
4. Address integration issues

### Complete Rollback
If system migration fails:
1. Preserve current .claude/ structure
2. Remove all SuperClaude commands
3. Restore original workflows
4. Reassess migration approach

---

## 12. Post-Migration Tasks

### Immediate (Day 1-2)
1. Update project documentation
2. Notify users of command changes
3. Create migration guide
4. Monitor for issues

### Short-term (Week 1-2)
1. Gather user feedback
2. Address discovered issues
3. Optimize performance bottlenecks
4. Create usage examples

### Long-term (Month 1-3)
1. Deprecate old .claude/ structure
2. Clean up redundant files
3. Enhance based on usage patterns
4. Document best practices

---

## 13. Key Migration Principles

### For Commands
1. **Preserve Behavior**: Commands must work identically
2. **Maintain Dependencies**: All cross-references intact
3. **Keep Metadata**: YAML frontmatter preserved
4. **Test Thoroughly**: Every command validated
5. **Document Changes**: Clear migration notes

### For Agents
1. **Preserve Structure**: YAML + Markdown format
2. **Maintain Hooks**: Pre/post hooks functional
3. **Keep Capabilities**: All agent features work
4. **Test Coordination**: Multi-agent workflows succeed
5. **Validate Metadata**: All frontmatter fields correct

### For Infrastructure
1. **Settings First**: Migrate configuration before commands
2. **Rules Early**: Operational patterns before execution
3. **Helpers Intact**: Scripts work in new structure
4. **Hooks Configured**: Lifecycle management working
5. **Test Incrementally**: Validate each component

---

## 14. Special Considerations

### Symbolic Links
- `.claude/commands/automation/AKPM.md` → `../../../repos/orchestra/.claude/commands/AKPM.md`
- **Action**: Copy file or maintain external reference

### Gitignored Directories
- `.claude/epics/` (except templates)
- `.claude/sessions/`
- `.claude/checkpoints/`
- **Action**: Document structure, exclude from migration

### JSON Metrics
- `.claude/commands/automation/.claude-flow/metrics/*.json`
- **Action**: Migration strategy for metrics persistence

### Python Dependencies
- `.claude/tools/UIED/`
- **Action**: Ensure Python environment setup documented

### MCP Server Requirements
- `claude-flow` (required)
- `ruv-swarm` (optional)
- `flow-nexus` (optional)
- **Action**: Document server setup in migration guide

---

## 15. File-by-File Tracking Template

### Batch Migration Checklist
```markdown
## Batch [X]: [Name]
**Status**: 🔴 Not Started | 🟡 In Progress | 🟢 Completed

### Files
- [ ] file1.md - Complexity: X/5
  - Dependencies: [list]
  - Testing: [status]
  - Issues: [notes]
- [ ] file2.md - Complexity: X/5
  ...

### Integration Tests
- [ ] Test 1: [description]
- [ ] Test 2: [description]

### Notes
[Migration notes, issues, decisions]
```

---

## Appendix A: Command File Listing

### Complete PM Command List (38 files)
1. `epic-oneshot.md` - Decompose and sync epic (5/5)
2. `epic-decompose.md` - Break epic into tasks (4/5)
3. `epic-start.md` - Begin epic work (3/5)
4. `epic-status.md` - Show epic progress (2/5)
5. `epic-sync.md` - Sync epic to GitHub (4/5)
6. `epic-close.md` - Close completed epic (3/5)
7. `epic-edit.md` - Modify epic details (2/5)
8. `epic-list.md` - List all epics (1/5)
9. `epic-merge.md` - Merge epic branches (4/5)
10. `epic-refresh.md` - Update epic state (2/5)
11. `epic-show.md` - Display epic details (1/5)
12. `epic-start-worktree.md` - Create epic worktree (4/5)
13. `issue-analyze.md` - Analyze issue complexity (3/5)
14. `issue-start.md` - Begin issue work (3/5)
15. `issue-close.md` - Close completed issue (2/5)
16. `issue-edit.md` - Modify issue details (2/5)
17. `issue-reopen.md` - Reopen closed issue (2/5)
18. `issue-show.md` - Display issue details (1/5)
19. `issue-status.md` - Show issue progress (1/5)
20. `issue-sync.md` - Sync issue to GitHub (3/5)
21. `prd-new.md` - Create new PRD (2/5)
22. `prd-edit.md` - Modify PRD (2/5)
23. `prd-list.md` - List all PRDs (1/5)
24. `prd-parse.md` - Parse PRD into epic (3/5)
25. `prd-status.md` - Show PRD details (1/5)
26. `next.md` - Get next priority task (2/5)
27. `status.md` - Overall project status (2/5)
28. `standup.md` - Generate standup report (2/5)
29. `sync.md` - Sync all to GitHub (3/5)
30. `search.md` - Search PRDs/epics (2/5)
31. `blocked.md` - Show blocked items (1/5)
32. `clean.md` - Clean up stale items (2/5)
33. `help.md` - PM system help (1/5)
34. `import.md` - Import external tasks (3/5)
35. `init.md` - Initialize PM system (3/5)
36. `in-progress.md` - Show active work (1/5)
37. `validate.md` - Validate PM structure (2/5)
38. `test-reference-update.md` - Update test references (2/5)

---

## Appendix B: Agent Definition Listing

### Core Agents (5 files)
1. `coder.md` - Code implementation specialist
2. `planner.md` - Task planning and orchestration
3. `researcher.md` - Information gathering and analysis
4. `reviewer.md` - Code review and quality assurance
5. `tester.md` - Test creation and validation

### GitHub Agents (13 files)
1. `github-modes.md` - GitHub operation modes
2. `code-review-swarm.md` - Multi-agent code review
3. `issue-tracker.md` - Issue management
4. `multi-repo-swarm.md` - Cross-repository coordination
5. `pr-manager.md` - Pull request orchestration
6. `project-board-sync.md` - Project board synchronization
7. `release-manager.md` - Release coordination
8. `release-swarm.md` - Multi-agent release management
9. `repo-architect.md` - Repository structure design
10. `swarm-issue.md` - Issue swarm coordination
11. `swarm-pr.md` - PR swarm coordination
12. `sync-coordinator.md` - GitHub synchronization
13. `workflow-automation.md` - GitHub Actions automation

[Additional agent categories follow similar pattern...]

---

## Appendix C: Configuration Reference

### settings.json Structure
```json
{
  "env": {
    "CLAUDE_FLOW_AUTO_COMMIT": "false",
    "CLAUDE_FLOW_AUTO_PUSH": "false",
    "CLAUDE_FLOW_HOOKS_ENABLED": "true",
    "CLAUDE_FLOW_TELEMETRY_ENABLED": "true",
    "CLAUDE_FLOW_REMOTE_EXECUTION": "true",
    "CLAUDE_FLOW_CHECKPOINTS_ENABLED": "true"
  },
  "permissions": { ... },
  "hooks": {
    "PreToolUse": [ ... ],
    "PostToolUse": [ ... ],
    "PreCompact": [ ... ],
    "Stop": [ ... ]
  },
  "includeCoAuthoredBy": true,
  "enabledMcpjsonServers": ["claude-flow", "ruv-swarm"],
  "statusLine": {
    "type": "command",
    "command": ".claude/statusline-command.sh"
  }
}
```

---

## Next Steps

1. **Review Inventory**: Validate completeness and accuracy
2. **Prioritize Batches**: Confirm phase ordering
3. **Create Migration Scripts**: Automate repetitive conversions
4. **Set Up Testing Framework**: Prepare validation infrastructure
5. **Begin Phase 1**: Start with foundation migration

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Maintainer**: Code Quality Analyzer Agent
