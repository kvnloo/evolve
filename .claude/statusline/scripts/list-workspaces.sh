#!/bin/bash
# List All Workspaces and Their Assignments

CONFIG_FILE=".claude/statusline/config.json"
ASSIGN_FILE=".claude/statusline/workspace-assignments.json"
STATE_FILE=".claude/statusline/state.json"

# Get current workspace
CURRENT_WS=0
if [ -f "$STATE_FILE" ]; then
  CURRENT_WS=$(jq -r '.workspace // 0' "$STATE_FILE")
fi

echo "╔══════════════════════════════════════════════════════════╗"
echo "║           STATUSLINE WORKSPACE OVERVIEW                 ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

for i in {0..9}; do
  # Get workspace name
  if [ -f "$CONFIG_FILE" ]; then
    WS_NAME=$(jq -r --arg ws "$i" '.workspaceNames[$ws] // "Workspace \($ws)"' "$CONFIG_FILE")
  else
    case $i in
      0) WS_NAME="Overview" ;;
      *) WS_NAME="Workspace $i" ;;
    esac
  fi

  # Current workspace indicator
  if [ "$i" -eq "$CURRENT_WS" ]; then
    CURRENT="→"
  else
    CURRENT=" "
  fi

  # Get instance count
  if [ "$i" -eq 0 ]; then
    # Overview shows all
    COUNT="ALL"
  elif [ -f "$ASSIGN_FILE" ]; then
    COUNT=$(jq -r --arg ws "$i" '[.[] | select(.workspace == ($ws | tonumber))] | length' "$ASSIGN_FILE")
  else
    COUNT=0
  fi

  printf "%s [%d] %-20s (%s instances)\n" "$CURRENT" "$i" "$WS_NAME" "$COUNT"

  # Show instances if not overview and has assignments
  if [ "$i" -ne 0 ] && [ -f "$ASSIGN_FILE" ] && [ -n "$COUNT" ] && [ "$COUNT" != "0" ]; then
    jq -r --arg ws "$i" '.[] | select(.workspace == ($ws | tonumber)) | "      • \(.instance)"' "$ASSIGN_FILE"
  fi
done

echo ""
echo "Press Ctrl+Shift+<0-9> to switch workspaces"
echo "Use 'assign-instance.sh <workspace> <instance>' to assign"
