# Router Pre-Task Enhancement

Extends the pre-task hook with smart routing analysis and parallel task planning.

## Usage

This is called automatically by the existing `pre-task` hook when smart routing is enabled.

```bash
# Called internally by pre-task hook
node .claude/router/enhance.ts "$BASE_ROUTE" "$REQUEST" ".claude/rules/command-routing.md"
```

## What It Does

1. **Confidence Scoring**: Analyzes request with Bayesian scoring
2. **Parallel Analysis**: Identifies parallelizable steps using dependency graphs
3. **LLM Fallback**: Uses Claude Code Task tool for ambiguous requests (<60% confidence)
4. **Todo Generation**: Creates TodoWrite structure for multi-step tasks

## Output

Returns enhanced routing decision:

```json
{
  "command": "/swarm:development",
  "confidence": 0.89,
  "reasoning": "High confidence, 95% historical success",
  "parallelStrategy": "parallel",
  "speedupEstimate": "43%",
  "todos": [
    {
      "content": "Setup backend API",
      "parallelGroup": 0,
      "status": "pending"
    },
    {
      "content": "Create database schema",
      "parallelGroup": 0,
      "status": "pending"
    },
    {
      "content": "Write integration tests",
      "parallelGroup": 1,
      "status": "pending"
    }
  ]
}
```

## Integration

The existing pre-task hook should call this when `smart_features.enabled: true`:

```bash
# In pre-task hook
if [ "$SMART_ROUTING_ENABLED" = "true" ]; then
  ENHANCED=$(node .claude/router/enhance.ts "$BASE_ROUTE" "$REQUEST" ".claude/rules/command-routing.md")

  # Parse enhanced routing
  COMMAND=$(echo "$ENHANCED" | jq -r '.command')
  CONFIDENCE=$(echo "$ENHANCED" | jq -r '.confidence')
  PARALLEL=$(echo "$ENHANCED" | jq -r '.parallelStrategy')

  # Store decision for post-task learning
  npx claude-flow@alpha memory store \
    --key "router/decision/$(date +%s)" \
    --namespace "coordination" \
    --value "$ENHANCED"

  # Generate todos if multi-step
  if [ "$PARALLEL" = "parallel" ]; then
    TODOS=$(echo "$ENHANCED" | jq -r '.todos')
    echo "$TODOS" > /tmp/router-todos.json
  fi
fi
```

## Environment Variables

- `SMART_ROUTING_ENABLED` - Enable smart routing (default: read from config)
- `BASE_ROUTE` - Base route from keyword matching
- `REQUEST` - User's natural language request

## See Also

- `router-post-task.md` - Post-task learning
- `.claude/router/enhance.ts` - Main integration
- `.claude/rules/command-routing.md` - Routing configuration
