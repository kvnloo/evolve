# Active Research Index

LLM-consumable research content for Claude and other AI assistants.

---

## Quick Navigation

### Catalogs
- [Complete Catalog](complete-catalog.md) - Full research inventory
- [Research Catalog](research-catalog.md) - Topic-based categorization

### Standalone Research
- [Website Cloning Strategy](website-cloning-strategy-immersive-sites.md) - Immersive site cloning techniques

### Papers & References
- [Papers Directory](papers/) - Academic papers and references

---

## Topics

### AI Agents & Swarms
- [AI Agents Overview](topics/ai-agents/README.md)
- [Hive Mind Synthesis](topics/ai-agents/swarm-intelligence/hive-mind-synthesis.md)
- [Hive Mind Analysis](topics/ai-agents/swarm-intelligence/hive-mind-analysis.md)

### Architecture & System Design
- [Architecture Overview](topics/architecture/README.md)
- [Continuous Research Architecture](topics/architecture/system-design/continuous-research-architecture.md)

### Benchmarks & Evaluation
- [Benchmarks Overview](topics/benchmarks/README.md)
- [SWE-Bench Prompts](topics/benchmarks/evaluation/swe-bench-prompts.md)

### Claude Code Integration
- [Claude Code Overview](topics/claude-code/README.md)
- **Best Practices**
  - [Automation Guide v2](topics/claude-code/best-practices/automation-guide-v2.md)
  - [Claude Configuration](topics/claude-code/best-practices/claude-configuration.md)
- **MCP Integration**
  - [Capability Improvements](topics/claude-code/mcp-integration/capability-improvements.md)
- **Workflows**
  - [Architectural Automation](topics/claude-code/workflows/architectural-automation.md)
  - [Overnight Deep Research](topics/claude-code/workflows/overnight-deep-research.md)

### LLM Systems
- [LLM Systems Overview](topics/llm-systems/README.md)
- **Fine-Tuning**
  - [Control Net LLM](topics/llm-systems/fine-tuning/control-net-llm.md)

---

## Research Lifecycle

```
active_research/ → docs/research-synthesis/ → claudedocs/archive/
   (raw)                 (polished)               (historical)
```

**When to move research**:
1. Research is complete and validated
2. Findings are synthesized into actionable insights
3. Documentation is ready for human consumption

Move polished content to `docs/research-synthesis/` for human readers.

---

## Directory Structure

```
active_research/
├── INDEX.md              # This file
├── complete-catalog.md   # Full inventory
├── research-catalog.md   # Topic categorization
├── website-cloning-strategy-immersive-sites.md
├── papers/               # Academic references
└── topics/
    ├── ai-agents/        # Swarm intelligence, hive mind
    ├── architecture/     # System design patterns
    ├── benchmarks/       # Evaluation methods
    ├── claude-code/      # Claude integration research
    ├── domain-specific/  # Domain-specific applications
    └── llm-systems/      # Fine-tuning, training
```
