# Documentation Consolidation & Update Plan

**Created**: 2025-12-02
**Status**: Ready for Execution
**Analysis Method**: 12 parallel research agents

## Executive Summary

**Analysis Scope**: 12 parallel agents analyzed 700+ documentation files across 6 major areas
**Critical Issues Found**: 247 issues requiring immediate attention
**Estimated Effort**: 3-4 days of focused work (prioritized phases)

---

## Analysis Results Summary

### Files Analyzed by Category

| Category | Files | Issues | Severity |
|----------|-------|--------|----------|
| `.claude/skills/` | 9 skill directories | 2 critical, 2 warnings | HIGH |
| `.claude/commands/` | 222 commands | 137 missing YAML, 28 @alpha refs | CRITICAL |
| `.claude/agents/` | 78 agent configs | 38 missing capabilities, 9 broken | CRITICAL |
| `docs/` RST | 9 RST files | 13+ broken includes, build fails | CRITICAL |
| `.claude/rules/` | 12 rule files | 1 conflict, 5 integration gaps | MEDIUM |
| Duplicates | 50-100 files | 25-35% redundancy | HIGH |

---

## Critical Issues (Fix First)

### 1. Sphinx Documentation Build Failure
**Status**: BUILD WILL FAIL
- 13+ missing include directives referencing non-existent `claudedocs/` files
- 2 broken `:doc:` cross-references in `research/index.rst`
- README.rst vs README.md mismatch in toctree

**Files Affected**:
- `docs/index.rst` - README reference mismatch
- `docs/getting-started/index.rst` - 3 missing refs
- `docs/architecture/index.rst` - 6 missing refs
- `docs/research/index.rst` - 3 broken refs
- `docs/planning/index.rst` - 7 missing refs
- `docs/implementation/index.rst` - 2 missing refs
- `docs/vision/index.rst` - 2 missing refs
- `docs/workflows/index.rst` - 2 missing refs
- `docs/reference/index.rst` - 1 missing ref

### 2. Broken Agent Configurations
**Status**: AGENTS WILL FAIL TO SPAWN
- `github/workflow-automation.md` - 11 name definitions (invalid)
- `github/swarm-issue.md` - 3 name definitions (invalid)
- `github/swarm-pr.md` - 2 name definitions (invalid)
- 38 agents missing `capabilities` field
- 9 agents missing `type` field

### 3. Skills with Missing References
**Status**: SKILL INVOCATION FAILS
- `expertise/` directory - NO SKILL.md file (cannot invoke)
- `agent-sandboxes/SKILL.md` - 10+ broken internal links to non-existent files:
  - `cookbook/browser.md` - NOT FOUND
  - `examples/01_run_python_code.md` - NOT FOUND
  - `examples/02_test_package.md` - NOT FOUND
  - `examples/03_clone_and_test_repo.md` - NOT FOUND
  - `examples/04_process_binary_files.md` - NOT FOUND
  - `examples/05_host_frontend.md` - NOT FOUND

### 4. Outdated Version References
**Files with `claude-flow@alpha`** (should be `claude-flow`): 28 files
- `/sparc/` - 15 files
- `/automation/` - 10 files
- `/hooks/` - 8 files
- `/statusline/` - 4 files

---

## High Priority Issues

### 5. Command Documentation Gaps
- **137 commands** missing YAML frontmatter (61%)
- **220 commands** missing argument documentation (99%)
- **172 commands** missing usage examples (77%)
- **166 commands** missing tool restrictions (75%)

### 6. Duplicate Content (Consolidation Targets)
**Safe to Delete (100% duplicate)**:
- `data/sessions/` - entire folder (duplicate of `.claude/sessions/`)
- `.claude/agents/github/` - duplicate command definitions

**Merge Candidates**:
- 4 agent doc files → 1 `AGENT-REFERENCE.md`
- Multiple README files with overlapping content
- 5 context files → 3 consolidated files

### 7. Rules Integration Gaps
- Path standards not referenced in GitHub operations
- Datetime rules inconsistently integrated
- Branch vs worktree operations conflict
- Frontmatter stripping not integrated in sync operations

---

## Phase Implementation Plan

### Phase 1: Critical Fixes (Day 1) - 4-6 hours

#### 1.1 Fix Sphinx Build (1-2 hours)
```
Priority: CRITICAL (enables all other doc work)

Tasks:
1. Fix docs/index.rst README reference (README → README.md)
2. Remove/fix broken :doc: refs in research/index.rst
3. Create stub files OR update include paths for 13 missing includes
4. Run `make html` to verify build succeeds
```

#### 1.2 Fix Broken Agent Configs (1-2 hours)
```
Priority: CRITICAL (enables agent spawning)

Tasks:
1. Fix github/workflow-automation.md (remove extra name definitions)
2. Fix github/swarm-issue.md (remove extra name definitions)
3. Fix github/swarm-pr.md (remove extra name definitions)
4. Add missing `type` field to 9 agents
5. Add missing `capabilities` field to 38 agents
```

#### 1.3 Fix Broken Skills (1 hour)
```
Priority: CRITICAL (enables skill invocation)

Tasks:
1. Create expertise/SKILL.md router skill
2. Create agent-sandboxes/references/ directory
3. Create agent-sandboxes/cookbook/browser.md
4. Create agent-sandboxes/examples/ directory with 5 example files
```

### Phase 2: Version Updates (Day 1-2) - 2-3 hours

#### 2.1 Update @alpha References (2 hours)
```
Priority: HIGH

Files to update (28 total):
- .claude/commands/sparc/*.md (15 files)
- .claude/commands/automation/*.md (10 files)
- .claude/commands/hooks/*.md (8 files)
- .claude/commands/statusline/*.md (4 files)

Pattern: Replace `claude-flow@alpha` → `claude-flow`
```

### Phase 3: Documentation Consolidation (Day 2) - 4-6 hours

#### 3.1 Remove Duplicates (1 hour)
```
Priority: HIGH

Actions:
1. Delete data/sessions/ (entire folder)
2. Delete .claude/agents/github/ duplicates
3. Archive claudedocs/99-archive/docs-archive/pre-consolidation-2025-11-06/
```

#### 3.2 Consolidate Agent Documentation (2 hours)
```
Priority: HIGH

Merge into single AGENT-REFERENCE.md:
- .claude/commands/agents/agent-types.md
- .claude/commands/agents/agent-capabilities.md
- .claude/commands/agents/agent-coordination.md
- .claude/commands/agents/agent-spawning.md
```

#### 3.3 Consolidate Context Files (1 hour)
```
Priority: MEDIUM

Restructure .claude/context/:
- project-overview.md + project-vision.md → overview.md
- product-context.md + tech-context.md → context.md
- project-brief.md → brief.md (keep separate)
- progress.md → keep as-is
```

#### 3.4 Fix README Hierarchy (1 hour)
```
Priority: MEDIUM

Actions:
1. Update docs/README.md to cross-link to root README
2. Remove duplicate content from docs/README.md
3. Create docs/INSTALLATION.md as single setup reference
```

### Phase 4: Command Standardization (Day 2-3) - 6-8 hours

#### 4.1 Add YAML Frontmatter (3-4 hours)
```
Priority: HIGH

137 files need YAML frontmatter added:
- All /github/*.md commands
- All /swarm/*.md commands
- All /hive-mind/*.md commands
- All /flow-nexus/*.md commands

Template:
---
description: [command purpose]
argument-hint: "[argument description]"
allowed-tools: [tool list]
---
```

#### 4.2 Add Tool Restrictions (2 hours)
```
Priority: MEDIUM

166 files need tool restrictions added
Focus on high-risk categories first:
- /github/* - add allowed: [gh, git]
- /swarm/* - add allowed: [mcp__claude-flow__*]
- /automation/* - add safety restrictions
```

### Phase 5: Rules Consolidation (Day 3) - 2-3 hours

#### 5.1 Unify Git Operations (1 hour)
```
Priority: MEDIUM

Actions:
1. Create unified git-workflow.md combining branch + worktree operations
2. Add decision matrix: when to use branches vs worktrees
3. Update CLAUDE.md to reference unified guide
```

#### 5.2 Fix Integration Gaps (1-2 hours)
```
Priority: MEDIUM

Actions:
1. Add path-standards reference to github-operations.md
2. Add datetime integration to branch/worktree operations
3. Add frontmatter-stripping to sync operations
4. Create rules integration matrix document
```

### Phase 6: Quality Assurance (Day 3-4) - 3-4 hours

#### 6.1 Verify All Fixes (2 hours)
```
Tasks:
1. Run Sphinx build - verify success
2. Test agent spawning - verify configs work
3. Test skill invocation - verify skills load
4. Run link checker on all markdown files
```

#### 6.2 Update Command Routing (1 hour)
```
Tasks:
1. Update command-routing.md command count (now 234)
2. Add new /consider:* commands (12 commands)
3. Add new /context:* commands (3 commands)
4. Add Skills Integration section
```

#### 6.3 Final Documentation Review (1 hour)
```
Tasks:
1. Verify CLAUDE.md agent count matches reality
2. Check all @references resolve
3. Validate cross-document links
4. Update version numbers where needed
```

---

## File Change Summary

### Files to Delete (50-100 files)
- `data/sessions/` - entire directory
- `.claude/agents/github/` - duplicate files
- `claudedocs/99-archive/docs-archive/pre-consolidation-2025-11-06/` - archived content

### Files to Create (15-20 files)
- `expertise/SKILL.md` - router skill
- `agent-sandboxes/references/` - reference directory
- `agent-sandboxes/cookbook/browser.md` - cookbook file
- `agent-sandboxes/examples/01-05*.md` - 5 example files
- `docs/AGENT-REFERENCE.md` - consolidated agent docs
- `docs/INSTALLATION.md` - unified setup guide
- `.claude/rules/git-workflow.md` - unified git operations
- `.claude/rules/_index.md` - rules registry

### Files to Modify (200+ files)
- 28 files: Update `@alpha` references
- 137 files: Add YAML frontmatter
- 38 agents: Add missing capabilities
- 9 agents: Add missing type field
- 3 broken agents: Fix name definitions
- 9 RST files: Fix include paths
- 12 rule files: Add cross-references

---

## Success Criteria

1. **Sphinx build passes** without errors
2. **All agents spawn** successfully with valid configs
3. **All skills invoke** with working references
4. **No `@alpha` references** remain in commands
5. **YAML frontmatter** on 90%+ of commands
6. **Duplicate content** reduced by 25-35%
7. **Rules integrated** with cross-references
8. **Link checker** reports 0 broken internal links

---

## Risk Mitigation

1. **Backup before changes**: Create branch `docs-consolidation-backup`
2. **Incremental commits**: Commit after each phase completion
3. **Verify each phase**: Run tests before proceeding to next phase
4. **Document changes**: Update changelog with modifications

---

## Estimated Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Critical Fixes | 4-6 hours | None |
| Phase 2: Version Updates | 2-3 hours | None |
| Phase 3: Consolidation | 4-6 hours | Phase 1 |
| Phase 4: Standardization | 6-8 hours | Phase 1 |
| Phase 5: Rules | 2-3 hours | Phase 3 |
| Phase 6: QA | 3-4 hours | All phases |
| **Total** | **21-30 hours** | ~3-4 days |

---

## Next Steps

1. **Approve this plan** or request modifications
2. **Execute Phase 1** (Critical Fixes) first
3. **Verify build/spawn success** before continuing
4. **Proceed through remaining phases** in order
