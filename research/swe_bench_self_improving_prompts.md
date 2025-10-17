# Self-Improving Prompt Optimization System for SWE-bench Performance

**Bottom Line**: Build a DSPy-based optimization system running on budget GPUs (RTX 4090 or A10) rather than H100s, and absolutely avoid quantum computing. With your 500 SWE-bench runs/month constraint, focus on efficient algorithms that maximize learning per evaluation. Expected cost: $500-1,200/month total, achieving 40-55% on SWE-bench Verified within 3 months.

## The quantum computing question answered first

**Quantum computing will NOT help your project—period.** After comprehensive analysis of current quantum capabilities, academic literature, and expert consensus, the verdict is unambiguous: quantum computers cannot assist with prompt optimization or ML/AI hyperparameter tuning.

**Why quantum fails here**: Prompt optimization is fundamentally a large-data problem requiring massive text processing and LLM evaluation. Quantum computers face insurmountable bandwidth limitations—**thousands to millions of times slower** data transfer than classical systems. Microsoft's research shows that even hypothetical 10-million-qubit quantum systems (which don't exist) would lose to a single NVIDIA A100 GPU for these tasks. Current quantum hardware offers just 50-1,000 noisy qubits with millisecond coherence times, limiting practical computation to trivial scales.

**IBM's "free" quantum compute** provides 10 minutes of queue time monthly on their systems—essentially academic toy access. The entry-level paid plan costs $30,000. Even with unlimited quantum access, your problem type (large text data, iterative LLM evaluation) is explicitly categorized by quantum researchers as unsuitable for quantum advantage.

**What quantum can do**: Small-data problems with exponential classical complexity and quantum structure—molecular simulation, cryptography, specific combinatorial optimization with <100 variables. Your use case matches none of these criteria.

**Use classical GPUs instead**: They're faster, cheaper, readily available, and actually designed for this workload.

## Optimal compute infrastructure

### Don't use H100 GPUs for prompt optimization

**The cost analysis**: H100s cost $2.19-$3.29/hour on Lambda Labs ($1,577-2,369/month for 24/7 operation). But prompt optimization algorithms are **API-call intensive, not GPU-compute intensive**. The optimization orchestration needs minimal compute—the heavy lifting happens via LLM API calls to services like Claude or GPT-4.

### Recommended compute setup

**Primary recommendation**: **RunPod RTX 4090** at $0.34/hour with per-second billing

- **Monthly cost**: $245/month for continuous operation (realistically $50-150 for intermittent use)
- **Sufficient for**: All optimization orchestration, hosting small models, experiment management
- **24GB VRAM**: Adequate for optimization workloads
- **Per-second billing**: Pay only when actively optimizing

**Alternative option**: **Lambda Labs A10** at $0.75/hour

- **Monthly cost**: $540/month (24/7) or ~$60/month (80 hours intermittent)
- **Professional reliability**: Better uptime guarantees
- **Per-minute billing**: Flexible cost management

**When to consider H100**: Only if simultaneously training large models (>7B parameters) alongside optimization. H100s provide 2-3x training speedup over A100s but cost 30-40% more hourly—net savings of 40-60% on training jobs. For pure prompt optimization, this advantage is irrelevant.

### Cost comparison across providers

**Specialized GPU clouds** (60-75% cheaper than hyperscalers):
- Thunder Compute: $1.47/hour (H100, cheapest found)
- RunPod, DigitalOcean, DataCrunch: $1.99-2.49/hour (H100)
- Lambda Labs: $2.19-3.29/hour (H100)

**Hyperscale clouds** (avoid for cost):
- AWS: $7.57/hour (H100)
- Azure: $6.98/hour (H100)
- GCP: $11.06/hour (H100)

**Total infrastructure recommendation**: RTX 4090 ($50-150/month) + LLM API costs ($200-800/month) = **$250-950/month total**

## State-of-the-art prompt optimization algorithms

### Algorithm tier ranking for 500-run monthly budget

The constraint of 500 SWE-bench evaluations per month fundamentally shapes algorithm selection. SWE-bench runs are expensive (time and compute), so sample efficiency is paramount.

**Tier 1: Primary recommendation - DSPy**

**What it is**: Stanford's "Declarative Self-improving Python" framework that treats prompts as programmable parameters rather than strings. Achieved 46.2% → 64.0% accuracy improvements on evaluation tasks.

**Why it's optimal**:
- **Sample efficient**: Typical optimization costs $2-10, requiring 50-200 training examples
- **Modular architecture**: Reusable components prevent redundant work
- **Systematic improvement**: Learns from failures rather than random search
- **SWE-bench appropriate**: Designed for complex agent pipelines, exactly your use case
- **Budget fit**: ~5-10 optimization runs using your 500-monthly allocation thoughtfully

**Implementation**:
```python
import dspy

# Configure with Claude
lm = dspy.Claude(model="claude-sonnet-4")
dspy.settings.configure(lm=lm)

# Define pipeline with signatures
class CodeFixer(dspy.Signature):
    """Fix GitHub issues with minimal code changes"""
    issue_description = dspy.InputField()
    repository_context = dspy.InputField()
    patch = dspy.OutputField()

# Optimize with MIPROv2 (most advanced optimizer)
optimizer = dspy.MIPROv2(
    metric=swe_bench_pass_rate,
    num_candidates=8,
    init_temperature=1.0
)

optimized_program = optimizer.compile(
    CodeFixer(),
    trainset=swe_bench_subset,
    num_trials=10  # Carefully allocated from your 500-run budget
)
```

**Cost**: $2-10 per optimization run, 10-30 minutes each

**Tier 1 Alternative: OPRO (Optimization by PROmpting)**

**What it is**: Google DeepMind's method using LLMs as black-box optimizers. The LLM generates new prompt candidates based on previous attempts and their scores.

**Why it's competitive**:
- **Simple implementation**: Just API calls, no complex infrastructure
- **Proven results**: 8% improvement on GSM8K, 50% on Big-Bench Hard
- **Quick convergence**: Plateaus after ~20 iterations
- **SWE-bench tested**: Works for instruction-level optimization

**Budget allocation**: ~3-5 optimization runs within your 500-evaluation budget

**Cost**: $2-20 per run (20-60 minutes)

**Tier 2: For exploration - EvoPrompt**

**What it is**: Evolutionary algorithms (genetic algorithm, differential evolution) implemented using LLMs as mutation/crossover operators.

**Advantages**:
- **Superior exploration**: 25% improvement over simpler methods on reasoning tasks
- **Fast convergence**: 5-10 generations sufficient
- **Multiple variants**: Can switch between GA and DE strategies

**Budget consideration**: Population-based approach requires more evaluations (population_size × generations). Allocate carefully.

**Cost**: $5-15 per run (30-120 minutes)

**Tier 3: Avoid these**

**PromptBreeder**: Most powerful but requires $10-30 per run and 60-180 minutes—too expensive for your budget constraint.

**RLHF/PPO**: Thousands of evaluations needed, requires $1,000s—completely inappropriate for 500-run budgets.

**Soft prompt tuning**: Requires gradient access to models (not available with Claude API).

### The model quality principle

**Critical insight from research**: Foundation model quality contributes 80% of performance improvement. Prompt optimization adds 3-8% maximum gains. Scaffolding (tool design, error recovery) adds another 5-15%.

**Implication**: Don't over-invest in prompt optimization. Anthropic achieved 72.7% on SWE-bench Verified with minimal scaffolding—just bash and string-replacement tools with a simple system prompt.

**Budget allocation strategy**:
- Model exploration: 50 runs (10%)
- Initial prompt testing: 50 runs (10%)
- Systematic optimization (DSPy): 100 runs (20%)
- Validation and testing: 100 runs (20%)
- Production evaluation: 200 runs (40%)

## Implementation architecture: self-improving system

### Core system design

**Philosophy**: Simple feedback loops with systematic learning, inspired by top SWE-bench performers who found complex scaffolding often hurts more than helps.

**Four-component architecture**:

**Component 1: Execution Engine**
- Runs SWE-bench instances with current prompt/tool configuration
- Captures full trajectory: commands executed, outputs received, errors encountered
- Records metrics: pass/fail, turns to completion, token usage, cost, time

**Component 2: Analysis Layer**
- Classifies failures: Wrong solution (40-50%), syntax errors (15-20%), tool errors (10-15%), multi-file coordination (10-15%), context management (5-10%)
- Identifies patterns across failures
- Extracts actionable insights (e.g., "Agent repeatedly fails to identify dependent files")

**Component 3: Optimization Engine (DSPy)**
- Takes failure patterns as input
- Generates improved prompt candidates
- Evaluates candidates on validation set
- Selects best performers via metrics

**Component 4: Versioning \u0026 Monitoring (PromptLayer)**
- Automatic version tracking for every change
- A/B testing with gradual rollout (5% → 10% → 20% → 100%)
- Regression testing against historical performance
- Cost and latency tracking

### Prompt template starting point: leverage SuperClaude

**SuperClaude** (16.8k GitHub stars) provides battle-tested templates specifically for Claude Code. Rather than starting from scratch, adapt its proven patterns:

**Key components to adopt**:
- **19 specialized commands**: `/analyze`, `/implement`, `/test`, `/troubleshoot`, `/scan`, `/document`
- **9 cognitive personas**: Architect, Frontend, Backend, Analyzer, Security, QA specialists that activate contextually
- **Structured workflow**: Explore → reproduce → fix → test → verify

**Integration approach**:
```python
# Adapt SuperClaude templates to DSPy signatures
from superclaude import load_template

base_template = load_template("code_fix_workflow")

class SuperClaudeFixer(dspy.Module):
    def __init__(self):
        self.analyze = dspy.ChainOfThought("issue → analysis")
        self.implement = dspy.ChainOfThought("analysis → patch")
        self.verify = dspy.ChainOfThought("patch → test_results")
    
    def forward(self, issue, repo_context):
        analysis = self.analyze(issue=issue, context=repo_context)
        patch = self.implement(analysis=analysis)
        verification = self.verify(patch=patch)
        return verification
```

### Tool design: minimalist approach wins

**Anthropic's winning strategy** for 72.7% SWE-bench Verified: Only two tools.

**Tool 1: Bash command execution**
```json
{
  "name": "bash",
  "description": "Run commands in a bash shell
  
* When invoking this tool, the command parameter does NOT need XML-escaping
* You don't have access to internet via this tool
* State is persistent across command calls
* To inspect specific lines: use 'sed -n 10,25p /path/to/file'
* Avoid commands that produce very large output
* Run long-lived commands in background: 'sleep 10 &'",
  
  "input_schema": {
    "type": "object",
    "properties": {
      "command": {"type": "string", "description": "The bash command to run"}
    },
    "required": ["command"]
  }
}
```

**Tool 2: String replacement editor**
```json
{
  "name": "str_replace",
  "description": "Edit files by replacing old_str with new_str
  
* Always use absolute paths
* Matches with indentation tolerance (fuzzy matching)
* Includes undo_edit command for recovery
* For viewing lines: use bash tool with sed/cat",
  
  "input_schema": {
    "type": "object",
    "properties": {
      "path": {"type": "string"},
      "old_str": {"type": "string"},
      "new_str": {"type": "string"}
    }
  }
}
```

**Why this works**: Tool descriptions matter more than prompt length. Detailed tool specs with edge cases, examples, and error handling prevent common failures.

### System prompt template

Based on Anthropic's winning approach:

```
You are an autonomous software engineering agent tasked with fixing GitHub issues.

WORKFLOW (flexible, not rigid):
1. Explore the repository to understand structure and context
2. Create a reproduction script and execute it to confirm the bug
3. Identify root cause through thorough analysis
4. Edit source code to resolve the underlying issue
5. Rerun tests to verify the fix works
6. Consider edge cases and ensure robustness

CRITICAL INSTRUCTIONS:
- You have full autonomy over your approach—think thoroughly before acting
- Your reasoning should be comprehensive, so extended thinking is encouraged
- Keep working until you fully solve the problem—don't stop prematurely
- Everything you need is in /testbed—no internet required
- Do NOT modify test files, only source code
- Always use absolute paths with tools

THINKING APPROACH:
- Analyze root causes, not just symptoms
- Fix underlying issues, not superficial manifestations
- Verify your solution against ALL requirements point by point
- Think about multi-file dependencies before starting edits
```

### Feedback loop implementation

**Per-instance feedback (immediate)**:
```python
def execute_with_feedback(agent, instance):
    trajectory = []
    
    for turn in range(max_turns):
        action = agent.generate_action(instance, trajectory)
        result = execute_action(action)
        trajectory.append({
            'action': action,
            'result': result,
            'error': result.error if result.failed else None
        })
        
        if result.error:
            # Immediate feedback for recovery
            feedback = analyze_error(result.error)
            instance.add_context(f"Previous attempt failed: {feedback}")
    
    return evaluate(trajectory)
```

**Batch-level learning (daily/weekly)**:
```python
def optimize_from_batch(results, optimizer):
    # Cluster failures by type
    failure_patterns = cluster_failures(results)
    
    # Generate insights
    insights = {
        'wrong_solution': extract_patterns(failure_patterns['semantic']),
        'tool_errors': extract_patterns(failure_patterns['tool']),
        'multi_file': extract_patterns(failure_patterns['coordination'])
    }
    
    # Update prompts via DSPy
    improved_program = optimizer.compile(
        trainset=create_training_examples(insights),
        metric=swe_bench_pass_rate
    )
    
    return improved_program
```

**Validation and A/B testing**:
```python
# Using PromptLayer for versioning and A/B testing
import promptlayer

promptlayer.track_request(
    function_name="swe_bench_solver",
    prompt_name="autonomous_fixer",
    prompt_version="v2.1",
    tags=["experiment=multi_file_fix"]
)

# Gradual rollout
config = {
    'v2.0': 0.90,  # Current stable version
    'v2.1': 0.10   # New experimental version
}

version = promptlayer.select_version(config)
result = execute_with_version(instance, version)
promptlayer.track_result(result, metrics=['pass_rate', 'cost', 'latency'])
```

## Metrics and evaluation framework

### Primary metrics

**Resolution rate** (% Resolved): Standard SWE-bench metric—percentage of instances where generated patch passes all tests. Track separately by difficulty and repository.

**Pass@k** (k=3, 5, 10): Success rate when sampling k solutions. GPT-5 achieves 51% pass@5 vs 23% pass@1 on SWE-bench Pro—indicates consistency and exploration effectiveness.

**Cost per instance**: Track API costs, token usage, time per instance. Target: $4/instance for agentic approaches, $0.34-0.70 for agentless.

### Diagnostic metrics

**Failure mode distribution**: Classify every failure into categories:
1. Wrong solution (40-50%): Semantic incorrectness, fixes symptom not cause
2. Syntax errors (15-20%): Malformed code, indentation issues
3. Tool errors (10-15%): Command misuse, environment issues
4. Multi-file coordination (10-15%): Missed dependencies, inconsistent changes
5. Context management (5-10%): Context exhaustion, information loss

**Trajectory quality**:
- Turns until submission (target: <20 for simple issues, <50 for complex)
- Self-correction rate (how often agent fixes own mistakes)
- Test-driven behavior (creates reproduction scripts)
- Localization accuracy (% correct file identified in top-5)

**Iteration efficiency**:
- Number of file edits per solution
- Number of test runs before success
- Redundant action rate (exploration inefficiency)

### Continuous improvement metrics

**Week-over-week improvement**: Track delta in resolution rate. Target: +2-5% weekly during active optimization, +0.5-1% during maintenance.

**Cost efficiency trending**: Cost per successful resolution should decrease over time as system learns to avoid expensive failures.

**Cross-benchmark consistency**: Test on SWE-bench Lite (300), Verified (500), and sample from Full (2,294). Consistency indicates generalization vs. overfitting.

## Cost estimate breakdown

### Conservative estimate: $500-800/month

**Infrastructure**:
- RunPod RTX 4090: $100/month (intermittent use, 10-15 hours weekly)
- Storage (100GB): $20/month

**LLM API costs** (Claude Sonnet 4 primary):
- Optimization runs (DSPy): $50/month (~5 optimization cycles × $10)
- SWE-bench evaluations: $400/month (500 runs × $0.80 average)
  - Simple instances: $0.50 each
  - Complex instances: $2-4 each
  - Estimated average: $0.80

**Versioning/monitoring**:
- PromptLayer Free tier: $0 (covers 5,000 requests/month)

**Total: ~$570/month**

### Optimistic with efficiency gains: $350-500/month

After 2-3 months of optimization, expect:
- Faster convergence (fewer turns per instance)
- Better localization (less exploration needed)
- Reduced API costs through efficiency

### Aggressive approach: $1,000-1,200/month

**Infrastructure**:
- Lambda Labs A10: $540/month (24/7 dedicated)
- Enhanced storage: $50/month

**LLM API costs**:
- Multiple model ensemble: $150/month (Claude + GPT-4 combination)
- Increased evaluation: $500/month (more experiments, pass@k sampling)

**Versioning**:
- PromptLayer paid tier: $49/month (advanced features, higher limits)

**Total: ~$1,289/month**

**ROI**: Higher investment enables faster iteration and potentially reaching 55-65% resolution rate (vs 40-50% with conservative approach).

## Implementation roadmap

### Month 1: Foundation (weeks 1-4)

**Week 1-2: Setup infrastructure**
- Provision RunPod RTX 4090 instance
- Install SWE-bench evaluation harness with Docker
- Set up PromptLayer account and integration
- Configure Claude API access
- Test baseline: Run 30 SWE-bench Lite instances with minimal prompt

**Week 3: Implement DSPy framework**
- Install and configure DSPy
- Adapt SuperClaude templates to DSPy signatures
- Create modular pipeline (analyze → implement → verify)
- Run initial optimization: 50 instances for training data

**Week 4: Establish metrics**
- Build trajectory logging system
- Implement failure mode classifier
- Create monitoring dashboard (Grafana or similar)
- Baseline evaluation: 50 SWE-bench Verified instances
- Document baseline: resolution rate, cost per instance, failure distribution

**Budget allocation**: 130 runs (baseline testing + optimization)

### Month 2: Optimization cycle (weeks 5-8)

**Week 5: Prompt refinement**
- Analyze Week 4 failures
- Improve system prompt (autonomy, workflow clarity, specificity)
- Enhance tool descriptions (error cases, examples, edge cases)
- Evaluation: 50 instances, measure improvement

**Week 6: Tool and recovery mechanisms**
- Implement fuzzy string matching for edit tool (+2-5% typical gain)
- Add retry logic with model fallback
- Create error recovery patterns
- Evaluation: 50 instances

**Week 7: Multi-file coordination**
- Address multi-file coordination failures (10-15% of errors)
- Improve dependency analysis prompts
- Add cross-file consistency checks
- Evaluation: 50 instances

**Week 8: DSPy optimization cycle**
- Run comprehensive DSPy optimization (MIPROv2)
- Use all collected trajectory data as training examples
- Evaluate optimized program: 75 instances
- A/B test: old vs new (25 instances each)

**Budget allocation**: 250 runs

### Month 3: Scale and ensemble (weeks 9-12)

**Week 9-10: Pass@k implementation**
- Implement pass@3 sampling (generate 3 solutions per instance)
- Majority voting or selection strategy
- Evaluation: 30 instances × 3 samples = 90 runs
- Expected: +3-8% improvement from ensembling

**Week 11: Repository-specific optimization**
- Analyze performance by repository
- Create repository-specific prompt modifications
- Evaluation: 50 instances (focus on weak repositories)

**Week 12: Full evaluation and analysis**
- Comprehensive evaluation: 100 SWE-bench Verified instances
- Calculate final metrics and ROI
- Document learnings and successful patterns

**Budget allocation**: 240 runs (some reserve)

**Expected outcomes after 3 months**:
- Month 1 baseline: 25-30% on Verified
- Month 2 optimized: 35-40% on Verified  
- Month 3 with ensemble: 45-50% on Verified

### Ongoing maintenance (month 4+)

**Weekly routine** (80 runs/month):
- Monitor production performance
- Investigate new failure modes
- Incremental prompt refinements
- Small A/B tests

**Monthly optimization** (100 runs/month):
- Comprehensive DSPy re-optimization
- Update training examples
- Cross-benchmark validation

**Budget allocation**: 180 runs/month active work, 320 runs reserve for experiments

## Alternative approaches worth considering

### Agentless approach (lower cost option)

**What it is**: Non-agentic three-phase structured workflow: localization → repair → validation. No autonomous agent loops.

**Performance**: 40.7-50.8% on SWE-bench Verified with Claude 3.5 Sonnet

**Cost**: $0.34-0.70 per instance (85-90% cheaper than agentic)

**Budget fit**: Could evaluate 700-1,400 instances/month vs 500 with agentic

**When to use**: If budget constraint is absolute and you value lower cost over peak performance. Agentless gets 80-90% of agentic performance at 10-15% of the cost.

**Trade-off**: Less flexible, worse on complex multi-file issues, but highly cost-efficient and deterministic.

### Hybrid approach (recommended exploration)

**Strategy**: Use agentless for initial localization, then agentic for complex repairs.

**Benefit**: Combines cost efficiency of agentless with capability of agentic for hard cases.

**Implementation**:
```python
def hybrid_solver(instance):
    # Phase 1: Agentless localization (cheap)
    files = agentless_localize(instance)
    
    # Phase 2: Complexity assessment
    complexity = estimate_complexity(instance, files)
    
    # Phase 3: Route appropriately
    if complexity == "simple":
        return agentless_repair(instance, files)  # $0.50
    else:
        return agentic_repair(instance, files)     # $2-4
```

**Budget impact**: Potential 30-50% cost savings while maintaining performance on complex instances.

## Key recommendations summary

**Use DSPy as your primary optimization framework**. It's sample-efficient, systematically learns from failures, and is designed for complex agent pipelines like SWE-bench solvers. Allocate 100-150 of your 500 monthly runs to DSPy optimization cycles.

**Start with SuperClaude templates** rather than building from scratch. Its 19 commands and 9 personas are battle-tested. Adapt them to DSPy signatures for systematic improvement.

**Use RTX 4090 or A10 GPUs, not H100s**. Prompt optimization is API-intensive, not GPU-compute intensive. Save 60-80% on infrastructure costs without performance loss. H100s only make sense if simultaneously training large models.

**Avoid quantum computing entirely**. It cannot help with large-data problems like prompt optimization due to fundamental bandwidth limitations. Even with IBM's free tier access, quantum provides zero benefit for your use case. Classical GPUs are superior.

**Keep scaffolding minimal**. Anthropic's winning 72.7% approach uses just bash + string-replacement tools. Focus effort on model quality (80% of improvement), then tool design (15%), then prompt optimization (5%).

**Implement versioning from day one** using PromptLayer (free tier sufficient initially). Automatic version tracking, A/B testing, and regression detection are critical for safe self-improvement.

**Budget allocation**: Infrastructure ($100-540/month) + API costs ($400-700/month) = $500-1,240/month total, depending on aggressiveness. Conservative approach at $570/month is recommended for first 3 months.

**Expected timeline**: Reach 40-50% on SWE-bench Verified within 3 months, with potential for 55-60% by month 6 if optimization continues systematically.

**Critical success factors**: Systematic failure analysis (classify every error), efficient budget allocation (don't waste runs on redundant experiments), gradual rollout (A/B test before full deployment), and maintaining human oversight (review failures weekly, update strategies based on patterns).

The path forward is clear: classical GPU-based DSPy optimization with proven templates, systematic learning from failures, and disciplined budget management. This approach is implementable immediately, cost-effective, and positioned to achieve competitive SWE-bench performance within your constraints.