# Research Intake System

**Purpose**: Streamlined process for adding new research to the knowledge base
**Updated**: 2025-11-02

---

## 🎯 Quick Start

**Adding new research is simple:**
1. Save file to `unorganized/` subdirectory
2. Use naming convention: `YYYY-MM-DD-{topic}-{source}.md`
3. Process weekly (or when 10+ files accumulate)

---

## 📁 Intake Folders

### unorganized/
**Purpose**: Primary drop zone for new research

**What goes here:**
- Web articles and blog posts saved as markdown
- Quick research notes and findings
- Analysis documents from deep research
- Any research that needs categorization

**Naming Convention:**
```
YYYY-MM-DD-{topic}-{source}.md

Examples:
- 2025-11-02-autonomous-agents-arxiv.md
- 2025-11-02-claude-optimization-anthropic-blog.md
- 2025-11-02-llm-benchmarks-deep-research.md
```

**Processing:**
- Review weekly
- Categorize and move to `research/topics/{category}/`
- Update research catalog if significant

### papers/
**Purpose**: Academic papers awaiting review and categorization

**What goes here:**
- PDF research papers
- Academic publications
- Technical reports
- Whitepapers

**Naming Convention:**
```
YYYY-MM-{author}-{title}.pdf
OR
{descriptive-name}.pdf

Examples:
- 2025-11-anthropic-constitutional-ai.pdf
- voyager-autonomous-agent.pdf
```

**Processing:**
- Review and extract key insights
- Move to `research/papers/{category}/`
- Create summary document in `research/topics/`

### web-research/
**Purpose**: Bulk web research dumps and multi-source compilations

**What goes here:**
- Deep research session outputs
- Multi-article compilations
- Web scraping results
- Research synthesis from multiple sources

**Naming Convention:**
```
YYYY-MM-DD-{topic}-{session-type}.md

Examples:
- 2025-11-02-prompt-optimization-deep-research.md
- 2025-11-02-autonomous-systems-literature-review.md
```

**Processing:**
- Extract key insights
- Break into topic-specific documents
- Move to appropriate `research/topics/` or `research/projects/`

---

## 🔄 Processing Workflow

### Weekly Review Process

**Step 1: Review Unorganized**
```bash
ls research/intake/unorganized/
```

**Step 2: Categorize**
For each file, determine:
- Primary topic (ai-agents, claude-code, architecture, etc.)
- Is it part of an active project?
- Does it warrant implementation?

**Step 3: Move to Appropriate Location**

**Option A: Topic Organization**
```bash
# Move to topic folder
mv research/intake/unorganized/2025-11-02-autonomous-agents-arxiv.md \
   research/topics/ai-agents/autonomous-systems/
```

**Option B: Add to Active Project**
```bash
# Add to ongoing research project
mv research/intake/unorganized/2025-11-02-curriculum-learning-deep-research.md \
   research/projects/2025-10-deep-research/phase1-autonomous-learning/
```

**Option C: Warrants Implementation**
```bash
# Create implementation spec
# 1. Extract key insights
# 2. Create spec in research/_implementation/planned/
# 3. Reference original research
```

**Step 4: Update Catalog**
If research is significant:
- Update `research/_meta/index/research-catalog.md`
- Add cross-references in related topic READMEs

---

## 📝 Templates

### Research Note Template
```markdown
# {Title}

**Date**: YYYY-MM-DD
**Source**: {URL or citation}
**Category**: {Primary category}
**Tags**: {tag1, tag2, tag3}

---

## Summary
{1-2 paragraph summary}

## Key Findings
- Finding 1
- Finding 2
- Finding 3

## Insights
{Your analysis and insights}

## Implementation Potential
{Could this lead to new features? If yes, describe}

## References
- [Source 1](url)
- [Source 2](url)

## Related Research
- {Link to related internal research}
```

### Paper Summary Template
```markdown
# {Paper Title}

**Authors**: {Authors}
**Publication**: {Conference/Journal}, {Year}
**Source**: {URL or DOI}
**Filed**: research/papers/{category}/

---

## Abstract
{Copy or summarize abstract}

## Key Contributions
1. Contribution 1
2. Contribution 2
3. Contribution 3

## Methodology
{Brief description of approach}

## Results
{Key findings and performance metrics}

## Relevance to Our Work
{How does this relate to our research/implementation?}

## Implementation Notes
{Technical details useful for implementation}

## References
{Key citations from paper}
```

---

## 🤖 Automation (Coming Soon)

### Automated Processing Script

**`process-intake.sh`** will:
1. Scan `unorganized/` folder
2. Analyze content to suggest categories
3. Check for duplicates
4. Prompt for categorization
5. Move to appropriate location
6. Update catalog automatically

**Usage:**
```bash
./research/intake/process-intake.sh

# Or process specific file
./research/intake/process-intake.sh unorganized/2025-11-02-topic.md
```

### AI-Assisted Categorization (Future)

Claude Code integration will:
- Auto-detect topic from content
- Suggest related research
- Extract key insights
- Generate implementation specs
- Update knowledge graph

---

## 📊 Statistics

**Current Intake Status:**
- Unorganized: {count} files
- Papers awaiting review: {count} files
- Web research: {count} files

**Last Processed**: {date}
**Next Review**: {date}

---

## 🎯 Best Practices

### When Adding Research

**DO:**
✅ Use consistent naming conventions
✅ Include source attribution
✅ Add date prefix for chronological sorting
✅ Write brief summary if needed
✅ Tag with relevant keywords

**DON'T:**
❌ Categorize immediately if unsure (leave in unorganized)
❌ Duplicate content across multiple locations
❌ Skip source attribution
❌ Use generic filenames like "research.md"

### When Processing

**DO:**
✅ Review weekly or when 10+ files accumulate
✅ Look for patterns and themes across files
✅ Update catalog for significant additions
✅ Create implementation specs for actionable research
✅ Add cross-references in topic READMEs

**DON'T:**
❌ Force categorization if unclear
❌ Delete research (archive instead)
❌ Process in isolation (consider relationships)
❌ Skip updating catalog for major research

---

## 📚 Related Documentation

**Research Organization:**
- `research/topics/README.md` - Topic organization guide
- `research/projects/README.md` - Active projects
- `research/_meta/workflows/topic-organization.md` - Categorization guide

**Implementation:**
- `research/_implementation/README.md` - Implementation tracking
- `research/_meta/workflows/implementation-transition.md` - Research → Code workflow

**Overall System:**
- `docs/RESEARCH-DOCS-REORGANIZATION-PLAN.md` - Full reorganization plan
- `docs/REORGANIZATION-QUICK-START.md` - Quick start guide

---

## 💡 Tips

**For Daily Use:**
- Keep intake tab open in file browser
- Drag research files directly to `unorganized/`
- Set calendar reminder for weekly processing

**For Batch Processing:**
- Block 30-60 minutes for weekly review
- Use split-screen with catalog open
- Process in chronological order (oldest first)

**For Quality:**
- Each file should have clear purpose
- If unsure about category, leave in unorganized
- Better to have fewer well-organized files than many poorly organized

---

**Need help?** See `docs/guides/research-workflow.md` (coming soon)

**Questions?** Check `docs/RESEARCH-DOCS-REORGANIZATION-PLAN.md` for details
