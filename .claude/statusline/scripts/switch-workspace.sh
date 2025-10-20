#!/bin/bash
# Switch Workspace - Navigate between workspaces 0-9

WORKSPACE_ID="${1:-0}"

# Validate workspace ID
if ! [[ "$WORKSPACE_ID" =~ ^[0-9]$ ]]; then
  echo "❌ Invalid workspace ID. Must be 0-9."
  echo "Usage: switch-workspace.sh <0-9>"
  exit 1
fi

# State file location
STATE_FILE=".claude/statusline/state.json"
ASSIGN_FILE=".claude/statusline/workspace-assignments.json"
CONFIG_FILE=".claude/statusline/config.json"

# Ensure files exist
mkdir -p "$(dirname $STATE_FILE)"
if [ ! -f "$STATE_FILE" ]; then
  echo '{"workspace": 0, "instance": 0}' > "$STATE_FILE"
fi
if [ ! -f "$ASSIGN_FILE" ]; then
  echo '[]' > "$ASSIGN_FILE"
fi

# Get workspace name from config
if [ -f "$CONFIG_FILE" ]; then
  WS_NAME=$(jq -r --arg ws "$WORKSPACE_ID" '.workspaceNames[$ws] // "Workspace \($ws)"' "$CONFIG_FILE")
else
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
fi

# Update workspace state
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
jq --arg ws "$WORKSPACE_ID" --arg ts "$TIMESTAMP" '.workspace = ($ws | tonumber) | .instance = 0 | .lastUpdate = $ts' "$STATE_FILE" > "${STATE_FILE}.tmp"
mv "${STATE_FILE}.tmp" "$STATE_FILE"

# Get instances for this workspace
if [ "$WORKSPACE_ID" = "0" ]; then
  # Overview: show all active agents/instances
  echo "🎯 Switched to: $WS_NAME (All Instances)"
  echo ""

  # Check for active claude-flow agents
  if command -v npx &> /dev/null; then
    echo "📊 Active Agents:"
    # Try to get swarm status
    SWARM_STATUS=$(npx claude-flow@alpha hooks memory-list 2>/dev/null | grep -i "agent\|swarm" || echo "")
    if [ -n "$SWARM_STATUS" ]; then
      echo "$SWARM_STATUS"
    else
      echo "  No active swarms"
    fi
  fi

  # Check for background processes
  PROCESS_COUNT=$(ps aux | grep -E "claude-code|Task" | grep -v grep | wc -l)
  echo ""
  echo "💻 Background Tasks: $PROCESS_COUNT"

  # Show epic context
  if [ -d ".claude/epics" ]; then
    EPIC_COUNT=$(find .claude/epics -maxdepth 1 -type d 2>/dev/null | tail -n +2 | wc -l)
    echo "📁 Active Epics: $EPIC_COUNT"
  fi

else
  # Specific workspace: show assigned instances
  INSTANCES=($(jq -r --arg ws "$WORKSPACE_ID" '.[] | select(.workspace == ($ws | tonumber)) | .instance' "$ASSIGN_FILE" 2>/dev/null || echo ""))
  INSTANCE_COUNT=${#INSTANCES[@]}

  echo "🎯 Switched to: $WS_NAME"
  echo "📊 Assigned Instances: $INSTANCE_COUNT"

  if [ $INSTANCE_COUNT -gt 0 ]; then
    echo ""
    echo "Instances:"
    for instance in "${INSTANCES[@]}"; do
      echo "  • $instance"
    done
    echo ""
    echo "Current: ${INSTANCES[0]}"
  else
    echo ""
    echo "ℹ️  No instances assigned to this workspace"
    echo "Use /statusline:assign-instance to assign instances"
  fi
fi

echo ""
echo "🌿 Branch: $(git branch --show-current 2>/dev/null || echo 'Not in git repo')"
echo "📍 PWD: $(basename $(pwd))"

# Notify claude-flow if available
if command -v npx &> /dev/null; then
  npx claude-flow@alpha hooks notify --message "Workspace: $WS_NAME" 2>/dev/null || true
fi

# Display current statusline state
echo ""
echo "═══════════════════════════════════════"
echo "Statusline State Updated"
echo "═══════════════════════════════════════"
