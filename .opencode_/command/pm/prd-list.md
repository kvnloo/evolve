---
description: List all Product Requirements Documents with status
agent: pm-agent
---

# PRD List

List all Product Requirements Documents.

## Usage
```
/pm:prd-list
```

## Instructions

### 1. Find all PRDs

@.claude/prds/*.md
- Read frontmatter from each PRD file
- Extract: name, description, status, created

### 2. Display PRDs

Format output:
```
📋 Product Requirements Documents
=================================

Backlog (3):
  • user-auth - User authentication system
    Created: 2024-01-15

  • payment-v2 - Payment processing upgrade
    Created: 2024-01-20

  • notifications - Real-time notification system
    Created: 2024-01-22

In Progress (1):
  • dashboard - Analytics dashboard
    Created: 2024-01-10
    Epic: dashboard (3 tasks complete)

Completed (0):

Total: 4 PRDs
```

### 3. Check Epic Status

For each PRD, check if corresponding epic exists:
@.claude/epics/{prd_name}/epic.md
- If exists, show epic progress
- If synced to GitHub, show issue number

### 4. Output

Show PRDs grouped by status:
- Backlog
- In Progress
- Completed

For each PRD show:
- Name and description
- Creation date
- Associated epic (if exists)
- GitHub issue (if synced)

### 5. Suggestions

If no PRDs exist:
```
No PRDs found.

Create your first PRD:
  /pm:prd-new <feature_name>
```

If PRDs exist without epics:
```
💡 Suggestions:
  • Convert to epic: /pm:prd-parse {prd_name}
  • Edit PRD: /pm:prd-edit {prd_name}
```
