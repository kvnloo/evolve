# Command Migration Plan

## Overview

**Objective:** Reorganize 196 command files into structured, logical hierarchy
**Timeline:** 4 weeks (phased migration)
**Risk Level:** Medium-High (core functionality affected)
**Rollback Strategy:** Git branches + parallel structure during transition

---

## Migration Phases

### Phase 1: CRITICAL Commands (Week 1)
**Goal:** Ensure core functionality continues working
**Commands:** 33 critical commands
**Risk:** HIGH - System breaks if these fail

#### Commands to Migrate:
1. **System (2):** `safety-check`, `agents-list`
2. **PM Core (15):** `init`, `prd-new`, `epic-start`, `epic-decompose`, `epic-sync`, `epic-oneshot`, `issue-start`, `issue-analyze`, `issue-sync`, `epic-merge`, `status`, `next`, `help`, `sync`, `validate`
3. **SPARC Core (8):** `orchestrator`, `coder`, `tester`, `tdd`, `reviewer`, `architect`, `analyzer`, `swarm-coordinator`
4. **Coordination (5):** `init`, `swarm-init`, `agent-spawn`, `task-orchestrate`, `README`
5. **Swarm Core (3):** `init`, `spawn`, `status`

#### Success Criteria:
- [ ] PM workflow: `init` → `prd-new` → `epic-oneshot` → `issue-start` works end-to-end
- [ ] SPARC TDD: `/sparc:tdd "feature"` spawns agents and runs tests
- [ ] Swarm initialization and basic agent spawning functional
- [ ] All imports updated and tests pass
- [ ] Zero production incidents

---

### Phase 2: HIGH Priority (Week 2)
**Goal:** Restore all essential integrations
**Commands:** 58 high-priority commands
**Risk:** MEDIUM - Features impacted but system stable

#### Commands to Migrate:
1. **GitHub (20):** All GitHub integration commands
2. **Hive Mind (13):** All hive mind commands
3. **Hooks (8):** All hook system commands
4. **Automation (8):** All automation commands
5. **Workflows (6):** All workflow commands
6. **Context (3):** All context management commands

#### Success Criteria:
- [ ] GitHub issue/PR workflows functional
- [ ] Hive Mind collective intelligence operational
- [ ] Hook system triggering correctly
- [ ] Automation features working (auto-spawn, smart-agents)
- [ ] Workflow orchestration functional
- [ ] Context management preserving session state

---

### Phase 3: MEDIUM Priority (Week 3)
**Goal:** Restore analysis and optimization features
**Commands:** 41 medium-priority commands
**Risk:** LOW - Enhancement features

#### Commands to Migrate:
1. **Monitoring (6):** All monitoring commands
2. **Analysis (5 after dedup):** Performance and token analysis
3. **Optimization (5 after dedup):** Execution optimization
4. **Memory (5 after dedup):** Memory management
5. **Training (6):** Neural training features
6. **Flow-Nexus (9):** Platform integrations
7. **Research (1):** Research planning

#### Success Criteria:
- [ ] Performance monitoring and metrics working
- [ ] Token efficiency analysis functional
- [ ] Parallel execution optimization operational
- [ ] Memory persistence working
- [ ] Neural training pipeline functional
- [ ] Flow-Nexus integrations working (if used)

---

### Phase 4: LOW Priority (Week 4)
**Goal:** Complete migration with specialized features
**Commands:** 19 low-priority commands + documentation
**Risk:** VERY LOW - Specialized use cases

#### Commands to Migrate:
1. **Pair (6):** Pair programming features
2. **Statusline (6):** UI statusline features
3. **Learning (2):** Learning curriculum
4. **Stream Chain (2):** Pipeline features
5. **Truth/Verify (3):** Verification tools
6. **All README files:** Category documentation

#### Success Criteria:
- [ ] All 196 commands migrated
- [ ] All README files in place
- [ ] Documentation auto-generated
- [ ] Old structure deprecated
- [ ] Migration complete

---

## Pre-Migration Checklist

### 1. Backup Current State
```bash
# Create backup branch
git checkout -b backup/pre-command-migration
git add -A
git commit -m "Backup before command migration"
git push origin backup/pre-command-migration

# Tag current state
git tag -a v1.0.0-pre-migration -m "State before command migration"
git push origin v1.0.0-pre-migration
```

### 2. Create Feature Branch
```bash
git checkout -b feature/command-organization
```

### 3. Document Current References
```bash
# Find all command references in codebase
rg "\.claude/commands/" -g '!.git' -g '!node_modules' > docs/pre-migration-references.txt

# Find all slash command references
rg "/pm:|/sparc:|/github:|/swarm:" -g '!.git' > docs/slash-command-references.txt
```

### 4. Create Parallel Structure
```bash
# Create new directory structure WITHOUT deleting old
mkdir -p src/cli/commands/{definitions,registry}
mkdir -p src/cli/commands/definitions/{core,workflow,analysis,integrations,utilities,system}
```

---

## Migration Scripts

### Script 1: Create Directory Structure
```bash
#!/bin/bash
# scripts/create-command-structure.sh

set -e

echo "Creating new command directory structure..."

# Core categories
mkdir -p src/cli/commands/definitions/core/{pm,sparc,coordination,swarm}

# Workflow categories
mkdir -p src/cli/commands/definitions/workflow/{github,hive-mind,hooks,automation,workflows,context}

# Analysis categories
mkdir -p src/cli/commands/definitions/analysis/{monitoring,analysis,optimization,memory,training}

# Integration categories
mkdir -p src/cli/commands/definitions/integrations/flow-nexus

# Utility categories
mkdir -p src/cli/commands/definitions/utilities/{pair,statusline,learning,stream-chain,research,truth,verify}

# System categories
mkdir -p src/cli/commands/definitions/system/agents

# Registry
mkdir -p src/cli/commands/registry

echo "✅ Directory structure created"
```

### Script 2: Copy Commands (Phase 1)
```bash
#!/bin/bash
# scripts/migrate-phase1.sh

set -e

echo "📦 Migrating Phase 1: CRITICAL commands"

# System commands
cp .claude/commands/safety-check.md src/cli/commands/definitions/system/
cp .claude/commands/system/agents-list.md src/cli/commands/definitions/system/

# PM core commands
PM_CORE=(
  "init" "prd-new" "epic-start" "epic-decompose" "epic-sync"
  "epic-oneshot" "issue-start" "issue-analyze" "issue-sync"
  "epic-merge" "status" "next" "help" "sync" "validate"
)
for cmd in "${PM_CORE[@]}"; do
  cp ".claude/commands/pm/${cmd}.md" "src/cli/commands/definitions/core/pm/"
done

# SPARC core commands
SPARC_CORE=(
  "orchestrator" "coder" "tester" "tdd" "reviewer"
  "architect" "analyzer" "swarm-coordinator"
)
for cmd in "${SPARC_CORE[@]}"; do
  cp ".claude/commands/sparc/${cmd}.md" "src/cli/commands/definitions/core/sparc/"
done

# Coordination commands
cp .claude/commands/coordination/init.md src/cli/commands/definitions/core/coordination/
cp .claude/commands/coordination/swarm-init.md src/cli/commands/definitions/core/coordination/
cp .claude/commands/coordination/agent-spawn.md src/cli/commands/definitions/core/coordination/
cp .claude/commands/coordination/task-orchestrate.md src/cli/commands/definitions/core/coordination/
cp .claude/commands/coordination/README.md src/cli/commands/definitions/core/coordination/

# Swarm core commands
cp .claude/commands/swarm/swarm-init.md src/cli/commands/definitions/core/swarm/init.md
cp .claude/commands/swarm/swarm-spawn.md src/cli/commands/definitions/core/swarm/spawn.md
cp .claude/commands/swarm/swarm-status.md src/cli/commands/definitions/core/swarm/status.md

echo "✅ Phase 1 migration complete: 33 commands"
```

### Script 3: Update Command References
```bash
#!/bin/bash
# scripts/update-references.sh

set -e

echo "🔄 Updating command references..."

# Update PM command references
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.md" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -exec sed -i 's|\.claude/commands/pm/|src/cli/commands/definitions/core/pm/|g' {} +

# Update SPARC command references
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.md" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -exec sed -i 's|\.claude/commands/sparc/|src/cli/commands/definitions/core/sparc/|g' {} +

# Update coordination command references
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.md" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -exec sed -i 's|\.claude/commands/coordination/|src/cli/commands/definitions/core/coordination/|g' {} +

# Update swarm command references
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.md" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -exec sed -i 's|\.claude/commands/swarm/|src/cli/commands/definitions/core/swarm/|g' {} +

echo "✅ References updated"
```

### Script 4: Generate Command Registry
```bash
#!/bin/bash
# scripts/generate-registry.sh

set -e

echo "📝 Generating command registry..."

cat > src/cli/commands/registry/command-registry.json << 'EOF'
{
  "version": "2.0.0",
  "generated": "2025-01-XX",
  "commands": {},
  "categories": {},
  "workflows": {}
}
EOF

# This will be populated by TypeScript script
node scripts/build-registry.js

echo "✅ Registry generated"
```

### Script 5: Validate Migration
```bash
#!/bin/bash
# scripts/validate-migration.sh

set -e

echo "🔍 Validating migration..."

ERRORS=0

# Check all critical commands exist in new location
CRITICAL_COMMANDS=(
  "src/cli/commands/definitions/core/pm/init.md"
  "src/cli/commands/definitions/core/pm/epic-oneshot.md"
  "src/cli/commands/definitions/core/sparc/tdd.md"
  "src/cli/commands/definitions/core/coordination/swarm-init.md"
  "src/cli/commands/definitions/system/safety-check.md"
)

for cmd in "${CRITICAL_COMMANDS[@]}"; do
  if [ ! -f "$cmd" ]; then
    echo "❌ Missing critical command: $cmd"
    ((ERRORS++))
  else
    echo "✅ Found: $cmd"
  fi
done

# Check no broken references
if grep -r "\.claude/commands/pm/" src/ 2>/dev/null | grep -v "\.git"; then
  echo "⚠️ Found old PM references in src/"
  ((ERRORS++))
fi

if [ $ERRORS -eq 0 ]; then
  echo "✅ Validation passed"
  exit 0
else
  echo "❌ Validation failed with $ERRORS errors"
  exit 1
fi
```

---

## Rollback Procedures

### Emergency Rollback (if critical failure)
```bash
# Immediately switch back to backup branch
git checkout backup/pre-command-migration

# Force deploy (if in production)
git push origin backup/pre-command-migration:main --force-with-lease

# Restore working state
npm install
npm run build
```

### Partial Rollback (if specific phase fails)
```bash
# Revert last phase commits
git revert HEAD~5..HEAD  # Revert last 5 commits

# Or reset to specific phase
git reset --hard <commit-hash-of-last-good-phase>
```

### Gradual Rollback (if issues discovered later)
```bash
# Create symlinks to old locations for backward compatibility
ln -s src/cli/commands/definitions/core/pm .claude/commands/pm-new
ln -s src/cli/commands/definitions/core/sparc .claude/commands/sparc-new

# Update docs to show both paths work
# Deprecate old paths over 2-4 weeks
```

---

## Testing Strategy

### Unit Tests
```typescript
// tests/commands/migration.test.ts
describe('Command Migration', () => {
  it('should load all PM commands from new location', () => {
    const commands = loadCommandsFrom('src/cli/commands/definitions/core/pm');
    expect(commands.length).toBeGreaterThan(30);
  });

  it('should maintain backward compatibility', () => {
    const oldPath = '.claude/commands/pm/epic-oneshot.md';
    const newPath = 'src/cli/commands/definitions/core/pm/epic-oneshot.md';
    expect(resolveCommand(oldPath)).toEqual(resolveCommand(newPath));
  });
});
```

### Integration Tests
```typescript
// tests/workflows/pm-workflow.test.ts
describe('PM Workflow Integration', () => {
  it('should complete full PM workflow', async () => {
    await runCommand('/pm:init');
    await runCommand('/pm:prd-new "Test Feature"');
    await runCommand('/pm:epic-oneshot test-feature');
    const result = await runCommand('/pm:status');
    expect(result).toContain('test-feature');
  });
});
```

### End-to-End Tests
```bash
#!/bin/bash
# tests/e2e/pm-workflow.sh

# Test complete PM workflow
/pm:init
/pm:prd-new "Migration Test Feature"
/pm:epic-oneshot migration-test
/pm:issue-start 1
/pm:status

# Verify all steps succeeded
if [ $? -eq 0 ]; then
  echo "✅ E2E test passed"
else
  echo "❌ E2E test failed"
  exit 1
fi
```

---

## Communication Plan

### Week Before Migration
- [ ] Announce migration plan to team
- [ ] Share documentation and timeline
- [ ] Request feedback on approach
- [ ] Schedule sync meeting

### During Migration
- [ ] Daily standup updates
- [ ] Real-time Slack notifications
- [ ] Status dashboard updates
- [ ] Quick-response support channel

### After Each Phase
- [ ] Phase completion announcement
- [ ] Known issues summary
- [ ] Updated documentation links
- [ ] Feedback collection

### Post-Migration
- [ ] Final migration report
- [ ] Performance comparison
- [ ] Lessons learned document
- [ ] Deprecation timeline for old paths

---

## Success Metrics

### Functional Metrics
- ✅ All 196 commands accessible from new locations
- ✅ Zero broken imports or references
- ✅ All workflows functional (PM, SPARC, GitHub, Swarm)
- ✅ Command registry auto-generated and accurate
- ✅ Documentation complete and accessible

### Performance Metrics
- ✅ Command load time ≤ previous performance
- ✅ Search/discovery time reduced by ≥30%
- ✅ No increase in memory usage
- ✅ Build time unchanged or improved

### Quality Metrics
- ✅ Zero production incidents
- ✅ All tests passing (unit, integration, e2e)
- ✅ Code coverage maintained or improved
- ✅ Duplicate commands reduced by ≥6%

### Adoption Metrics
- ✅ 100% of team using new paths within 2 weeks
- ✅ Documentation views/searches show new paths
- ✅ Old path deprecation warnings logged
- ✅ Zero support tickets about migration

---

## Risk Mitigation

### High Risk: PM Workflow Breaks
**Mitigation:**
- Migrate PM first (Phase 1)
- Extensive testing before deployment
- Keep old paths as symlinks for 2 weeks
- Immediate rollback capability

### Medium Risk: Agent Spawning Fails
**Mitigation:**
- Test coordination commands extensively
- Parallel structure during transition
- Gradual cutover with feature flags
- Monitoring for agent spawn failures

### Low Risk: Documentation Out of Date
**Mitigation:**
- Auto-generate docs from registry
- Update all docs in migration PR
- Documentation review as part of testing
- Clear deprecation notices

---

## Timeline

### Week 1: Phase 1 (CRITICAL)
- **Day 1-2:** Create structure, migrate files
- **Day 3:** Update references, run tests
- **Day 4:** Integration testing, bug fixes
- **Day 5:** Deploy to staging, monitor

### Week 2: Phase 2 (HIGH)
- **Day 1-2:** Migrate GitHub, Hive Mind, Hooks
- **Day 3:** Migrate Automation, Workflows, Context
- **Day 4:** Testing and validation
- **Day 5:** Deploy and monitor

### Week 3: Phase 3 (MEDIUM)
- **Day 1-2:** Migrate Monitoring, Analysis, Optimization
- **Day 3:** Migrate Memory, Training, Flow-Nexus
- **Day 4:** Testing and validation
- **Day 5:** Deploy and monitor

### Week 4: Phase 4 (LOW) + Cleanup
- **Day 1-2:** Migrate remaining utilities
- **Day 3:** Generate all documentation
- **Day 4:** Final testing and validation
- **Day 5:** Deprecate old paths, celebrate! 🎉

---

## Deliverables

### Code
- [ ] All commands in new structure
- [ ] Updated imports and references
- [ ] Command registry (JSON)
- [ ] Migration scripts
- [ ] Test suite updates

### Documentation
- [ ] Migration guide (this document)
- [ ] Command mapping CSV
- [ ] Category documentation (auto-generated)
- [ ] API reference (auto-generated)
- [ ] Deprecation notices

### Operations
- [ ] Backup branch created
- [ ] Rollback procedures tested
- [ ] Monitoring dashboards updated
- [ ] Support playbook created
- [ ] Post-mortem template prepared

---

## Post-Migration Cleanup

### Week 5: Deprecation Period
```bash
# Add deprecation warnings to old paths
echo "⚠️ WARNING: .claude/commands/ is deprecated" >> .claude/commands/README.md
echo "Use: src/cli/commands/definitions/" >> .claude/commands/README.md

# Create symlinks for transition
ln -s ../../../src/cli/commands/definitions/core/pm .claude/commands/pm-new
```

### Week 6-7: Monitoring
- Monitor usage of old vs new paths
- Track and fix any issues
- Collect feedback from team
- Update documentation based on feedback

### Week 8: Remove Old Structure
```bash
# After confirming no usage of old paths
git rm -r .claude/commands/
git commit -m "Remove deprecated command structure"
git push
```

---

## Appendix

### A. Command Count by Phase
- **Phase 1:** 33 commands (17% of total)
- **Phase 2:** 58 commands (30% of total)
- **Phase 3:** 41 commands (21% of total)
- **Phase 4:** 19 commands (10% of total)
- **Documentation:** 45 README files (23% of total)
- **Total:** 196 files

### B. Directory Size Estimates
- **core/:** ~80KB (33 commands)
- **workflow/:** ~140KB (58 commands)
- **analysis/:** ~100KB (41 commands)
- **integrations/:** ~25KB (9 commands)
- **utilities/:** ~50KB (19 commands)
- **system/:** ~15KB (7 files)
- **Total:** ~410KB

### C. Key Stakeholders
- **Owner:** Command Organization Team
- **Reviewers:** Core development team
- **Approvers:** Tech lead, Engineering manager
- **Users:** All developers using CLI

### D. Success Criteria Summary
✅ **Functional:** All workflows operational
✅ **Performance:** ≥ previous speed
✅ **Quality:** Zero incidents, all tests pass
✅ **Adoption:** 100% team using new paths within 2 weeks
