# Documentation Architecture Design

**Project**: Claude Code Extended Framework (Evolve)
**Created**: 2025-11-06
**Status**: Portfolio-Quality Design Proposal
**Author**: System Architecture Designer

---

## Executive Summary

This architecture design proposes a minimal, polished documentation structure that eliminates duplication, establishes clear navigation, properly attributes source frameworks, and follows open source best practices. The current state shows 111+ documentation files with significant overlap and unclear information architecture.

**Key Problems Identified**:
- 111 documentation files with substantial duplication
- Multiple "getting started" and "installation" guides
- Unclear framework boundaries (SuperClaude vs Claude Flow vs CCPM)
- Mixed concerns (user guide + implementation details + migration docs)
- No clear "story flow" for new users

**Proposed Solution**:
- Reduce to ~30-40 core files organized by purpose
- Single source of truth for each concept
- Clear 3-level hierarchy (Introduction → Usage → Implementation)
- Framework attributions in dedicated section
- Progressive disclosure pattern (What → How → Why)

---

## Current State Analysis

### File Count by Category
- Total markdown files: 111
- Top-level docs: 50
- Getting started variants: 5+
- Installation guides: 3+
- Command references: 4+
- Migration/reorganization docs: 10+
- Archive/outdated: 15+

### Major Duplication Areas

1. **Installation/Setup** (7+ files)
   - `docs/CCPM-INSTALLATION.md`
   - `docs/SUPERCLAUDE-INSTALLATION.md`
   - `docs/getting-started/ccpm-install.md`
   - `docs/getting-started/superclaude-install.md`
   - `docs/getting-started/quick-start.md`
   - `docs/getting-started.md`
   - Root `README.md`

2. **Command References** (4+ files)
   - `docs/CCPM-COMMANDS.md`
   - `docs/command-quick-reference.md`
   - `docs/QUICK-REFERENCE.md`
   - `docs/quick-reference/commands.md`

3. **Project Overview** (5+ files)
   - `docs/PROJECT-INDEX.md`
   - `docs/CCPM-README.md`
   - `docs/getting-started/README.md`
   - Root `README.md`
   - `.claude/context/project-overview.md`

4. **Architecture** (3+ files)
   - `docs/architecture.md`
   - `docs/system-architecture.md`
   - `docs/reference/architecture-part1.md` + `part2.md`

### Framework Attribution Gaps

**Current Issues**:
- SuperClaude mentioned but not clearly defined or attributed
- Claude Flow (by ruvnet) only referenced in links
- CCPM (by Automaze) buried in installation docs
- No clear "Built With" or "Credits" section
- Framework capabilities mixed with project capabilities

---

## Proposed Documentation Architecture

### 1. Root-Level Documents (4 files)

#### `README.md` - Project Front Door
**Purpose**: First impression, elevator pitch, quick navigation
**Max Length**: 200 lines
**Sections**:
```markdown
# Claude Code Extended Framework

> An integrated development system combining Claude Flow orchestration,
> CCPM project management, and SuperClaude optimization patterns.

## What is This?
[2-3 sentences explaining the value proposition]

## Features at a Glance
- SPARC Methodology (via Claude Flow)
- 54+ Specialized Agents
- Project Management (CCPM)
- Performance: 84.8% SWE-Bench, 32.3% token reduction

## Quick Start
[3-step getting started]

## Documentation
- [Installation Guide](docs/getting-started.md)
- [User Guide](docs/guides/README.md)
- [Command Reference](docs/reference/commands.md)
- [Architecture](docs/architecture/README.md)

## Built With
- [Claude Flow](https://github.com/ruvnet/claude-flow) - Agent orchestration
- [CCPM](https://github.com/automazeio/ccpm) - Project management
- SuperClaude Framework - Token optimization patterns

## License
MIT License - See [LICENSE](LICENSE)
```

#### `CONTRIBUTING.md` - Contribution Guide
**Purpose**: How to contribute to the project
**Sections**: Setup, standards, workflow, testing

#### `SECURITY.md` - Security Policy
**Purpose**: Vulnerability reporting, security practices
**Sections**: Reporting, supported versions, policies

#### `CHANGELOG.md` - Version History
**Purpose**: Track changes and releases
**Format**: Keep a Changelog standard

### 2. Documentation Structure (`docs/`)

```
docs/
├── README.md                          # Documentation hub (navigation)
├── getting-started.md                 # SINGLE installation/setup guide
├── guides/                            # How-to guides (by task)
│   ├── README.md                      # Guide index
│   ├── sparc-workflow.md              # Using SPARC methodology
│   ├── multi-agent-coordination.md    # Agent orchestration
│   ├── project-management.md          # CCPM workflow
│   └── customization.md               # Framework customization
├── reference/                         # Reference documentation
│   ├── README.md                      # Reference index
│   ├── commands.md                    # ALL commands (single source)
│   ├── agents.md                      # ALL agents (single source)
│   ├── configuration.md               # Configuration reference
│   └── api.md                         # API reference (if applicable)
├── architecture/                      # Architecture documentation
│   ├── README.md                      # Architecture overview
│   ├── system-design.md               # System architecture
│   ├── integration-points.md          # Framework integrations
│   └── decision-records/              # ADRs (Architecture Decision Records)
│       └── 001-framework-selection.md
├── frameworks/                        # Framework-specific docs
│   ├── README.md                      # Framework overview + attribution
│   ├── claude-flow.md                 # Claude Flow capabilities
│   ├── ccpm.md                        # CCPM capabilities
│   └── superclaude.md                 # SuperClaude patterns
├── troubleshooting/                   # Problem solving
│   ├── README.md                      # Troubleshooting index
│   ├── common-issues.md               # FAQ and solutions
│   └── debugging.md                   # Debugging guide
└── archive/                           # Outdated/historical docs
    ├── README.md                      # Archive index
    └── migration/                     # Migration documentation
```

**Total: ~30-35 core files** (vs current 111)

### 3. Navigation Strategy

#### Progressive Disclosure Pattern

**Level 1: What is this?** (README.md)
- Elevator pitch
- Key features
- Quick start
- Link to getting started

**Level 2: How do I use it?** (docs/)
- Installation guide
- User guides (by task)
- Command reference
- Troubleshooting

**Level 3: How does it work?** (docs/architecture/)
- System design
- Integration points
- Framework details
- Decision records

#### Information Scent Trail

Every document should answer:
1. **What is this?** - Title + summary
2. **Why should I read this?** - Purpose statement
3. **Where can I learn more?** - Cross-references

#### Maximum 3 Clicks Rule
- Any information reachable in max 3 clicks from README
- Every page links back to parent
- Breadcrumbs in headers

---

## Content Organization Strategy

### Hybrid Approach: Feature + Framework

**Primary Organization: By User Task** (guides/)
- How do I get started?
- How do I use SPARC methodology?
- How do I manage projects with CCPM?
- How do I coordinate agents?

**Secondary Organization: By Framework** (frameworks/)
- What does Claude Flow provide?
- What does CCPM provide?
- What are SuperClaude patterns?

**Tertiary Organization: By Component** (reference/)
- All commands (regardless of source)
- All agents (regardless of source)
- All configuration options

**Rationale**: Users think in terms of tasks, not frameworks. But they need to understand framework boundaries for troubleshooting and contribution.

---

## Attribution Strategy

### Framework Attribution Section

#### `docs/frameworks/README.md` - Framework Overview
```markdown
# Frameworks & Attribution

This project integrates three major frameworks:

## Claude Flow
**Source**: https://github.com/ruvnet/claude-flow
**Author**: @ruvnet
**License**: [Check repository]
**What it provides**:
- SPARC methodology implementation
- Agent orchestration and coordination
- MCP server integration
- Performance: 84.8% SWE-Bench solve rate

**Used in this project**:
- Core agent execution
- SPARC workflow commands
- Multi-agent coordination
- Session management

[See detailed capabilities →](claude-flow.md)

## CCPM (Claude Code PM)
**Source**: https://github.com/automazeio/ccpm
**Author**: Automaze.io
**License**: [Check repository]
**What it provides**:
- Spec-driven development workflow
- GitHub issue synchronization
- Git worktree management
- Project management commands (40+)

**Used in this project**:
- `/pm:*` commands
- Epic and PRD management
- Issue workflow
- Context management

[See detailed capabilities →](ccpm.md)

## SuperClaude Framework
**Source**: [Documentation link]
**What it provides**:
- Token optimization patterns (70% reduction)
- Symbol-based communication
- Compressed clarity techniques
- Efficiency modes

**Used in this project**:
- Global Claude configuration
- Mode activation patterns
- Optimization strategies

[See detailed capabilities →](superclaude.md)

## Integration Architecture

This project **combines** these frameworks:
- Claude Flow handles agent execution
- CCPM handles project management
- SuperClaude patterns optimize communication

See [Architecture Documentation](../architecture/README.md) for integration details.
```

### Attribution in Every Guide

Each guide that uses framework features includes attribution:

```markdown
# SPARC Workflow Guide

> This workflow is provided by [Claude Flow](../frameworks/claude-flow.md)

## What is SPARC?
[Explanation]

## Commands
[Commands with framework attribution in reference]
```

### Footer Attribution

Standard footer in all documentation:

```markdown
---

**Built with**: [Claude Flow](https://github.com/ruvnet/claude-flow) ·
[CCPM](https://github.com/automazeio/ccpm) ·
[SuperClaude Framework](#)

**License**: MIT · **Contributing**: See [CONTRIBUTING.md](../../CONTRIBUTING.md)
```

---

## Duplication Elimination Plan

### Phase 1: Merge Installation Docs

**Target**: Single `docs/getting-started.md`

**Consolidate**:
- `docs/CCPM-INSTALLATION.md` → Section: "Installing CCPM"
- `docs/SUPERCLAUDE-INSTALLATION.md` → Section: "Installing SuperClaude"
- `docs/getting-started/*.md` → Merge into single file
- Root `README.md` → Keep only quick start, link to full guide

**Result**: 7 files → 1 file

### Phase 2: Merge Command References

**Target**: Single `docs/reference/commands.md`

**Consolidate**:
- `docs/CCPM-COMMANDS.md`
- `docs/command-quick-reference.md`
- `docs/QUICK-REFERENCE.md`
- `docs/quick-reference/commands.md`

**Structure**:
```markdown
# Command Reference

## By Category

### Project Management (CCPM)
[All /pm:* commands with framework attribution]

### SPARC Methodology (Claude Flow)
[All sparc commands]

### Context Management (CCPM)
[All /context:* commands]

## By Name (Alphabetical)
[Complete list for quick lookup]
```

**Result**: 4+ files → 1 file

### Phase 3: Merge Overview Docs

**Target**: Single comprehensive entry point

**Consolidate**:
- `docs/PROJECT-INDEX.md` → `docs/README.md` (doc hub)
- `docs/CCPM-README.md` → `docs/frameworks/ccpm.md`
- `docs/getting-started/README.md` → Delete (content in getting-started.md)

**Result**: 3+ files → 2 files (doc hub + framework doc)

### Phase 4: Reorganize Architecture Docs

**Target**: Clear architecture section

**Consolidate**:
- `docs/architecture.md` + `docs/system-architecture.md` → `docs/architecture/README.md`
- `docs/reference/architecture-part1.md` + `part2.md` → `docs/architecture/system-design.md`

**Result**: 4 files → 2 files

### Phase 5: Archive Migration/Reorganization Docs

**Target**: Clean up outdated docs

**Move to archive**:
- `docs/migration/*` → `docs/archive/migration/`
- `docs/PROJECT-REORGANIZATION-*.md` → `docs/archive/`
- `docs/REORGANIZATION-*.md` → `docs/archive/`
- `docs/*MIGRATION*.md` → `docs/archive/migration/`

**Add**: `docs/archive/README.md` explaining these are historical

**Result**: 15+ files moved to archive

### Summary: Reduction Plan

| Category | Before | After | Reduction |
|----------|--------|-------|-----------|
| Installation | 7 | 1 | -85% |
| Commands | 4 | 1 | -75% |
| Overview | 5 | 2 | -60% |
| Architecture | 4 | 2 | -50% |
| Archived | 0 | 15+ | N/A |
| **Total Core** | **50+** | **~30-35** | **~40%** |

---

## Implementation Roadmap

### Step 1: Create New Structure (Safe)
**Duration**: 2-3 hours
**Actions**:
1. Create new directory structure in `docs/`
2. Create README files for each section
3. Create framework attribution section
4. **Do NOT delete anything yet**

### Step 2: Consolidate Content (Careful)
**Duration**: 4-6 hours
**Actions**:
1. Merge installation guides → `docs/getting-started.md`
2. Merge command references → `docs/reference/commands.md`
3. Merge agent references → `docs/reference/agents.md`
4. Create framework-specific docs in `docs/frameworks/`
5. **Keep originals for verification**

### Step 3: Update Cross-References
**Duration**: 2-3 hours
**Actions**:
1. Update all internal links
2. Update README.md navigation
3. Update CLAUDE.md references
4. Add breadcrumbs to all pages

### Step 4: Validate & Archive
**Duration**: 1-2 hours
**Actions**:
1. Check all links work
2. Verify no information loss
3. Move old files to `docs/archive/`
4. Create archive index

### Step 5: Polish & Review
**Duration**: 1-2 hours
**Actions**:
1. Add attribution footers
2. Standardize formatting
3. Check spelling/grammar
4. Final user flow test

**Total Time**: 10-16 hours

---

## Success Metrics

### Quantitative
- [ ] Reduce core docs from 50+ to ~30-35 files
- [ ] Achieve max 3-click navigation depth
- [ ] Zero broken internal links
- [ ] 100% of framework features attributed

### Qualitative
- [ ] New user can install in <10 minutes following docs
- [ ] Clear distinction between project and framework features
- [ ] Professional open source documentation appearance
- [ ] Easy to find any command/agent/concept

### Portfolio Quality Indicators
- [ ] Clear information architecture
- [ ] Consistent formatting and structure
- [ ] Proper attribution and licensing
- [ ] No duplication or contradictions
- [ ] Professional README following best practices
- [ ] Complete contributor documentation

---

## Risk Assessment

### Low Risk
- Creating new structure (additive, reversible)
- Adding framework attribution
- Archiving old docs (not deleting)

### Medium Risk
- Consolidating content (might miss something)
- Updating cross-references (tedious, error-prone)

**Mitigation**:
- Keep originals until verification complete
- Use link checker tools
- Manual review of all consolidated content

### High Risk
- None (if following implementation roadmap)

---

## Recommendations

### Immediate Actions (This Session)
1. Create `docs/frameworks/README.md` with attribution
2. Create new directory structure
3. Draft consolidated `docs/getting-started.md`

### Next Session Actions
1. Complete content consolidation
2. Update cross-references
3. Move files to archive

### Future Improvements
1. Add visual diagrams (architecture, workflow)
2. Create video tutorials
3. Add code examples in guides
4. Implement automated link checking in CI
5. Add documentation versioning

---

## Appendix: File Mapping

### Files to Consolidate

#### Installation → `docs/getting-started.md`
- `docs/CCPM-INSTALLATION.md` (277 lines)
- `docs/SUPERCLAUDE-INSTALLATION.md`
- `docs/getting-started/ccpm-install.md`
- `docs/getting-started/superclaude-install.md`
- `docs/getting-started/quick-start.md`
- `docs/getting-started.md` (186 lines)

#### Commands → `docs/reference/commands.md`
- `docs/CCPM-COMMANDS.md`
- `docs/command-quick-reference.md`
- `docs/QUICK-REFERENCE.md`
- `docs/quick-reference/commands.md`

#### Agents → `docs/reference/agents.md`
- `docs/CCPM-AGENTS.md`
- Content from `docs/PROJECT-INDEX.md` agent section

#### Architecture → `docs/architecture/`
- `docs/architecture.md`
- `docs/system-architecture.md`
- `docs/reference/architecture-part1.md`
- `docs/reference/architecture-part2.md`

### Files to Archive
- All `docs/migration/*` files
- All `docs/*MIGRATION*.md` files
- All `docs/*REORGANIZATION*.md` files
- `docs/archive/epic-1/*` (already archived)
- `docs/quick-start-epic-1.md`
- Obsolete quick-start files

### Files to Update (Links Only)
- Root `README.md`
- `CLAUDE.md`
- `.claude/context/*.md`

---

## Conclusion

This architecture design provides a clear path to portfolio-quality documentation:

1. **Minimal**: ~40% reduction in files
2. **Polished**: Clear structure, proper attribution, professional appearance
3. **No duplication**: Single source of truth for each concept
4. **Clear navigation**: 3-level hierarchy, max 3 clicks
5. **Proper attribution**: Framework capabilities clearly separated and credited
6. **Open source best practices**: Standard structure, complete documentation
7. **Easy onboarding**: Progressive disclosure pattern

The implementation is **low-risk** (keeps originals, incremental) and **high-value** (dramatically improves user experience and maintainability).

Ready to implement: Yes, with proper testing and validation at each step.
