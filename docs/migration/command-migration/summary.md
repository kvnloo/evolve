# Command Organization Summary

## Quick Reference

**📊 Total Commands:** 196 files
**📁 Categories:** 23 major categories
**🔄 Duplicates Found:** 12 files (6% reduction opportunity)
**📅 Migration Timeline:** 4 weeks (phased)
**⚠️ Risk Level:** Medium-High

---

## Visual Directory Structure

```
src/cli/commands/
│
├── definitions/
│   │
│   ├── core/ ⭐ CRITICAL (33 commands)
│   │   ├── pm/                    (37) Project Management - CCPM workflow
│   │   ├── sparc/                 (18) TDD with AI agents
│   │   ├── coordination/          (5)  Multi-agent foundation
│   │   └── swarm/                 (15) Swarm orchestration
│   │
│   ├── workflow/ 🔧 HIGH PRIORITY (58 commands)
│   │   ├── github/                (20) GitHub integration
│   │   ├── hive-mind/             (13) Collective intelligence
│   │   ├── hooks/                 (8)  Lifecycle automation
│   │   ├── automation/            (8)  Smart automation
│   │   ├── workflows/             (6)  Workflow orchestration
│   │   └── context/               (3)  Session management
│   │
│   ├── analysis/ 📈 MEDIUM PRIORITY (24 commands)
│   │   ├── monitoring/            (6)  System observability
│   │   ├── analysis/              (5)  Performance analysis
│   │   ├── optimization/          (5)  Execution optimization
│   │   ├── memory/                (5)  Memory management
│   │   └── training/              (6)  Neural training
│   │
│   ├── integrations/ 🔌 MEDIUM PRIORITY (9 commands)
│   │   └── flow-nexus/            (9)  Flow-Nexus platform
│   │
│   ├── utilities/ 🛠️ LOW PRIORITY (13 commands)
│   │   ├── pair/                  (6)  Pair programming
│   │   ├── statusline/            (6)  UI statusline
│   │   ├── learning/              (2)  Learning curriculum
│   │   ├── stream-chain/          (2)  Pipeline processing
│   │   ├── research/              (1)  Research planning
│   │   ├── truth/                 (1)  Truth verification
│   │   └── verify/                (2)  Verification tools
│   │
│   └── system/ 🔐 CRITICAL (7 files)
│       ├── safety-check.md        System safety validation
│       ├── agents-list.md         Available agents
│       └── agents/                (5) Agent documentation
│
└── registry/
    ├── command-registry.json      Auto-generated command index
    ├── category-index.json        Category metadata
    └── dependency-graph.json      Command dependencies
```

---

## Command Flow Diagrams

### PM (CCPM) Workflow
```
┌─────────────┐
│  /pm:init   │ Initialize CCPM system
└──────┬──────┘
       │
       v
┌─────────────┐
│ /pm:prd-new │ Create Product Requirement Document
└──────┬──────┘
       │
       v
┌──────────────────┐
│ /pm:epic-oneshot │ ⭐ ONE-SHOT: Decompose + Sync
└────────┬─────────┘   (or use epic-start → epic-decompose → epic-sync)
         │
         v
┌──────────────────┐
│ /pm:issue-start  │ Start work on specific issue
└────────┬─────────┘
         │
         v
┌───────────────────┐
│ /pm:issue-analyze │ Analyze issue → create work streams
└────────┬──────────┘
         │
         v
   [Development]
         │
         v
┌─────────────────┐
│ /pm:issue-sync  │ Sync progress to GitHub
└────────┬────────┘
         │
         v
┌─────────────────┐
│ /pm:epic-merge  │ Merge completed epic
└─────────────────┘
```

### SPARC TDD Workflow
```
┌──────────────────┐
│  /sparc:tdd      │ Test-Driven Development Mode
└────────┬─────────┘
         │
         v
┌──────────────────┐
│ orchestrator     │ Spawn and coordinate agents
└────────┬─────────┘
         │
         ├─────────────────────┬─────────────────┬──────────────┐
         v                     v                 v              v
┌────────────┐        ┌────────────┐    ┌──────────┐   ┌──────────┐
│   tester   │        │   coder    │    │ reviewer │   │ optimizer│
│ Write tests│ ──────>│ Implement  │───>│  Review  │──>│ Refactor │
└────────────┘        └────────────┘    └──────────┘   └──────────┘
     │                      │                 │              │
     └──────────────────────┴─────────────────┴──────────────┘
                            │
                            v
                   ┌────────────────┐
                   │ swarm-coord    │ Coordinate completion
                   └────────────────┘
```

### Swarm Coordination
```
┌─────────────────┐
│  swarm:init     │ Initialize swarm with topology
└────────┬────────┘
         │
         v
┌─────────────────┐
│  agent-spawn    │ Spawn specialized agents
└────────┬────────┘
         │
         v
┌──────────────────┐
│ task-orchestrate │ Distribute work across agents
└────────┬─────────┘
         │
         ├─────────────────┬─────────────────┬──────────────┐
         v                 v                 v              v
    [Agent 1]         [Agent 2]         [Agent 3]      [Agent N]
    Research          Implement         Test           Review
         │                 │                 │              │
         └─────────────────┴─────────────────┴──────────────┘
                            │
                            v
                   ┌────────────────┐
                   │  swarm:status  │ Monitor and collect results
                   └────────────────┘
```

### GitHub Integration
```
┌──────────────────┐
│  repo-analyze    │ Analyze repository
└────────┬─────────┘
         │
         v
┌──────────────────┐
│  issue-tracker   │ Track issues
└────────┬─────────┘
         │
         ├─────────────────────┬──────────────────┐
         v                     v                  v
┌─────────────────┐   ┌────────────────┐  ┌─────────────┐
│  issue-triage   │   │  swarm-issue   │  │ pr-manager  │
└─────────────────┘   └────────────────┘  └──────┬──────┘
                                                   │
                                                   v
                                          ┌─────────────────┐
                                          │ code-review     │
                                          │    -swarm       │
                                          └─────────────────┘
```

---

## Deduplication Map

### Files to Consolidate

| Current Files | Action | Result |
|---------------|--------|---------|
| `coordination/agent-spawn.md`<br>`coordination/spawn.md` | ✅ Keep first | `agent-spawn.md` (more specific) |
| `coordination/orchestrate.md`<br>`coordination/task-orchestrate.md` | ✅ Keep second | `task-orchestrate.md` (more specific) |
| `swarm/analysis.md`<br>`swarm/swarm-analysis.md` | ✅ Keep first | `analysis.md` (remove prefix) |
| `swarm/monitor.md`<br>`monitoring/swarm-monitor.md` | ✅ Keep second | `monitoring/swarm-monitor.md` (better category) |
| `analysis/bottleneck-detect.md`<br>`analysis/performance-bottlenecks.md` | ✅ Keep second | `performance-bottlenecks.md` (comprehensive) |
| `optimization/parallel-execute.md`<br>`optimization/parallel-execution.md` | ✅ Keep second | `parallel-execution.md` (noun form) |
| `memory/usage.md`<br>`memory/memory-usage.md` | ✅ Keep second | `memory-usage.md` (consistent naming) |

**Total Reduction:** 7 files eliminated → 189 unique commands

---

## Migration Phases Overview

### 📅 Week 1: CRITICAL (33 commands)
**Focus:** Core functionality must continue working
- ✅ System utilities (2)
- ✅ PM core workflow (15)
- ✅ SPARC core agents (8)
- ✅ Coordination foundation (5)
- ✅ Swarm initialization (3)

**Success:** PM workflow + SPARC TDD functional

---

### 📅 Week 2: HIGH (58 commands)
**Focus:** Essential integrations restored
- ✅ GitHub integration (20)
- ✅ Hive Mind system (13)
- ✅ Hooks automation (8)
- ✅ Automation features (8)
- ✅ Workflows (6)
- ✅ Context management (3)

**Success:** All key workflows operational

---

### 📅 Week 3: MEDIUM (41 commands)
**Focus:** Analysis and optimization features
- ✅ Monitoring (6)
- ✅ Analysis (5)
- ✅ Optimization (5)
- ✅ Memory (5)
- ✅ Training (6)
- ✅ Flow-Nexus (9)
- ✅ Research (1)

**Success:** All enhancement features working

---

### 📅 Week 4: LOW (19 commands + docs)
**Focus:** Specialized features and cleanup
- ✅ Pair programming (6)
- ✅ Statusline (6)
- ✅ Learning (2)
- ✅ Stream chain (2)
- ✅ Truth/Verify (3)
- ✅ All README files

**Success:** Migration complete, old structure deprecated

---

## Key Dependencies

### Critical Dependency Chains

**PM Workflow:**
```
pm:init
  └→ pm:prd-new
      └→ pm:epic-start
          └→ pm:epic-decompose (can use swarm)
              └→ pm:epic-sync (needs GitHub CLI)
                  └→ pm:issue-start (can use agents)
```

**SPARC TDD:**
```
sparc:orchestrator
  └→ sparc:tdd
      ├→ sparc:coder
      ├→ sparc:tester
      ├→ sparc:reviewer
      └→ sparc:swarm-coordinator (needs swarm:init)
```

**Swarm Operations:**
```
coordination:init OR swarm:init
  └→ agent-spawn
      └→ task-orchestrate
          └→ [parallel agent execution]
              └→ swarm:status
```

**GitHub Integration:**
```
github:repo-analyze
  └→ github:issue-tracker
      ├→ github:issue-triage
      └→ github:swarm-issue (needs swarm:init)

github:pr-manager
  ├→ github:pr-enhance
  └→ github:code-review-swarm (needs swarm:init)
```

### Cross-Category Dependencies

| Command | Primary Category | Depends On |
|---------|------------------|------------|
| `sparc:swarm-coordinator` | SPARC | `swarm:init` |
| `github:swarm-*` (all) | GitHub | `swarm:init` |
| `pm:epic-decompose` | PM | `swarm:init` (optional) |
| `automation:auto-agent` | Automation | Agent system + workflows |
| `hive-mind:*` (all) | Hive Mind | Swarm + memory systems |

---

## Priority Matrix

### By Business Impact

| Priority | Categories | Commands | Impact if Broken |
|----------|-----------|----------|------------------|
| **CRITICAL** | PM, SPARC, Coordination, Swarm, System | 63 | System unusable |
| **HIGH** | GitHub, Hive Mind, Hooks, Automation, Workflows, Context | 58 | Major features down |
| **MEDIUM** | Monitoring, Analysis, Optimization, Memory, Training, Flow-Nexus | 50 | Degraded experience |
| **LOW** | Pair, Statusline, Learning, Stream Chain, Truth, Verify | 25 | Minimal impact |

### By Usage Frequency (Estimated)

| Frequency | Commands | Examples |
|-----------|----------|----------|
| **Daily** | 25 | `pm:*`, `sparc:tdd`, `github:pr-*`, `swarm:init` |
| **Weekly** | 50 | `github:issue-*`, `hooks:*`, `automation:*` |
| **Monthly** | 75 | `monitoring:*`, `analysis:*`, `training:*` |
| **Rare** | 46 | `pair:*`, `statusline:*`, `learning:*` |

---

## Risk Assessment

### High Risk Areas

| Risk | Impact | Mitigation |
|------|--------|------------|
| PM workflow breaks | 🔴 CRITICAL | Migrate first, extensive testing, keep old paths |
| SPARC TDD fails | 🔴 CRITICAL | Comprehensive integration tests, parallel structure |
| Coordination system down | 🔴 CRITICAL | Phase 1 priority, immediate rollback plan |
| GitHub integration breaks | 🟡 HIGH | Test with real repos, gradual cutover |
| Agent spawning fails | 🟡 HIGH | Monitor spawn failures, feature flags |

### Mitigation Strategies

1. **Phased Migration:** CRITICAL → HIGH → MEDIUM → LOW
2. **Parallel Structure:** Keep old paths during transition
3. **Comprehensive Testing:** Unit, integration, E2E tests
4. **Immediate Rollback:** Backup branch + tested rollback procedure
5. **Monitoring:** Real-time alerts for failures
6. **Communication:** Daily updates, clear support channels

---

## Command Registry Schema

```json
{
  "version": "2.0.0",
  "commands": {
    "pm:epic-oneshot": {
      "path": "src/cli/commands/definitions/core/pm/epic-oneshot.md",
      "category": "pm",
      "priority": "high",
      "dependencies": ["pm:epic-decompose", "pm:epic-sync"],
      "tools": ["Read", "LS"],
      "description": "Decompose epic into tasks and sync to GitHub in one operation",
      "workflow": "pm-core",
      "keywords": ["epic", "decompose", "sync", "oneshot", "github"]
    },
    "sparc:tdd": {
      "path": "src/cli/commands/definitions/core/sparc/tdd.md",
      "category": "sparc",
      "priority": "critical",
      "dependencies": ["sparc:orchestrator", "sparc:coder", "sparc:tester"],
      "tools": ["Task", "TodoWrite", "Bash"],
      "description": "Test-driven development with AI agent coordination",
      "workflow": "sparc-tdd",
      "keywords": ["tdd", "testing", "agents", "workflow"]
    }
  },
  "categories": {
    "pm": {
      "priority": "critical",
      "commandCount": 37,
      "description": "Project management with CCPM methodology",
      "path": "src/cli/commands/definitions/core/pm"
    },
    "sparc": {
      "priority": "critical",
      "commandCount": 18,
      "description": "Test-driven development with AI agents",
      "path": "src/cli/commands/definitions/core/sparc"
    }
  },
  "workflows": {
    "pm-core": {
      "commands": [
        "pm:init",
        "pm:prd-new",
        "pm:epic-start",
        "pm:epic-decompose",
        "pm:epic-sync",
        "pm:issue-start"
      ],
      "description": "Core CCPM workflow from PRD to implementation"
    },
    "sparc-tdd": {
      "commands": [
        "sparc:orchestrator",
        "sparc:tdd",
        "sparc:coder",
        "sparc:tester",
        "sparc:reviewer"
      ],
      "description": "Test-driven development workflow"
    }
  }
}
```

---

## Success Metrics

### Functional
- ✅ All 196 commands accessible from new locations
- ✅ Zero broken imports or references
- ✅ All workflows functional (PM, SPARC, GitHub, Swarm)
- ✅ Command registry auto-generated
- ✅ Documentation complete

### Performance
- ✅ Command load time ≤ previous
- ✅ Search/discovery time -30%
- ✅ Memory usage unchanged
- ✅ Build time unchanged

### Quality
- ✅ Zero production incidents
- ✅ All tests passing
- ✅ Code coverage maintained
- ✅ Duplicates reduced 6%

### Adoption
- ✅ 100% team using new paths (2 weeks)
- ✅ Documentation updated
- ✅ Old paths deprecated
- ✅ Zero support tickets

---

## Next Steps

1. **✅ Review mapping** - Validate CSV with stakeholders
2. **✅ Resolve duplicates** - 7 high-priority consolidations
3. **📝 Create scripts** - Automate migration process
4. **🧪 Build tests** - Unit, integration, E2E coverage
5. **📚 Update docs** - Auto-generate from registry
6. **🚀 Execute Phase 1** - Migrate critical commands
7. **📊 Monitor & iterate** - Track metrics, fix issues

---

## Deliverables

### Documentation ✅
- [x] Command mapping CSV (196 files)
- [x] Detailed category analysis
- [x] Migration plan with scripts
- [x] Visual summary (this document)

### Code (To Do)
- [ ] Migration scripts (5 scripts)
- [ ] Command registry generator
- [ ] Test suite updates
- [ ] Import reference updates

### Operations (To Do)
- [ ] Backup branch creation
- [ ] Rollback procedures testing
- [ ] Monitoring dashboards
- [ ] Support playbook

---

## Questions & Decisions Needed

### Open Questions

1. **Should `coordination/init` and `swarm/init` be merged?**
   - Current: Separate files
   - Consideration: Both initialize coordination
   - Recommendation: Keep separate (different scopes)

2. **Does `code-review-swarm` fully replace `code-review`?**
   - Current: Both exist
   - Consideration: Swarm version has more features
   - Recommendation: Keep both, document when to use each

3. **Should Flow-Nexus stay in integrations/ or get top-level?**
   - Current: In integrations/
   - Consideration: Only external integration
   - Recommendation: Keep in integrations/

4. **Remove ALL swarm-prefixed commands in swarm/ directory?**
   - Current: Mixed (some have prefix, some don't)
   - Consideration: Directory provides context
   - Recommendation: Remove prefix (e.g., `swarm-init.md` → `init.md`)

5. **What's the relationship between `monitoring/swarm-monitor` and `swarm/monitor`?**
   - Current: Potential duplicate
   - Investigation needed: Compare file contents
   - Recommendation: Keep `monitoring/swarm-monitor` (better categorization)

### Decisions Made

✅ Use kebab-case for all filenames
✅ Remove redundant prefixes when directory provides context
✅ Keep hive-mind- prefix (multi-word category)
✅ Consolidate 7 duplicate pairs
✅ 4-week phased migration approach
✅ Parallel structure during transition

---

## Resources

- **Full Mapping:** `docs/command-migration-mapping.csv`
- **Detailed Analysis:** `docs/command-categories-detailed.md`
- **Migration Plan:** `docs/migration-plan.md`
- **This Summary:** `docs/command-organization-summary.md`

---

**Last Updated:** 2025-01-20
**Status:** ✅ Analysis Complete, Ready for Review
**Next Action:** Stakeholder review and approval to proceed with Phase 1
