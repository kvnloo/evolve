# Multi-Instance Claude Code Statusline - Requirements Discovery

## Session Context
- **Date**: 2025-10-20
- **Goal**: Enhance Claude Code statusline for multi-instance orchestration
- **Approach**: Hybrid (VSCode Extension + MCP Server)
- **Baseline**: rz1989s/claude-code-statusline (installed)

---

## 1️⃣ Multi-Instance Context Understanding

### Q1: How many instances do you typically run simultaneously?
**User Answer**: _[Pending]_

**Options**:
- [ ] 2-3 instances (simple multi-tasking)
- [ ] 4-7 instances (moderate orchestration)
- [ ] 8-15 instances (heavy parallel workflows)
- [ ] 15+ instances (enterprise-scale swarm operations)

**Impact on Design**:
- 2-3: Simple statusbar with instance selector
- 4-7: Dedicated sidebar panel with grid view
- 8-15: Dashboard with filtering/grouping
- 15+: Full orchestration UI with hierarchical views

---

### Q2: What distinguishes each instance in your mind?
**User Answer**: _[Pending]_

**Options**:
- [ ] Different projects/repositories
- [ ] Different phases of same project (spec, code, test, review)
- [ ] Different agent roles (backend, frontend, database, security)
- [ ] Different epic branches/worktrees (CCPM workflow)
- [ ] Mix of above

**Impact on Design**:
- Projects: Repository-based identification
- Phases: Workflow state indicators
- Agent roles: Role-based icons/colors
- Epic branches: CCPM integration
- Mix: Flexible tagging system

---

### Q3: How do you currently switch between instances?
**User Answer**: _[Pending]_

**Options**:
- [ ] Alt-tab through VSCode windows
- [ ] Multiple monitors with dedicated instance per screen
- [ ] VSCode workspaces
- [ ] Terminal multiplexers (tmux/screen)
- [ ] Other method: ___________

**Impact on Design**:
- Alt-tab: Quick-switch command palette integration
- Multiple monitors: Visual differentiation focus
- Workspaces: Workspace-aware statusline
- Tmux/screen: Terminal integration priority

---

## 2️⃣ Critical Context Needs

### Q4: Information Priority Ranking
**User Answer**: _[Pending]_

**Rank 1-8 (1 = most critical)**:
- [ ] Project/repository name
- [ ] Current epic/branch name (CCPM workflow)
- [ ] Agent role/type (from /sc:implement, etc.)
- [ ] Current phase (spec, code, test, review)
- [ ] Active MCP servers
- [ ] Token/cost metrics
- [ ] Git status
- [ ] Time/duration info

**Design Impact**: Determines statusbar layout priority and sidebar organization

---

### Q5: Instance Recognition Methods
**User Answer**: _[Pending]_

**What helps you instantly recognize the right instance?**
- [ ] Color coding (each instance gets unique color scheme)
- [ ] Custom icons/emojis (visual identifiers)
- [ ] Short memorable names ("Auth API", "DB Schema", "UI Tests")
- [ ] Session IDs (Session-1, Session-2, etc.)
- [ ] Project-based prefixes
- [ ] Custom user-defined labels

**Design Impact**: Visual identity system design

---

## 3️⃣ Orchestration Workflows

### Q6: Instance Coordination
**User Answer**: _[Pending]_

**Are your instances coordinating on related work?**
- [ ] Yes - Same epic/feature (tightly coordinated)
- [ ] Yes - Related components (loosely coordinated)
- [ ] No - Completely independent tasks
- [ ] Mix - Some coordinated, some independent

**Design Impact**:
- Coordinated: Requires inter-instance communication
- Independent: Simpler isolation model
- Mix: Flexible coordination modes

---

### Q7: Coordination Information Needs
**User Answer**: _[Pending]_

**If coordinated, what info would help?**
- [ ] Which instance is blocked waiting for another
- [ ] Progress % across all instances
- [ ] Shared memory/state indicators
- [ ] Inter-agent communication status
- [ ] Dependency chains (Instance A → Instance B → Instance C)
- [ ] Completion status (3/5 instances done)

**Design Impact**: MCP server coordination features

---

## 4️⃣ Implementation Preferences

### Q8: UI/Display Preferences
**User Answer**: _[Pending]_

**Where to see multi-instance information?**
- [ ] VSCode statusbar (bottom right, native VSCode UI)
- [ ] Custom VSCode sidebar panel (dedicated multi-instance view)
- [ ] Web dashboard (browser-based, like ccswitch)
- [ ] Desktop app (standalone window, like Crystal)
- [ ] Terminal-based TUI (enhanced baseline tool)
- [ ] Multiple places (specify combination)

**Design Impact**: Development priorities and feature distribution

---

### Q9: Real-time Requirements
**User Answer**: _[Pending]_

**Update frequency needed**:
- [ ] 1-5 seconds (real-time)
- [ ] 30-60 seconds (near real-time)
- [ ] Manual refresh on-demand
- [ ] Event-driven only (hooks)

**Design Impact**: Polling vs. event-driven architecture

---

### Q10: Installation/Deployment Preferences
**User Answer**: _[Pending]_

**Preferred installation method**:
- [ ] VSCode extension (marketplace install)
- [ ] MCP server (npx install, hook integration)
- [ ] Bash script enhancement (extend rz1989s tool)
- [ ] Hybrid (VSCode extension + MCP server) ✓ **[Selected]**
- [ ] Minimal dependencies (pure VSCode API)

**Design Impact**: Packaging and distribution strategy

---

## 5️⃣ Additional Context Questions

### Q11: Existing Workflow Integration
**User Answer**: _[Pending]_

**Which existing tools/workflows must we integrate with?**
- [ ] CCPM (Claude Code PM) - Epic/Issue tracking
- [ ] claude-flow - Swarm orchestration
- [ ] ruv-swarm - Enhanced coordination
- [ ] flow-nexus - Cloud features
- [ ] ccusage - Cost tracking
- [ ] GitButler - Branch management
- [ ] Other: ___________

---

### Q12: Most Painful Current Problem
**User Answer**: _[Pending]_

**What's the BIGGEST pain point right now?**

_Open-ended response space_

**Example scenarios**:
- "I can't tell which instance has the failing tests"
- "I lose track of which instance is working on which epic"
- "Switching between instances wastes 30+ seconds each time"
- "I don't know when parallel agents finish their tasks"

---

## 6️⃣ Success Criteria

### Q13: What does "solved" look like?
**User Answer**: _[Pending]_

**How will you know this enhancement succeeded?**

_Open-ended response space_

**Example success metrics**:
- "Can identify correct instance in < 2 seconds"
- "Zero context switching errors"
- "See all instance progress at a glance"
- "Coordination status visible in real-time"

---

## Next Steps

Once answers are collected, we'll:
1. ✅ Prioritize features based on answers
2. ✅ Design hybrid architecture (VSCode + MCP)
3. ✅ Create phased implementation plan
4. ✅ Build initial prototype
5. ✅ Iterate based on real usage

---

## Notes Section

_Add any additional context, edge cases, or considerations here_
