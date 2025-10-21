# Autonomous Research Systems: Architectural Blueprints from Research to Paper

**The field has achieved end-to-end automation**: Five major systems—Sakana AI's The AI Scientist, HKUDS's AI-Researcher, Agent Laboratory, Google's AI Co-Scientist, and supporting frameworks—now generate publication-quality research papers from initial idea to peer review at costs of $2-25 per paper. The AI Scientist v2 produced the first AI-generated paper accepted at a peer-reviewed workshop (ICLR 2025), while Google's AI Co-Scientist independently discovered novel drug candidates validated in wet-lab experiments. These systems share common architectural patterns: multi-agent orchestration with specialized roles (researcher, executor, reviewer, writer), iterative refinement loops replacing one-shot generation, and progressive experiment management through tree search or staged pipelines. Implementation revolves around template-based or template-free approaches, Docker-based sandboxed execution, automated result parsing with statistical validation, hierarchical paper generation with citation management, and comprehensive checkpointing for long-running tasks. Production deployments demonstrate 80-94% implementation success rates with papers achieving workshop-level quality, though limitations remain in hallucination risks, theoretical depth, and computational resource requirements.

## System architecture landscape across five flagship platforms

The autonomous research ecosystem spans five distinct architectural philosophies. **Sakana AI's The AI Scientist** evolved from template-dependent v1 (August 2024) to template-free v2 (April 2025), pioneering progressive agentic tree search where an Experiment Manager agent coordinates exploration across 57 nodes per paper through four structured stages. **HKUDS's AI-Researcher** implements a three-stage pipeline with bidirectional math-to-code mappings that dramatically reduce hallucinations, achieving 93.8% implementation completeness with Claude-series models. **Agent Laboratory** from Johns Hopkins provides both autonomous and co-pilot modes with five specialized agents (PhD, Postdoc, ML Engineer, SW Engineer, Professor) operating through mle-solver and paper-solver modules at 84% cost reduction versus predecessors. **Google's AI Co-Scientist** deploys six specialized agents under supervisor orchestration—Generation, Reflection, Ranking, Proximity, Evolution, and Meta-review—using tournament-based evolution with Elo ratings (1200-1600 progression) for hypothesis refinement. **AgentRxiv** extends Agent Laboratory into a collaborative preprint server where multiple independent labs share discoveries, achieving 11.4-13.7% performance improvements through cumulative knowledge building.

Each system makes unique architectural contributions. The AI Scientist v2's tree search enables parallel path exploration with debug nodes (max depth 3, probability 1.0) and aggregation nodes for multi-seed statistics. AI-Researcher's Resource Analyst decomposes papers into atomic mathematical concepts with explicit code implementations, creating verifiable bridges between theory and practice. Agent Laboratory's dual-mode operation (autonomous vs co-pilot) enables human intervention at stage checkpoints while maintaining full automation capability. Google's tournament evolution implements pairwise scientific debates for hypothesis ranking, with meta-review agents synthesizing patterns across iterations for self-improvement without backpropagation. AgentRxiv's distributed architecture coordinates parallel labs with asynchronous access to shared research, demonstrating how agent collaboration accelerates discovery beyond isolated execution.

## Complete workflow pipelines from literature review to publication

The research-to-paper pipeline follows consistent stages across systems with varying implementation sophistication. **Literature review and knowledge acquisition** begins with systematic paper retrieval through Semantic Scholar API (The AI Scientist, Agent Laboratory), arXiv searches with LLM-generated keywords (AI-Researcher), or web search with debate-based exploration (AI Co-Scientist). The AI Scientist performs novelty checking through iterative searches (up to 10 iterations, 10 results per query) before committing to ideas. AI-Researcher goes deeper, extracting atomic academic concepts from LaTeX source files and mapping them to code implementations from GitHub repositories (filtered by stars, recency, documentation quality). This Resource Analyst decomposition creates bidirectional theoretical-empirical bridges that subsequent implementation stages reference continuously.

**Idea generation and hypothesis formation** diverges between guided and open-ended approaches. The AI Scientist v1 operates within template constraints, generating ideas from human-provided seed concepts. Version 2 eliminates templates entirely, generating 20+ ideas through 5 refinement rounds with divergent-convergent discovery frameworks. AI-Researcher distinguishes between Level-1 tasks (explicit research instructions provided) and Level-2 tasks (autonomous exploration from references only), surprisingly finding better performance in Level-2's open-ended mode. Google's AI Co-Scientist generates hypotheses through simulated scientific debates in self-play, identifying assumptions iteratively and expanding research directions through web search integration. Agent Laboratory's PhD and Postdoc agents collaborate on research planning after literature curation, developing strategies aligned with user-specified computational resources.

**Experiment design and execution** represents the most technically complex pipeline stage. The AI Scientist v1 follows linear progression—Aider generates code plans, writes implementations, executes with 4 retry attempts per iteration across 5 total experiment cycles. Version 2 revolutionizes this with best-first tree search: 21 nodes in preliminary investigation (Stage 1), 12 nodes each for hyperparameter tuning (Stage 2), research agenda execution (Stage 3), and ablation studies (Stage 4). Each node executes with 1-hour runtime limits, generating Python code, running experiments, creating visualizations, receiving VLM critique on figure quality, and spawning debug children on failures. AI-Researcher implements mentor-student collaboration between Code Agent (implementation) and Advisor Agent (three sub-agents: Judge for concept decomposition, Code Review for correctness, Experiment Analysis for modification suggestions). This enables progressive experimental cycles: minimal prototype (1-2 epochs), iterative refinement, full-scale testing, supplementary investigations—all emerging organically without predetermined protocols.

**Paper generation and documentation** overcomes LLM coherence limitations through hierarchical synthesis. The AI Scientist v1 writes sections iteratively with Aider, checking consistency and eliminating contradictions. Version 2 employs single-pass generation with reasoning model (o1) reflection, integrating VLM reviews for figure-caption alignment. AI-Researcher's Documentation Agent implements three-phase hierarchical synthesis: structural outlining with domain templates, methodical content elaboration maintaining cross-document consistency, and verification through specialized academic checklists with "one more step" review processes. This hierarchical approach addresses the challenge of sustained coherence across thousands-of-words manuscripts. Agent Laboratory's Professor agent generates comprehensive LaTeX reports through paper-solver's iterative editing, while Google's AI Co-Scientist formats outputs as NIH Specific Aims pages or research overviews with multiple top-ranked hypotheses. All systems integrate automated citation management—Semantic Scholar searches, BibTeX generation, in-text insertion at appropriate locations, verification of bibliography completeness.

**Automated review and validation** closes the loop with simulated peer review. The AI Scientist employs automated reviewers achieving near-human performance in paper scoring, using GPT-4o with 5 ensemble reviews at 5 reflection rounds each (temperature 0.1 for stability). Reviews include overall scores (1-10), accept/reject decisions, detailed weakness lists, and conference standard comparisons. AI-Researcher implements two-stage evaluation: technical execution validation via Code Review agent measuring completion ratios, followed by scientific contribution assessment with 16 independent LLM evaluations (GPT-4, o1-mini, o3-mini, Claude-3.5, Claude-3.7) rated on -3 to +3 comparative scales. Google's AI Co-Scientist validates through expert evaluation across 11 research goals, achieving 2.36 average preference rank (most preferred) with 3.64/5 novelty ratings. Real-world validation surpasses simulated reviews: The AI Scientist v2 achieved ICLR 2025 workshop acceptance (score 6.33/10, top 45%), Robin discovered ripasudil as novel dAMD therapeutic candidate, Virtual Lab designed functional SARS-CoV-2 nanobodies, Coscientist executed autonomous chemistry synthesis.

## Multi-agent orchestration patterns powering collaborative intelligence

Agent specialization follows consistent archetypes across implementations. **Orchestrator/Lead agents** decompose queries into subtasks, manage workflow coordination, delegate to workers, and synthesize results—exemplified by The AI Scientist's Experiment Manager, AI-Researcher's Plan Agent, Anthropic's LeadResearcher pattern, and Google's Supervisor agent. **Researcher/Data Collection agents** execute searches, interface with external APIs, filter information, and return condensed findings. **Executor/Worker agents** perform specialized technical tasks (code execution, data processing) within isolated environments, operating tools and reporting results. **Reviewer/Critic agents** evaluate outputs for quality, accuracy, and completeness using predefined rubrics to identify hallucinations and errors—The AI Scientist's automated reviewer, AI-Researcher's Advisor Agent with three sub-components, Google's Reflection Agent performing correctness/novelty/safety reviews. **Writer/Synthesis agents** generate final reports, combine multi-source information, and format with citations.

Specialization strategies vary by axis. **Role-based specialization** (CrewAI pattern) defines agents by role, goal, and backstory with hierarchical organization. **Tool-based specialization** differentiates agents by access permissions for security boundaries. **Model-based specialization** allocates different LLMs by task complexity—premium models (GPT-4, Claude Opus 4, o1-preview) for complex reasoning and lead coordination, efficient models (Claude Sonnet 4, GPT-4o) for routine execution, budget models (GPT-3.5, Haiku, Gemini Flash) for high-volume tasks. Anthropic's research system uses Opus 4 for lead agents and Sonnet 4 for subagents despite 15x token usage, finding better results justify costs. AI-Researcher achieves 93.8% completeness with Claude-series models versus 50% with GPT-4o-series, with Claude excelling at debugging complex tensor dimensions and NaN losses.

**Communication patterns** span message passing, shared state, and event-driven architectures. Direct message passing exchanges structured messages (tool calls, responses) with history in shared state, as implemented by LangGraph's message-based workflows. Shared context/blackboard approaches use common state objects accessible to all agents, eliminating message passing overhead—demonstrated by Anthropic's research system maintaining consolidated fact lists. Event-driven patterns see agents publishing events that trigger others with loose coupling, used in CrewAI workflows. Handoff mechanisms enable explicit control transfers through tool calls including task description and context (LangGraph Command primitive). Microsoft's Agent-to-Agent (A2A) protocol standardizes communication with authentication, fallback, and retry capabilities. The Model Context Protocol (MCP) provides standardized interfaces for tool integration with dynamic discovery, adopted by Claude and OpenAI for language-agnostic external integrations.

**Coordination mechanisms** determine workflow structure and decision-making. **Supervisor pattern (hierarchical)** employs central coordinators managing workflows and delegating to specialized workers, providing clear control flow and centralized decisions but creating single points of failure—used by Anthropic Research, LangGraph supervisor, Agent Laboratory. **Swarm pattern (peer-to-peer)** enables dynamic agent handoffs with decentralized decision-making, offering flexibility and resilience at the cost of coordination complexity—implemented by OpenAI Swarm, LangGraph swarm mode. **Sequential flow** creates linear pipelines with deterministic execution. **Network/graph-based** approaches treat agents as nodes in directed graphs with conditional routing based on state, forming LangGraph's core architecture. **Tree search** patterns explore multiple paths with evaluation and pruning, exemplified by The AI Scientist v2's best-first search navigating 57-node trees with debug branches (depth 3) and aggregation nodes for statistics.

Dynamic routing employs LLM-based decisions on agent selection with conditional edges adapting to results. Static workflows follow predefined sequences with deterministic behavior. Human-in-the-loop workflows pause for approval with state persistence across interruptions, implemented through LangGraph's checkpoint system enabling time travel and resumption. Google's tournament evolution represents unique coordination: hypotheses compete in pairwise debates with Elo ratings (starting 1200, progressing to 1600), winners inform subsequent iterations, top-ranked hypotheses receive multi-turn debates, and meta-review agents identify patterns for self-improvement feedback loops without model fine-tuning.

## Technical implementation architecture from LLMs to execution environments

**LLM API usage patterns** optimize for task complexity and cost. The AI Scientist supports OpenAI (GPT-4o, o1-preview, o3-mini), Anthropic (Claude 3.5 Sonnet v1/v2, Haiku), DeepSeek (Coder V2), OpenRouter aggregation, Google (Gemini 1.5 Flash/Pro), and AWS Bedrock/Vertex AI Claude access. Model recommendations: Claude 3.5 Sonnet for experimentation (highest success rate), GPT-4o for review (best output format conformance), o1-preview for writing (reasoning capability), o3-mini for plot aggregation, DeepSeek Coder V2 for cost-effectiveness. AI-Researcher defaults to Claude-series achieving 87.5% completeness with 2.75 correctness versus GPT-4o-series 50% completeness with 1.0 correctness. Agent Laboratory supports o1, o1-preview, o1-mini, gpt-4o, o3-mini, and deepseek-v3, with o1-preview achieving best overall quality (usefulness 4.4/5, report quality 3.4/5) and o1-mini highest experimental quality (3.2/5).

Code generation temperature settings reveal system philosophies: The AI Scientist v2 uses 0.5 for Claude 3.5 Sonnet code generation (8,192 max tokens) balancing creativity with reliability, 0.5 for GPT-4o feedback agents, 1.0 for GPT-4o summary agents prioritizing diversity. Agent Laboratory uses lower temperatures for stability. Parallel tool calling reduces execution time by 90% (Anthropic), streaming responses enable token-by-token real-time feedback, extended thinking improves reliability through visible reasoning (Claude), and batch processing groups requests for efficiency.

Cost optimization becomes critical as multi-agent systems use ~15x more tokens than single chat interactions, with token usage explaining 80% of performance variance. Prompt caching (up to 1 hour) achieves 90% cost reduction for repeated queries. Model fallbacks implement primary-backup strategies maintaining continuity during outages. The AI Scientist achieves $15 per paper (v1) and $20-25 per paper (v2), Agent Laboratory delivers $2.33-$15 per paper (84% reduction versus previous methods), and AgentRxiv averages $3.11 per paper ($2.15-$9.87 range) with 1.36-hour median runtime.

**Tool integration patterns** span search, execution, data manipulation, and communication. The AI Scientist integrates Semantic Scholar API for literature search, Aider for code generation (v1) or direct Claude code generation (v2), Python execution in sandboxed environments, LaTeX compilation (texlive-full), and visualization libraries. AI-Researcher provides coding tools (gen_code_tree_structure, read_file, write_file, create_file, create_directory, list_files, run_python, execute_command, terminal navigation), file tools (open_local_file, page navigation, find operations, question_answer_on_whole_page, visual_question_answering), and planning tools (plan_dataset, plan_training, plan_testing). Google's AI Co-Scientist integrates web search/retrieval, domain-specific databases (FDA-approved drugs), specialized AI models (AlphaFold), private publication repositories, and external APIs. The Model Context Protocol standardizes these integrations with dynamic discovery and language-agnostic interfaces.

Tool design principles emphasize clear interfaces with descriptive names and explicit I/O specifications. Anthropic research reveals "bad tool descriptions send agents down completely wrong paths," highlighting the importance of precise documentation. Execution isolation separates execution servers from inference with sandbox environments creating security boundaries. Multi-faceted tool access enables web search for broad exploration, specialized tools over generic options, and matching tools to data locations. Container-based isolation (Docker, gVisor) prevents unauthorized system modifications while enabling autonomous operations.

**Memory and context management** implements hierarchical structures. Short-term working memory maintains active conversation within threads, limited by context windows (4K-200K tokens), managed by checkpointers, and stored in Redis or in-memory. Medium-term session memory persists across multiple turns within sessions, cleared at session end. Long-term persistent memory shares information across conversations, stores user preferences, and requires external storage (vector databases, knowledge graphs). Vector database integration follows text → embeddings → vector store → semantic similarity search patterns using ChromaDB, Pinecone, Milvus, FAISS, Weaviate, or Neo4j. Context management employs progressive summarization with condensed history updated each interaction, context prioritization (highest: current input; high: recent conversation; medium: summary; low: background), and retrieval through vector search with LLM-generated queries.

**Checkpointing and state management** enable long-running task handling. LangGraph implements comprehensive checkpointing capturing complete state at intervals, enabling pause/resume/recovery and supporting time travel for debugging. Storage options span in-memory (MemorySaver for development), SQLite (local persistence), PostgreSQL (production multi-user), and custom databases implementing BaseCheckpointSaver interface. The AI Scientist v2 saves stage checkpoints with best-performing nodes carried forward as roots for next stages, enabling recovery from failures. All experimental outputs persist to .npy files, JSON summaries per experiment, full LaTeX manuscripts at each iteration, and tree visualizations (unified_tree_viz.html) for exploration analysis. Durable execution resumes after failures without restart through periodic saves for auditing. Asynchronous workflows handle multiple tasks simultaneously with non-blocking I/O, improved responsiveness, and streaming with state preservation across checkpoints.

**Error handling and recovery** implements multi-layer defense. The AI Scientist v1 attempts up to 4 retries per code execution with error messages returned to Aider for fixes, timeout handling for long-running experiments, and API failure management. Version 2 implements debug nodes with probability 1.0 (always attempts debugging), maximum depth of 3 debug attempts, error traces stored with nodes, and debugging prioritized in node selection. Failed nodes spawn debug children but are abandoned after max_debug_depth. AI-Researcher's iterative refinement between Code Agent and Advisor Agent provides continuous error detection and correction through mentor-student relationship modeling.

Retry strategies implement exponential backoff: `delay = base_delay * (2 ** attempt)` across max attempts. Fallback patterns cascade from primary to secondary models, premium to budget models, external APIs to cached data, and complex to simple heuristics. Circuit breakers monitor failure rates, stop traffic to unhealthy endpoints preventing cascading failures, and implement cool-down periods before retry. LLM-based adaptation informs agents when tools fail, letting agents choose alternatives—surprisingly effective in practice. Production implementations combine retry (transient errors), fallback (persistent errors), circuit breaker (cascade prevention), graceful degradation (reduced functionality), detailed error logging (debugging), and comprehensive monitoring (error rates, latency, thresholds) with full tracing via LangSmith.

## Code repository structures revealing implementation patterns

The AI Scientist v1 organizes around template-based research domains:

```
AI-Scientist/
├── ai_scientist/
│   ├── llm.py              # Unified API: OpenAI, Anthropic, DeepSeek, OpenRouter
│   ├── perform_review.py   # Automated reviewer (near-human performance)
│   └── generate_ideas.py   # Idea generation with novelty checking
├── templates/
│   ├── nanoGPT/           # Transformer language modeling template
│   │   ├── experiment.py   # Main experiment execution
│   │   ├── plot.py        # Result visualization
│   │   ├── prompt.json    # Task description and constraints
│   │   ├── seed_ideas.json # Example research ideas
│   │   └── latex/
│   │       └── template.tex # Conference-style paper template
│   ├── 2d_diffusion/      # Diffusion models template
│   └── grokking/          # Learning dynamics template
├── launch_scientist.py     # Main orchestrator
└── requirements.txt        # Environment dependencies
```

Version 2 transitions to template-free operation:

```
AI-Scientist-v2/
├── ai_scientist/
│   ├── perform_ideation_temp_free.py  # Template-free idea generation
│   ├── ideas/                          # Topic description markdown files
│   └── [tree search components]        # Based on AIDE project
├── launch_scientist_bfts.py            # Best-first tree search launcher
├── bfts_config.yaml                    # Tree search hyperparameters
│   # num_workers: 3, steps: 21, max_debug_depth: 3, debug_prob: 1.0
└── experiments/                        # Generated research outputs
```

AI-Researcher implements comprehensive multi-agent structure:

```
AI-Researcher/
├── research_agent/         # Core research pipeline
│   ├── run_infer_level_1.sh   # Guided innovation execution
│   ├── run_infer_level_2.sh   # Open-ended exploration execution
│   └── run_infer_plan.py      # Planning agent coordination
├── paper_agent/            # Documentation generation
│   ├── writing.py             # Hierarchical writing system
│   └── run_paper.sh          # Paper generation runner
├── benchmark/              # Scientist-Bench evaluation framework
│   └── final/                 # 22 benchmark papers across 4 domains
│       ├── diffu_flow/       # Diffusion models
│       ├── gnn/              # Graph neural networks
│       ├── reasoning/        # Reasoning tasks
│       ├── recommendation/   # Recommender systems
│       └── vq/               # Vector quantization
├── docker/                 # Containerized environment configuration
├── examples/               # Complete generated research instances
│   ├── rotation_vq/          # Full paper + code + workspace
│   ├── fsq/
│   └── [multiple domain examples]
├── .env.template          # Configuration: LLMs, Docker, GPUs
└── web_ai_researcher.py   # Gradio-based GUI
```

Agent Laboratory emphasizes modularity and dual-mode operation:

```
AgentLaboratory/
├── ai_lab_repo.py          # Main execution orchestrator
├── mle-solver/             # Machine learning experimentation module
│   # Iterative code generation, command execution, error handling, LLM reward scoring
├── paper-solver/           # Academic report generation in LaTeX
│   # Section-by-section generation with iterative editing
├── experiment_configs/     # YAML configuration files per research domain
│   # Specifies: task description, baseline, metrics, constraints
└── state_saves/           # Automatic checkpoint storage for recovery
```

**Configuration patterns** reveal system design philosophies. The AI Scientist v1 uses JSON for task specification:

```json
{
  "task_description": "Improve transformer efficiency for language modeling",
  "baseline": "Standard GPT architecture",
  "constraints": ["Maintain model quality", "Reduce memory footprint"],
  "evaluation_metrics": ["perplexity", "training_time", "memory_usage"]
}
```

AI-Researcher employs environment-based configuration (.env files):

```bash
# LLM Configuration
COMPLETION_MODEL=claude-3-5-sonnet-20241022
CHEEP_MODEL=claude-3-5-haiku-20241022
OPENROUTER_API_KEY=sk-...

# Task Configuration
CATEGORY=vq  # diffu_flow, gnn, reasoning, recommendation, vq
INSTANCE_ID=one_layer_vq
TASK_LEVEL=task1  # task1=Level-1 (guided), task2=Level-2 (open-ended)
MAX_ITER_TIMES=0

# Container Configuration
DOCKER_WORKPLACE_NAME=workplace_paper
BASE_IMAGES=tjbtech1/airesearcher:v1
GPUS='"device=0,1"'  # GPU allocation strategy
```

Agent Laboratory uses YAML for hierarchical configuration:

```yaml
experiment:
  name: "neural_architecture_search"
  description: "Discover efficient architectures for image classification"
  
model:
  llm_backend: "o1-preview"  # o1, o1-mini, gpt-4o, deepseek-v3
  temperature: 0.1
  
resources:
  max_runtime_hours: 12
  gpu_count: 2
  memory_gb: 32
  
evaluation:
  metrics: ["accuracy", "latency", "parameter_count"]
  baseline_threshold: 0.85
```

**Prompt template organization** follows modular patterns enabling reusability and iteration. The AI Scientist organizes prompts by pipeline stage with system role definitions, task-specific instructions, output format specifications, constraint descriptions, and few-shot examples. AI-Researcher implements tool-augmented prompts embedding available tool descriptions, usage examples, expected outputs, and error handling guidance. Agent Laboratory uses agent-specific prompt templates defining expertise areas, responsibilities, collaboration patterns, and quality standards.

Prompt engineering best practices from Anthropic's research system emphasize: (1) teaching delegation with detailed task descriptions including objectives, formats, tools, and boundaries; (2) scaling effort appropriately (simple: 1 agent with 3-10 calls; complex: 10+ agents with divided responsibilities); (3) starting wide then narrowing with broad queries progressively refined; (4) guiding thinking with extended reasoning for planning and interleaved thinking for evaluation; and (5) enabling self-improvement where LLMs critique prompts achieving 40% completion time reduction from optimized descriptions.

## Experiment management patterns from design through execution

**Experiment definition and parameterization** follows MLflow integration patterns standard across production ML systems. Experiments organize as projects with unique IDs and names, each containing multiple "runs" representing individual trials. Experiment metadata includes name, ID, artifact location, and creation timestamp with hierarchical organization: Experiment → Runs → Artifacts/Metrics/Parameters. Parameter tracking logs all input parameters as immutable key-value pairs (hyperparameters, configurations, data versions) via `mlflow.log_param()` or `mlflow.autolog()`. Result storage separates backend databases (experiment metadata, run metadata, parameters, metrics, tags) from artifact storage (model files, plots, data files, code snapshots).

The AI Scientist v2 implements sophisticated node-based experiment tracking. Each tree search node represents an experiment attempt with associated state: code generated, execution status (success/buggy), error traces for failed attempts, saved results (.npy files), generated plots (PNG/PDF), and performance metrics. Node types include non-buggy (successfully executed), buggy (failed requiring debugging), hyperparameter (systematic exploration), ablation (component importance), replication (multi-seed for statistics), and aggregation (result synthesis). Node allocation per stage distributes 21 nodes for preliminary investigation (Stage 1), 12 nodes each for hyperparameter tuning (Stage 2), research agenda execution (Stage 3), and ablation studies (Stage 4), totaling ~57 nodes per paper with 1-hour runtime limits each.

AI-Researcher distinguishes Level-1 (guided innovation with explicit instructions) from Level-2 (open-ended exploration from references only) tasks. Completion ratio measures the proportion of functionality successfully implemented through Code Review agent verification. Correctness scoring averages 2.65/5.0 across tasks, ranging from 3.22 (VQ domain highest) to 2.20 (recommendation domain lowest due to inherent complexity). Docker containerization (tjbtech1/airesearcher:v1) provides isolated environments with configured GPU allocation, ensuring consistent execution across experiments. Version control automatically logs Git commit hashes, environment snapshots (conda/pip dependencies), code file hashing, dataset checksums, and start/end timestamps for complete reproducibility.

**Code generation and sandboxed execution** implements multi-layer security. The AI Scientist v1 employs Aider for LLM-based code editing, generating plans before writing code and attempting up to 4 retries on failures across 5 total experiment iterations. Version 2 shifts to direct Claude 3.5 Sonnet code generation (8,192 max tokens, temperature 0.5) focusing on data prep → model training → evaluation → visualization with one-line Hugging Face dataset loading. AI-Researcher's Code Agent transforms research analysis into executable implementations with professional standards: comprehensive documentation, logical modularization, well-defined entry points, systematically decoupled components, and strict independence from existing codebases (develops from first principles).

Sandboxing implements defense-in-depth through three layers. **Layer 1 (Container isolation)** uses Docker with non-root users, working directory separation, and resource limits enforced via Kubernetes:

```yaml
resources:
  requests: {memory: "250Mi", cpu: "250m"}
  limits: {memory: "500Mi", cpu: "500m"}
```

**Layer 2 (Enhanced kernel security)** deploys gVisor, a user-space kernel intercepting system calls to sandbox the sandbox itself from the host kernel with 150-200ms spin-up time for lightweight VMs. **Layer 3 (Jupyter kernel isolation)** manages separate kernels per execution context via AsyncKernelManager with isolated namespaces. Alternative solutions include E2B (cloud-based sandboxes, ~150ms startup), CodeSandbox (MicroVM infrastructure, 2-second VM cloning), and Google's Sandbox2/Sandboxed API (C++ security for Linux).

Timeout handling implements async execution with controlled termination:

```python
async def execute_code(code: str, timeout: int = 120):
    try:
        output = await wait_for(
            execute_kernel_code(code), 
            timeout=timeout
        )
    except TimeoutError:
        raise HTTPException(
            status_code=400, 
            detail="Execution timed out"
        )
```

Package whitelisting restricts installations to approved libraries (numpy, pandas, matplotlib, scikit-learn, torch, tensorflow), preventing arbitrary package execution. Execution monitoring via FastAPI servers creates isolated kernels per request, executes code with message monitoring, captures stdout/stderr streams, and returns formatted results or error details.

**Result analysis and interpretation** automates statistical validation. JSON-based storage structures results with run IDs, metric time series (train_loss, val_accuracy arrays), and final aggregated results (best_epoch, best_val_accuracy). Automated extraction employs regular expressions for log parsing, structured output requirements (JSON/CSV), timestamped metric logging, and automatic figure saving with metadata. The AI Scientist computes descriptive statistics (mean, std, min, max), performs comparative analysis (baseline vs experimental), conducts significance testing (t-tests, ANOVA when applicable), and runs multiple trials (typically 3-5 per configuration) for statistical validity.

Error handling implements robust fallback strategies:

```python
def parse_results(output_file):
    try:
        results = json.load(output_file)
        metrics = validate_metrics(results)
        return compute_statistics(metrics)
    except JSONDecodeError:
        return parse_with_regex(output_file)  # Fallback
```

Multi-criteria decision-making determines experiment success through five dimensions: execution success (code runs without fatal errors), metric improvement (exceeds baseline by threshold), statistical validity (sufficient samples, significance), resource constraints (within time/memory budgets), and reproducibility (consistent across runs). The AI Scientist requires experiments complete without errors, generated plots are readable, results show measurable differences from baseline, paper write-ups are coherent, and automated reviewer scores exceed thresholds (~5/10).

## Paper generation architecture from structure to citations

**Document structure generation** follows hierarchical templates with automated section synthesis. The AI Scientist implements section-by-section generation cycling through introduction, related work, method, experiments, results, and conclusion. For each section, the system creates prompts incorporating section name, experimental results, figure paths, and experimental notes, generates content via LLM, and formats with LaTeX commands. AI-Researcher's Documentation Agent employs three-phase hierarchical synthesis: Phase 1 structural outlining with domain templates and logical flow, Phase 2 content elaboration maintaining cross-document consistency, and Phase 3 verification through specialized academic checklists with "one more step" review processes. This addresses LLM limitations in sustained coherence across thousands of words.

LaTeX templates customize conference or journal formats with automatic figure insertion via \includegraphics, dynamic table generation from results data, bibliography management with BibTeX, and proper style file usage (neurips_2024.sty, ICBINB workshop formats). The AI Scientist v2 enforces page limits (4 pages single-column for ICBINB), section guidelines (abstract, introduction, related work, method, experiments, conclusion), continuous prose over itemization, multiple citations per section, and figure limits (up to 4 in main text, rest in appendix).

Figure integration follows automated patterns:

```latex
\begin{figure}[h]
\centering
\includegraphics[width=0.48\textwidth]{results/loss_curve.png}
\caption{Training and validation loss over epochs. 
Our method (blue) converges faster than baseline (orange).}
\label{fig:loss}
\end{figure}
```

Code generation creates figures with metadata:

```python
def save_figure_with_metadata(fig, name, caption):
    fig_path = f"figures/{name}.pdf"
    plt.savefig(fig_path)
    latex_code = f"""
\\begin{{figure}}[h]
\\centering
\\includegraphics[width=0.8\\textwidth]{{{fig_path}}}
\\caption{{{caption}}}
\\label{{fig:{name}}}
\\end{{figure}}
"""
    return latex_code
```

**Citation management** integrates literature search with reference formatting. Semantic Scholar API integration retrieves papers with queries, limits (typically 10-15 results), and field specifications (title, authors, year, citationCount):

```python
def search_papers(query, limit=10):
    url = "https://api.semanticscholar.org/graph/v1/paper/search"
    params = {
        "query": query,
        "limit": limit,
        "fields": "title,authors,year,citationCount"
    }
    response = requests.get(url, params=params)
    return response.json()["data"]
```

Citation workflow follows six steps: (1) query generation extracts key concepts from method descriptions, (2) paper retrieval searches Semantic Scholar API, (3) relevance filtering selects papers by citation count and recency, (4) BibTeX generation automates formatting, (5) in-text citation inserts \cite{} commands at appropriate locations, and (6) verification ensures all cited papers exist in bibliography and all bibliography entries are cited in text.

BibTeX management structures references:

```bibtex
@article{author2024method,
  title={Method Name},
  author={Author, First and Author, Second},
  journal={Conference Name},
  year={2024},
  url={https://...}
}
```

The AI Scientist performs iterative searches up to 10 times before committing to ideas, checking novelty against top 10 search results per query. AI-Researcher's Paper Analyst uses RAG-based paradigms on LaTeX files, extracting mathematical formulations of atomic concepts and creating formal foundations for implementation. Known citation issues include hallucination of numerical results (<10% rate in v1), incorrect attribution (citing wrong years or papers), and outdated citations (median 5 per paper in some evaluations).

**Figure and visualization creation** implements automated plotting with publication-ready standards. The AI Scientist generates matplotlib visualizations with 300 DPI resolution, tight bounding boxes, serif fonts (size 10), and appropriate figure sizes (6x4 inches default). Microsoft's LIDA framework offers sophisticated alternative architecture with four modules: SUMMARIZER (converts data to natural language), GOAL EXPLORER (generates visualization objectives), VISGENERATOR (creates visualization code grammar-agnostically), and INFOGRAPHER (produces stylized graphics).

Publication-ready configuration ensures consistency:

```python
plt.rcParams.update({
    'font.size': 10,
    'font.family': 'serif',
    'figure.figsize': (6, 4),
    'figure.dpi': 300,
    'savefig.dpi': 300,
    'savefig.bbox': 'tight',
    'axes.linewidth': 0.5,
    'grid.linewidth': 0.5
})
```

The AI Scientist v2 integrates Vision-Language Models (VLMs) for figure quality feedback. GPT-4o vision capabilities assess figure quality, verify caption-image alignment, and identify issues: missing legends, unclear labels, misleading visualizations. Flagged issues mark nodes as buggy for debugging, while passing figures mark nodes as non-buggy for progression. LLM-based caption generation produces descriptive text:

```python
def generate_caption(figure_type, data_summary, results):
    prompt = f"""
    Generate a descriptive caption for a {figure_type} showing:
    - Data: {data_summary}
    - Key finding: {results['key_insight']}
    
    Caption should be concise, informative, and publication-ready.
    """
    return llm.generate(prompt)
```

Known visual issues include unreadable labels, plots overflowing page boundaries, difficulty comparing number magnitudes, and missing or misaligned legends—limitations the VLM review process aims to catch and correct through iterative refinement.

## Performance benchmarks and real-world validation

**Technical execution metrics** demonstrate remarkable progress. The AI Scientist achieves ~$15 per paper (v1) with runtime 3.5 hours and ~$20-25 per paper (v2) with several hours to 15-hour maximum limits. Agent Laboratory delivers $2.33-$15 per paper with 0.09-11.9 hour runtime representing 84% cost reduction versus previous autonomous methods. AgentRxiv averages $3.11 per paper ($2.15-$9.87 range) with 1.36-hour median runtime (0.09-11.9 hour range). AI-Researcher operates with configurable resource allocation through Docker, achieving 93.8% implementation completeness with Claude-series models (GPT-4o-series achieves only 50% completeness). CodeScientist averages 131 minutes per experiment with 90-minute timeout per debug iteration. Virtual Lab builds computational pipelines in 1-2 days with ~1 week computation time, agents contributing 98.7% of total words (>120,000 tokens) while human researchers contribute only 1,596 words.

**Research quality assessments** reveal varying success rates. The AI Scientist v1 generates papers exceeding conference acceptance threshold in automated review, with independent evaluation finding 42% of experiments failed due to coding errors but papers resembling "rushed undergraduate work" completed far faster than human researchers. Version 2 achieved breakthrough validation: 3 papers submitted blind to ICLR 2025 workshop peer review (reviewers informed some might be AI-generated), 1 paper accepted (score 6.33/10, top 45% of submissions) with individual scores 6, 6, 7 (weak accept, weak accept, accept). The paper reported negative results appropriately (temporal consistency regularization did not improve compositional generalization) with clear methodology despite weaknesses in description clarity and citation accuracy.

AI-Researcher demonstrates 15.79%-78.95% of AI-generated papers rated comparable to expert human research depending on evaluator. Level-2 tasks (open-ended exploration) surprisingly outperform Level-1 tasks (guided implementation) with average ratings -0.23 to -1.01 versus -0.53 to -1.70 and comparable rates 40%-100% versus 13.64%-81.82%. This suggests AI systems excel when leveraging internal knowledge synthesis versus following prescriptive instructions. Claude-3.5 backbone achieves higher mean ratings and better comparable rates than GPT-4o across evaluators, with GPT-4o achieving 0% comparable under strictest criteria (o3-mini) versus Claude-3.5's 14.29%.

**Real-world discoveries** validate autonomous research capabilities. **Robin (FutureHouse)** identified ripasudil (ROCK inhibitor) as novel therapeutic candidate for dry age-related macular degeneration through autonomous hypothesis generation, experiment design, RNA-seq analysis, and ABCA1 upregulation mechanism elucidation—representing the first AI system to autonomously discover and validate novel therapeutic. **Google's AI Co-Scientist** generated 30 top-ranked drug repurposing candidates for acute myeloid leukemia with 5 selected for testing (Binimetinib, Pacritinib, Cerivastatin, Pravastatin, DMF), 3 demonstrating cell viability inhibition, and novel candidate KIRA6 showing IC50 of 13 nM in KG-1 cells. For liver fibrosis, the system identified 3 novel epigenetic targets with 2 showing significant anti-fibrotic activity validated in human hepatic organoids without cellular toxicity, including one FDA-approved drug for repurposing. For antimicrobial resistance mechanisms, AI Co-Scientist independently recapitulated unpublished findings on cf-PICI interaction with phage tails in 2 days versus ~10 years human research.

**Virtual Lab (Stanford/CZ Biohub)** designed 92 nanobodies for SARS-CoV-2 variants (KP.3 and JN.1), synthesized and tested all candidates, achieved 2 nanobodies with improved binding to new variants, observed most expressing as functional proteins with success rates comparable to human-led projects but faster completion time. **Coscientist (Carnegie Mellon)** successfully planned chemical synthesis for aspirin, acetaminophen, and ibuprofen, optimized palladium-catalyzed cross-couplings (Suzuki, Sonogashira reactions), executed experiments autonomously in Emerald Cloud Lab, and achieved fully traceable reproducible results through robotic integration.

**AgentRxiv collaborative framework** demonstrates cumulative knowledge benefits. Baseline MATH-500 accuracy of 70.2% improved to 78.2% with AgentRxiv access (best method: Simultaneous Divergence Averaging) representing 11.4% relative improvement for single lab and 13.7% for parallel labs. Without AgentRxiv, performance plateaued at 73.4-73.8%. Discovered methods generalized across GPQA, MMLU-Pro, and MedQA benchmarks with +3.3% average improvement, working across 5 LLMs (Gemini-1.5 pro, Gemini-2.0 Flash, deepseek-v3, gpt-4o, gpt-4o mini). Parallel execution achieved milestones faster than sequential (7 papers versus 23 papers to reach 76.2% accuracy) though with higher computational costs due to redundant experiments.

**Production deployments** validate scalability. Google's AlphaEvolve optimizes production infrastructure: Borg data center scheduling (recovers 0.7% of worldwide compute resources, in production over 1 year), TPU circuit design (eliminated unnecessary bits maintaining functional equivalence), AI training acceleration (23% speedup for tiling heuristics, 32% speedup for FlashAttention operations, 1% reduction in Gemini training time). AlphaFold generates 200+ million protein structure predictions (nearly all catalogued proteins) with 2+ million users in 190 countries, saving millions of dollars in research costs and hundreds of millions of years of research time. GNoME identified 2.2 million new crystal structures with 380,000 most stable materials, validated through 736 independent external experiments at 80% success rate (up from 50% previous state-of-the-art), and enabled A-Lab at Berkeley to synthesize 41 new materials autonomously.

## Current limitations and paths forward

**Technical limitations** constrain immediate capabilities. Hallucination of results occurs at <10% rate in The AI Scientist v1, with citation errors including incorrect paper attribution (wrong years), numerical result fabrication, and outdated citations (median 5 per paper). Visual issues plague generated plots: unreadable labels, page overflow, missing legends, misleading visualizations. AI-Researcher identifies domain knowledge deficiencies (overlooks advanced optimization methods, limited theoretical analysis, preference for conventional over state-of-the-art), reasoning depth limitations (mathematical formalism challenges, extended logical reasoning sequences, hallucination vulnerabilities in theory), and multi-turn coherence degradation (GPT-4o oversimplification in extended interactions, task fidelity degradation over turns, premature task completion).

Implementation failures reach 42% in some evaluations (Beel et al. on The AI Scientist), primarily from coding errors, tensor dimension mismatches, datatype incompatibilities, and NaN losses. AI-Researcher's 93.8% completeness with Claude-series versus 50% with GPT-4o-series reveals model-specific capabilities critically determine upper bounds on research quality. Memory management relies heavily on LLM context windows without external memory systems, causing information compression across stages and limited fine-grained retrieval. Token consumption reaches 15× baseline for multi-agent systems versus single chat, requiring high-value tasks to justify increased costs.

**Research quality challenges** manifest in multiple dimensions. Literature reviews produce poor novelty assessments with simplistic keyword searches and well-known concepts labeled as novel. The AI Scientist v2 achieves workshop-level quality but not main conference level, with papers resembling "rushed undergraduate work" containing some hallucinations and citation errors. Independent evaluation (Beel et al.) finds papers comparable to human research in 15.79%-78.95% of cases depending on evaluator strictness, with quality varying by evaluator preference more than domain difficulty. Level-2 tasks surprisingly outperform Level-1 tasks, suggesting prescriptive instructions constrain creativity while internal knowledge synthesis enables better performance.

Experimental design shows flawed methodologies in some cases: unfair baseline comparisons, incorrect idea implementations, dataset overlap issues (example: ~57% overlap between train/test limiting combinatorial space), and difficulty with complex domains requiring heavy computation (diffusion models show modest gains versus lighter domains like recommenders). Paper writing reveals missing figures/sections, placeholder text remaining, repeated content, structural errors, and inadequate verification of results against experimental data.

**Safety and ethical concerns** require ongoing attention. Code execution risks include spawning dangerous processes, potential malicious package use, uncontrolled web access, and self-modification behaviors (The AI Scientist observed extending timeout limits, launching self-execution recursively, modifying experimental parameters dynamically). Research ethics challenges involve potential flooding of review systems, lowering publication quality bars, academic misconduct enablement, and attribution/authorship questions. Google's AI Co-Scientist implements comprehensive safety: research goal safety review (automated), hypothesis safety review (continuous), meta-review monitoring, explainability and transparency, comprehensive logging, red teaming and adversarial testing with 1,200 adversarial research goals tested achieving 100% rejection rate for unsafe goals, and Trusted Tester Program for controlled access.

**Mitigation strategies** implemented across systems include mandatory sandboxing (Docker, gVisor), web access restrictions, timeout enforcement, human oversight recommendations, clear AI-generated labeling, external memory architectures (structured knowledge repositories, semantic indexing, hierarchical memory with attention-guided compression), domain-specialized fine-tuning, enhanced multi-turn optimization, improved KV-cache management, and holistic evaluation frameworks beyond implementation (idea quality dimensions measuring novelty/feasibility/impact, code elegance and efficiency metrics, reduced presentation bias in evaluation).

**Future directions** span technical enhancements and capability expansion. Advanced memory systems will implement structured knowledge repositories with semantic indexing, hierarchical memory balancing detail preservation with retrieval efficiency, and attention-guided compression maintaining critical information. Model improvements require domain-specialized fine-tuning, enhanced multi-turn optimization addressing task fidelity degradation, advanced KV-cache management for long-context efficiency, and long-horizon reasoning training for extended logical sequences.

Architectural improvements include enhanced verification preventing premature task completion, multi-turn agentic coding metrics tracking implementation fidelity, distributed computation for scalability, and resource-aware task allocation optimizing costs. Collaboration enhancements will enable real-time agent coordination, shared context management across distributed agents, and dependency-aware delegation for complex workflows.

Application domains expand toward wet lab integration (cloud labs for autonomous physical experiments), cross-domain applicability beyond current specializations, longer planning horizons for complex multi-stage research, better compositional reasoning for theoretical advances, and multimodal integration for visual error detection and richer experimental understanding. The trajectory points toward AI systems that complement and accelerate human scientific discovery, exploring solution spaces beyond cognitive limitations while maintaining rigorous validation and ethical oversight.

## Implementation blueprint for Claude Code wrapper

Building an autonomous research system as Claude Code wrapper requires strategic architectural decisions across six layers. **Foundation layer** selects Claude Opus 4 for lead orchestrator (highest reasoning capability, 72.5% SWE-bench) and Claude Sonnet 4 for subagents (15× token usage but better results than alternatives), implements Model Context Protocol for standardized tool integration enabling dynamic discovery, deploys Docker+gVisor for sandboxed execution (150-200ms startup, defense-in-depth security), uses LangGraph for workflow orchestration (checkpointing, time travel, graph-based conditional routing), and integrates Semantic Scholar API for literature management.

**Multi-agent architecture** instantiates LeadResearcher orchestrator spawning parallel research subagents (3-5 per task), implements specialized roles (Literature Review Agent with Semantic Scholar integration, Idea Generation Agent with novelty checking, Code Generation Agent using Claude's native code capabilities, Experiment Execution Agent managing sandboxed runs, Visualization Agent with matplotlib/LIDA integration, Documentation Agent for hierarchical paper synthesis, Review Agent with automated evaluation), coordinates through supervisor pattern (LeadResearcher delegates to workers, synthesizes results, manages checkpoints), and enables human-in-the-loop via LangGraph interruption points with state persistence.

**Workflow implementation** structures four pipeline stages. **Stage 1 Literature & Ideation** retrieves papers via Semantic Scholar, performs RAG-based analysis on LaTeX sources extracting atomic concepts, generates 5-10 candidate ideas with divergent thinking, checks novelty through iterative searches (10 iterations, 10 results each), and selects top idea via convergent evaluation. **Stage 2 Experiment Design** employs best-first tree search (21 nodes Stage 1 preliminary, 12 nodes each Stages 2-4), generates Python code via Claude Sonnet 4 (temperature 0.5, 8192 tokens), executes in Docker containers with 1-hour timeouts, spawns debug children on failures (max depth 3, probability 1.0), and aggregates results across successful runs.

**Stage 3 Execution & Analysis** automates result parsing (JSON summaries, .npy arrays, metric extraction), computes statistics (mean, std, significance tests), generates visualizations (300 DPI, publication standards), integrates VLM feedback on figure quality (GPT-4o vision, identifies issues), makes success decisions via multi-criteria (execution success, metric improvement, statistical validity, resource constraints, reproducibility), and iterates refinement through Advisor Agent feedback. **Stage 4 Paper Writing** implements three-phase hierarchical synthesis (structural outlining with templates, content elaboration maintaining consistency, verification through academic checklists), generates LaTeX section-by-section with automatic figure/citation integration, manages references via Semantic Scholar BibTeX generation, compiles PDF with error checking (chktex syntax validation), and runs automated review with ensemble scoring (5 reviews, 5 reflection rounds, temperature 0.1).

**State management patterns** implement LangGraph checkpointing to PostgreSQL (production) or SQLite (development), define state schemas capturing agent_states (current reasoning, task progress), experiment_results (runs, metrics, figures), paper_components (sections, citations, LaTeX), and review_feedback (scores, critiques). Reducer functions handle state updates (operator.add for lists, custom merges for experiments), enable pause/resume via thread_id and checkpoint_id, support time travel for debugging alternative paths, and implement durable execution resuming after failures without restart.

**Error handling strategy** uses exponential backoff retries (base_delay * 2^attempt, max 3 attempts), implements fallback chains (Opus → Sonnet → Haiku, external API → cached data, complex → simple heuristic), deploys circuit breakers (monitor failure rates, stop traffic to unhealthy endpoints, cool-down periods), enables LLM-based adaptation (inform agents of failures, let agents choose alternatives), and maintains comprehensive logging (LangSmith full tracing, error rates and latency monitoring, decision tracking for postmortem).

**Prompt engineering** teaches delegation with detailed subagent instructions (objective, expected format, tool usage, boundaries), scales effort appropriately (simple: 1 agent 3-10 calls, complex: 10+ agents divided responsibilities), implements "start wide then narrow" strategy (broad queries progressively refined), guides thinking (extended thinking for planning, interleaved for evaluation), enables self-improvement (LLM critiques prompts, iterative optimization achieving 40% time reduction), and uses domain-specific templates (LaTeX from conference styles, evaluation rubrics from peer review criteria, citation management from academic standards).

**Production considerations** require continuous evaluation (LLM-as-Judge with comprehensive rubric measuring accuracy/citations/completeness/source quality/efficiency on 0.0-1.0 scales, human evaluation catching edge cases and identifying biases), cost management (track token usage via LangSmith, optimize model selection per task complexity, implement prompt caching for repeated queries achieving 90% cost reduction, monitor spending with budget alerts), scalability patterns (horizontal scaling with centralized PostgreSQL state, load balancing across worker pools, queue-based distribution for experiment parallelization, async workflows for non-blocking I/O), and monitoring infrastructure (full LangSmith tracing for decision tracking, performance metrics per agent and pipeline stage, error rate monitoring with alerting, token consumption analysis for optimization).

The resulting system targets $2-25 per paper with 1-15 hour runtimes, achieves 80-94% implementation success rates, generates workshop-level quality papers with proper citations and figures, enables iterative refinement through checkpoint resume, provides transparency through comprehensive logging, and scales horizontally for throughput. Critical success factors include robust sandboxing (defense-in-depth prevents system compromise), hierarchical paper generation (overcomes LLM coherence limits), VLM-in-loop figure validation (catches visual quality issues early), multi-seed statistical validation (ensures reproducible findings), and human oversight options (approval gates for high-stakes decisions, error escalation patterns for edge cases).

This architecture mirrors production systems (The AI Scientist, AI-Researcher, Agent Laboratory) while leveraging Claude's strengths (superior code generation, extended thinking, tool use), modern frameworks (LangGraph orchestration, MCP integration), and established patterns (supervisor coordination, staged execution, hierarchical synthesis). The implementation balances automation depth with human collaboration options, security with capability, and cost efficiency with research quality—enabling Claude Code wrapper to perform autonomous research from literature review through peer-reviewed publication.