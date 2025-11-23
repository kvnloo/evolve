# OpenCode Migration Quick Reference Guide
**Fast execution reference for migration team**

## 🚀 Quick Start

### Prerequisites Check
```bash
# Ensure required tools installed
command -v jq >/dev/null 2>&1 || echo "❌ Install jq"
command -v git >/dev/null 2>&1 || echo "❌ Install git"
command -v gh >/dev/null 2>&1 || echo "⚠️  Install GitHub CLI (optional)"
command -v python3 >/dev/null 2>&1 || echo "❌ Install Python 3"
command -v opencode >/dev/null 2>&1 || echo "❌ Install OpenCode"

# Create backup
git stash push -u -m "Pre-migration backup $(date +%Y%m%d)"
```

---

## 📊 Migration at a Glance

```
341 files → 18 agents
215 commands → Agent integrations
78 agents → Consolidated definitions
11 rules → Embedded instructions
6 helpers → Shared resources
```

**Timeline**: 4 weeks | **Success Rate**: 85%+ | **Rollback**: Always available

---

## 🎯 Agent Reference

### Build Agents (Tier 1)
| Agent | Purpose | Key Permissions | Migrates |
|-------|---------|-----------------|----------|
| `coder-agent` | Code implementation | fs.*, exec.shell, mcp.all | 45 cmds |
| `reviewer-agent` | Code review | fs.read, exec.read-only | 25 cmds |
| `tester-agent` | Testing | fs.read/write, exec.shell | 20 cmds |
| `architect-agent` | System design | fs.read/write, exec.read-only | 15 cmds |

### Plan Agents (Tier 2)
| Agent | Purpose | Key Permissions | Migrates |
|-------|---------|-----------------|----------|
| `pm-agent` | PRD/Epic mgmt | fs.read/write:*.md, github.issues | 35 cmds |
| `planner-agent` | Task breakdown | fs.read, write:checkpoints | 18 cmds |
| `tracker-agent` | Progress monitor | fs.read, write:context,sessions | 12 cmds |

### Custom Agents (Tier 3-6)
| Agent | Purpose | Key Permissions | Migrates |
|-------|---------|-----------------|----------|
| `github-agent` | GitHub ops | github.all, exec.git,gh | 30 cmds |
| `release-agent` | Release mgmt | github.releases, exec.git,npm | 8 cmds |
| `ui-agent` | UI/frontend | mcp.magic,playwright,chrome | 15 cmds |
| `data-agent` | Database ops | exec.psql,sqlite3 | 10 cmds |
| `devops-agent` | CI/CD | fs.write:.github/workflows | 12 cmds |
| `security-agent` | Security scan | exec.npm-audit,trivy | 8 cmds |
| `docs-agent` | Documentation | fs.write:docs,README | 10 cmds |
| `research-agent` | Web research | mcp.tavily, network.http | 5 cmds |
| `analyzer-agent` | Code analysis | fs.read, mcp.sequential | 15 cmds |
| `workflow-agent` | Automation | exec.shell, mcp.all | 12 cmds |
| `memory-agent` | Context mgmt | mcp.serena, write:sessions | 10 cmds |
| `swarm-coordinator` | Multi-agent | mcp.claude-flow,ruv-swarm | 40 cmds |

---

## 📋 Weekly Execution Checklist

### Week 1: Foundation + Core
```bash
# Day 1-2: Foundation
[ ] Create .opencode directory structure
[ ] Migrate 11 rules → .opencode/rules/
[ ] Migrate 6 helpers → .opencode/shared/
[ ] Create opencode.jsonc skeleton
[ ] Setup validation framework
[ ] ✅ GATE: Syntax validation passes

# Day 3-7: Core Build Agents
[ ] Define coder-agent permissions + instructions
[ ] Define reviewer-agent permissions + instructions
[ ] Define tester-agent permissions + instructions
[ ] Define architect-agent permissions + instructions
[ ] Migrate ~45 commands (automation, optimization)
[ ] ✅ GATE: Structure + Functional validation passes
```

### Week 2: PM + GitHub
```bash
# Day 8-10: PM Agents
[ ] Define pm-agent, planner-agent, tracker-agent
[ ] Migrate /commands/pm/ → pm-agent
[ ] Migrate /commands/workflows/ → planner-agent
[ ] Migrate /commands/monitoring/ → tracker-agent
[ ] Test PRD creation workflow
[ ] ✅ GATE: PM workflows operational

# Day 11-14: GitHub Agents
[ ] Define github-agent, release-agent
[ ] Migrate /commands/github/ → github-agent
[ ] Test issue creation, PR workflows
[ ] Test release automation
[ ] ✅ GATE: GitHub integration validated
```

### Week 3: Specialists + Advanced
```bash
# Day 15-17: Domain Specialists
[ ] Define ui, data, devops, security, docs agents
[ ] Migrate domain-specific commands
[ ] Test UI cloning, DB ops, CI/CD
[ ] ✅ GATE: Specialist agents functional

# Day 18-21: Advanced Capabilities
[ ] Define research, analyzer, workflow, memory agents
[ ] Define swarm-coordinator
[ ] Migrate remaining commands
[ ] Test multi-agent workflows
[ ] ✅ GATE: All 215 commands migrated
```

### Week 4: Validation + Cutover
```bash
# Day 22-24: Final Validation
[ ] Run complete validation suite (Levels 1-4)
[ ] Performance benchmarks (must be ≤110% baseline)
[ ] User acceptance testing (10+ real tasks)
[ ] Security audit of permissions
[ ] ✅ GATE: All validations pass

# Day 25-26: Production Cutover
[ ] Announce maintenance window
[ ] Freeze .claude updates
[ ] Enable .opencode as primary
[ ] Update documentation
[ ] ✅ GATE: Zero critical issues

# Day 27-28: Post-Cutover
[ ] Monitor error logs (24h intensive)
[ ] Collect user feedback
[ ] Address non-critical issues
[ ] Archive .claude as backup
```

---

## 🔧 Common Commands

### Validation
```bash
# Run all validations
./validate_syntax.sh && ./validate_structure.sh && \
./validate_functional.sh && ./validate_integration.sh

# Check migration coverage
echo "Coverage: $(grep -r '## Command:' .opencode/agents/ | wc -l)/215"

# Verify agent definitions
find .opencode/agents -name "*.json" -exec jq empty {} \;
```

### Migration Helpers
```bash
# Convert simple command
./convert_simple_command.sh .claude/commands/example.md agent-name

# Batch convert directory
for f in .claude/commands/pm/*.md; do
  ./convert_simple_command.sh "$f" pm-agent
done

# Generate agent definition
./generate_agent_definition.sh pm-agent plan
```

### Testing
```bash
# Test agent functionality
opencode run coder-agent "Read test file"
opencode run github-agent "List open issues"
opencode run pm-agent "Show recent PRDs"

# Benchmark performance
time opencode run coder-agent "Analyze 100 files"
time claude run /automation:analyze "Analyze 100 files"  # Compare
```

### Rollback
```bash
# Emergency rollback
./emergency_rollback.sh

# Partial rollback (specific agent)
./rollback_agent.sh github-agent

# Graceful cutback to .claude
./graceful_cutback.sh
```

---

## ⚠️ Common Issues & Solutions

### Issue: Agent Permission Denied
```bash
# Problem: Agent cannot write to directory
# Solution: Check and expand permissions

# View current permissions
jq '.agents["agent-name"].permissions' .opencode/opencode.jsonc

# Add write permission
jq '.agents["agent-name"].permissions.fs += ["write:path/to/dir"]' \
  .opencode/opencode.jsonc > tmp && mv tmp .opencode/opencode.jsonc
```

### Issue: Command Not Found
```bash
# Problem: Migrated command not responding
# Solution: Check agent instruction inclusion

# Search for command in agent instructions
grep -r "## Command: command-name" .opencode/agents/

# If missing, append to agent instructions
echo "\n## Command: command-name\n{instructions}" >> \
  .opencode/agents/{type}/{agent}.md
```

### Issue: GitHub Operations Failing
```bash
# Problem: GitHub agent cannot create issues
# Solution: Check GitHub CLI auth + repo protection

# Check gh CLI
gh auth status

# Re-authenticate if needed
gh auth login

# Check repository protection
./scripts/check_github_protection.sh
```

### Issue: Performance Degradation
```bash
# Problem: Operations slower than baseline
# Solution: Profile and optimize

# Profile agent execution
opencode run --profile agent-name "task"

# Check MCP overhead
grep "mcp" .opencode/opencode.jsonc | wc -l

# Reduce MCP calls or optimize coordination
```

---

## 📈 Success Criteria

### Validation Gates
- ✅ **Syntax**: All JSON valid, no schema errors
- ✅ **Structure**: 100% command coverage, all dependencies mapped
- ✅ **Functional**: All validation tests pass
- ✅ **Integration**: GitHub + MCP tools operational
- ✅ **Performance**: ≤110% baseline execution time
- ✅ **User Acceptance**: ≥80% satisfaction, <5 critical issues

### Weekly Milestones
- **Week 1 End**: Core agents operational, 45 commands migrated
- **Week 2 End**: PM + GitHub working, 110 commands migrated
- **Week 3 End**: All agents defined, 215 commands migrated
- **Week 4 End**: Production cutover complete, monitoring active

---

## 🚨 Emergency Contacts

**Migration Issues**: Migration Lead
**Permission Problems**: Security Team
**GitHub Integration**: DevOps Team
**Performance Issues**: Architecture Team
**Rollback Decision**: Engineering Manager

---

## 📚 Reference Documents

- **Full Architecture**: `opencode_migration_architecture_20251122_020301.md`
- **Systems Analysis**: `migration_analysis_summary.md`
- **Validation Scripts**: `.opencode/validation/`
- **Conversion Templates**: `.opencode/templates/`

---

## 🎯 Daily Standup Template

**Yesterday:**
- Migrated X commands to Y agent
- Completed validation Level N
- Resolved M issues

**Today:**
- Migrate X commands to Y agent
- Run validation Level N+1
- Test Z workflow

**Blockers:**
- [List any blocking issues]

**Metrics:**
- Command coverage: X/215 (Y%)
- Validation status: Level N passed
- Open issues: M critical, N non-critical

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Status**: Ready for execution
