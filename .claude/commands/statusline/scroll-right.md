# Scroll Statusline Right

Navigate to the next instance/workspace in the statusline view.

## Implementation

```bash
#!/bin/bash

# Read current position from state file
STATE_FILE=".claude/statusline/state.json"
mkdir -p "$(dirname $STATE_FILE)"

# Initialize state if doesn't exist
if [ ! -f "$STATE_FILE" ]; then
  echo '{"workspace": 0, "instance": 0}' > "$STATE_FILE"
fi

# Read current state
CURRENT_WORKSPACE=$(jq -r '.workspace' "$STATE_FILE")
CURRENT_INSTANCE=$(jq -r '.instance' "$STATE_FILE")

# Get active instances from claude-flow
INSTANCES=($(npx claude-flow@alpha hooks agent-list 2>/dev/null | grep -oE "agent-[a-z0-9-]+" || echo ""))
INSTANCE_COUNT=${#INSTANCES[@]}

if [ $INSTANCE_COUNT -eq 0 ]; then
  echo "❌ No active instances to scroll"
  exit 0
fi

# Scroll right (circular)
NEXT_INSTANCE=$((CURRENT_INSTANCE + 1))
if [ $NEXT_INSTANCE -ge $INSTANCE_COUNT ]; then
  NEXT_INSTANCE=0
fi

# Update state
jq --arg inst "$NEXT_INSTANCE" '.instance = ($inst | tonumber)' "$STATE_FILE" > "${STATE_FILE}.tmp"
mv "${STATE_FILE}.tmp" "$STATE_FILE"

# Display current instance
CURRENT_ID="${INSTANCES[$NEXT_INSTANCE]}"
echo "▶ Scrolled to: $CURRENT_ID ($((NEXT_INSTANCE + 1))/$INSTANCE_COUNT)"

# Update statusline via hook
npx claude-flow@alpha hooks notify --message "Focused: $CURRENT_ID"
```

## Hotkey

Bind to: `Ctrl+Shift+→` (or `Cmd+Shift+→` on Mac)
