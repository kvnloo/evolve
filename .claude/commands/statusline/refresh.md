# Refresh Statusline

Force refresh of statusline data from claude-flow and SuperClaude.

## Implementation

```bash
#!/bin/bash

echo "🔄 Refreshing statusline data..."

# Get claude-flow swarm status
SWARM_STATUS=$(npx claude-flow@alpha hooks swarm-status 2>/dev/null || echo "No swarms active")
echo "Swarm Status: $SWARM_STATUS"

# Get active agents
AGENTS=$(npx claude-flow@alpha hooks agent-list 2>/dev/null || echo "")
AGENT_COUNT=$(echo "$AGENTS" | grep -c "agent-" || echo "0")
echo "Active Agents: $AGENT_COUNT"

# Get memory usage
MEMORY_USAGE=$(npx claude-flow@alpha hooks memory-usage 2>/dev/null || echo "Unknown")
echo "Memory Usage: $MEMORY_USAGE"

# Update state file
STATE_FILE=".claude/statusline/state.json"
mkdir -p "$(dirname $STATE_FILE)"

# Create/update state with fresh data
cat > "$STATE_FILE" <<EOF
{
  "workspace": $(jq -r '.workspace // 0' "$STATE_FILE" 2>/dev/null || echo "0"),
  "instance": $(jq -r '.instance // 0' "$STATE_FILE" 2>/dev/null || echo "0"),
  "agentCount": $AGENT_COUNT,
  "lastRefresh": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "swarmActive": $([ -n "$SWARM_STATUS" ] && echo "true" || echo "false")
}
EOF

# Cache agent list
echo "$AGENTS" > ".claude/statusline/agents-cache.txt"

# Auto-detect workspace assignments if not exists
ASSIGN_FILE=".claude/statusline/workspace-assignments.json"
if [ ! -f "$ASSIGN_FILE" ]; then
  echo "📋 Auto-detecting workspace assignments..."

  # Scan for epics and assign to workspaces
  if [ -d ".claude/epics" ]; then
    WS_NUM=1
    echo "[" > "$ASSIGN_FILE"

    for epic in .claude/epics/*/; do
      epic_name=$(basename "$epic")
      # Find agents related to this epic
      echo "$AGENTS" | grep "$epic_name" | while read -r agent; do
        cat >> "$ASSIGN_FILE" <<EOF
  {"instance": "$agent", "workspace": $WS_NUM, "epic": "$epic_name"},
EOF
      done

      WS_NUM=$((WS_NUM + 1))
      if [ $WS_NUM -gt 9 ]; then
        break
      fi
    done

    # Remove trailing comma and close array
    sed -i '$ s/,$//' "$ASSIGN_FILE"
    echo "]" >> "$ASSIGN_FILE"
  else
    echo "[]" > "$ASSIGN_FILE"
  fi
fi

echo "✅ Refresh complete"
echo "  Agent Count: $AGENT_COUNT"
echo "  Workspace: $(jq -r '.workspace' "$STATE_FILE")"
echo "  Assignments: $(jq 'length' "$ASSIGN_FILE" 2>/dev/null || echo "0")"
```

## Auto-refresh

Configure in `.claude/statusline/config.json`:
```json
{
  "autoRefreshInterval": 5000,
  "enableAutoRefresh": true
}
```
