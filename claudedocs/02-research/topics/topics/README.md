# Research Topics - Organized Knowledge Base

**Purpose**: Categorical organization of research by subject area
**Updated**: 2025-11-02
**Total Topics**: 7 major categories

---

## 📚 Overview

This directory contains research organized by subject area. Each topic has subdirectories for more specific subjects, creating a hierarchical knowledge structure.

**Organization Principle**: Research is categorized by *what it's about* (topics), not *when it was done* (that's in `research/projects/` and `research/findings/`).

---

## 🗂️ Topic Categories

### 1. ai-agents/
**Focus**: Autonomous AI agents, multi-agent systems, swarm intelligence

**Subdirectories:**
- `autonomous-systems/` - Autonomous learning, skill libraries, self-improvement
- `swarm-intelligence/` - Multi-agent coordination, consensus, hive minds

**Key Research:**
- Voyager skill library architecture
- Autonomous research systems (Sakana AI)
- Self-development frameworks
- Hive mind synthesis and analysis

**Related Papers**: `research/papers/autonomous-agents/`

---

### 2. architecture/
**Focus**: System design patterns, architectural approaches, distributed systems

**Subdirectories:**
- `system-design/` - Continuous research architecture, production patterns

**Key Research:**
- Continuous research architecture design
- System design patterns
- Distributed systems approaches

**Planned Additions:**
- `patterns/` - Architectural patterns and best practices
- `distributed-systems/` - Distributed computing, consensus

---

### 3. benchmarks/
**Focus**: Evaluation frameworks, performance benchmarks, quality metrics

**Subdirectories:**
- `evaluation/` - SWE-bench prompts, evaluation methods

**Key Research:**
- SWE-bench evaluation strategies
- Code generation benchmarks
- Quality assessment frameworks

**Planned Additions:**
- Benchmark datasets
- Evaluation methodologies
- Performance testing frameworks

---

### 4. claude-code/
**Focus**: Claude Code optimization, frameworks, workflows, best practices

**Subdirectories:**
- `best-practices/` - Automation guides, configuration, optimization (3 docs)
- `mcp-integration/` - MCP capability improvements, integrations
- `workflows/` - Architectural automation, overnight research (2 docs)

**Key Research:**
- Claude Code automation guides (v1 & v2)
- SuperClaude framework integration
- BMAD method and CCPM workflows
- MCP ecosystem and Voyager integration
- Architectural automation workflows
- Overnight deep research patterns

**Planned Additions:**
- `optimization/` - Token efficiency, performance tuning
- `frameworks/` - SuperClaude, BMAD, CCPM deep dives

**Related Implementation**: Many features in `research/_implementation/planned/`

---

### 5. digital-twins/
**Focus**: Digital twin development, design patterns, use cases

**Subdirectories:**
- `design-patterns/` - Digital twin design approaches
- `implementation/` - Autonomous Claude Code digital twin, mesh generation (4 docs)
- `use-cases/` - CEA digital twin, specific applications

**Key Research:**
- Digital twin design (Unity vs Unreal)
- Autonomous digital twin management
- Claude Code digital twin implementation
- Mesh generation strategies
- OS research and management
- CEA (Controlled Environment Agriculture) applications

**Related Topics**: Overlaps with `domain-specific/agriculture/`

---

### 6. domain-specific/
**Focus**: Domain-specific applications and use cases

**Subdirectories:**
- `agriculture/` - Farm automation, CEA systems, digital twins (3 docs)

**Key Research:**
- 5-acre farm automation
- Onsite compute for autonomous farms
- CEA digital twin maximization
- Convergence of LLMs, digital twins, and project management

**Planned Additions:**
- Healthcare applications
- Manufacturing use cases
- Financial services
- Education and training

---

### 7. llm-systems/
**Focus**: LLM development, optimization, deployment, fine-tuning

**Subdirectories:**
- `fine-tuning/` - ControlNet for LLMs, model adaptation

**Key Research:**
- ControlNet analogues for UI/code/3D
- Fine-tuning approaches
- Model adaptation techniques

**Planned Additions:**
- `prompt-engineering/` - Prompt optimization, DSPy, techniques
- `evaluation/` - LLM evaluation, benchmarks
- `production-deployment/` - Scaling, serving, monitoring

---

## 🆕 Planned New Categories

### development-automation/
**Status**: To be created
**Focus**: SPARC methodology, TDD, CI/CD, development workflows

**Planned Subdirectories:**
- `sparc-methodology/` - SPARC framework research
- `test-driven-development/` - TDD patterns, best practices
- `ci-cd-patterns/` - Deployment automation, pipelines

**Rationale**: Currently scattered across claude-code/ and architecture/, deserves own category

---

## 📁 Topic Structure Guidelines

### Directory Naming
- Use lowercase with hyphens: `ai-agents/`, `llm-systems/`
- Be specific but not too narrow
- Avoid acronyms unless widely known

### Subdirectory Organization
- 2-3 levels maximum depth
- Group related content together
- Create new subdirectory when 5+ files on same subtopic

### File Naming
- Descriptive, kebab-case: `skill-library-architectures.md`
- Avoid dates (that's for findings/ and projects/)
- Include version if iterating: `automation-guide-v1.md`, `automation-guide-v2.md`

---

## 🔄 When to Add Content

### To topics/
**Add here when:**
- ✅ Research is about a specific subject area
- ✅ Content is relatively timeless (not date-specific)
- ✅ Multiple related documents on same topic
- ✅ Building knowledge base in this area

**Examples:**
- Research on autonomous agents → `ai-agents/autonomous-systems/`
- Claude Code best practices → `claude-code/best-practices/`
- Agricultural automation → `domain-specific/agriculture/`

### To projects/ instead
**Use projects/ when:**
- ❌ Time-boxed research initiative
- ❌ Systematic investigation with phases
- ❌ Start and end dates matter
- ❌ Organized by methodology not topic

**Examples:**
- 2025-10 deep research project (4 phases)
- 3-month literature review
- Quarterly research initiative

### To findings/ instead
**Use findings/ when:**
- ❌ Discovery or insight from specific date
- ❌ Quick analysis or investigation
- ❌ Snapshot of understanding at point in time
- ❌ Time-series pattern tracking

**Examples:**
- 2025-10-19 architecture analysis
- Weekly research synthesis
- Monthly status report

---

## 🔍 Finding Research

### By Topic
```bash
# Browse by category
ls research/topics/ai-agents/
ls research/topics/claude-code/

# Search within topic
grep -r "skill library" research/topics/ai-agents/
```

### By Keyword
```bash
# Search all topics
grep -r "prompt optimization" research/topics/

# Search specific category
grep -r "automation" research/topics/claude-code/
```

### Using Catalog
```bash
# View master catalog
less research/_meta/index/research-catalog.md

# Search catalog
grep "digital twin" research/_meta/index/research-catalog.md
```

---

## 📊 Topic Statistics

**Current Organization:**
- **7 major topics** with subdirectories
- **18 total subdirectories** (2-3 levels deep)
- **~50 research documents** organized by topic
- **20+ research documents** cataloged

**Coverage:**
- AI/Agents: Excellent coverage
- Claude Code: Excellent coverage
- Digital Twins: Good coverage
- Agriculture: Good coverage
- LLM Systems: Needs expansion
- Benchmarks: Minimal coverage
- Architecture: Needs expansion

---

## 🎯 Topic Expansion Priorities

### High Priority (Next Month)
1. **Create `development-automation/`** category
2. **Expand `llm-systems/`** with prompt-engineering, evaluation
3. **Add patterns** to `architecture/`
4. **Expand `claude-code/`** with optimization and frameworks subdirs

### Medium Priority (This Quarter)
1. Add more `domain-specific/` categories
2. Expand `benchmarks/` with datasets and methods
3. Create security and safety topic
4. Add performance optimization topic

### Low Priority (Future)
1. Cross-topic synthesis documents
2. Historical evolution tracking
3. Comparative analysis docs

---

## 🤖 Automation (Coming Soon)

### Topic Suggestion
**Auto-suggest topics for new research:**
```bash
# Analyze content and suggest category
./research/topics/suggest-topic.sh research/intake/unorganized/new-file.md

# Output: "Suggested topic: ai-agents/autonomous-systems"
```

### Topic Health Check
**Monitor topic organization:**
```bash
# Check for missing READMEs
# Identify overcrowded directories
# Suggest reorganization
./research/topics/health-check.sh
```

---

## 📚 Related Documentation

**Research System:**
- `research/README.md` - Research system overview
- `research/intake/README.md` - How to add new research
- `research/projects/README.md` - Time-boxed projects

**Organization:**
- `research/_meta/workflows/topic-organization.md` - Categorization guide
- `research/_meta/index/research-catalog.md` - Master catalog

**Overall Plan:**
- `docs/RESEARCH-DOCS-REORGANIZATION-PLAN.md` - Complete reorganization plan

---

## 💡 Tips

**When organizing research:**
- Start broad (major topic), then narrow (subtopic)
- If unsure, put in broader category and refine later
- Create new subdirectory when 5+ files on same subtopic
- Cross-reference related research in different topics

**When creating new topics:**
- Check if fits existing category first
- Ensure sufficient research to justify new topic
- Add README.md immediately
- Update this document

**For cross-topic research:**
- Primary location in most relevant topic
- Reference from other topics in READMEs
- Consider synthesis document in `research/synthesis/`

---

**Last Updated**: 2025-11-02
**Maintainer**: Research Team
**Next Review**: Monthly
