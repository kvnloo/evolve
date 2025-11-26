# CCPM Framework Comprehensive Analysis
**Agent 3: Framework Analyst**
**Date: 2025-11-26**

## Executive Summary

CCPM (Claude Code PM) is a spec-driven project management framework that integrates tightly with GitHub Issues and Git worktrees. It provides a complete workflow from PRD creation → Epic decomposition → GitHub sync → Parallel agent execution → Merge.

**Key Strengths:**
- Complete PRD → Epic → Issue → Implementation workflow
- GitHub integration with issue tracking
- Git worktree-based parallel development
- Frontmatter-driven metadata management
- Parallel agent coordination through file-level isolation

**Key Gaps:**
- PM commands don't auto-trigger (user must manually invoke)
- No enforcement of PM discipline workflow
- Missing auto-analysis triggers
- No workflow validation gates
- Limited error recovery patterns

---

## 1. Complete PM Command Inventory (38 Commands)

### PRD Management (5 commands)
| Command | Purpose | Parameters | Workflow Integration |
|---------|---------|------------|---------------------|
| **prd-new** | Create new PRD with brainstorming | `<feature_name>` | Entry point: Start with requirements gathering |
| **prd-edit** | Edit existing PRD | `<feature_name>` | Refinement: Update requirements |
| **prd-list** | List all PRDs | none | Discovery: Browse available PRDs |
| **prd-parse** | Convert PRD to Epic | `<feature_name>` | Progression: PRD → Epic transition |
| **prd-status** | Show PRD status | none | Monitoring: Track PRD lifecycle |

### Epic Management (11 commands)
| Command | Purpose | Parameters | Workflow Integration |
|---------|---------|------------|---------------------|
| **epic-oneshot** | Decompose + Sync in one step | `<feature_name>` | Fast track: PRD → GitHub Issues |
| **epic-decompose** | Break epic into tasks | `<feature_name>` | Task creation: Epic → Task files |
| **epic-sync** | Push epic/tasks to GitHub | `<feature_name>` | GitHub sync: Local → GitHub Issues |
| **epic-start** | Launch parallel agents | `<epic_name>` | Execution: Start work in worktree |
| **epic-start-worktree** | Create/enter worktree | `<epic_name>` | Environment: Setup workspace |
| **epic-merge** | Merge completed epic | `<epic_name>` | Completion: Worktree → main |
| **epic-close** | Mark epic complete | `<epic_name>` | Finalization: Close epic |
| **epic-status** | Show epic progress | `<epic_name>` | Monitoring: Track completion |
| **epic-show** | Display epic details | `<epic_name>` | Inspection: View epic content |
| **epic-list** | List all epics | none | Discovery: Browse epics |
| **epic-edit** | Edit epic content | `<epic_name>` | Refinement: Update epic |
| **epic-refresh** | Refresh epic from PRD | `<epic_name>` | Sync: Re-parse from PRD |

### Issue Management (9 commands)
| Command | Purpose | Parameters | Workflow Integration |
|---------|---------|------------|---------------------|
| **issue-analyze** | Identify parallel work streams | `<issue_number>` | Planning: Parallelization analysis |
| **issue-start** | Begin work with agents | `<issue_number>` | Execution: Launch parallel agents |
| **issue-sync** | Push updates to GitHub | `<issue_number>` | Sync: Local → GitHub comments |
| **issue-close** | Complete and close issue | `<issue_number>` | Completion: Close work |
| **issue-status** | Show issue progress | `<issue_number>` | Monitoring: Track progress |
| **issue-show** | Display issue details | `<issue_number>` | Inspection: View issue |
| **issue-edit** | Edit issue locally | `<issue_number>` | Refinement: Update task |
| **issue-reopen** | Reopen closed issue | `<issue_number>` | Recovery: Resume work |

### Workflow Navigation (7 commands)
| Command | Purpose | Parameters | Workflow Integration |
|---------|---------|------------|---------------------|
| **next** | Get next available task | none | Priority: Find ready work |
| **status** | Project-wide status | none | Monitoring: Overview dashboard |
| **standup** | Generate standup report | none | Reporting: Daily progress |
| **in-progress** | List active tasks | none | Monitoring: Current work |
| **blocked** | List blocked tasks | none | Monitoring: Identify blockers |
| **search** | Search across PM files | `<query>` | Discovery: Find content |
| **sync** | Sync all to GitHub | none | Sync: Batch operations |

### Utility Commands (6 commands)
| Command | Purpose | Parameters | Workflow Integration |
|---------|---------|------------|---------------------|
| **init** | Initialize PM structure | none | Setup: First-time config |
| **help** | Show command help | none | Documentation: Guide users |
| **validate** | Validate PM structure | none | Quality: Check integrity |
| **clean** | Clean up stale files | none | Maintenance: Housekeeping |
| **import** | Import external issues | `<issue_number>` | Integration: External work |
| **test-reference-update** | Update cross-references | none | Maintenance: Fix references |

---

## 2. PRD → Epic → Issue Workflow

### Complete Flow Diagram
```
┌─────────────────┐
│   prd-new       │  User creates PRD with brainstorming
│                 │  Output: .claude/prds/{name}.md
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   prd-parse     │  Convert PRD to technical Epic
│                 │  Output: .claude/epics/{name}/epic.md
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ epic-decompose  │  Break into concrete tasks
│                 │  Output: .claude/epics/{name}/001.md, 002.md, ...
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   epic-sync     │  Push to GitHub
│                 │  Creates: Epic issue + Sub-issues
│                 │  Renames: 001.md → {issue_id}.md
│                 │  Creates: ../epic-{name}/ worktree
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ issue-analyze   │  Identify parallel streams
│                 │  Output: {issue}-analysis.md
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  issue-start    │  Launch parallel agents
│                 │  Spawns: Multiple Task agents per stream
│                 │  Output: updates/{issue}/stream-*.md
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  issue-sync     │  Push progress to GitHub
│                 │  Creates: Issue comments with updates
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  issue-close    │  Complete issue
│                 │  Updates: Task status, epic progress
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  epic-merge     │  Merge completed epic
│                 │  Merges: epic/{name} → main
│                 │  Removes: Worktree, closes GitHub issues
└─────────────────┘
```

### File Structure Evolution

**Stage 1: PRD Creation**
```
.claude/prds/
└── user-auth.md          # PRD with frontmatter
```

**Stage 2: Epic Parsing**
```
.claude/epics/user-auth/
├── epic.md               # Technical implementation epic
```

**Stage 3: Task Decomposition**
```
.claude/epics/user-auth/
├── epic.md
├── 001.md                # Task: Database schema
├── 002.md                # Task: API endpoints
├── 003.md                # Task: UI components
```

**Stage 4: GitHub Sync**
```
.claude/epics/user-auth/
├── epic.md               # Updated with GitHub URL
├── 1234.md               # Renamed from 001.md
├── 1235.md               # Renamed from 002.md
├── 1236.md               # Renamed from 003.md
└── github-mapping.md     # Issue number mapping

../epic-user-auth/        # Git worktree created
```

**Stage 5: Work Execution**
```
.claude/epics/user-auth/
├── epic.md
├── 1234.md
├── 1235.md
├── 1236.md
├── 1234-analysis.md      # Parallel work streams
└── updates/
    └── 1234/
        ├── stream-A.md   # Database agent progress
        ├── stream-B.md   # API agent progress
        └── progress.md   # Overall progress tracking
```

### Frontmatter Lifecycle

**PRD Frontmatter:**
```yaml
---
name: user-auth
description: User authentication system
status: backlog
created: 2025-11-26T10:00:00Z
---
```

**Epic Frontmatter:**
```yaml
---
name: user-auth
status: backlog → in-progress → completed
created: 2025-11-26T10:30:00Z
updated: 2025-11-26T15:00:00Z
progress: 0% → 50% → 100%
prd: .claude/prds/user-auth.md
github: https://github.com/owner/repo/issues/1233
---
```

**Task Frontmatter:**
```yaml
---
name: Database Schema
status: open → in-progress → closed
created: 2025-11-26T11:00:00Z
updated: 2025-11-26T14:00:00Z
github: https://github.com/owner/repo/issues/1234
depends_on: []
parallel: true
conflicts_with: []
---
```

---

## 3. Worktree Management

### Worktree Lifecycle

**Creation:**
```bash
# epic-sync creates worktree automatically
git worktree add ../epic-{name} -b epic/{name}
```

**Usage Pattern:**
- **One worktree per epic** (NOT per issue)
- Multiple agents work in **same worktree**
- File-level isolation prevents conflicts
- Agents commit frequently with issue tags

**Agent Coordination:**
```yaml
# From {issue}-analysis.md
Stream A: Database Layer
  Files: src/db/*, migrations/*
  Agent: backend-specialist

Stream B: API Layer
  Files: src/api/*
  Agent: api-specialist

Stream C: UI Layer
  Files: src/ui/*
  Agent: frontend-specialist
```

**Coordination Rules:**
1. Agents only modify assigned file patterns
2. Shared files require explicit coordination
3. Agents communicate through commits
4. Progress tracked in `.claude/epics/{epic}/updates/{issue}/stream-*.md`

**Merge Process:**
```bash
# epic-merge handles this
cd {main-repo}
git checkout main
git merge epic/{name} --no-ff

# If successful:
git worktree remove ../epic-{name}
git branch -d epic/{name}
```

---

## 4. GitHub Integration

### Repository Protection

**CRITICAL: Anti-template safeguard**
```bash
# Every GitHub write operation MUST check:
remote_url=$(git remote get-url origin)
if [[ "$remote_url" == *"automazeio/ccpm"* ]]; then
  echo "❌ Cannot sync to CCPM template repository!"
  exit 1
fi
```

**Applied to:**
- `epic-sync` - Creates epic/task issues
- `issue-sync` - Posts comments
- `issue-close` - Closes issues
- `epic-merge` - Closes issues

### Issue Automation

**Epic Issue Creation:**
```bash
# epic-sync creates parent epic
gh issue create \
  --title "Epic: user-auth" \
  --body-file epic-body.md \
  --label "epic,epic:user-auth,feature"
```

**Task Sub-Issues:**
```bash
# Using gh-sub-issue (preferred)
gh sub-issue create \
  --parent 1233 \
  --title "Database Schema" \
  --body-file task-body.md \
  --label "task,epic:user-auth"

# Fallback without extension
gh issue create \
  --title "Database Schema" \
  --body-file task-body.md \
  --label "task,epic:user-auth"
```

**Progress Sync:**
```bash
# issue-sync posts updates as comments
gh issue comment 1234 --body-file progress-update.md
```

**Task Reference Updates:**
```bash
# After sync, task files renamed and references updated
# 001.md → 1234.md
# depends_on: [001, 002] → depends_on: [1234, 1235]
```

### Label Strategy

**Epic Labels:**
- `epic` - Marks as epic issue
- `epic:{name}` - Groups related tasks
- `feature` or `bug` - Type classification

**Task Labels:**
- `task` - Marks as task issue
- `epic:{name}` - Links to parent epic
- `in-progress` - Added when work starts

---

## 5. Gap Analysis

### Missing Auto-Triggers

**Current State:** All commands require manual invocation
**Should Auto-Trigger:**

1. **issue-analyze before issue-start**
   - Current: User must run `/pm:issue-analyze 1234` then `/pm:issue-start 1234`
   - Should: `issue-start` auto-runs analysis if missing
   - Impact: Skipped analysis = no parallelization

2. **epic-sync after epic-decompose**
   - Current: User must remember to sync
   - Should: Prompt or auto-sync after decompose
   - Impact: Local tasks not tracked in GitHub

3. **issue-sync during issue-start**
   - Current: No automatic sync when work begins
   - Should: Auto-comment on GitHub when agents start
   - Impact: Stakeholders don't see progress in real-time

4. **Worktree creation validation**
   - Current: Commands assume worktree exists
   - Should: Auto-create if missing
   - Impact: Commands fail with unclear errors

### Workflow Enforcement Gaps

**No Validation Gates:**
- No check that PRD exists before prd-parse
- No check that epic synced before issue-start
- No check that analysis exists before starting work
- No prevention of working outside worktree

**Should Have:**
```yaml
Workflow Gates:
  prd-parse:
    requires: PRD file exists

  epic-decompose:
    requires: Epic file exists

  epic-sync:
    requires: Tasks decomposed
    warns: Already synced

  issue-start:
    requires:
      - Worktree exists
      - Issue synced to GitHub
      - Analysis completed
    auto_creates: Analysis if missing

  issue-sync:
    requires: Local updates exist
    prevents: Duplicate sync (< 5min)
```

### Skipped PM Discipline

**Users Can Bypass:**
1. Skip PRD and create epic directly
2. Skip epic-decompose and manually create GitHub issues
3. Work in main branch instead of worktree
4. Never sync progress to GitHub
5. Merge without completing tasks

**Should Enforce:**
- PRD → Epic → Tasks → GitHub → Worktree → Work → Merge
- Block work in main branch for PM-tracked features
- Require issue-sync before issue-close
- Validate all tasks closed before epic-merge

### Error Recovery Patterns

**Limited Recovery:**
- Partial epic-sync has no rollback
- Failed agent spawning unclear recovery
- Merge conflicts require manual intervention
- No recovery from interrupted workflows

**Should Have:**
```yaml
Recovery Commands:
  /pm:recover-sync:
    - Detect partial GitHub sync
    - Resume or rollback

  /pm:restart-agents:
    - Detect failed agent spawns
    - Restart specific streams

  /pm:resolve-conflict:
    - Guide through merge conflicts
    - Automated conflict resolution patterns
```

### Missing Workflow Steps

**Not Automated:**
1. **Pre-decompose validation**
   - Should check epic quality before creating tasks
   - Should validate task estimates are reasonable

2. **Pre-merge testing**
   - Should run tests before allowing merge
   - Should check all acceptance criteria met

3. **Progress reporting**
   - Should auto-generate daily standup
   - Should notify on blockers

4. **Dependency validation**
   - Should check if dependencies actually closed
   - Should warn about circular dependencies

### Tool Integration Gaps

**Not Leveraging:**
1. **Claude Code's Task tool** - Mentioned but not enforced
2. **TodoWrite integration** - Could track sub-steps
3. **Memory coordination** - Could cache analysis results
4. **Parallel execution** - Some commands still sequential

---

## 6. Path Standards & Protection

### Path Normalization Rules

**Prohibited:**
- `/Users/username/project/...`
- `/home/user/project/...`
- `C:\Users\username\...`

**Required:**
- `internal/auth/server.go` (project-relative)
- `../worktree-name/src/...` (cross-project)
- `.claude/prds/user-auth.md` (PM-relative)

**Auto-Cleanup:**
```bash
normalize_paths() {
  content="$1"
  content=$(echo "$content" | sed "s|/Users/[^/]*/[^/]*/|../|g")
  content=$(echo "$content" | sed "s|/home/[^/]*/[^/]*/|../|g")
  echo "$content"
}
```

### GitHub Sync Protection

**Applied to:**
- Issue bodies
- Issue comments
- Epic descriptions
- Progress updates

**Enforcement:**
- All GitHub-bound content normalized before post
- Local files can contain absolute paths (for internal use)
- Public content always relative

---

## 7. Agent Coordination Protocol

### Stream Isolation Model

**File-Level Parallelism:**
```yaml
Stream A: Database
  Files: src/db/*, migrations/*

Stream B: API
  Files: src/api/*

Stream C: UI
  Files: src/ui/*
```

**Coordination Points:**
```yaml
Shared Files:
  src/types/index.ts:
    - Stream A: Add DB types
    - Stream B: Add API types
    - Coordination: Sequential updates

Sequential Requirements:
  1. Database schema before API
  2. API types before UI components
  3. Core logic before tests
```

### Communication Channels

**Through Commits:**
```bash
# Agents see each other's work
git log --oneline -10
git pull origin epic/{name}
```

**Through Progress Files:**
```markdown
# .claude/epics/{epic}/updates/{issue}/stream-A.md
---
stream: Database Layer
agent: backend-specialist
status: in_progress
---

## Completed
- Created user table schema
- Added migration files

## Working On
- Adding indexes

## Blocked
- None
```

**Through Analysis Files:**
```markdown
# {issue}-analysis.md defines the contract
Stream A:
  Files: src/db/*  # Agent A territory

Stream B:
  Files: src/api/* # Agent B territory
```

### Conflict Resolution

**Prevention:**
- File pattern isolation
- Explicit dependencies in analysis
- Progress file updates

**Detection:**
```bash
# Before commit
git status {file}
if [[ $(git status --porcelain {file}) ]]; then
  echo "Waiting for {file}..."
  sleep 30
fi
```

**Resolution:**
- Always defer to humans
- Never auto-merge conflicts
- Report and pause work

---

## 8. Key Recommendations

### Immediate Improvements

1. **Auto-Analysis Trigger**
   ```yaml
   issue-start:
     before_execution:
       - Check for analysis file
       - If missing: Auto-run issue-analyze
       - Then proceed with agent spawning
   ```

2. **Workflow Validation Gates**
   ```yaml
   epic-sync:
     preflight:
       - Verify tasks exist
       - Check not already synced
       - Validate GitHub auth
   ```

3. **Recovery Commands**
   ```yaml
   new_commands:
     - /pm:recover-sync - Resume interrupted sync
     - /pm:validate-workflow - Check workflow state
     - /pm:auto-fix - Fix common issues
   ```

4. **Enhanced Error Messages**
   ```yaml
   errors:
     epic_not_found:
       message: "Epic not found"
       suggestion: "Run: /pm:prd-parse {name}"
       autofix: "Offer to run prd-parse"
   ```

### Workflow Enforcement

**Add Validation Layer:**
```yaml
workflow_validator:
  checks:
    - PRD before Epic
    - Epic before Tasks
    - Tasks before GitHub sync
    - Analysis before execution
    - Worktree before work

  enforcement:
    - Block invalid transitions
    - Auto-create missing prerequisites
    - Warn on workflow deviations
```

### Integration Enhancements

**Leverage Claude Code Tools:**
```yaml
task_tool_integration:
  - Use Task tool for all agent spawning
  - Batch parallel operations in single message
  - TodoWrite for tracking sub-steps

memory_coordination:
  - Cache analysis results
  - Share agent progress
  - Track workflow state
```

---

## 9. Conclusion

CCPM provides a **complete spec-driven PM workflow** with strong GitHub integration and parallel execution capabilities. However, it relies heavily on **user discipline** to follow the correct workflow steps.

**Strengths:**
- Comprehensive command coverage
- Git worktree-based isolation
- Parallel agent coordination
- Frontmatter-driven metadata
- GitHub issue sync

**Critical Gaps:**
- No auto-triggering of prerequisite commands
- No workflow enforcement gates
- Limited error recovery
- Users can bypass PM discipline
- Sequential operations that could be parallel

**Path Forward:**
- Add auto-analysis triggers
- Implement workflow validation gates
- Enhance error recovery patterns
- Enforce PM discipline through checks
- Better integration with Claude Code's Task tool

The framework is **80% complete** but needs the **final 20%** to enforce best practices automatically rather than relying on user memory and discipline.
