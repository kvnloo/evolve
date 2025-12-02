---
name: research-plan-only
description: Generate comprehensive research plans without execution for autonomous overnight planning
category: research
version: 1.0.0
---

# Research Plan-Only Mode

**Purpose**: Generate detailed research plans without execution, enabling autonomous overnight planning with memory persistence for later execution.

## Activation

```bash
/sc:research-plan-only [query] --depth [quick|standard|deep|exhaustive]
```

## Configuration

### Planning Strategy: planning_only
```yaml
mode: planning_only
execution: skip
clarification: false
user_confirmation: false
output: plan_document + memory + todos
```

### Depth Profiles
```yaml
quick:
  max_sources: 10
  max_hops: 1
  confidence_target: 0.6
  time_estimate: 2-5 minutes

standard:
  max_sources: 20
  max_hops: 3
  confidence_target: 0.7
  time_estimate: 5-10 minutes

deep:
  max_sources: 40
  max_hops: 4
  confidence_target: 0.8
  time_estimate: 10-20 minutes

exhaustive:
  max_sources: 50+
  max_hops: 5
  confidence_target: 0.9
  time_estimate: 20-30 minutes
```

## Behavioral Protocol

### Phase 1: Query Analysis (Parallel)
1. **Parse query** → Extract entities, concepts, domains
2. **Identify objectives** → What answers are needed
3. **Classify complexity** → Simple, moderate, complex, expert
4. **Determine depth** → Auto-select or use --depth flag
5. **List constraints** → Time, resources, access limitations

**All analysis operations run in parallel in single message.**

### Phase 2: Multi-Hop Strategy Design (Parallel)
1. **Hop 0 (Foundation)** → Broad topic surveys, definitions, overviews
2. **Hop 1 (Core)** → Primary sources, key papers, authoritative docs
3. **Hop 2 (Deep)** → Specialized research, expert opinions, case studies
4. **Hop 3 (Edge)** → Cutting-edge research, contradictions, gaps
5. **Hop 4 (Synthesis)** → Cross-domain connections, meta-analysis

**Design all hop strategies concurrently.**

### Phase 3: Source Identification Strategy
```yaml
search_strategies:
  parallel_queries:
    - Academic: "[topic] research papers"
    - Technical: "[topic] documentation"
    - Expert: "[topic] expert opinions"
    - Current: "[topic] 2025 developments"
    - Alternative: "[topic] criticism challenges"

  extraction_routing:
    static_content: tavily
    dynamic_content: playwright
    technical_docs: context7
    code_repos: github_search

  credibility_tiers:
    tier_1: "Academic journals, official docs (0.9-1.0)"
    tier_2: "Industry reports, expert blogs (0.7-0.9)"
    tier_3: "Community resources, verified social (0.5-0.7)"
    tier_4: "Forums, unverified sources (0.3-0.5)"
```

### Phase 4: Execution Roadmap Design
```yaml
roadmap_structure:
  initialization:
    - Activate MODE_DeepResearch
    - Load RESEARCH_CONFIG.md defaults
    - Initialize memory: research/plans/[category]/[timestamp]
    - Set parallel-first execution mode

  hop_execution_plan:
    hop_0:
      queries: [list of 3-5 broad queries]
      expected_sources: [10-15 foundational sources]
      extraction_method: tavily_batch
      parallel: true
      dependencies: none

    hop_1:
      queries: [list of 3-5 focused queries]
      expected_sources: [15-20 primary sources]
      extraction_method: tavily + playwright
      parallel: true
      dependencies: hop_0_entities

    hop_2:
      queries: [entity-specific queries from hop_1]
      expected_sources: [20-30 specialized sources]
      extraction_method: context7 + playwright
      parallel: true
      dependencies: hop_1_patterns

  synthesis_plan:
    - Cross-reference findings across hops
    - Identify contradictions and resolve
    - Map knowledge gaps
    - Generate confidence scores
    - Produce executive summary

  validation_gates:
    - Minimum sources per hop met
    - Confidence thresholds achieved
    - Contradiction resolution complete
    - Gap identification documented
```

### Phase 5: Self-Reflection & Adaptive Planning
```yaml
reflection_triggers:
  - After each hop plan design
  - When confidence predictions are low
  - When source diversity is insufficient
  - When complexity exceeds initial estimate

reflection_actions:
  assess_plan_quality:
    - Are queries specific enough?
    - Is source diversity adequate?
    - Are hops properly sequenced?
    - Are dependencies clearly mapped?

  identify_risks:
    - Source availability concerns
    - Time constraint violations
    - Tool capability limitations
    - Knowledge gap areas

  adaptive_replanning:
    - Add alternative query strategies
    - Expand source diversity plans
    - Adjust hop sequencing
    - Include fallback approaches
```

## Output Specifications

### 1. Plan Document
**Location**: `research/plans/[timestamp]-[sanitized_query].md`

**Structure**:
```markdown
# Research Plan: [Query]

**Generated**: [ISO timestamp]
**Depth Profile**: [quick|standard|deep|exhaustive]
**Estimated Execution Time**: [X minutes]
**Expected Confidence**: [0.X]

## Research Objectives
- Primary objective: [main question]
- Secondary objectives: [sub-questions]
- Success criteria: [what constitutes complete answer]

## Multi-Hop Strategy

### Hop 0: Foundation (Parallel)
**Queries**:
1. [broad query 1]
2. [broad query 2]
3. [broad query 3]

**Expected Sources**: 10-15 foundational
**Extraction Method**: Tavily batch
**Dependencies**: None
**Estimated Time**: 2-3 minutes

### Hop 1: Core Investigation (Parallel)
**Queries**:
1. [focused query based on entities from hop 0]
2. [focused query for specific aspect]
3. [focused query for alternative perspective]

**Expected Sources**: 15-20 primary
**Extraction Method**: Tavily + Playwright
**Dependencies**: Entities from Hop 0
**Estimated Time**: 3-5 minutes

### Hop 2: Deep Specialization (Parallel)
[Pattern continues for all hops]

## Source Strategy

### Search Patterns
- **Academic**: [specific search queries]
- **Technical**: [documentation search queries]
- **Expert**: [expert opinion search queries]
- **Current**: [recent developments queries]

### Extraction Routing
- Static HTML: Tavily
- Dynamic content: Playwright
- Technical docs: Context7
- Code repositories: GitHub search

### Credibility Targets
- Tier 1 (0.9-1.0): 40% of sources
- Tier 2 (0.7-0.9): 35% of sources
- Tier 3 (0.5-0.7): 20% of sources
- Tier 4 (0.3-0.5): 5% of sources

## Execution Roadmap

### Initialization Phase
1. ✅ Activate MODE_DeepResearch
2. ✅ Load RESEARCH_CONFIG.md
3. ✅ Initialize memory storage
4. ✅ Set parallel execution mode

### Hop Execution Sequence
[Detailed execution steps for each hop]

### Synthesis Phase
1. Cross-reference findings across all hops
2. Resolve contradictions and conflicts
3. Identify knowledge gaps
4. Calculate confidence scores
5. Generate executive summary

### Validation Phase
1. Verify minimum source counts
2. Confirm confidence thresholds
3. Check contradiction resolution
4. Document remaining gaps

## Risk Assessment

### Identified Risks
- [Risk 1]: [Description] | Mitigation: [Strategy]
- [Risk 2]: [Description] | Mitigation: [Strategy]

### Contingency Plans
- If sources insufficient: [Alternative approach]
- If time exceeded: [Adjustment strategy]
- If confidence low: [Additional investigation]

## Self-Reflection Checkpoints

### After Hop 0
- [ ] Sufficient foundational understanding achieved?
- [ ] Entities identified for next hop?
- [ ] Confidence trajectory on target?

### After Hop 1
- [ ] Core questions being addressed?
- [ ] Source diversity adequate?
- [ ] Need for strategy adjustment?

[Pattern continues for all hops]

## Memory Storage Schema

**Key**: `research/plans/[category]/[timestamp]`

**Content**:
```json
{
  "query": "[original query]",
  "timestamp": "[ISO timestamp]",
  "depth": "[profile]",
  "objectives": [],
  "hop_strategies": [],
  "source_plan": {},
  "execution_roadmap": {},
  "risk_assessment": {},
  "estimated_duration": "[X minutes]",
  "expected_confidence": 0.X,
  "status": "planned",
  "execution_id": null
}
```

## Next Actions

### For Immediate Execution
```bash
/sc:research [same query] --execute-plan [plan-id]
```

### For Later Execution
Plan stored in memory with key: `research/plans/[category]/[timestamp]`
Retrieve and execute when ready.

### For Plan Refinement
Review plan document, adjust strategy, regenerate with refinements.
```

### 2. Memory Storage
**Tool**: Serena MCP `write_memory`

**Schema**:
```json
{
  "memory_key": "research/plans/[category]/[timestamp]",
  "content": {
    "query": "original research query",
    "query_hash": "md5 hash for deduplication",
    "timestamp": "2025-10-20T14:30:00Z",
    "depth_profile": "standard",
    "objectives": {
      "primary": "main research question",
      "secondary": ["sub-question 1", "sub-question 2"],
      "success_criteria": "definition of complete answer"
    },
    "multi_hop_strategy": {
      "hop_0": {
        "phase": "foundation",
        "queries": ["query 1", "query 2"],
        "expected_sources": 15,
        "extraction_method": "tavily_batch",
        "dependencies": null,
        "parallel": true,
        "estimated_duration": "2-3 minutes"
      },
      "hop_1": {
        "phase": "core_investigation",
        "queries": ["query 1", "query 2"],
        "expected_sources": 20,
        "extraction_method": "tavily+playwright",
        "dependencies": ["hop_0_entities"],
        "parallel": true,
        "estimated_duration": "3-5 minutes"
      }
    },
    "source_strategy": {
      "search_patterns": {
        "academic": ["pattern 1", "pattern 2"],
        "technical": ["pattern 1", "pattern 2"],
        "expert": ["pattern 1", "pattern 2"]
      },
      "extraction_routing": {
        "static": "tavily",
        "dynamic": "playwright",
        "technical": "context7"
      },
      "credibility_distribution": {
        "tier_1": 0.4,
        "tier_2": 0.35,
        "tier_3": 0.2,
        "tier_4": 0.05
      }
    },
    "execution_roadmap": {
      "initialization": ["step 1", "step 2"],
      "hop_sequence": ["detailed execution steps"],
      "synthesis": ["synthesis steps"],
      "validation": ["validation steps"]
    },
    "risk_assessment": {
      "identified_risks": [
        {"risk": "description", "mitigation": "strategy"}
      ],
      "contingency_plans": {}
    },
    "self_reflection": {
      "checkpoints": ["after each hop"],
      "triggers": ["confidence_low", "contradictions"],
      "actions": ["replan", "adjust"]
    },
    "estimated_metrics": {
      "duration_minutes": 10,
      "expected_confidence": 0.75,
      "source_count": 35,
      "hop_count": 3
    },
    "status": "planned",
    "execution_id": null,
    "created_by": "claude-code",
    "plan_version": "1.0"
  }
}
```

### 3. TodoWrite Integration
**ALL todos in ONE call (8-10+ items minimum)**:

```yaml
todos:
  - id: "research-plan-1"
    content: "Parse query and extract entities, concepts, domains"
    activeForm: "Parsing query and extracting research entities"
    status: "completed"
    priority: "high"

  - id: "research-plan-2"
    content: "Design multi-hop strategy (0-4 hops) with dependencies"
    activeForm: "Designing multi-hop research strategy"
    status: "completed"
    priority: "high"

  - id: "research-plan-3"
    content: "Identify source types and extraction routing strategy"
    activeForm: "Identifying sources and extraction methods"
    status: "completed"
    priority: "high"

  - id: "research-plan-4"
    content: "Create parallel execution roadmap for each hop"
    activeForm: "Creating parallel execution roadmap"
    status: "completed"
    priority: "high"

  - id: "research-plan-5"
    content: "Design credibility assessment and scoring system"
    activeForm: "Designing credibility scoring system"
    status: "completed"
    priority: "medium"

  - id: "research-plan-6"
    content: "Plan synthesis approach and contradiction resolution"
    activeForm: "Planning synthesis and contradiction resolution"
    status: "completed"
    priority: "medium"

  - id: "research-plan-7"
    content: "Identify risks and create contingency plans"
    activeForm: "Identifying risks and contingencies"
    status: "completed"
    priority: "medium"

  - id: "research-plan-8"
    content: "Design self-reflection checkpoints and triggers"
    activeForm: "Designing self-reflection system"
    status: "completed"
    priority: "medium"

  - id: "research-plan-9"
    content: "Generate plan document in research/plans/"
    activeForm: "Generating research plan document"
    status: "completed"
    priority: "high"

  - id: "research-plan-10"
    content: "Store plan in memory with Serena MCP for persistence"
    activeForm: "Storing plan in persistent memory"
    status: "completed"
    priority: "high"
```

## Parallel-First Execution Rules

### MANDATORY DEFAULT: PARALLEL
```yaml
parallel_execution_rules:
  DEFAULT_MODE: PARALLEL  # NON-NEGOTIABLE

  mandatory_parallel:
    - "Query analysis operations"
    - "Multi-hop strategy design (all hops designed together)"
    - "Source identification across domains"
    - "Risk assessment evaluations"
    - "Memory storage operations"
    - "TodoWrite updates"

  sequential_only_with_justification:
    - reason: "Explicit hop dependency"
      example: "Hop 2 requires entities from Hop 1"
    - reason: "Memory read before write"
      example: "Check for existing plan before creating new"

  parallel_optimization:
    batch_operations:
      - Group all analysis in single message
      - Design all hops concurrently
      - Store all memory keys in one batch
      - Update all todos together
```

## Integration with SuperClaude Framework

### Mode Activation
**Auto-activates**: MODE_DeepResearch, MODE_Task_Management

**MCP Servers Used**:
- **Serena MCP**: Memory persistence (`write_memory`, `read_memory`)
- **Sequential MCP**: Multi-hop reasoning and planning logic
- **Context7 MCP**: Technical documentation planning

### Configuration Loading
```yaml
auto_load:
  - RESEARCH_CONFIG.md (default settings)
  - PRINCIPLES.md (evidence-based reasoning)
  - MODE_DeepResearch.md (research behavioral changes)
  - MODE_Token_Efficiency.md (for plan documentation)
```

### Cross-Session Persistence
Plans stored in memory enable:
1. **Overnight Planning**: Generate plans before end of day
2. **Morning Execution**: Retrieve and execute plans next day
3. **Plan Refinement**: Review, adjust, and regenerate plans
4. **Plan Reuse**: Similar queries can reference existing plans

## Quality Gates

### Plan Quality Validation
```yaml
plan_completeness:
  required_sections:
    - Research objectives (primary + secondary)
    - Multi-hop strategy (all hops designed)
    - Source identification strategy
    - Execution roadmap (detailed)
    - Risk assessment (with mitigations)
    - Self-reflection checkpoints

  quality_checks:
    - Query specificity: queries are focused and actionable
    - Source diversity: multiple domains and credibility tiers
    - Hop dependencies: clearly mapped and logical
    - Parallel optimization: all parallelizable ops identified
    - Time estimation: realistic based on depth profile
    - Confidence prediction: aligned with source and hop count
```

### Memory Persistence Validation
```yaml
memory_storage_checks:
  - Unique memory key generated
  - Full plan schema populated
  - JSON structure valid
  - Cross-reference to plan document included
  - Status set to "planned"
  - Execution ID null (not yet executed)
```

## Usage Examples

### Quick Research Plan
```bash
/sc:research-plan-only "What are the latest advances in LLM reasoning?" --depth quick
```
**Output**: 2-minute plan, 1 hop, 10 sources, confidence 0.6

### Standard Research Plan
```bash
/sc:research-plan-only "Comparative analysis of microservice vs monolithic architectures for enterprise systems"
```
**Output**: 8-minute plan, 3 hops, 20 sources, confidence 0.7

### Deep Research Plan
```bash
/sc:research-plan-only "Historical evolution and future trends of autonomous agent frameworks" --depth deep
```
**Output**: 15-minute plan, 4 hops, 40 sources, confidence 0.8

### Exhaustive Research Plan
```bash
/sc:research-plan-only "Comprehensive review of distributed consensus algorithms: Byzantine, Raft, Paxos, and emerging alternatives" --depth exhaustive
```
**Output**: 25-minute plan, 5 hops, 50+ sources, confidence 0.9

## Execution Workflow

### 1. Plan Generation (This Command)
```bash
/sc:research-plan-only [query] --depth [profile]
```
→ Plan document created in `research/plans/`
→ Plan stored in memory
→ TodoWrite with 10 planning todos

### 2. Plan Review (Manual or Automated)
```bash
# Read plan document
Read research/plans/[timestamp]-[query].md

# Read from memory
read_memory("research/plans/[category]/[timestamp]")
```

### 3. Plan Execution (Later)
```bash
# Execute with existing plan
/sc:research [query] --execute-plan [plan-id]

# Or execute directly if plan exists in memory
/sc:research [query]  # Auto-detects and uses existing plan
```

### 4. Plan Refinement (Optional)
```bash
# Retrieve plan, review, regenerate with adjustments
/sc:research-plan-only [modified query] --depth [new profile] --refine-plan [plan-id]
```

## Performance Metrics

### Planning Phase Performance
```yaml
time_to_plan:
  quick: 1-2 minutes
  standard: 2-5 minutes
  deep: 5-10 minutes
  exhaustive: 10-15 minutes

token_efficiency:
  plan_generation: 3-8K tokens
  memory_storage: 1-2K tokens
  documentation: 4-10K tokens
  total: 8-20K tokens

quality_targets:
  plan_completeness: > 95%
  source_strategy_clarity: > 90%
  execution_actionability: > 90%
  risk_coverage: > 85%
```

## Command Output Structure

```
🔍 RESEARCH PLAN GENERATION MODE

📋 Query: [Research question]
⚙️  Depth Profile: [quick|standard|deep|exhaustive]
⏱️  Estimated Execution: [X minutes]
🎯 Expected Confidence: [0.X]

Phase 1: Query Analysis
✅ Entities extracted: [count]
✅ Objectives identified: [count]
✅ Complexity classified: [level]
✅ Depth profile selected: [profile]

Phase 2: Multi-Hop Strategy
✅ Hop 0 (Foundation): [query count] queries, [source count] sources
✅ Hop 1 (Core): [query count] queries, [source count] sources
✅ Hop 2 (Deep): [query count] queries, [source count] sources
[Additional hops as needed]

Phase 3: Source Strategy
✅ Search patterns designed: Academic, Technical, Expert, Current
✅ Extraction routing configured: Tavily, Playwright, Context7
✅ Credibility distribution: Tier 1 (40%), Tier 2 (35%), Tier 3 (20%), Tier 4 (5%)

Phase 4: Execution Roadmap
✅ Initialization steps: [count]
✅ Hop execution sequences: [count]
✅ Synthesis plan: Complete
✅ Validation gates: Configured

Phase 5: Risk Assessment
✅ Risks identified: [count]
✅ Mitigations planned: [count]
✅ Contingencies ready: [count]

📄 Plan Document: research/plans/[timestamp]-[sanitized_query].md
💾 Memory Storage: research/plans/[category]/[timestamp]
📋 TodoWrite: 10 planning todos completed

🎯 PLAN READY FOR EXECUTION
   Execute with: /sc:research "[query]" --execute-plan [plan-id]
```

## Error Handling

### Plan Generation Failures
```yaml
insufficient_context:
  trigger: "Query too vague or ambiguous"
  action: "Request clarification or expand query analysis"
  fallback: "Generate conservative plan with broad initial hop"

resource_constraints:
  trigger: "Depth profile exceeds available resources"
  action: "Reduce hop count or source targets"
  fallback: "Auto-downgrade to lower depth profile"

memory_storage_failure:
  trigger: "Serena MCP write_memory fails"
  action: "Retry with exponential backoff"
  fallback: "Store in local file only, log warning"
```

## Version History

**v1.0.0** (2025-10-20)
- Initial release
- Planning-only mode with no execution
- Multi-hop strategy design
- Memory persistence with Serena MCP
- Parallel-first planning approach
- Self-reflection and adaptive planning
- Integration with SuperClaude research framework

---

**Remember**: This command PLANS only, it does NOT execute research. All planning operations run in PARALLEL by default. Store plans in memory for later execution with `/sc:research --execute-plan [plan-id]`.
