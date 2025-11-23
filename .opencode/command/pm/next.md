---
description: Show next available tasks ready to start
agent: pm-agent
---

# Next

Get next available tasks ready to start.

## Usage
```
/pm:next
```

## Instructions

### 1. Find Available Tasks

Scan all epic directories:
@.claude/epics/*/[0-9]*.md

For each task file:
- Check status field (must be "open")
- Check depends_on field
- If no dependencies OR all dependencies closed → task is ready

### 2. Display Available Tasks

Format output:
```
📋 Next Available Tasks
=======================

✅ Ready: #123 - User authentication setup
   Epic: user-auth
   🔄 Can run in parallel

✅ Ready: #124 - Database schema migration
   Epic: user-auth

✅ Ready: #456 - Dashboard UI components
   Epic: dashboard
   🔄 Can run in parallel

📊 Summary: 3 tasks ready to start
```

### 3. Check Dependencies

For tasks with depends_on:
- Parse dependency array: [001, 002]
- Check each dependency's status
- Only show if ALL dependencies are closed

### 4. Show Parallel Hints

If task has `parallel: true`:
- Add indicator: "🔄 Can run in parallel"
- These can be worked simultaneously

### 5. Suggestions

If no tasks ready:
```
No available tasks found.

💡 Suggestions:
  • Check blocked tasks: /pm:blocked
  • View all tasks: /pm:epic-list
```

If tasks available:
```
💡 Quick Start:
  • Start work: /pm:issue-start {number}
  • View details: /pm:issue-show {number}
```

## Output Priority

Sort by:
1. Tasks with no dependencies (parallel-ready)
2. Tasks whose dependencies just completed
3. Oldest created tasks first

Show maximum 10 tasks to avoid overwhelming output.
