# Curriculum Learning Command

Generate the next appropriately-challenging task based on current skills and success history.

## Usage
```
/learn:curriculum
```

## What This Does

Implements Voyager-style **automatic curriculum learning**:
1. Analyzes your current skill library
2. Identifies capability gaps
3. Proposes next task at **60-80% difficulty** (optimal learning zone)
4. Considers failed tasks to avoid repetition
5. Gradually increases complexity

## Research Foundation

**Voyager achieved 63 unique items discovered vs ~20 for baselines** through bottom-up novelty search.

## Implementation

### Step 1: Analyze Current State
```bash
# Get skill library status
npx claude-flow@alpha memory list --namespace skill-library

# Get recent task history
npx claude-flow@alpha memory retrieve \
  --key "curriculum/history" \
  --namespace learning
```

### Step 2: Identify Skill Gaps
```javascript
// Missing skills analysis
const gaps = {
  "file_operations": ["read", "write"], // Has these
  "api_integration": [], // Missing all
  "testing": ["unit"], // Has unit, missing integration/e2e
  "optimization": [] // Missing all
}
```

### Step 3: Generate Task Proposal

Use LLM to propose task:

```markdown
Based on skill analysis:
- Current capabilities: {list}
- Identified gaps: {gaps}
- Recent successes: {successes}
- Recent failures: {failures}

Propose a task that:
1. Target success rate: 60-80%
2. Builds on existing skills
3. Introduces 1-2 new concepts
4. Has clear, measurable success criteria
5. Avoids recently failed patterns
```

### Step 4: Warm-Up Schedule

**Early tasks (1-5)**: Core inventory + position only
**Tasks 6-10**: Add nearby entities context
**Tasks 11-15**: Add full inventory
**Tasks 16-20**: Add biome and time
**Tasks 21+**: Full context with external knowledge

This prevents overwhelming with information before foundations exist.

### Step 5: Store and Execute

```bash
# Store proposed task
npx claude-flow@alpha memory store \
  --key "curriculum/current_task" \
  --namespace learning \
  --value '{
    "task_id": "task_42",
    "description": "Implement API client with retry logic",
    "difficulty": 0.65,
    "required_skills": ["http_request", "error_handling"],
    "new_concepts": ["exponential_backoff"],
    "success_criteria": {
      "code_compiles": true,
      "tests_pass": true,
      "retries_work": true
    }
  }'

# Execute task
/sparc tdd "{task_description}"
```

## Success Rate Targets

- **< 60%**: Task too hard → break into subtasks
- **60-80%**: Optimal difficulty → continue
- **> 80%**: Too easy → increase complexity

## Example Output

```markdown
# Next Task: Implement Caching Layer

**Difficulty**: 65% (estimated)
**Builds On**:
- ✅ File read/write (mastered)
- ✅ Data serialization (mastered)
- ⚠️  TTL management (new concept)

**New Concepts**:
- Time-to-live (TTL) expiration
- Cache invalidation strategies
- LRU eviction

**Success Criteria**:
1. Cache stores and retrieves values correctly
2. TTL expiration works (test with 1-second TTL)
3. LRU eviction when cache full
4. 90%+ test coverage

**Estimated Time**: 45-60 minutes
**Related Skills**: data_structures, timing, testing
```

## Adaptive Progression

The curriculum adapts based on performance:

```javascript
// Performance tracking
if (last_10_tasks_success_rate > 0.85) {
  difficulty_multiplier = 1.2; // Increase challenge
} else if (last_10_tasks_success_rate < 0.55) {
  difficulty_multiplier = 0.8; // Reduce challenge
}
```

## Integration with Other Commands

```bash
# Generate next task
/learn:curriculum

# Execute the task
/sparc tdd "{generated_task}"

# Verify and learn from it
/learn:verify

# If successful, extract skill
/learn:skill "{skill_name}" "{description}" "{code}"

# Repeat indefinitely for continuous learning
```

## Benefits

- **Progressive complexity** prevents frustration
- **Skill gap analysis** ensures systematic coverage
- **Failure avoidance** learns from mistakes
- **Measurable progress** through success rates
- **No plateau** - continuously finds new challenges

## Research Results

Voyager's curriculum learning enabled:
- Wooden tools: **15.3× faster** than baselines
- Stone tools: **8.5× faster**
- Diamond tools: **Only system to achieve**
- Novel tasks: **100% success vs 0%** for baselines
