# Switch Workspace

Switch between workspaces 0-9 for organizing instances.

## Usage

```
/statusline/switch-workspace <workspace-id>
```

Where workspace-id is 0-9:
- **0**: Overview (all instances)
- **1-9**: Project/epic-specific workspaces

## Implementation

```bash
#!/bin/bash

WORKSPACE_ID="${1:-0}"

# Validate workspace ID
if ! [[ "$WORKSPACE_ID" =~ ^[0-9]$ ]]; then
  echo "❌ Invalid workspace ID. Must be 0-9."
  exit 1
fi

# Update state
STATE_FILE=".claude/statusline/state.json"
mkdir -p "$(dirname $STATE_FILE)"

if [ ! -f "$STATE_FILE" ]; then
  echo '{"workspace": 0, "instance": 0}' > "$STATE_FILE"
fi

# Update workspace
jq --arg ws "$WORKSPACE_ID" '.workspace = ($ws | tonumber) | .instance = 0' "$STATE_FILE" > "${STATE_FILE}.tmp"
mv "${STATE_FILE}.tmp" "$STATE_FILE"

# Get workspace name
case $WORKSPACE_ID in
  0) WS_NAME="Overview" ;;
  1) WS_NAME="Workspace 1" ;;
  2) WS_NAME="Workspace 2" ;;
  3) WS_NAME="Workspace 3" ;;
  4) WS_NAME="Workspace 4" ;;
  5) WS_NAME="Workspace 5" ;;
  6) WS_NAME="Workspace 6" ;;
  7) WS_NAME="Workspace 7" ;;
  8) WS_NAME="Workspace 8" ;;
  9) WS_NAME="Workspace 9" ;;
esac

# Get instances for this workspace
if [ "$WORKSPACE_ID" = "0" ]; then
  # Overview: all instances
  INSTANCES=($(npx claude-flow@alpha hooks agent-list 2>/dev/null | grep -oE "agent-[a-z0-9-]+" || echo ""))
else
  # Filtered by workspace assignment
  # Read workspace assignments from config
  ASSIGN_FILE=".claude/statusline/workspace-assignments.json"
  if [ -f "$ASSIGN_FILE" ]; then
    INSTANCES=($(jq -r --arg ws "$WORKSPACE_ID" '.[] | select(.workspace == ($ws | tonumber)) | .instance' "$ASSIGN_FILE" 2>/dev/null || echo ""))
  else
    INSTANCES=()
  fi
fi

INSTANCE_COUNT=${#INSTANCES[@]}

echo "🎯 Switched to: $WS_NAME"
echo "📊 Instances: $INSTANCE_COUNT"
if [ $INSTANCE_COUNT -gt 0 ]; then
  echo "Current: ${INSTANCES[0]}"
fi

# Notify claude-flow
npx claude-flow@alpha hooks notify --message "Workspace: $WS_NAME ($INSTANCE_COUNT instances)"
```

## Hotkeys

- `Ctrl+Shift+0` → Workspace 0 (Overview)
- `Ctrl+Shift+1` → Workspace 1
- `Ctrl+Shift+2-9` → Workspaces 2-9
