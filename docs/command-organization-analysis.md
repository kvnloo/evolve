# Command Organization Analysis

## Executive Summary

**Total Commands Cataloged:** 196 files
**Categories Identified:** 23 major categories
**Critical Commands:** 15
**High Priority:** 78
**Medium Priority:** 82
**Low Priority:** 21

---

## Category Breakdown

### 1. **PM (Project Management)** - 37 commands
**Priority:** CRITICAL for CCPM system
**Dependencies:** Git, GitHub CLI, worktrees

Core workflow commands:
- `pm-init` → `prd-new` → `epic-start` → `epic-decompose` → `epic-sync` → `issue-start`

**Critical Path:**
```
init → prd-new → epic-start → epic-decompose → epic-sync → issue-start
```

**Key Commands:**
- `epic-oneshot.md` - High-value automation (decompose + sync in one)
- `issue-analyze.md` - Work stream analysis
- `epic-start-worktree.md` - Git worktree management

**Duplicates to Resolve:**
- None identified in PM namespace

---

### 2. **SPARC** - 18 commands
**Priority:** CRITICAL for TDD workflow
**Dependencies:** npm, testing frameworks

Core agents:
- `coder`, `tester`, `reviewer`, `architect`, `analyzer`

**Workflow Dependencies:**
```
orchestrator → [coder, tester, reviewer] → swarm-coordinator
tdd → [coder, tester]
```

**Key Commands:**
- `tdd.md` - Test-driven development mode
- `orchestrator.md` - Agent coordination
- `swarm-coordinator.md` - Multi-agent workflows

---

### 3. **GitHub** - 20 commands
**Priority:** HIGH for repository operations
**Dependencies:** GitHub CLI, Git

**Command Groups:**
1. **Issue Management:** `issue-tracker`, `issue-triage`, `swarm-issue`
2. **PR Management:** `pr-manager`, `pr-enhance`, `swarm-pr`
3. **Code Review:** `code-review`, `code-review-swarm`
4. **Repository:** `repo-analyze`, `repo-architect`
5. **Release:** `release-manager`, `release-swarm`

**Potential Duplicates:**
- `github-swarm.md` vs `swarm-issue.md` + `swarm-pr.md` (check consolidation)
- `code-review.md` vs `code-review-swarm.md` (swarm version supersedes?)

---

### 4. **Swarm** - 18 commands
**Priority:** CRITICAL for multi-agent coordination
**Dependencies:** MCP servers, coordination system

**Core Commands:**
- `swarm-init.md` - Foundation for all swarm operations
- `swarm-spawn.md` - Agent creation
- `swarm-status.md` - Monitoring

**Workflow Types:**
- `analysis`, `development`, `research`, `testing`, `maintenance`, `optimization`

**Duplicates Found:**
- `swarm-analysis.md` vs `analysis.md` (CONSOLIDATE)
- `swarm-monitor.md` vs monitoring category commands (CHECK OVERLAP)

---

### 5. **Hive Mind** - 13 commands
**Priority:** HIGH for collective intelligence
**Dependencies:** Swarm system, memory system

**Lifecycle:**
```
init → spawn → [consensus, memory, sessions] → status → stop
```

**Commands:**
- `hive-mind-init.md` - System initialization
- `hive-mind-wizard.md` - Setup assistant
- `hive-mind-resume.md` - Session restoration

---

### 6. **Coordination** - 8 commands
**Priority:** CRITICAL (foundation layer)
**Dependencies:** MCP servers

**Duplicates to Resolve:**
- `agent-spawn.md` vs `spawn.md` (CONSOLIDATE)
- `orchestrate.md` vs `task-orchestrate.md` (CONSOLIDATE)
- `init.md` vs `swarm-init.md` (Different scopes? CLARIFY)

---

### 7. **Hooks** - 8 commands
**Priority:** HIGH for automation
**Dependencies:** Hook system setup

**Lifecycle Hooks:**
- `pre-task`, `post-task`
- `pre-edit`, `post-edit`
- `session-end`

**Setup:** `setup.md` must run first

---

### 8. **Monitoring** - 6 commands
**Priority:** MEDIUM for observability
**Dependencies:** Agent system, swarm system

**Commands:**
- `agent-metrics.md` - Performance tracking
- `swarm-monitor.md` - Swarm health (duplicate with swarm category?)
- `real-time-view.md` - Live dashboard

---

### 9. **Analysis** - 7 commands
**Priority:** MEDIUM for optimization
**Dependencies:** Performance tracking

**Potential Duplicates:**
- `bottleneck-detect.md` vs `performance-bottlenecks.md` (CONSOLIDATE)
- `token-efficiency.md` vs `token-usage.md` (Related but different? CLARIFY)

---

### 10. **Automation** - 8 commands
**Priority:** HIGH for productivity
**Dependencies:** Agent system, workflow system

**Smart Features:**
- `auto-agent.md` - Automatic spawning
- `smart-spawn.md` - Intelligent agent selection
- `self-healing.md` - Automated recovery
- `workflow-select.md` - Workflow automation

---

### 11. **Memory** - 6 commands
**Priority:** HIGH for context retention
**Dependencies:** Storage system

**Duplicates Found:**
- `usage.md` vs `memory-usage.md` (CONSOLIDATE - same file twice)

---

### 12. **Optimization** - 6 commands
**Priority:** MEDIUM for performance
**Dependencies:** Execution system

**Duplicates Found:**
- `parallel-execute.md` vs `parallel-execution.md` (CONSOLIDATE)

---

### 13. **Training** - 6 commands
**Priority:** MEDIUM for learning
**Dependencies:** Neural system

**Commands:**
- `neural-train.md` - Model training
- `pattern-learn.md` - Pattern recognition
- `specialization.md` - Agent specialization

---

### 14. **Agents** - 5 commands
**Priority:** MEDIUM (documentation)

All appear to be documentation/reference files

---

### 15. **Context** - 3 commands
**Priority:** HIGH for session management
**Dependencies:** None

Lifecycle: `create` → `prime` → `update`

---

### 16. **Workflows** - 6 commands
**Priority:** HIGH for orchestration
**Dependencies:** Workflow system

Commands: `create` → `execute` → `export`

---

### 17. **Flow-Nexus** - 9 commands
**Priority:** MEDIUM (external integration)
**Dependencies:** Flow-Nexus platform

**Integrations:**
- Authentication, sandbox, swarm, neural, app-store, challenges, payments, user-tools, workflow

---

### 18. **Pair Programming** - 6 commands
**Priority:** LOW (specialized use case)

---

### 19. **Statusline** - 6 commands
**Priority:** LOW (UI feature)

---

### 20. **Stream Chain** - 2 commands
**Priority:** MEDIUM for pipelining

---

### 21. **Learning** - 2 commands
**Priority:** LOW

---

### 22. **Research** - 1 command
**Priority:** MEDIUM

---

### 23. **System** - 2 commands
**Priority:** HIGH (core utilities)

---

## Recommended Directory Structure

```
src/cli/commands/
├── definitions/
│   ├── core/                    # 15 CRITICAL commands
│   │   ├── pm/                  # 37 commands - CCPM system
│   │   ├── sparc/               # 18 commands - TDD workflow
│   │   ├── coordination/        # 5 commands (after dedup)
│   │   └── swarm/               # 15 commands (after dedup)
│   │
│   ├── workflow/                # 46 HIGH priority
│   │   ├── github/              # 20 commands
│   │   ├── hive-mind/           # 13 commands
│   │   ├── hooks/               # 8 commands
│   │   ├── automation/          # 8 commands
│   │   ├── workflows/           # 6 commands
│   │   └── context/             # 3 commands
│   │
│   ├── analysis/                # 24 MEDIUM priority
│   │   ├── monitoring/          # 6 commands
│   │   ├── analysis/            # 5 commands (after dedup)
│   │   ├── optimization/        # 5 commands (after dedup)
│   │   ├── memory/              # 5 commands (after dedup)
│   │   └── training/            # 6 commands
│   │
│   ├── integrations/            # 9 MEDIUM priority
│   │   └── flow-nexus/          # 9 commands
│   │
│   ├── utilities/               # 13 LOW priority
│   │   ├── pair/                # 6 commands
│   │   ├── statusline/          # 6 commands
│   │   ├── learning/            # 2 commands
│   │   ├── stream-chain/        # 2 commands
│   │   ├── research/            # 1 command
│   │   ├── truth/               # 1 command
│   │   └── verify/              # 2 commands
│   │
│   └── system/                  # 7 CRITICAL
│       ├── agents-list.md
│       ├── safety-check.md
│       └── agents/              # 5 documentation files
│
└── registry/
    ├── command-registry.json    # Auto-generated from definitions
    ├── category-index.json      # Category metadata
    └── dependency-graph.json    # Command dependencies
```

---

## Deduplication Analysis

### High Priority Duplicates to Resolve:

1. **Coordination Namespace:**
   - `coordination/agent-spawn.md` ⟷ `coordination/spawn.md`
   - `coordination/orchestrate.md` ⟷ `coordination/task-orchestrate.md`
   - **Recommendation:** Keep `agent-spawn` and `task-orchestrate` (more specific names)

2. **Swarm Namespace:**
   - `swarm/analysis.md` ⟷ `swarm/swarm-analysis.md`
   - `swarm/monitor.md` ⟷ `monitoring/swarm-monitor.md`
   - **Recommendation:** Consolidate into `swarm/analysis.md` and use `monitoring/swarm-monitor.md`

3. **Analysis Namespace:**
   - `analysis/bottleneck-detect.md` ⟷ `analysis/performance-bottlenecks.md`
   - **Recommendation:** Keep `performance-bottlenecks.md` (more comprehensive name)

4. **Optimization Namespace:**
   - `optimization/parallel-execute.md` ⟷ `optimization/parallel-execution.md`
   - **Recommendation:** Keep `parallel-execution.md` (noun form preferred)

5. **Memory Namespace:**
   - `memory/usage.md` ⟷ `memory/memory-usage.md`
   - **Recommendation:** Keep `memory-usage.md` (consistent naming)

6. **GitHub Namespace:**
   - Review if `github-swarm.md` duplicates `swarm-issue.md` + `swarm-pr.md`
   - Review if `code-review-swarm.md` supersedes `code-review.md`

### Naming Inconsistencies:

**Prefix Pattern Issues:**
- Hive Mind: All have `hive-mind-` prefix (GOOD - keep for clarity)
- Swarm: Mixed - some have `swarm-` prefix, others don't (STANDARDIZE)
- PM: All have no prefix (GOOD - namespace provides context)
- SPARC: All have no prefix (GOOD)

**Recommendation:** Keep prefixes only for:
1. Multi-word categories (e.g., `hive-mind-`)
2. Where disambiguation is needed
3. Remove redundant prefixes when directory provides context

---

## Command Dependency Graph

### Critical Path 1: CCPM Workflow
```
pm-init
  ↓
prd-new
  ↓
epic-start
  ↓
epic-decompose ← (can use swarm-init for parallel)
  ↓
epic-sync ← (requires GitHub CLI)
  ↓
issue-start ← (requires agent-spawn)
  ↓
issue-analyze
  ↓
issue-sync
  ↓
epic-merge
```

### Critical Path 2: SPARC TDD Workflow
```
sparc/orchestrator
  ↓
sparc/tdd
  ├→ sparc/coder
  ├→ sparc/tester
  ├→ sparc/reviewer
  └→ sparc/swarm-coordinator ← (requires swarm-init)
```

### Critical Path 3: Swarm Coordination
```
coordination/init OR swarm-init
  ↓
swarm-spawn OR agent-spawn
  ↓
task-orchestrate
  ↓
[parallel agent execution]
  ↓
swarm-status
```

### Critical Path 4: GitHub Integration
```
github/repo-analyze
  ↓
github/issue-tracker
  ├→ github/issue-triage
  └→ github/swarm-issue ← (requires swarm-init)

github/pr-manager
  ├→ github/pr-enhance
  ├→ github/code-review
  └→ github/code-review-swarm ← (requires swarm-init)
```

---

## Migration Priority Levels

### Phase 1: CRITICAL (Week 1)
**Must work immediately:**
1. System commands (2)
2. PM core workflow (15 commands)
3. SPARC core agents (8 commands)
4. Coordination foundation (5 commands)
5. Swarm initialization (3 commands)

**Total:** 33 commands

### Phase 2: HIGH (Week 2)
**Essential functionality:**
1. GitHub integration (20 commands)
2. Hive Mind system (13 commands)
3. Hooks system (8 commands)
4. Automation (8 commands)
5. Workflows (6 commands)
6. Context management (3 commands)

**Total:** 58 commands

### Phase 3: MEDIUM (Week 3)
**Enhanced features:**
1. Monitoring (6 commands)
2. Analysis (7 commands)
3. Optimization (6 commands)
4. Memory (6 commands)
5. Training (6 commands)
6. Flow-Nexus (9 commands)
7. Research (1 command)

**Total:** 41 commands

### Phase 4: LOW (Week 4)
**Specialized features:**
1. Pair programming (6 commands)
2. Statusline (6 commands)
3. Learning (2 commands)
4. Stream chain (2 commands)
5. Truth/Verify (3 commands)
6. Documentation files (all READMEs)

**Total:** 19 commands

---

## Command Registry Schema

```json
{
  "commands": {
    "pm:epic-oneshot": {
      "path": "src/cli/commands/definitions/pm/epic-oneshot.md",
      "category": "pm",
      "priority": "high",
      "dependencies": ["pm:epic-decompose", "pm:epic-sync"],
      "tools": ["Read", "LS"],
      "description": "Decompose epic into tasks and sync to GitHub in one operation",
      "workflow": "pm-core",
      "keywords": ["epic", "decompose", "sync", "oneshot", "github"]
    }
  },
  "categories": {
    "pm": {
      "priority": "critical",
      "commandCount": 37,
      "description": "Project management with CCPM methodology"
    }
  },
  "workflows": {
    "pm-core": {
      "commands": ["pm:init", "pm:prd-new", "pm:epic-start", "pm:epic-decompose", "pm:epic-sync", "pm:issue-start"],
      "description": "Core CCPM workflow from PRD to implementation"
    }
  }
}
```

---

## File Naming Standards

### Established Patterns:

1. **Kebab-case everywhere:** ✅ Already consistent
2. **No redundant prefixes:** Remove when directory provides context
3. **Verb-noun or noun format:**
   - Actions: `create`, `execute`, `export` (verbs)
   - Objects: `config`, `status`, `overview` (nouns)
4. **Multi-word separation:**
   - `epic-oneshot` ✅
   - `code-review-swarm` ✅
   - `real-time-view` ✅

### Recommendations:

**KEEP prefix:**
- `hive-mind-*` (multi-word category)

**REMOVE prefix:**
- `swarm-analysis` → `analysis` (directory = swarm/)
- `swarm-spawn` → `spawn` (directory = swarm/)
- `memory-usage` → `usage` (directory = memory/)

**EXCEPTION:** Keep prefix when command appears in multiple contexts or needs disambiguation

---

## Cross-Category Dependencies

### Commands That Depend on Multiple Systems:

1. **SPARC swarm-coordinator:**
   - Depends on: `sparc/orchestrator` + `swarm/init`
   - Category: sparc (primary), swarm (secondary)

2. **GitHub swarm-*:**
   - All GitHub swarm commands depend on `swarm/init`
   - Category: github (primary), swarm (secondary)

3. **PM epic-decompose:**
   - Can optionally use swarm for parallel execution
   - Category: pm (primary), swarm (optional)

4. **Automation auto-agent:**
   - Depends on: agent system + workflow system
   - Category: automation (orchestrates agents and workflows)

---

## Documentation Requirements

### Each Command File Should Have:

1. **Frontmatter:**
   ```yaml
   ---
   allowed-tools: Read, Write, Bash
   category: pm
   priority: critical
   dependencies: [pm:prd-new]
   keywords: [epic, github, sync]
   ---
   ```

2. **Sections:**
   - Purpose
   - Usage
   - Instructions
   - Examples
   - Important Notes
   - Related Commands

### README Files in Each Category:

1. Overview
2. Command list with descriptions
3. Common workflows
4. Dependencies
5. Troubleshooting

---

## Next Steps

1. **Validate mapping** - Review CSV with stakeholders
2. **Resolve duplicates** - 6 high-priority consolidations needed
3. **Create registry schema** - JSON structure for command metadata
4. **Build migration script** - Automate file moves and updates
5. **Update imports** - Find and fix all command references
6. **Test workflows** - Verify critical paths work after migration
7. **Generate documentation** - Auto-create READMEs from registry

---

## Risk Assessment

### High Risk:
- Breaking PM workflow (CCPM is core functionality)
- Breaking SPARC TDD (critical for development)
- Coordination system dependencies (many commands depend on this)

### Medium Risk:
- GitHub CLI integrations (external dependency)
- Swarm operations (complex multi-agent coordination)
- Hook system (automation dependencies)

### Low Risk:
- Documentation moves
- Utility commands
- Specialized features (pair, statusline)

### Mitigation Strategy:
1. Phase migration (critical → high → medium → low)
2. Parallel testing environment
3. Maintain old paths with deprecation warnings
4. Comprehensive integration tests
5. Rollback plan for each phase

---

## Success Metrics

1. **100% command coverage** - All 196 files accounted for
2. **Zero broken imports** - All references updated
3. **Faster command discovery** - Logical categorization
4. **Reduced duplication** - At least 6 duplicate pairs consolidated
5. **Improved maintainability** - Clear dependency graph
6. **Better documentation** - Auto-generated from registry

---

## Open Questions

1. Should `coordination/init` and `swarm/init` be merged or kept separate?
2. Does `code-review-swarm` fully replace `code-review` or are both needed?
3. Should Flow-Nexus stay in integrations/ or get top-level category?
4. What's the relationship between `monitoring/swarm-monitor` and `swarm/monitor`?
5. Are `learn-curriculum` and `learn-skill` part of a larger learning system?
6. Should all swarm-prefixed commands in swarm/ drop the prefix?
