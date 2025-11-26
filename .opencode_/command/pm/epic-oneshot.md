---
description: Decompose epic into tasks and sync to GitHub in one operation
agent: pm-agent
---

# Epic Oneshot

Decompose epic into tasks and sync to GitHub in one operation.

## Usage
```
/pm:epic-oneshot <feature_name>
```

## Instructions

### 1. Validate Prerequisites

Check epic exists:
@.claude/epics/$ARGUMENTS/epic.md
- If not found: "❌ Epic not found. Run: /pm:prd-parse $ARGUMENTS"

Check for existing tasks:
!`ls .claude/epics/$ARGUMENTS/[0-9]*.md 2>/dev/null`
- If found: "⚠️ Tasks exist. Delete or use /pm:epic-sync"

Check if synced:
- Look for github: field in epic frontmatter
- If exists: "⚠️ Already synced. Use /pm:epic-sync to update"

### 2. Execute Decompose

Run decompose command:
```
Running: /pm:epic-decompose $ARGUMENTS
```

This will:
- Read the epic
- Create task files (parallel agents if appropriate)
- Update epic with task summary

### 3. Execute Sync

Immediately follow with sync:
```
Running: /pm:epic-sync $ARGUMENTS
```

This will:
- Create epic issue on GitHub
- Create sub-issues (parallel agents if appropriate)
- Rename task files to issue IDs
- Create worktree

### 4. Output

```
🚀 Epic Oneshot Complete: $ARGUMENTS

Step 1: Decomposition ✓
  - Tasks created: {count}

Step 2: GitHub Sync ✓
  - Epic: #{number}
  - Sub-issues created: {count}
  - Worktree: ../epic-$ARGUMENTS

Ready for development!
  Start work: /pm:epic-start $ARGUMENTS
  Or single task: /pm:issue-start {task_number}
```

## Important Notes

This is a convenience wrapper that runs:
1. `/pm:epic-decompose`
2. `/pm:epic-sync`

Both commands handle their own error checking, parallel execution, and validation.

Use when epic is ready to go from epic → GitHub issues in one step.
