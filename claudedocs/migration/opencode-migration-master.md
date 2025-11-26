# OpenCode Migration Master Document

**Consolidated**: 2025-11-26
**Sources**: migration_analysis_summary.md, migration_quick_reference.md, migration_visual_guide.md, opencode_migration_architecture.md, research_opencode_analysis.md

Complete reference for .claude → .opencode migration.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Migration Scope](#2-migration-scope)
3. [Agent Architecture](#3-agent-architecture)
4. [Migration Timeline](#4-migration-timeline)
5. [Quick Reference](#5-quick-reference)
6. [Validation & Testing](#6-validation--testing)

---

## 1. Executive Summary

### Key Metrics

| Current State | Target State |
|--------------|--------------|
| 341 files | Consolidated |
| 215 commands | Agent integrations |
| 78 agents | 18 consolidated agents |
| 11 rules | Embedded instructions |
| 6 helpers | Shared resources |

**Timeline**: 4 weeks | **Success Rate Target**: 85%+ | **Rollback**: Always available

### Critical Decisions

1. **Agent Consolidation (78 → 18)**: OpenCode favors powerful multi-purpose agents over specialized single-purpose agents
2. **Parallel Migration (6 batches)**: 36% time reduction vs sequential approach
3. **Dual Operation Period (2-4 weeks)**: Safe testing without disrupting production

---

## 2. Migration Scope

### File Categories

```
Commands:  215 → Agent integrations
Agents:    78  → 18 consolidated definitions
Rules:     11  → Embedded in agent instructions
Helpers:    6  → Shared resources
Configs:    8  → opencode.jsonc
```

### Directory Structure

```
.opencode/
├── opencode.jsonc          # Central config (18 agents)
├── agents/                 # Agent definitions
│   ├── build/              # coder, reviewer, tester, architect
│   ├── plan/               # pm, planner, tracker
│   └── custom/             # github, ui, data, devops, etc.
├── shared/                 # Helpers & utilities
└── rules/                  # Behavioral rules
```

---

## 3. Agent Architecture

### System Overview

```
┌────────────────────────────────────────────────────┐
│                 OPENCODE ECOSYSTEM                 │
│                                                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │Build Agents│  │Plan Agents │  │Custom Agents│  │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  │
│        │               │               │          │
│  ┌─────▼───────────────▼───────────────▼──────┐  │
│  │         opencode.jsonc (18 agents)         │  │
│  └────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Tier 1: Build Agents (Core Development)

| Agent | Purpose | Key Permissions | Commands |
|-------|---------|-----------------|----------|
| `coder-agent` | Code implementation | fs.*, exec.shell, mcp.all | 45 |
| `reviewer-agent` | Code review | fs.read, exec.read-only | 25 |
| `tester-agent` | Testing | fs.read/write, exec.shell | 20 |
| `architect-agent` | System design | fs.read/write, exec.read-only | 15 |

### Tier 2: Plan Agents

| Agent | Purpose | Key Permissions | Commands |
|-------|---------|-----------------|----------|
| `pm-agent` | PRD/Epic management | fs:*.md, github.issues | 35 |
| `planner-agent` | Task breakdown | fs.read, write:checkpoints | 18 |
| `tracker-agent` | Progress monitoring | fs.read, write:sessions | 12 |

### Tier 3-6: Custom Agents

| Agent | Purpose | Key Permissions | Commands |
|-------|---------|-----------------|----------|
| `github-agent` | GitHub operations | github.all, exec.git,gh | 30 |
| `release-agent` | Release management | github.releases | 8 |
| `ui-agent` | UI/frontend | mcp.magic,playwright | 15 |
| `data-agent` | Database operations | exec.psql,sqlite3 | 10 |
| `devops-agent` | CI/CD | fs:.github/workflows | 12 |
| `security-agent` | Security scanning | exec.npm-audit | 8 |
| `docs-agent` | Documentation | fs:docs,README | 10 |
| `research-agent` | Web research | mcp.tavily | 5 |
| `analyzer-agent` | Code analysis | mcp.sequential | 15 |
| `workflow-agent` | Automation | exec.shell, mcp.all | 12 |
| `memory-agent` | Context management | mcp.serena | 10 |
| `swarm-coordinator` | Multi-agent orchestration | mcp.claude-flow | 40 |

---

## 4. Migration Timeline

### Week-by-Week Plan

```
WEEK 1: Foundation + Core
├── Day 1-2: Create .opencode structure
│   └── Migrate rules & helpers
├── Day 3-7: Define core agents (4)
│   └── Migrate 45 commands
└── GATE: Syntax + Structure validation

WEEK 2: PM + GitHub
├── Day 8-10: PM agents (3)
├── Day 11-13: GitHub agents (2)
└── GATE: PM workflows operational

WEEK 3: Domain Specialists
├── Day 14-17: Custom agents (6)
├── Day 18-20: Remaining agents (3)
└── GATE: Domain coverage complete

WEEK 4: Validation + Cutover
├── Day 21-24: Comprehensive testing
├── Day 25-26: Performance tuning
├── Day 27-28: Documentation
└── GATE: Production ready
```

### Parallel Execution

```
Foundation (2d)
    ├─── Core Agents (5d) ────┐
    ├─── PM System (2d)       │
    └─── GitHub (3d)          │
                              ├─── Domain Specialists (3d) ──┐
                              └─── Advanced Features (2d)    │
                                                              └─── Validation (4d)
```

**Time Savings**: 30 days sequential → 22 days parallel (27% faster)

---

## 5. Quick Reference

### Prerequisites

```bash
command -v jq >/dev/null || echo "❌ Install jq"
command -v git >/dev/null || echo "❌ Install git"
command -v python3 >/dev/null || echo "❌ Install Python 3"
command -v opencode >/dev/null || echo "❌ Install OpenCode"

# Backup before migration
git stash push -u -m "Pre-migration backup $(date +%Y%m%d)"
```

### Week 1 Checklist

```bash
# Foundation (Day 1-2)
[ ] Create .opencode directory structure
[ ] Migrate 11 rules → .opencode/rules/
[ ] Migrate 6 helpers → .opencode/shared/
[ ] Create opencode.jsonc skeleton
[ ] Setup validation framework
[ ] GATE: Syntax validation passes

# Core Agents (Day 3-7)
[ ] Define coder-agent
[ ] Define reviewer-agent
[ ] Define tester-agent
[ ] Define architect-agent
[ ] Migrate ~45 commands
[ ] GATE: Structure + Functional validation
```

### Permission Model

```
Start Restrictive → Test → Expand as Needed → Document Grants
```

---

## 6. Validation & Testing

### Gate Requirements

| Gate | Week | Requirements |
|------|------|--------------|
| Syntax | 1 | JSON/YAML valid, schema compliant |
| Structure | 1 | All files in correct locations |
| Functional | 2 | Core agents execute correctly |
| Integration | 3 | Cross-agent workflows work |
| Performance | 4 | No degradation vs .claude |
| Security | 4 | Permission audit passed |

### Rollback Strategy

- **Week 1-2**: Instant rollback (delete .opencode)
- **Week 3**: Revert to backup stash
- **Week 4**: Dual operation fallback

### Success Criteria

- [ ] 100% file accounting (341 files)
- [ ] Permission integrity validated
- [ ] All workflows functional
- [ ] Performance parity achieved
- [ ] Documentation complete
