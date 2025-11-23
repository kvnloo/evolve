# OpenCode Migration Visual Guide
**Architecture Diagrams and Decision Trees for Stakeholders**

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      OPENCODE ECOSYSTEM                         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Build Agents │  │ Plan Agents  │  │Custom Agents │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                 │                  │                  │
│  ┌──────▼─────────────────▼──────────────────▼────────┐        │
│  │         opencode.jsonc (Central Config)            │        │
│  │  • 18 agent definitions                            │        │
│  │  • Permission matrix                               │        │
│  │  • Shared resources                                │        │
│  └──────┬─────────────────┬──────────────────┬────────┘        │
│         │                 │                  │                  │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐         │
│  │ .opencode/   │  │ .opencode/   │  │ .opencode/   │         │
│  │   agents/    │  │   shared/    │  │   rules/     │         │
│  │ (18 agents)  │  │ (6 helpers)  │  │ (11 rules)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Agent Hierarchy & Relationships

```
                    ┌─────────────────────┐
                    │ swarm-coordinator   │
                    │  (Orchestration)    │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
        ┌───────▼──────┐ ┌─────▼─────┐ ┌─────▼──────┐
        │ Build Agents │ │Plan Agents│ │Custom Agent│
        └───────┬──────┘ └─────┬─────┘ └─────┬──────┘
                │              │              │
    ┌───────────┼──────────┐   │   ┌──────────┼──────────┐
    │           │          │   │   │          │          │
┌───▼──┐ ┌─────▼────┐ ┌───▼──▼───▼──▼───┐ ┌──▼───┐ ┌───▼───┐
│coder │ │reviewer  │ │  pm-agent       │ │github│ │  ui   │
│      │ │          │ │  planner-agent  │ │      │ │       │
│tester│ │architect │ │  tracker-agent  │ │release│ │ data  │
└──────┘ └──────────┘ └─────────────────┘ └──────┘ └───┬───┘
                                                        │
                                          ┌─────────────┼────────┐
                                          │             │        │
                                      ┌───▼──┐ ┌────────▼──┐ ┌──▼───┐
                                      │devops│ │security   │ │docs  │
                                      │      │ │           │ │      │
                                      │research│analyzer  │ │workflow│
                                      └──────┘ └──────────┘ └──────┘
                                                    │
                                              ┌─────▼─────┐
                                              │  memory   │
                                              └───────────┘
```

---

## Migration Flow Diagram

```
START
  │
  ├─ WEEK 1: FOUNDATION
  │    ├─ Day 1-2: Create .opencode structure
  │    │           Migrate rules & helpers
  │    │           ✅ GATE: Syntax validation
  │    │
  │    └─ Day 3-7: Define core agents (4)
  │                Migrate 45 commands
  │                ✅ GATE: Functional validation
  │
  ├─ WEEK 2: PM + GITHUB
  │    ├─ Day 8-10: PM agents (3)
  │    │            Migrate 35 commands
  │    │            ✅ GATE: PM workflows work
  │    │
  │    └─ Day 11-14: GitHub agents (2)
  │                  Migrate 30 commands
  │                  ✅ GATE: GitHub integration
  │
  ├─ WEEK 3: SPECIALISTS + ADVANCED
  │    ├─ Day 15-17: Domain specialists (5)
  │    │             Migrate 55 commands
  │    │             ✅ GATE: All agents defined
  │    │
  │    └─ Day 18-21: Advanced agents (4)
  │                  Migrate 50 commands
  │                  ✅ GATE: 100% coverage
  │
  └─ WEEK 4: VALIDATION + CUTOVER
       ├─ Day 22-24: Complete validation
       │             Performance benchmarks
       │             User acceptance testing
       │             ✅ GATE: Production ready
       │
       └─ Day 25-28: Production cutover
                     Post-cutover monitoring
                     Archive .claude
                     ✅ SUCCESS
```

---

## Permission Matrix Visualization

```
┌────────────────┬─────────┬──────────┬──────────┬───────────┬────────┬─────┬─────────┐
│ Agent          │ fs.read │ fs.write │ fs.delete│exec.shell │ github │ mcp │ network │
├────────────────┼─────────┼──────────┼──────────┼───────────┼────────┼─────┼─────────┤
│ TIER 1: BUILD AGENTS                                                              │
├────────────────┼─────────┼──────────┼──────────┼───────────┼────────┼─────┼─────────┤
│ coder-agent    │   ✅    │    ✅    │    ✅    │     ✅    │  read  │ all │  http   │
│ reviewer-agent │   ✅    │    ❌    │    ❌    │   read    │ r+c    │ seq │   ❌    │
│ tester-agent   │   ✅    │    ✅    │    ❌    │     ✅    │  read  │ p+c │   ❌    │
│ architect-agent│   ✅    │    ✅    │    ❌    │   read    │  read  │ seq │   ❌    │
├────────────────┼─────────┼──────────┼──────────┼───────────┼────────┼─────┼─────────┤
│ TIER 2: PLAN AGENTS                                                               │
├────────────────┼─────────┼──────────┼──────────┼───────────┼────────┼─────┼─────────┤
│ pm-agent       │   ✅    │  *.md    │    ❌    │    git    │ issues │ seq │   ❌    │
│ planner-agent  │   ✅    │  chkpt   │    ❌    │   read    │  read  │ s+m │   ❌    │
│ tracker-agent  │   ✅    │  ctx/ses │    ❌    │   read    │  read  │ mem │   ❌    │
├────────────────┼─────────┼──────────┼──────────┼───────────┼────────┼─────┼─────────┤
│ TIER 3-6: CUSTOM AGENTS                                                           │
├────────────────┼─────────┼──────────┼──────────┼───────────┼────────┼─────┼─────────┤
│ github-agent   │   ✅    │ .github  │    ❌    │   git+gh  │  all   │ seq │   ❌    │
│ release-agent  │   ✅    │ pkg.json │    ❌    │  git+npm  │  rel   │ seq │   ❌    │
│ ui-agent       │   ✅    │   src/   │    ❌    │    npm    │  read  │ m+p │   ❌    │
│ data-agent     │   ✅    │  db/mig  │    ❌    │  psql/sql │  read  │ seq │   ❌    │
│ devops-agent   │   ✅    │ workflow │    ❌    │     ✅    │  work  │ seq │   ❌    │
│ security-agent │   ✅    │    ❌    │    ❌    │   audit   │  sec   │ seq │   ❌    │
│ docs-agent     │   ✅    │   docs   │    ❌    │  typedoc  │  read  │ c+s │   ❌    │
│ research-agent │   ✅    │ research │    ❌    │   read    │   ❌   │ t+s │  https  │
│ analyzer-agent │   ✅    │    ❌    │    ❌    │   read    │  read  │ seq │   ❌    │
│ workflow-agent │   ✅    │ workflow │    ❌    │     ✅    │  work  │ all │   ❌    │
│ memory-agent   │   ✅    │  ses/chk │    ❌    │    git    │  read  │ s+m │   ❌    │
│ swarm-coord    │   ✅    │  swarm   │    ❌    │     ✅    │  read  │ all │   ❌    │
└────────────────┴─────────┴──────────┴──────────┴───────────┴────────┴─────┴─────────┘

Legend:
  ✅ = Full permission
  ❌ = No permission
  read = Read-only
  r+c = Read + Comment
  seq = Sequential MCP
  p+c = Playwright + Context7
  s+m = Sequential + Serena
  m+p = Magic + Playwright
  t+s = Tavily + Sequential
  all = All MCP servers
```

---

## Decision Tree: Agent Selection

```
                          Task Request
                               │
                    ┌──────────┴──────────┐
                    │                     │
              Code-related?         Documentation?
                    │                     │
         ┌──────────┴──────────┐         └─→ docs-agent
         │                     │
    Implementation?        Review?
         │                     │
    ┌────┴────┐               └─→ reviewer-agent
    │         │
Write new? Modify?
    │         │
    │         └─→ coder-agent
    │
Testing?
    │
    └─→ tester-agent


                          Task Request
                               │
                    ┌──────────┴──────────┐
                    │                     │
              PM-related?           GitHub-related?
                    │                     │
         ┌──────────┴──────────┐         ├─→ Create Issue? → github-agent
         │                     │         └─→ Create PR? → github-agent
    Create PRD?          Track progress?
         │                     │
    pm-agent            tracker-agent


                          Task Request
                               │
                    ┌──────────┴──────────┐
                    │                     │
              UI/Frontend?          Infrastructure?
                    │                     │
              ui-agent              devops-agent


                          Task Request
                               │
                    ┌──────────┴──────────┐
                    │                     │
          Multi-agent workflow?    Research needed?
                    │                     │
           swarm-coordinator        research-agent
```

---

## Parallel Batch Execution

```
TIME →
─────────────────────────────────────────────────────────────

Batch 1 (Foundation)
█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ (2 days)

Batch 2 (Core Agents)           Batch 3 (PM)         Batch 4 (GitHub)
░░░░░███████████░░░░░░░░░░░░░   ░░░░░██████░░░░░░░   ░░░░░████████░░░
    (5 days)                         (2 days)             (3 days)

Batch 5 (Specialists)                Batch 6 (Advanced)
░░░░░░░░░░░░░░░░███████░░░░░░       ░░░░░░░░░░░░███████░░░░
                (3 days)                         (2 days)

Validation
░░░░░░░░░░░░░░░░░░░░░░░░░████████ (4 days)

─────────────────────────────────────────────────────────────
Day: 1  3  5  7  9  11 13 15 17 19 21 23 25 27


Sequential Approach: 30 days
Parallel Approach: 22 days
Time Saved: 8 days (27%)
```

---

## Risk Heat Map

```
                         IMPACT
                    Low  Med  High Critical
                  ┌─────┬─────┬─────┬─────┐
              Low │     │     │     │     │
                  ├─────┼─────┼─────┼─────┤
P             Med │     │  4  │  2  │     │
R                 ├─────┼─────┼─────┼─────┤
O           High │  3  │  1  │  5  │     │
B                 ├─────┼─────┼─────┼─────┤
        Critical │     │     │     │     │
                  └─────┴─────┴─────┴─────┘

Risk Legend:
  1 = Permission mapping errors (High/Med) → Start restrictive
  2 = Broken dependencies (Med/High) → Dependency graph validation
  3 = Performance degradation (High/Low) → Benchmark each phase
  4 = GitHub integration failures (Med/Med) → Retry logic
  5 = User workflow disruption (High/High) → Dual operation period
```

---

## Validation Pipeline

```
┌────────────────────────────────────────────────────────────┐
│                    VALIDATION LEVELS                       │
└────────────────────────────────────────────────────────────┘

Level 1: SYNTAX
┌──────────────────────────────────────────┐
│ • Validate JSON files                    │──→ PASS? ──┐
│ • Check schema compliance                │            │
│ • Verify agent definitions complete      │            ▼
└──────────────────────────────────────────┘        FAIL → STOP
                                                    PASS ↓

Level 2: STRUCTURE
┌──────────────────────────────────────────┐
│ • Check command coverage (≥95%)          │──→ PASS? ──┐
│ • Verify dependency mappings             │            │
│ • Validate permission sets               │            ▼
└──────────────────────────────────────────┘        FAIL → STOP
                                                    PASS ↓

Level 3: FUNCTIONAL
┌──────────────────────────────────────────┐
│ • Test file operations                   │──→ PASS? ──┐
│ • Test shell execution                   │            │
│ • Test agent collaboration               │            ▼
└──────────────────────────────────────────┘        FAIL → STOP
                                                    PASS ↓

Level 4: INTEGRATION
┌──────────────────────────────────────────┐
│ • Test GitHub operations                 │──→ PASS? ──┐
│ • Test MCP integrations                  │            │
│ • Test real-world workflows              │            ▼
└──────────────────────────────────────────┘        FAIL → STOP
                                                    PASS ↓

                                            ┌────────────────┐
                                            │ PRODUCTION     │
                                            │   READY ✅     │
                                            └────────────────┘
```

---

## Rollback Decision Tree

```
                    Is there a problem?
                            │
                  ┌─────────┴─────────┐
                  │                   │
                YES                  NO
                  │                   │
         ┌────────┴────────┐         └─→ Continue
         │                 │
   Critical issue?   Minor issue?
         │                 │
    ┌────┴────┐           └─→ Log and continue
    │         │
Within 1h? After 1h?
    │         │
    │         ├─→ Users affected? ──Yes──→ EMERGENCY ROLLBACK
    │         │                      │
    │         │                      No
    │         │                      │
    │         └──────────────────────┴─→ PARTIAL ROLLBACK
    │                                     (Specific agent)
    │
    └─→ IMMEDIATE ROLLBACK
        (git stash pop + restore backup)


Rollback Procedures:
┌─────────────────────────────────────────────────────────┐
│ EMERGENCY ROLLBACK (< 5 min)                           │
│ • pkill opencode                                        │
│ • git stash pop                                         │
│ • restore from backup                                   │
│ • verify .claude operational                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PARTIAL ROLLBACK (< 30 min)                            │
│ • Remove agent definition                               │
│ • Restore commands from backup                          │
│ • Re-test affected workflows                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ GRACEFUL CUTBACK (Planned reversion)                   │
│ • Freeze .opencode                                      │
│ • Re-enable .claude                                     │
│ • Notify users                                          │
│ • Analyze issues for future attempt                     │
└─────────────────────────────────────────────────────────┘
```

---

## Success Metrics Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                   MIGRATION HEALTH DASHBOARD                    │
└─────────────────────────────────────────────────────────────────┘

Command Coverage
█████████████████████████████████████████████████ 215/215 (100%) ✅

Agent Definitions
█████████████████████████████████████████████████ 18/18 (100%) ✅

Permission Mappings
█████████████████████████████████████████████████ 54/54 (100%) ✅

Validation Tests
████████████████████████████████████████████████  45/46 (98%) ⚠️

Performance Benchmarks
████████████████████████████████████████          105% baseline ✅

User Satisfaction
████████████████████████████████████              85% satisfied ✅


┌─────────────────────────────────────────────────────────────────┐
│ Weekly Progress                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Week 1: ████████████████░░░░░░░░░░░░░░░░░░░░ Foundation + Core │
│ Week 2: ░░░░░░░░░░░░░░░░███████████████░░░░░ PM + GitHub       │
│ Week 3: ░░░░░░░░░░░░░░░░░░░░░░░░░░█████████░ Specialists       │
│ Week 4: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████ Validation        │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│ Critical Metrics (Must Pass Before Cutover)                     │
├─────────────────────────────────────────────────────────────────┤
│ ✅ Command coverage ≥95%         (Current: 100%)                │
│ ✅ All validation levels pass    (Current: 4/4)                 │
│ ✅ Performance ≤110% baseline    (Current: 105%)                │
│ ✅ User satisfaction ≥80%        (Current: 85%)                 │
│ ✅ Critical issues <5            (Current: 0)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Command Migration Flow Example

```
BEFORE (Claude Code):
  .claude/commands/pm/prd-new.md
    ↓
  Contains: Slash command instructions
    ↓
  Executed via: /pm:prd-new


MIGRATION PROCESS:
  1. Extract content from .claude/commands/pm/prd-new.md
     ↓
  2. Map to target agent: pm-agent
     ↓
  3. Convert to agent instructions format
     ↓
  4. Embed in .opencode/agents/plan/pm-agent.json


AFTER (OpenCode):
  .opencode/agents/plan/pm-agent.json
    ↓
  Contains: Agent instructions including PRD creation
    ↓
  Executed via: opencode run pm-agent "Create PRD for X"


VERIFICATION:
  Test: opencode run pm-agent "Create PRD for authentication"
    ↓
  Expected: .claude/prds/authentication.md created
    ↓
  Result: ✅ PASS → Migration successful
          ❌ FAIL → Debug and retry
```

---

## System Emergence Patterns

```
                INDIVIDUAL AGENTS
                       │
                       │ Combine
                       ▼
              ┌─────────────────┐
              │ COLLABORATION   │
              │   PATTERNS      │
              └─────────┬───────┘
                        │
              ┌─────────┴─────────┐
              │                   │
         Workflows            Capabilities
              │                   │
    ┌─────────┴────────┐   ┌──────┴──────┐
    │                  │   │             │
  Simple          Complex  Individual  Emergent
  Tasks            Tasks   Skills      Abilities
    │                  │   │             │
    └──────────────────┴───┴─────────────┘
                       │
                       ▼
              SYSTEM CAPABILITIES
              (Greater than sum)


Examples of Emergence:
┌──────────────────────────────────────────────────────────┐
│ Individual: pm-agent creates PRD                         │
│ Individual: planner-agent breaks down tasks              │
│ Individual: coder-agent implements features              │
│ EMERGENT: End-to-end feature delivery workflow           │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Individual: analyzer-agent detects patterns              │
│ Individual: memory-agent stores insights                 │
│ Individual: coder-agent applies patterns                 │
│ EMERGENT: Self-improving code generation                 │
└──────────────────────────────────────────────────────────┘
```

---

## Feedback Loop Visualization

```
┌────────────────────────────────────────────────────────────────┐
│               REINFORCING LOOP: Agent Improvement              │
└────────────────────────────────────────────────────────────────┘

Better Instructions
        ⬆
        │
        │ (Learn from)
        │
More Usage   ──────→   Better Outcomes
        │                     │
        │ (Collect)           │ (Produce)
        ▼                     │
  Usage Patterns  ←───────────┘
    (Analyze)


┌────────────────────────────────────────────────────────────────┐
│             BALANCING LOOP: Permission Control                 │
└────────────────────────────────────────────────────────────────┘

More Permissions Requested
        │
        │ (Triggers)
        ▼
  Security Review
        │
        │ (Results in)
        ▼
  Restricted Grant  ──────→  Alternative Approach
        │                           │
        │ (Leads to)                │
        └───────────────────────────┘
              (Reduces pressure)
```

---

**Document Version**: 1.0
**Purpose**: Visual stakeholder communication
**Audience**: Technical and non-technical stakeholders
**Usage**: Reference during planning meetings and presentations
