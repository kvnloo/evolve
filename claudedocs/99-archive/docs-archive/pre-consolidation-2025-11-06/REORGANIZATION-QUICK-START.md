# Research & Docs Reorganization - Quick Start Guide

**Created**: 2025-11-02
**Purpose**: Quick reference for implementing the new organization system
**Full Plan**: See `docs/RESEARCH-DOCS-REORGANIZATION-PLAN.md`

---

## 🎯 The Problem We're Solving

**Current Issues:**
- Research has no clear intake process (where do new files go?)
- 60+ files in `docs/` root directory - hard to navigate
- PDFs scattered at root of `research/`
- Unclear which docs are "official" vs work-in-progress
- No clear path from research → implementation → documentation

---

## 💡 The Solution

### Two-Folder System with Clear Purposes

**research/** = Internal knowledge base (research, analysis, exploration)
- Active research and investigation
- Academic papers and sources
- Implementation planning
- Research synthesis

**docs/** = Official user-facing documentation
- Getting started guides
- How-to guides
- Reference documentation
- Feature documentation

### Key Innovation: Research Lifecycle

```
New Research
    ↓
research/intake/unorganized/ ← Drop new files here
    ↓
Process & Categorize
    ↓
research/topics/{category}/ ← Organized research
    ↓
Implementation Planned
    ↓
research/_implementation/planned/ ← Implementation specs
    ↓
Feature Built
    ↓
research/_implementation/completed/
    ↓
Documentation Written
    ↓
docs/{category}/ ← Official documentation
```

---

## 🚀 Quick Implementation (30 Minutes)

### Step 1: Create Core Intake System (5 min)

```bash
# Create intake directories
mkdir -p research/intake/{unorganized,papers,web-research}

# Create implementation tracking
mkdir -p research/_implementation/{planned,in-progress,completed}

# Create papers organization
mkdir -p research/papers/autonomous-agents
```

### Step 2: Move PDFs to Proper Location (2 min)

```bash
# Move PDFs from root to organized location
mv research/voyager.pdf research/papers/autonomous-agents/
mv research/eureka.pdf research/papers/autonomous-agents/
mv research/AlphaEvolve.pdf research/papers/autonomous-agents/
```

### Step 3: Create Essential READMEs (10 min)

Create these key README files:
- `research/intake/README.md` - Explains intake process
- `research/_implementation/README.md` - Explains implementation tracking
- `research/papers/README.md` - Paper catalog

### Step 4: Set Up Docs Structure (10 min)

```bash
# Create main doc categories
mkdir -p docs/{getting-started,guides,reference,implementation,features,quick-reference}
```

### Step 5: Quick Test (3 min)

```bash
# Verify structure
ls -la research/intake/
ls -la research/papers/autonomous-agents/
ls -la docs/
```

**Done! You now have the foundation in place.**

---

## 📁 New Structure at a Glance

### research/ Structure

```
research/
├── intake/                    ← NEW: Drop zone for new research
│   ├── unorganized/           ← Put new files here!
│   ├── papers/                ← Papers awaiting review
│   └── web-research/          ← Web research dumps
├── topics/                    ← Organized by subject
├── projects/                  ← Time-boxed research projects
├── papers/                    ← NEW: Academic papers organized
│   └── autonomous-agents/     ← PDFs moved here
├── findings/                  ← Time-based discoveries
├── synthesis/                 ← Cross-research insights
├── _implementation/           ← NEW: Track research → code
│   ├── planned/               ← Features planned
│   ├── in-progress/           ← Currently building
│   └── completed/             ← Ready for docs
└── _meta/                     ← Meta-documentation
```

### docs/ Structure

```
docs/
├── getting-started/           ← NEW: Onboarding hub
├── guides/                    ← NEW: How-to guides
├── reference/                 ← NEW: API/command reference
├── implementation/            ← NEW: Implementation docs
├── features/                  ← NEW: Per-feature deep dives
├── quick-reference/           ← NEW: Cheat sheets
├── migration/                 ← Migration documentation
├── analysis/                  ← Internal analysis
└── archive/                   ← NEW: Deprecated docs
```

---

## 🎬 Using the System

### Scenario 1: "I just found some research I want to save"

**Action:**
1. Save file to `research/intake/unorganized/`
2. Use naming: `YYYY-MM-DD-{topic}-{source}.md`
3. Example: `2025-11-02-autonomous-agents-arxiv.md`

**Later (weekly review):**
- Review files in `unorganized/`
- Move to appropriate `research/topics/{category}/`
- Update research catalog if significant

### Scenario 2: "We're implementing a feature from research"

**Action:**
1. Create spec in `research/_implementation/planned/{feature}.md`
2. Document:
   - Research sources
   - Implementation plan
   - Success criteria
3. Move to `in-progress/` when starting development
4. Move to `completed/` when done

**Then:**
- Write user documentation in `docs/implementation/features/{feature}.md`
- Add to relevant guides
- Update quick reference

### Scenario 3: "I need to find documentation quickly"

**User-facing docs:**
- Start at `docs/README.md`
- Quick start: `docs/getting-started/`
- How-to guides: `docs/guides/`
- API reference: `docs/reference/`
- Cheat sheets: `docs/quick-reference/`

**Research:**
- Browse: `research/topics/{category}/`
- Search catalog: `research/_meta/index/research-catalog.md`
- Active projects: `research/projects/`

### Scenario 4: "I want to see what features are being worked on"

**Check:**
```bash
# See planned features
ls research/_implementation/planned/

# See what's in progress
ls research/_implementation/in-progress/

# See completed features
ls research/_implementation/completed/
```

---

## 📋 File Naming Conventions

### Research Intake
```
research/intake/unorganized/YYYY-MM-DD-{topic}-{source}.md

Examples:
- 2025-11-02-claude-optimization-anthropic-blog.md
- 2025-11-02-autonomous-agents-paper-review.md
```

### Papers
```
research/papers/{category}/{descriptive-name}.pdf

Examples:
- research/papers/autonomous-agents/voyager.pdf
- research/papers/llm-optimization/anthropic-prompt-caching.pdf
```

### Implementation Tracking
```
research/_implementation/{status}/{feature-name}.md

Examples:
- research/_implementation/planned/skill-library.md
- research/_implementation/in-progress/constitutional-ai.md
- research/_implementation/completed/dspy-integration.md
```

### Documentation
```
docs/{category}/{descriptive-name}.md

Examples:
- docs/getting-started/quick-start.md
- docs/guides/sparc-methodology.md
- docs/reference/slash-commands.md
```

---

## 🔧 Automation Scripts (Coming Soon)

### Process Intake Script
```bash
# Will automatically:
# 1. Scan research/intake/unorganized/
# 2. Suggest categorization based on content
# 3. Move to appropriate topic folder
# 4. Update catalog

./research/intake/process-intake.sh
```

### Implementation Tracker
```bash
# Track feature from research → implementation → docs
# Creates specs, tracks progress, migrates to docs

./research/_implementation/track-feature.sh {feature-name}
```

### Documentation Navigation Generator
```bash
# Auto-generate navigation aids
# Update READMEs, create cross-references

./docs/generate-nav.sh
```

---

## ✅ Migration Checklist

### Phase 1: Foundation (Week 1)
- [x] Create intake structure (`research/intake/`)
- [x] Create implementation tracking (`research/_implementation/`)
- [x] Create papers organization (`research/papers/`)
- [x] Move PDFs to proper location
- [ ] Write README files for new directories
- [ ] Create docs structure
- [ ] Document workflows

### Phase 2: Research Cleanup (Week 2)
- [ ] Add README to all topic directories
- [ ] Create new topic subdirectories as needed
- [ ] Organize any miscategorized files
- [ ] Update research catalog

### Phase 3: Docs Reorganization (Week 3)
- [ ] Consolidate getting-started docs
- [ ] Organize reference documentation
- [ ] Restructure implementation docs
- [ ] Clean up migration docs
- [ ] Archive deprecated content

### Phase 4: Automation (Week 4)
- [ ] Create intake processing script
- [ ] Create implementation tracker
- [ ] Create navigation generator
- [ ] Test and refine automation
- [ ] Train team on new system

---

## 🎯 Success Metrics

**You'll know it's working when:**
- ✅ New research finds a home in <2 minutes
- ✅ Users find docs they need in <1 minute
- ✅ Clear visibility on what's being implemented
- ✅ No more "where should this file go?" questions
- ✅ Documentation stays up-to-date with implementation

---

## 📖 Key Documents

**Planning:**
- `docs/RESEARCH-DOCS-REORGANIZATION-PLAN.md` - Full detailed plan
- This document - Quick start guide

**Current State:**
- `docs/PROJECT-INDEX.md` - Current comprehensive index
- `research/_meta/index/research-catalog.md` - Research catalog

**Configuration:**
- `CLAUDE.md` - Project configuration
- Root `README.md` - Project overview

---

## 💬 Common Questions

**Q: Where do I put new research I find?**
A: Drop it in `research/intake/unorganized/` with date prefix. Process weekly.

**Q: How do I know if research has been implemented?**
A: Check `research/_implementation/completed/` or search `docs/implementation/features/`

**Q: What's the difference between research/topics and research/projects?**
A:
- `topics/` = Ongoing categorical organization (e.g., "ai-agents", "claude-code")
- `projects/` = Time-boxed research initiatives (e.g., "2025-10-deep-research")

**Q: Should documentation go in research/ or docs/?**
A:
- `research/` = Internal analysis, exploration, planning
- `docs/` = User-facing documentation, guides, references

**Q: What happens to old/deprecated docs?**
A: Move to `docs/archive/` with explanation in README

**Q: How often should we process the intake folder?**
A: Weekly review recommended, or when it accumulates 10+ files

---

## 🚦 Next Steps

### Immediate (Today)
1. Review this plan
2. Run the 30-minute quick implementation
3. Test by adding a sample file to `research/intake/unorganized/`

### This Week
1. Create README files for all new directories
2. Begin Phase 2 (Research cleanup)
3. Start moving docs to new structure (P0 items)

### This Month
1. Complete all 4 phases
2. Create automation scripts
3. Train team on new system
4. Gather feedback and refine

---

**Questions or suggestions?** See full plan in `docs/RESEARCH-DOCS-REORGANIZATION-PLAN.md`

**Ready to start?** Begin with the 30-minute quick implementation above!
