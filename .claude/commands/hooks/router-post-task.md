# Router Post-Task Learning

Extends the post-task hook with outcome tracking and continuous learning.

## Usage

This is called automatically by the existing `post-task` hook when smart routing is enabled.

```bash
# Called internally by post-task hook
node .claude/router/learn-outcome.ts "$ROUTING_DECISION" "$SUCCESS" "$DURATION"
```

## What It Does

1. **Outcome Recording**: Records task success/failure
2. **Bayesian Update**: Updates confidence scores with new data
3. **Pattern Learning**: Stores successful routing patterns
4. **Skill Extraction**: Auto-extracts skills at 95%+ success over 20 uses
5. **Memory Management**: Maintains 90-day TTL on patterns

## Input

Requires routing decision from pre-task and task outcome:

```json
{
  "routedCommand": "/sparc:coder",
  "request": "implement user authentication",
  "success": true,
  "duration": 1200,
  "timestamp": "2025-11-28T10:30:00Z"
}
```

## Output

Returns learning statistics:

```json
{
  "pattern": {
    "command": "/sparc:coder",
    "usageCount": 47,
    "successCount": 45,
    "successRate": 0.957,
    "avgDuration": 1200
  },
  "skillExtracted": false,
  "feedback": "Success rate: 95.7% (45/47)"
}
```

## Integration

The existing post-task hook should call this when `smart_features.enabled: true`:

```bash
# In post-task hook
if [ "$SMART_ROUTING_ENABLED" = "true" ]; then
  # Retrieve routing decision from memory
  ROUTING=$(npx claude-flow@alpha memory retrieve \
    --key "$ROUTING_KEY" \
    --namespace "coordination")

  # Record outcome
  node .claude/router/learn-outcome.ts \
    "$ROUTING" \
    "$TASK_SUCCESS" \
    "$TASK_DURATION"

  # Clean up temporary files
  rm -f /tmp/router-todos.json
fi
```

## Environment Variables

- `SMART_ROUTING_ENABLED` - Enable smart routing
- `ROUTING_KEY` - Memory key for routing decision
- `TASK_SUCCESS` - Boolean task outcome (true/false)
- `TASK_DURATION` - Duration in milliseconds

## Learning Storage

Patterns stored in `.swarm/routing/learning/`:

```
.swarm/routing/learning/
├── patterns/
│   ├── pattern_sc:implement.json
│   ├── pattern_sparc:coder.json
│   └── pattern_swarm:development.json
├── executions/
│   └── execution_{timestamp}.json
└── metrics/
    └── learning_metrics.json
```

## Skill Extraction

When a pattern reaches 95%+ success over 20 uses, it's automatically extracted as a Voyager-style skill in `.swarm/routing/learning/skills/`.

## See Also

- `router-pre-task.md` - Pre-task enhancement
- `.claude/router/outcome-tracker.ts` - Learning system
- `.claude/router/skill-library.ts` - Skill extraction
