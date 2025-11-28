# Command Quick Reference

## 🚀 Most Used Commands

### PM (Project Management)
```bash
/pm:init                          # Initialize CCPM in project
/pm:prd-new "Feature Name"        # Create Product Requirement Document
/pm:epic-oneshot feature-name     # ⭐ Decompose + sync in one step
/pm:issue-start 123               # Start work on GitHub issue #123
/pm:status                        # Show overall status
/pm:next                          # Get next priority task
```

### SPARC (TDD)
```bash
/sparc:tdd "feature description"  # ⭐ Test-driven development
/sparc:orchestrator              # Coordinate multiple agents
/sparc:coder                     # Code implementation
/sparc:tester                    # Create and run tests
/sparc:reviewer                  # Code review
```

### Swarm (Multi-Agent)
```bash
/swarm:init --topology mesh      # Initialize swarm coordination
/swarm:spawn researcher          # Spawn specific agent type
/swarm:status                    # Check swarm health
```

### GitHub
```bash
/github:pr-manager               # ⭐ Manage pull requests
/github:code-review-swarm        # Multi-agent code review
/github:issue-tracker            # Track and triage issues
/github:repo-analyze             # Analyze repository
```

---

## 📂 Command Locations (New Structure)

### Core Commands
```
src/cli/commands/definitions/core/
├── pm/             PM workflow commands
├── sparc/          SPARC TDD agents
├── coordination/   Multi-agent coordination
└── swarm/          Swarm orchestration
```

### Workflow Commands
```
src/cli/commands/definitions/workflow/
├── github/         GitHub integration
├── hive-mind/      Collective intelligence
├── hooks/          Lifecycle automation
├── automation/     Smart automation
├── workflows/      Workflow orchestration
└── context/        Session management
```

### Analysis Commands
```
src/cli/commands/definitions/analysis/
├── monitoring/     System monitoring
├── analysis/       Performance analysis
├── optimization/   Execution optimization
├── memory/         Memory management
└── training/       Neural training
```

---

## 🔄 Common Workflows

### Full PM Workflow
```bash
# 1. Initialize
/pm:init

# 2. Create PRD
/pm:prd-new "User Authentication System"

# 3. Start epic and decompose + sync
/pm:epic-oneshot auth-system

# 4. Start working on first issue
/pm:issue-start 101

# 5. Analyze issue and create work streams
/pm:issue-analyze 101

# 6. Sync progress
/pm:issue-sync 101

# 7. Merge when complete
/pm:epic-merge auth-system
```

### SPARC TDD Workflow
```bash
# Quick TDD (recommended)
/sparc:tdd "shopping cart checkout"

# Manual TDD workflow
/sparc:orchestrator
/sparc:tester              # Write failing tests
/sparc:coder               # Implement minimum code
/sparc:tester              # Verify tests pass
/sparc:reviewer            # Review code
/sparc:optimizer           # Refactor
```

### Swarm Development
```bash
# 1. Initialize swarm
/swarm:init --topology hierarchical --max-agents 5

# 2. Spawn specialized agents
/swarm:spawn researcher
/swarm:spawn coder
/swarm:spawn tester
/swarm:spawn reviewer

# 3. Orchestrate task
/coordination:task-orchestrate "Implement user authentication"

# 4. Monitor progress
/swarm:status
/monitoring:real-time-view
```

### GitHub PR Workflow
```bash
# 1. Analyze repository
/github:repo-analyze

# 2. Create and manage PR
/github:pr-manager

# 3. Multi-agent code review
/github:code-review-swarm

# 4. Track issues
/github:issue-tracker
```

---

## 🎯 Command by Goal

### "I want to start a new feature"
```bash
/pm:prd-new "Feature Name"       # Create PRD
/pm:epic-oneshot feature-name    # Decompose and sync
```

### "I want to work with tests"
```bash
/sparc:tdd "feature"             # Full TDD workflow
/sparc:tester                    # Just create tests
```

### "I want multiple agents to help"
```bash
/swarm:init --topology mesh      # Initialize swarm
/coordination:task-orchestrate   # Distribute work
```

### "I want to review code"
```bash
/github:code-review-swarm        # Multi-agent review (best)
/github:code-review              # Single-agent review
/sparc:reviewer                  # SPARC reviewer agent
```

### "I want to track progress"
```bash
/pm:status                       # PM status
/pm:standup                      # Standup report
/swarm:status                    # Swarm status
/monitoring:status               # System status
```

### "I want to optimize performance"
```bash
/analysis:performance-bottlenecks    # Find bottlenecks
/optimization:parallel-execution     # Enable parallel ops
/optimization:auto-topology          # Optimize topology
```

---

## 🔍 Quick Search

### Find Commands by Keyword

**"epic"** → `/pm:epic-*` (13 commands)
- `epic-oneshot` ⭐ (decompose + sync)
- `epic-start`, `epic-decompose`, `epic-sync`, `epic-merge`

**"issue"** → `/pm:issue-*` (9 commands) + `/github:issue-*` (4 commands)
- `pm:issue-start`, `issue-analyze`, `issue-sync`
- `github:issue-tracker`, `issue-triage`

**"swarm"** → 30+ commands across categories
- `swarm:init`, `swarm:spawn`, `swarm:status`
- `github:code-review-swarm`, `swarm-pr`, `swarm-issue`
- `sparc:swarm-coordinator`

**"agent"** → 20+ commands
- `coordination:agent-spawn`
- `automation:auto-agent`, `smart-agents`
- `monitoring:agent-metrics`, `agents`

**"test"** → `/sparc:tester`, `/sparc:tdd`, `/swarm:testing`

**"review"** → `/github:code-review*`, `/sparc:reviewer`

**"monitor"** → `/monitoring/*`, `/swarm:monitor`, `/swarm:status`

---

## 📋 Command Categories at a Glance

| Category | Count | Priority | Key Commands |
|----------|-------|----------|--------------|
| **PM** | 37 | 🔴 CRITICAL | `epic-oneshot`, `issue-start`, `status` |
| **SPARC** | 18 | 🔴 CRITICAL | `tdd`, `orchestrator`, `coder`, `tester` |
| **GitHub** | 20 | 🟡 HIGH | `pr-manager`, `code-review-swarm`, `issue-tracker` |
| **Swarm** | 18 | 🔴 CRITICAL | `init`, `spawn`, `status` |
| **Hive Mind** | 13 | 🟡 HIGH | `init`, `consensus`, `memory` |
| **Coordination** | 5 | 🔴 CRITICAL | `init`, `agent-spawn`, `task-orchestrate` |
| **Hooks** | 8 | 🟡 HIGH | `setup`, `pre-task`, `post-task`, `post-edit` |
| **Automation** | 8 | 🟡 HIGH | `auto-agent`, `smart-spawn`, `self-healing` |
| **Monitoring** | 6 | 🟢 MEDIUM | `status`, `agent-metrics`, `real-time-view` |
| **Memory** | 5 | 🟡 HIGH | `persist`, `search`, `memory-usage` |

---

## 🆘 Troubleshooting

### Command Not Found
```bash
# Old path (deprecated)
.claude/commands/pm/epic-oneshot.md

# New path (use this)
src/cli/commands/definitions/core/pm/epic-oneshot.md
```

### Workflow Breaks
```bash
# Check dependencies
/pm:validate              # Validate PM state
/system:safety-check      # System safety check

# Check status
/pm:status                # PM status
/swarm:status             # Swarm status
/monitoring:status        # Overall status
```

### Agent Issues
```bash
# List available agents
/system:agents-list

# Check agent metrics
/monitoring:agent-metrics

# Restart swarm
/swarm:init --force
```

### GitHub Issues
```bash
# Check GitHub connection
gh auth status

# Refresh epic from GitHub
/pm:epic-refresh feature-name

# Sync issue status
/pm:issue-sync 123
```

---

## 🔗 Command Dependencies

### PM Dependencies
```
pm:init
  └─ pm:prd-new
      └─ pm:epic-start
          └─ pm:epic-decompose (optional: swarm:init)
              └─ pm:epic-sync (needs: gh CLI)
                  └─ pm:issue-start (optional: agents)
```

### SPARC Dependencies
```
sparc:orchestrator
  └─ sparc:tdd
      ├─ sparc:coder
      ├─ sparc:tester
      └─ sparc:swarm-coordinator (needs: swarm:init)
```

### Swarm Dependencies
```
coordination:init OR swarm:init
  └─ coordination:agent-spawn
      └─ coordination:task-orchestrate
          └─ [agents execute in parallel]
              └─ swarm:status
```

---

## 💡 Pro Tips

### 1. Use Oneshot Commands
```bash
# Instead of:
/pm:epic-decompose feature
/pm:epic-sync feature

# Use:
/pm:epic-oneshot feature    # ⭐ Saves time!
```

### 2. Let Swarms Do the Work
```bash
# Instead of manual work:
/sparc:coder
/sparc:tester
/sparc:reviewer

# Use:
/sparc:tdd "feature"        # ⭐ Orchestrates everything!
```

### 3. Leverage Auto-Agent
```bash
/automation:auto-agent      # ⭐ Automatically spawns agents based on context
```

### 4. Use Smart Workflows
```bash
/workflows:development      # Pre-configured dev workflow
/workflows:research         # Pre-configured research workflow
```

### 5. Monitor Everything
```bash
/monitoring:real-time-view  # ⭐ Live dashboard
/pm:standup                 # Daily standup report
```

---

## 📖 Additional Resources

- **Full Command List:** `docs/command-migration-mapping.csv`
- **Detailed Categories:** `docs/command-categories-detailed.md`
- **Migration Plan:** `docs/migration-plan.md`
- **Summary Overview:** `docs/command-organization-summary.md`

---

## 🎓 Learning Path

### Beginner
1. Start with PM workflow: `/pm:init` → `/pm:prd-new` → `/pm:epic-oneshot`
2. Try SPARC TDD: `/sparc:tdd "simple feature"`
3. Explore status: `/pm:status`, `/swarm:status`

### Intermediate
1. Use swarm coordination: `/swarm:init` → `/coordination:task-orchestrate`
2. GitHub integration: `/github:pr-manager`, `/github:code-review-swarm`
3. Automation: `/automation:auto-agent`, `/automation:smart-spawn`

### Advanced
1. Hive Mind: `/hive-mind:init` → `/hive-mind:consensus`
2. Hooks system: `/hooks:setup` → custom hooks
3. Optimization: `/optimization:auto-topology`, `/analysis:performance-bottlenecks`
4. Custom workflows: `/workflows:create` → `/workflows:execute`

---

**Last Updated:** 2025-01-20
**Version:** 2.0.0 (post-migration)
**Status:** ✅ Ready for use
