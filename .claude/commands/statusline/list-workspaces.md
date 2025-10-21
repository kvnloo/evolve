# List Workspaces

Display all workspaces with their assigned instances and current status.

## Usage

```
/statusline:list-workspaces
```

## Implementation

```bash
#!/bin/bash
.claude/statusline/scripts/list-workspaces.sh
```

## Output Format

```
╔══════════════════════════════════════════════════════════╗
║           STATUSLINE WORKSPACE OVERVIEW                 ║
╚══════════════════════════════════════════════════════════╝

→ [0] Overview             (ALL instances)
  [1] Backend              (2 instances)
      • backend-api
      • backend-db
  [2] Frontend             (1 instances)
      • frontend-ui
  [3] Database             (0 instances)
  ...
```

## Features

- Shows current workspace with `→` indicator
- Displays instance count per workspace
- Lists assigned instances for each workspace
- Color-coded for visual clarity

## Related Commands

- `/statusline:switch-workspace` - Switch to a workspace
- `/statusline:assign-instance` - Assign instance to workspace
- `/statusline:get-agents` - Show active agents
