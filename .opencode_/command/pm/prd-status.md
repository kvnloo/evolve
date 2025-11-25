---
description: Show overall PRD system status and metrics
agent: pm-agent
---

# PRD Status

Show overall PRD system status and metrics.

## Usage
```
/pm:prd-status
```

## Instructions

### 1. Gather PRD Statistics

Scan all PRD files:
@.claude/prds/*.md

Count by status:
- Backlog: PRDs not yet converted
- In Progress: PRDs with active epics
- Completed: PRDs with completed epics

### 2. Gather Epic Statistics

Scan all epic files:
@.claude/epics/*/epic.md

Extract:
- Total epics created
- Epics synced to GitHub
- Average progress percentage
- Total tasks created
- Tasks completed

### 3. Display Dashboard

Format output:
```
📊 PRD System Status
===================

PRDs:
  📋 Total: 5
  ⏳ Backlog: 2
  🔄 In Progress: 2
  ✅ Completed: 1

Epics:
  📦 Total: 3
  🔗 Synced to GitHub: 2
  📈 Average Progress: 45%

Tasks:
  📝 Total Created: 15
  ✅ Completed: 7
  🔄 In Progress: 3
  ⏳ Pending: 5

Recent Activity:
  • payment-v2: Epic created (2024-01-20)
  • user-auth: Task #4 completed (2024-01-19)
  • dashboard: Synced to GitHub #123 (2024-01-18)
```

### 4. GitHub Integration Status

Check GitHub sync:
!`gh auth status 2>&1`

Show:
- Connected: ✅ or ❌
- Repo: owner/name
- Epics synced: count

### 5. Worktree Status

Check active worktrees:
!`git worktree list`

Show:
- Active worktrees: count
- Epic branches: list

### 6. Suggestions

Based on status, suggest:
- If PRDs without epics: "Convert to epic: /pm:prd-parse {name}"
- If epics without tasks: "Decompose: /pm:epic-decompose {name}"
- If tasks ready: "Start work: /pm:next"
- If GitHub not connected: "Connect: gh auth login"

## Output Format

Keep it concise and actionable:
- Key metrics at top
- Recent activity
- Next steps suggestions
