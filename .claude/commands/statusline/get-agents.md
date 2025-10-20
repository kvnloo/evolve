# Get Active Agents

Query claude-flow and SuperClaude for currently active agents and display in statusline.

## Execution

```bash
# Get claude-flow swarm status
if command -v npx &> /dev/null; then
  echo "📊 Claude Flow Agents:"
  npx claude-flow@alpha hooks agent-list 2>/dev/null || echo "  No active swarms"
  echo ""
fi

# Get active Task agents from SuperClaude
echo "🤖 SuperClaude Agents:"
# Check for running background agents
ps aux | grep -E "claude-code.*agent|Task.*agent" | grep -v grep | while read -r line; do
  echo "  ✅ $(echo $line | awk '{print $11}')"
done || echo "  No active agents"
echo ""

# Get workspace info
echo "📁 Current Workspace:"
if [ -d ".claude/epics" ]; then
  epic_count=$(find .claude/epics -maxdepth 1 -type d | tail -n +2 | wc -l)
  echo "  Epics: $epic_count"
fi
echo "  PWD: $(basename $(pwd))"
echo ""

# Get git branch for context
if git rev-parse --git-dir > /dev/null 2>&1; then
  echo "🌿 Git Branch: $(git branch --show-current)"
fi
```

## Output Format

Formatted for statusline display:
- Active swarm count
- Active agent types
- Current epic/workspace
- Git branch context
