# Switch Workspace

Switch between workspaces 0-9 for organizing agent instances and tasks.

## Usage

```
/statusline:switch-workspace <workspace-id>
```

## Arguments

- `<workspace-id>` (optional): Workspace number 0-9
  - **0**: Overview (all instances)
  - **1**: Backend
  - **2**: Frontend
  - **3**: Database
  - **4**: Testing
  - **5**: DevOps
  - **6**: Documentation
  - **7**: Research
  - **8**: Integration
  - **9**: Deployment

If no argument provided, shows current workspace and available workspaces.

## Examples

```bash
# Switch to Backend workspace
/statusline:switch-workspace 1

# Switch to Overview
/statusline:switch-workspace 0

# Show current workspace
/statusline:switch-workspace
```

## Implementation

```bash
#!/bin/bash

WORKSPACE_ID="${1}"

# If no argument, show current workspace and list all
if [ -z "$WORKSPACE_ID" ]; then
  echo "Current Workspace:"
  cat .claude/statusline/state.json | jq -r '"  Workspace: \(.workspace)"'
  echo ""
  .claude/statusline/scripts/list-workspaces.sh
  exit 0
fi

# Execute switch
.claude/statusline/scripts/switch-workspace.sh "$WORKSPACE_ID"
```

## Keyboard Shortcuts

Configure in your editor:
- `Ctrl+Shift+0` → Workspace 0 (Overview)
- `Ctrl+Shift+1-9` → Workspaces 1-9

## Related Commands

- `/statusline:assign-instance` - Assign agent instance to workspace
- `/statusline:list-workspaces` - Show all workspaces
- `/statusline:get-agents` - Show active agents
