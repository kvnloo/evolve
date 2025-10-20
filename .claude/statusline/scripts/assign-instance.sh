#!/bin/bash
# Assign Instance to Workspace
# Usage: assign-instance.sh <workspace-id> <instance-name>

WORKSPACE_ID="${1}"
INSTANCE_NAME="${2}"

if [ -z "$WORKSPACE_ID" ] || [ -z "$INSTANCE_NAME" ]; then
  echo "❌ Usage: assign-instance.sh <workspace-id> <instance-name>"
  echo "Example: assign-instance.sh 1 backend-dev"
  exit 1
fi

if ! [[ "$WORKSPACE_ID" =~ ^[1-9]$ ]]; then
  echo "❌ Invalid workspace ID. Must be 1-9 (0 is reserved for Overview)."
  exit 1
fi

ASSIGN_FILE=".claude/statusline/workspace-assignments.json"
CONFIG_FILE=".claude/statusline/config.json"

# Ensure file exists
if [ ! -f "$ASSIGN_FILE" ]; then
  echo '[]' > "$ASSIGN_FILE"
fi

# Get workspace name
if [ -f "$CONFIG_FILE" ]; then
  WS_NAME=$(jq -r --arg ws "$WORKSPACE_ID" '.workspaceNames[$ws] // "Workspace \($ws)"' "$CONFIG_FILE")
else
  WS_NAME="Workspace $WORKSPACE_ID"
fi

# Check if instance already assigned
EXISTING=$(jq -r --arg inst "$INSTANCE_NAME" '.[] | select(.instance == $inst) | .workspace' "$ASSIGN_FILE")

if [ -n "$EXISTING" ]; then
  echo "⚠️  Instance '$INSTANCE_NAME' is already assigned to Workspace $EXISTING"
  read -p "Reassign to Workspace $WORKSPACE_ID? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
  fi
  # Remove existing assignment
  jq --arg inst "$INSTANCE_NAME" 'map(select(.instance != $inst))' "$ASSIGN_FILE" > "${ASSIGN_FILE}.tmp"
  mv "${ASSIGN_FILE}.tmp" "$ASSIGN_FILE"
fi

# Add new assignment
jq --arg ws "$WORKSPACE_ID" --arg inst "$INSTANCE_NAME" \
  '. += [{workspace: ($ws | tonumber), instance: $inst, assignedAt: now | todate}]' \
  "$ASSIGN_FILE" > "${ASSIGN_FILE}.tmp" 2>/dev/null

if [ $? -ne 0 ]; then
  # Fallback without date if jq version doesn't support
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  jq --arg ws "$WORKSPACE_ID" --arg inst "$INSTANCE_NAME" --arg ts "$TIMESTAMP" \
    '. += [{workspace: ($ws | tonumber), instance: $inst, assignedAt: $ts}]' \
    "$ASSIGN_FILE" > "${ASSIGN_FILE}.tmp"
fi

mv "${ASSIGN_FILE}.tmp" "$ASSIGN_FILE"

echo "✅ Assigned '$INSTANCE_NAME' to $WS_NAME"

# Show current assignments for this workspace
echo ""
echo "Current assignments for $WS_NAME:"
jq -r --arg ws "$WORKSPACE_ID" '.[] | select(.workspace == ($ws | tonumber)) | "  • \(.instance)"' "$ASSIGN_FILE"
