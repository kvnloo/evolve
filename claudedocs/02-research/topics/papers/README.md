# Research Papers Catalog

**Purpose**: Organized collection of academic papers and technical publications
**Updated**: 2025-11-02
**Total Papers**: 3

---

## 📚 Overview

This directory contains academic papers, research publications, and technical reports that inform our research and implementation work.

**Organization:**
- Papers organized by category/domain
- Each category has summary index
- Cross-referenced with topic research in `research/topics/`

---

## 📁 Categories

### autonomous-agents/
**Focus**: Autonomous AI agents, skill learning, reinforcement learning

**Papers (3):**

#### 1. Voyager: An Open-Ended Embodied Agent with Large Language Models
- **File**: `autonomous-agents/voyager.pdf`
- **Size**: 18.8 MB
- **Authors**: Wang et al.
- **Key Contributions**:
  - Skill library architecture with 96.5% retrieval accuracy
  - Automatic curriculum learning
  - Compositional reasoning through skill composition
  - 3.3× more discoveries, 15.3× faster progression
- **Relevance**: Foundation for skill library implementation
- **Related Research**:
  - `research/topics/ai-agents/autonomous-systems/skill-library-architectures.md`
  - `research/_implementation/planned/voyager-skill-library.md` (planned)
- **Implementation Status**: Planned

#### 2. Eureka: Human-Level Reward Design via Coding Large Language Models
- **File**: `autonomous-agents/eureka.pdf`
- **Size**: 3.9 MB
- **Authors**: Ma et al. (NVIDIA)
- **Key Contributions**:
  - Automated reward function generation for RL
  - GPU-accelerated simulation integration
  - Human-level reward design without human input
  - Integration with Isaac Gym/Sim
- **Relevance**: Automated evaluation and reward systems
- **Related Research**:
  - `research/topics/llm-systems/evaluation/automated-reward-design.md` (to be created)
  - `research/topics/digital-twins/implementation/autonomous-claude-code-digital-twin.md`
- **Implementation Status**: Research phase

#### 3. AlphaEvolve: Optimizing Production Infrastructure
- **File**: `autonomous-agents/AlphaEvolve.pdf`
- **Size**: 3.3 MB
- **Authors**: Google DeepMind
- **Key Contributions**:
  - Evolutionary algorithms for production optimization
  - Real-world deployments (Borg, TPU circuits)
  - AI training acceleration
  - Production infrastructure optimization
- **Relevance**: Self-improvement and optimization systems
- **Related Research**:
  - `research/topics/ai-agents/autonomous-systems/self-development-framework.md`
  - `research/synthesis/patterns/optimization-patterns.md` (to be created)
- **Implementation Status**: Research phase

---

## 📊 Paper Statistics

### By Domain
- **Autonomous Agents**: 3 papers
- **LLM Optimization**: 0 papers (to be added)
- **Robotics**: 0 papers (to be added)
- **Digital Twins**: 0 papers (to be added)

### By Status
- **Implementation Planned**: 1 (Voyager)
- **Active Research**: 2 (Eureka, AlphaEvolve)
- **Archived**: 0

### Impact Metrics
- **High Impact** (directly informing implementation): 1
- **Medium Impact** (informing design decisions): 2
- **Reference** (background knowledge): 0

---

## 🔄 Paper Processing Workflow

### 1. Adding New Papers

**From intake:**
```bash
# Papers arrive in intake/papers/
research/intake/papers/YYYY-MM-{title}.pdf
```

**Process:**
1. Review paper and identify category
2. Move to appropriate category folder
3. Create summary in this README
4. Extract key insights to topic research
5. Update research catalog

**Example:**
```bash
# Move from intake
mv research/intake/papers/2025-11-anthropic-constitutional-ai.pdf \
   research/papers/llm-systems/

# Create summary document
touch research/topics/ai-agents/safety/constitutional-ai-summary.md

# Update this catalog
# Update research/_meta/index/research-catalog.md
```

### 2. Creating Paper Summaries

**Location**: `research/topics/{category}/{paper-summary}.md`

**Template:**
```markdown
# {Paper Title} - Summary

**Paper**: research/papers/{category}/{filename}.pdf
**Authors**: {Authors}
**Publication**: {Conference/Journal}, {Year}

## Key Contributions
1. Contribution 1
2. Contribution 2

## Methodology
{Brief methodology description}

## Results
{Key results and metrics}

## Implementation Potential
{What could we implement from this?}

## Related Research
- {Links to related research}
```

### 3. Linking to Implementation

**When paper suggests implementable features:**
1. Create implementation spec in `research/_implementation/planned/`
2. Link paper in spec's "Research Source" section
3. Reference paper in related topic research
4. Track in implementation pipeline

---

## 🎯 Active Research Themes

### Theme 1: Autonomous Learning Systems
**Papers:**
- Voyager (skill libraries, curriculum learning)
- AlphaEvolve (self-optimization)

**Implementation Focus:**
- Skill library architecture
- Automatic curriculum generation
- Self-improvement mechanisms

**Status**: Voyager skill library planned for implementation

### Theme 2: Automated Evaluation & Rewards
**Papers:**
- Eureka (reward design via LLMs)

**Implementation Focus:**
- Automated quality evaluation
- Self-verification systems
- Metric-driven improvement

**Status**: Research and design phase

### Theme 3: Production Optimization
**Papers:**
- AlphaEvolve (infrastructure optimization)

**Implementation Focus:**
- Performance optimization
- Resource allocation
- System efficiency

**Status**: Background research

---

## 📝 Paper Request List

### High Priority Papers to Add

**LLM Optimization:**
- DSPy papers (prompt optimization)
- Constitutional AI papers (safety)
- Prompt caching technical reports

**Multi-Agent Systems:**
- LangGraph architecture papers
- Multi-agent coordination papers
- Swarm intelligence papers

**Evaluation & Benchmarks:**
- SWE-bench papers
- Code generation benchmarks
- Quality metrics papers

**3D Generation:**
- LLaMA-Mesh paper
- InstantMesh paper
- TripoSR technical report

---

## 🔍 Finding Papers

### Recommended Sources

**Academic:**
- arXiv.org (AI/ML preprints)
- ACL Anthology (NLP papers)
- ICLR, NeurIPS, ICML proceedings
- Papers with Code

**Industry:**
- Anthropic research blog
- OpenAI research
- Google DeepMind publications
- NVIDIA research

**Aggregators:**
- Papers with Code
- Hugging Face papers
- AI research newsletters

---

## 📖 Citation Format

**For research documents, use:**
```markdown
**Source**: [Paper Title](../papers/{category}/{filename}.pdf)
**Citation**: {Authors}, "{Title}", {Conference/Journal} {Year}
```

**For implementation specs:**
```markdown
## Research Sources
### Academic Papers
- [{Paper Title}](../papers/{category}/{filename}.pdf)
  - {Key contribution relevant to implementation}
```

---

## 🤖 Automation (Coming Soon)

### Paper Processing Script

**`process-paper.sh`** will:
1. Extract metadata from PDF
2. Suggest category based on content
3. Generate summary template
4. Create links in topic research
5. Update this catalog
6. Check for duplicate papers

**Usage:**
```bash
# Process new paper
./research/papers/process-paper.sh intake/papers/new-paper.pdf

# Suggest category
./research/papers/process-paper.sh --suggest new-paper.pdf

# Generate summary
./research/papers/process-paper.sh --summarize new-paper.pdf
```

### Citation Management

**Features:**
- Auto-generate citations
- Track paper usage across research
- Find related papers
- Export bibliography

---

## 📊 Reading Priority

### Must Read (Implementation Planned)
1. **Voyager** - Skill library implementation
   - Priority: CRITICAL
   - Read by: All engineers working on autonomous features

### Should Read (Active Research)
2. **Eureka** - Evaluation systems
   - Priority: HIGH
   - Read by: Engineers working on quality/evaluation

3. **AlphaEvolve** - Optimization
   - Priority: MEDIUM
   - Read by: Performance/infrastructure team

### Nice to Read (Background)
- Papers informing general understanding
- Reference for future features
- Historical context

---

## 🎓 Paper Review Process

### Monthly Paper Review

**First Friday of each month:**
1. Review new papers added
2. Discuss key findings
3. Identify implementation opportunities
4. Update research priorities
5. Assign reading for next month

**Meeting Format:**
- 15 min: Quick summaries of new papers
- 20 min: Deep dive on 1-2 key papers
- 15 min: Implementation discussion
- 10 min: Assign reading and next steps

---

## 📚 Related Documentation

**Research System:**
- `research/README.md` - Research overview
- `research/intake/README.md` - How to add papers
- `research/topics/README.md` - Topic organization

**Implementation:**
- `research/_implementation/README.md` - Implementation tracking
- `research/_meta/workflows/implementation-transition.md`

**Catalog:**
- `research/_meta/index/research-catalog.md` - Master catalog

---

## 💡 Tips

**For Researchers:**
- Create summary documents for all papers
- Link papers to related research
- Identify implementation potential early
- Tag papers with relevant keywords

**For Implementers:**
- Reference papers in implementation specs
- Extract actionable insights
- Note when implementation diverges from paper
- Measure against paper's reported metrics

**For Everyone:**
- Add papers you find valuable
- Don't duplicate existing papers
- Update this README when adding papers
- Share interesting finds with team

---

**Last Updated**: 2025-11-02
**Maintainer**: Research Team
**Next Review**: 2025-12-01
