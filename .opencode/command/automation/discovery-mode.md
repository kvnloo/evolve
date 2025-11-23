---
description: Execute autonomous scientific discovery using parallel multi-agent coordination
agent: automation-agent
tags: [automation, research, discovery, parallel-agents, scientific]
---

# Discovery Mode: Autonomous Scientific Research

Execute autonomous scientific discovery using parallel multi-agent coordination inspired by Sakana AI's "The AI Scientist" system.

## Usage

```
/automation:discovery-mode "research question"
```

## How It Works

When invoked, this command will spawn 15 specialized research agents in parallel using Claude Code's Task tool to:
1. Conduct literature review
2. Generate hypotheses
3. Design and execute experiments
4. Analyze results
5. Write a complete research paper

## Execution Instructions

Upon receiving a research prompt, **immediately spawn all 15 agents in parallel in ONE message**:

```javascript
// Literature Review (3 agents)
Task("researcher", "Search for 15-20 recent papers on [topic]. Extract titles, authors, methods, results. Output JSON to docs/discovery/literature.json")
Task("researcher", "Identify research gaps from literature. Rate by novelty/feasibility/impact. Output to docs/discovery/gaps.json")
Task("researcher", "Analyze trends: emerging methods, future directions. Output to docs/discovery/trends.json")

// Hypothesis Generation (2 agents)
Task("researcher", "Generate 5-10 novel hypotheses from research gaps. Include methodology and predictions. Output to docs/discovery/hypotheses.json")
Task("reviewer", "Evaluate hypotheses: score novelty/feasibility/impact (1-10). Rank and select top 3. Output to docs/discovery/hypothesis_eval.json")

// Experiment Design (3 agents)
Task("system-architect", "Design experiment for top hypothesis: methodology, variables, procedures. Output to docs/discovery/experiment_design.md")
Task("coder", "Implement experiment in Python (numpy/pandas/scipy). Save to src/discovery/experiments/experiment.py")
Task("coder", "Create analysis script with statistical tests and visualizations. Save to src/discovery/analysis/analyze.py")

// Execution & Analysis (2 agents)
Task("coder", "Execute experiment safely using Bash tool. Collect results. Save to docs/discovery/results/data.json")
Task("data_analyst", "Perform statistical analysis: hypothesis tests, effect sizes, confidence intervals, plots. Save to docs/discovery/results/analysis.json")

// Paper Writing (3 agents)
Task("technical-writer", "Write paper Abstract and Introduction with academic citations. Save to docs/discovery/paper/01_intro.md")
Task("technical-writer", "Write Methods and Results sections with experimental details. Save to docs/discovery/paper/02_methods_results.md")
Task("technical-writer", "Write Discussion and Conclusion with interpretations and future work. Save to docs/discovery/paper/03_discussion.md")

// Review & Validation (2 agents)
Task("reviewer", "Peer review: assess methodology, statistics, novelty. Rate and provide feedback. Save to docs/discovery/paper/review.md")
Task("reviewer", "Validate quality: completeness, reproducibility, citations. Save to docs/discovery/paper/validation.md")
```

## After Agent Completion

1. Wait for all 15 agents to finish
2. Read all generated files from docs/discovery/
3. Combine paper sections into docs/discovery/paper/complete_paper.md
4. Generate LaTeX version at docs/discovery/paper/paper.tex
5. Present summary to user:

```
✅ **Discovery Mode Complete!**

📊 **Research Summary**:
- **Topic**: [research question]
- **Key Finding**: [main result]
- **Significance**: [p-value, effect size]
- **Paper**: docs/discovery/paper/complete_paper.md

📁 **Outputs**:
- Literature: 18 papers analyzed
- Hypotheses: 5 generated, top 1 tested
- Experiments: Code + results in src/discovery/
- Paper: 8-page manuscript ready
- Review: 7/10 (Accept with revisions)
```

## File Organization

```
docs/discovery/
├── literature.json          (papers)
├── gaps.json               (research gaps)
├── trends.json             (analysis)
├── hypotheses.json         (generated)
├── hypothesis_eval.json    (scored)
├── experiment_design.md    (methodology)
├── results/
│   ├── data.json          (experimental data)
│   └── analysis.json      (statistics)
└── paper/
    ├── 01_intro.md
    ├── 02_methods_results.md
    ├── 03_discussion.md
    ├── complete_paper.md   (combined)
    ├── paper.tex           (LaTeX)
    ├── review.md           (peer feedback)
    └── validation.md       (quality check)

src/discovery/
├── experiments/experiment.py
└── analysis/analyze.py
```

## Critical Rules

1. **ALWAYS spawn all 15 agents in ONE message** - Parallel execution required
2. **Use Claude Code Task tool** - No external scripts
3. **Clear instructions** - Each agent gets complete context
4. **Wait for completion** - Don't synthesize until all agents finish
5. **Combine outputs** - Create final paper from all sections

This command executes **entirely within Claude Code** using the Task tool for parallel agent execution.
