# CCPM Implementation Guide: From Plan to Execution

**Version:** 1.0
**Date:** 2025-10-20
**Purpose:** Bridge development plan to actual CCPM workflow with GitHub Issues

---

## Overview

This guide explains how to convert the **CCPM Development Plan** into actionable GitHub Issues using the CCPM system, enabling systematic execution with multi-agent coordination.

---

## CCPM Workflow Integration

### Step 1: Create PRD from Development Plan

**Command**: `/pm:prd-new`

**PRD Structure**:
```markdown
# PRD: Evolve Framework Development (Phase 1-4)

## Vision
Self-improving autonomous AI-assisted development framework enabling 10x productivity

## Business Value
- 2-3x productivity by Week 4
- 4-5x productivity by Week 8
- 6-7x productivity by Week 14
- 7-10x productivity by Week 20

## Success Metrics
- 84.8% SWE-Bench solve rate
- 32.3% token reduction
- 2.8-4.4x speed improvement
- 99.5% production uptime

## Technical Requirements
[9 Epics from development plan]

## Timeline
20 weeks across 4 phases

## Budget
$2,500-8,000 (software + infrastructure)
```

**Output**: `.claude/prds/evolve-framework-v1.md`

---

### Step 2: Create Epic Structure

**For Each Epic in Development Plan**:

#### Epic 1: Foundation Infrastructure
**Command**: `/pm:prd-parse evolve-framework-v1.md`

**Epic Decomposition**:
```yaml
Epic: Foundation Infrastructure
Status: not_started
Priority: HIGH
Timeline: Weeks 1-4
Dependencies: []

Stories:
  - 1.1: SuperClaude Framework Integration
  - 1.2: Multi-Agent Orchestration Setup
  - 1.3: Constitutional AI Safety Framework
  - 1.4: BMAD Method & CCPM Integration

Technical Stack:
  - SuperClaude
  - Claude Flow
  - Git worktrees
  - CCPM

Success Criteria:
  - 70% token reduction
  - 3-5 parallel agents
  - Safety validation >95%
  - 2-3x productivity
```

**Output**: `.claude/epics/epic-foundation-infrastructure.md`

---

### Step 3: Sync to GitHub Issues

**Command**: `/pm:epic-oneshot epic-foundation-infrastructure`

**GitHub Issue Structure**:
```
Issue #1: [EPIC] Foundation Infrastructure
Labels: epic, high-priority, phase-1
Milestone: Phase 1 (Weeks 1-4)

Body:
- Overview from epic
- 4 stories as sub-issues
- Success criteria
- Dependencies
- Resource requirements

Sub-Issues:
  #2: [Story 1.1] SuperClaude Framework Integration
  #3: [Story 1.2] Multi-Agent Orchestration Setup
  #4: [Story 1.3] Constitutional AI Safety Framework
  #5: [Story 1.4] BMAD Method & CCPM Integration
```

---

### Step 4: Begin Work on Stories

**Command**: `/pm:issue-start 2`

**Workflow**:
1. Creates git worktree: `../epic-foundation-infrastructure/`
2. Spawns specialized agent based on story type
3. Agent reads story details from issue
4. Agent creates implementation plan
5. Work proceeds with agent coordination

**Agent Selection** (Automatic):
- Story 1.1 (SuperClaude): `coder` + `researcher`
- Story 1.2 (Multi-Agent): `system-architect` + `planner`
- Story 1.3 (Security): `security-manager` + `reviewer`
- Story 1.4 (CCPM): `backend-dev` + `tester`

---

### Step 5: Track Progress

**During Development**:
```bash
# Update progress locally
/pm:issue-sync 2

# Check what's next
/pm:next

# View epic status
/pm:epic-show foundation-infrastructure
```

**Progress Updates Automatically**:
- Task completion tracked in `.claude/epics/epic-foundation-infrastructure/updates/`
- GitHub issue comments updated with progress
- Agent coordination via memory system
- Commits linked to issues

---

## Complete Epic Workflow Example

### Epic 1: Foundation Infrastructure (Detailed)

#### Week 1: Story 1.1 & 1.2

**Monday**:
```bash
# Start Story 1.1: SuperClaude Integration
/pm:issue-start 2

# Agent spawns in worktree
cd ../epic-foundation-infrastructure/

# Agent executes tasks:
# 1. Install SuperClaude
# 2. Configure 8 MCP servers
# 3. Test 26 commands
# 4. Validate 16 agents
# 5. Measure token baseline
# 6. Document workflows

# Commit and sync progress
/pm:issue-sync 2
```

**Tuesday**:
```bash
# Story 1.1 complete, start Story 1.2
/pm:issue-start 3

# Agent executes:
# 1. Configure Git worktrees
# 2. Set up mesh topology
# 3. Implement memory communication
# 4. Create 4-agent test scenario
# 5. Validate coordination
# 6. Document patterns

/pm:issue-sync 3
```

**Wednesday-Friday**: Continue with Stories 1.3 and 1.4

---

#### Week 2: Epic 2 (MCP Integration) + Story 1.3

**Parallel Execution**:
```bash
# Story 1.3 continues in worktree-1
cd ../epic-foundation-infrastructure/
# Security engineer agent working

# Start Epic 2 in parallel worktree-2
/pm:issue-start 6  # Story 2.1: Core MCP Configuration
cd ../epic-mcp-integration/
# Backend developer agent working

# Both agents coordinate via memory
# No conflicts (different file paths)
```

---

### Epic 3: Knowledge Management (Weeks 5-8)

**Command Sequence**:
```bash
# Create epic from PRD
/pm:prd-parse evolve-framework-v1.md --epic knowledge-management

# Sync to GitHub
/pm:epic-oneshot knowledge-management

# Start first story (RAG deployment)
/pm:issue-start 10  # Story 3.1

# Agent selection: ml-developer + backend-dev
# Tasks executed:
# - Deploy ChromaDB
# - Index 500+ documents
# - Implement semantic search
# - Test retrieval accuracy
# - Document curation process

# Sync progress
/pm:issue-sync 10
```

---

## Agent Coordination Patterns

### Pattern 1: Sequential Stories
**Used when**: Stories in same epic have dependencies

```bash
# Story A must complete before Story B
/pm:issue-start A
# Work completes
/pm:issue-sync A  # Marks complete

/pm:next  # Returns Story B (dependency satisfied)
/pm:issue-start B
```

### Pattern 2: Parallel Stories
**Used when**: Stories are independent

```bash
# Story X and Story Y can run simultaneously
# Terminal 1:
/pm:issue-start X
cd ../epic-name-X/
# Agent X works

# Terminal 2:
/pm:issue-start Y
cd ../epic-name-Y/
# Agent Y works

# Different worktrees = no conflicts
# Agents coordinate via memory
```

### Pattern 3: Multi-Agent Story
**Used when**: Single story needs multiple specialists

```bash
/pm:issue-start Z

# System spawns multiple agents:
# - Architect designs system
# - Backend-dev implements APIs
# - Frontend-dev builds UI
# - Tester writes test suite
# - All coordinate via memory
# - Commits organized by agent role
```

---

## Story-to-Agent Mapping

### Automatic Agent Selection

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
| 3D/Visualization | `coder` | `researcher` |

### Manual Agent Override

```bash
# Force specific agent
/pm:issue-start 15 --agent system-architect

# Force agent team
/pm:issue-start 20 --agents backend-dev,tester,reviewer
```

---

## Memory Coordination Example

### Story 3.1: RAG Knowledge Base

**Agent 1** (ml-developer) in worktree:
```bash
# Store schema decision
npx claude-flow@alpha hooks post-edit \
  --file "database/schema.sql" \
  --memory-key "swarm/ml-dev/schema-design"

# Memory content:
{
  "agent": "ml-developer",
  "decision": "ChromaDB chosen over Neo4j",
  "rationale": "Free for prototyping, easy migration path",
  "schema": "collections with embeddings (1536 dimensions)",
  "timestamp": "2025-10-20T10:30:00Z"
}
```

**Agent 2** (backend-dev) in same worktree:
```bash
# Read schema decision from memory
npx claude-flow@alpha hooks session-restore \
  --session-id "swarm-foundation"

# Retrieves ml-dev's schema decision
# Implements API endpoints matching schema
# Stores own API design decisions
```

**Result**: Coordinated without communication overhead, all decisions preserved in memory

---

## Progress Tracking Dashboard

### Epic-Level View
```bash
/pm:epic-show foundation-infrastructure
```

**Output**:
```
Epic: Foundation Infrastructure
Status: in_progress (60% complete)
Timeline: Week 1-4 (currently Week 2)

Stories:
  ✅ 1.1: SuperClaude Integration (completed Week 1)
  ✅ 1.2: Multi-Agent Orchestration (completed Week 1)
  🔄 1.3: Constitutional AI Safety (in_progress, 70%)
  ⏳ 1.4: BMAD/CCPM Integration (not_started)

Metrics:
  - Token reduction: 58% (target: 70%)
  - Parallel agents: 4 (target: 3-5)
  - Safety validation: 92% (target: 95%)
  - Velocity: 2.1x baseline (target: 2-3x)

Next Actions:
  - Complete Story 1.3 (1-2 days)
  - Begin Story 1.4 (2-3 days)
  - Epic completion: Friday Week 2
```

---

### Story-Level View
```bash
/pm:issue-sync 4 --status
```

**Output**:
```
Story 4: Constitutional AI Safety Framework
Status: in_progress (70%)
Agent: security-manager
Worktree: ../epic-foundation-infrastructure/

Progress:
  ✅ Define constitutional principles
  ✅ Implement pre-commit security hooks
  ✅ Create package verification
  🔄 Set up audit logging (80%)
  ⏳ Build test suite (20+ scenarios)
  ⏳ Document safety guardrails

Commits: 8
Files Changed: 15
Tests: 14/20 passing
Blockers: None

Estimated Completion: Tomorrow (1 day)
```

---

## Integration with Existing CCPM Commands

### Context Management
```bash
# Load project context
/context:prime

# Update context with progress
/context:update

# Ensure agents have full context
# Happens automatically via memory system
```

### Research Integration
```bash
# Research new technology for story
/research "DSPy optimization techniques"

# Research automatically saved to memory
# Available to all agents via semantic search
```

### Quality Gates
```bash
# Before marking story complete
# Automatic validation:
# - All tasks checked off
# - Tests passing
# - Code reviewed
# - Documentation updated
# - GitHub issue synced

# Manual validation if needed
/pm:issue-sync 10 --validate
```

---

## Best Practices

### 1. Epic Organization
- **One epic per week** for smaller projects
- **2-4 weeks per epic** for larger features
- **Maximum 5 stories per epic** for manageability
- **Clear dependencies documented** in epic metadata

### 2. Story Sizing
- **1-3 days per story** (ideal)
- **Maximum 5 days** (split if larger)
- **Minimum 1 day** (combine if smaller)
- **6-8 tasks per story** (maintainable complexity)

### 3. Agent Coordination
- **Start with 2-3 agents** for new epics
- **Scale to 5-8 agents** as coordination improves
- **Monitor coordination overhead** (target <20%)
- **Use memory for all inter-agent communication**

### 4. Progress Tracking
- **Sync to GitHub daily** (at minimum)
- **Update epic status weekly**
- **Review metrics in sprint retrospectives**
- **Adjust estimates based on velocity**

### 5. Quality Assurance
- **Test coverage >80%** before story completion
- **Code review required** for all changes
- **Documentation updated** with every story
- **Security scan passed** before merge

---

## Common Issues & Solutions

### Issue: Agent Coordination Conflicts
**Symptom**: Multiple agents editing same file
**Solution**: Use path-based agent assignment
```yaml
Agent A: src/api/*
Agent B: src/database/*
Agent C: src/ui/*
```

### Issue: Memory Synchronization Lag
**Symptom**: Agents not seeing latest decisions
**Solution**: Explicit memory refresh
```bash
npx claude-flow@alpha hooks session-restore --force
```

### Issue: Story Estimation Drift
**Symptom**: Stories taking 2x estimated time
**Solution**: Track velocity, adjust estimates
```bash
/pm:epic-show <epic> --metrics
# Review actual vs estimated
# Adjust future estimates
```

### Issue: GitHub Sync Failures
**Symptom**: Issues not updating in GitHub
**Solution**: Manual sync with debug
```bash
/pm:issue-sync <issue> --debug
# Check GitHub CLI authentication
gh auth status
```

---

## Metrics Collection

### Productivity Metrics
```yaml
Baseline (Week 0):
  - Features per week: 1
  - Lines of code per day: 200
  - Tests per feature: 5
  - Bug rate: 15%

Phase 1 Target (Week 4):
  - Features per week: 2-3
  - Lines of code per day: 400-600
  - Tests per feature: 10-15
  - Bug rate: 7%

Phase 2 Target (Week 8):
  - Features per week: 4-5
  - Lines of code per day: 800-1000
  - Tests per feature: 20-25
  - Bug rate: 3%

Phase 4 Target (Week 20):
  - Features per week: 7-10
  - Lines of code per day: 1400-2000
  - Tests per feature: 35-50
  - Bug rate: 1%
```

### Quality Metrics
```yaml
Code Quality:
  - Test coverage: >80%
  - Code review approval: 100%
  - Security scan pass: 100%
  - Documentation completeness: >90%

System Reliability:
  - Uptime: >99.5%
  - MTTD (Mean Time To Detect): <5 minutes
  - MTTR (Mean Time To Recover): <30 minutes
  - Error rate: <1%
```

---

## Next Steps

### Immediate (Today)
1. **Create first epic**: `/pm:prd-parse evolve-framework-v1.md --epic foundation-infrastructure`
2. **Sync to GitHub**: `/pm:epic-oneshot foundation-infrastructure`
3. **Start first story**: `/pm:issue-start 2`

### This Week
1. Complete Epic 1, Stories 1.1 and 1.2
2. Establish baseline metrics
3. Validate agent coordination
4. Document learnings

### This Month
1. Complete Phase 1 (Epic 1 + Epic 2)
2. Achieve 2-3x productivity improvement
3. Validate CCPM workflow effectiveness
4. Prepare for Phase 2

---

## Conclusion

This CCPM implementation guide bridges the theoretical development plan to practical execution using the CCPM system. By following this workflow, you can:

- ✅ Convert epics to GitHub Issues systematically
- ✅ Coordinate multiple agents without conflicts
- ✅ Track progress with real-time metrics
- ✅ Achieve 7-10x productivity improvement over 20 weeks

The key is **systematic execution** combined with **continuous measurement** and **adaptive refinement** based on actual outcomes.

---

**Document Status**: Complete
**Next Action**: Create first epic with `/pm:epic-oneshot`
**Maintainer**: Evolve Development Team
**Related**: `ccpm-development-plan.md`
