#!/bin/bash
# Agent Migration Script
# Migrates all 78 agent files from .claude/agents to src/agents with proper structure

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_DIR="$PROJECT_ROOT/.claude/agents"
TARGET_DIR="$PROJECT_ROOT/src/agents"
BACKUP_DIR="$PROJECT_ROOT/.claude-backup/agents-$(date +%Y%m%d-%H%M%S)"
LOG_FILE="$PROJECT_ROOT/docs/agent-migration.log"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

# Create backup
backup_agents() {
    log "Creating backup of current agents..."
    mkdir -p "$BACKUP_DIR"
    cp -r "$SOURCE_DIR"/* "$BACKUP_DIR/"
    log "Backup created at: $BACKUP_DIR"
}

# Create target directory structure
create_structure() {
    log "Creating target directory structure..."

    mkdir -p "$TARGET_DIR/definitions/core"
    mkdir -p "$TARGET_DIR/definitions/specialized/analysis"
    mkdir -p "$TARGET_DIR/definitions/specialized/architecture"
    mkdir -p "$TARGET_DIR/definitions/specialized/backend"
    mkdir -p "$TARGET_DIR/definitions/specialized/devops"
    mkdir -p "$TARGET_DIR/definitions/specialized/documentation"
    mkdir -p "$TARGET_DIR/definitions/specialized/ml"
    mkdir -p "$TARGET_DIR/definitions/specialized/mobile"
    mkdir -p "$TARGET_DIR/definitions/specialized/neural"
    mkdir -p "$TARGET_DIR/definitions/specialized/scaffolding"
    mkdir -p "$TARGET_DIR/definitions/specialized/testing"
    mkdir -p "$TARGET_DIR/definitions/coordination/consensus"
    mkdir -p "$TARGET_DIR/definitions/coordination/hive-mind"
    mkdir -p "$TARGET_DIR/definitions/coordination/performance"
    mkdir -p "$TARGET_DIR/definitions/coordination/security"
    mkdir -p "$TARGET_DIR/definitions/coordination/swarm"
    mkdir -p "$TARGET_DIR/definitions/github"
    mkdir -p "$TARGET_DIR/definitions/platform/flow-nexus"
    mkdir -p "$TARGET_DIR/definitions/meta/planning"
    mkdir -p "$TARGET_DIR/definitions/meta/reasoning"
    mkdir -p "$TARGET_DIR/definitions/meta/sparc"
    mkdir -p "$TARGET_DIR/definitions/meta/templates"
    mkdir -p "$TARGET_DIR/registry"

    log "Directory structure created"
}

# Migration function
migrate_file() {
    local source="$1"
    local target="$2"
    local display_source="${source#$PROJECT_ROOT/}"
    local display_target="${target#$PROJECT_ROOT/}"

    if [ -f "$source" ]; then
        cp "$source" "$target"
        info "✓ $display_source → $display_target"
    else
        warn "✗ Source file not found: $display_source"
    fi
}

# Migrate all agents
migrate_agents() {
    log "Starting agent migration..."

    # Core agents (5)
    info "Migrating CORE agents (5)..."
    migrate_file "$SOURCE_DIR/core/coder.md" "$TARGET_DIR/definitions/core/coder.md"
    migrate_file "$SOURCE_DIR/core/planner.md" "$TARGET_DIR/definitions/core/planner.md"
    migrate_file "$SOURCE_DIR/core/researcher.md" "$TARGET_DIR/definitions/core/researcher.md"
    migrate_file "$SOURCE_DIR/core/reviewer.md" "$TARGET_DIR/definitions/core/reviewer.md"
    migrate_file "$SOURCE_DIR/core/tester.md" "$TARGET_DIR/definitions/core/tester.md"

    # Specialized - Analysis (2)
    info "Migrating SPECIALIZED/ANALYSIS agents (2)..."
    migrate_file "$SOURCE_DIR/analysis/code-analyzer.md" "$TARGET_DIR/definitions/specialized/analysis/code-analyzer.md"
    migrate_file "$SOURCE_DIR/analysis/code-review/analyze-code-quality.md" "$TARGET_DIR/definitions/specialized/analysis/code-quality-analyzer.md"

    # Specialized - Architecture (1)
    info "Migrating SPECIALIZED/ARCHITECTURE agents (1)..."
    migrate_file "$SOURCE_DIR/architecture/system-design/arch-system-design.md" "$TARGET_DIR/definitions/specialized/architecture/system-architect.md"

    # Specialized - Backend (1)
    info "Migrating SPECIALIZED/BACKEND agents (1)..."
    migrate_file "$SOURCE_DIR/development/backend/dev-backend-api.md" "$TARGET_DIR/definitions/specialized/backend/backend-api-developer.md"

    # Specialized - DevOps (1)
    info "Migrating SPECIALIZED/DEVOPS agents (1)..."
    migrate_file "$SOURCE_DIR/devops/ci-cd/ops-cicd-github.md" "$TARGET_DIR/definitions/specialized/devops/cicd-engineer.md"

    # Specialized - Documentation (1)
    info "Migrating SPECIALIZED/DOCUMENTATION agents (1)..."
    migrate_file "$SOURCE_DIR/documentation/api-docs/docs-api-openapi.md" "$TARGET_DIR/definitions/specialized/documentation/api-documentation-specialist.md"

    # Specialized - ML (1)
    info "Migrating SPECIALIZED/ML agents (1)..."
    migrate_file "$SOURCE_DIR/data/ml/data-ml-model.md" "$TARGET_DIR/definitions/specialized/ml/ml-model-specialist.md"

    # Specialized - Mobile (1)
    info "Migrating SPECIALIZED/MOBILE agents (1)..."
    migrate_file "$SOURCE_DIR/specialized/mobile/spec-mobile-react-native.md" "$TARGET_DIR/definitions/specialized/mobile/react-native-specialist.md"

    # Specialized - Neural (1)
    info "Migrating SPECIALIZED/NEURAL agents (1)..."
    migrate_file "$SOURCE_DIR/neural/safla-neural.md" "$TARGET_DIR/definitions/specialized/neural/safla-neural-specialist.md"

    # Specialized - Scaffolding (1)
    info "Migrating SPECIALIZED/SCAFFOLDING agents (1)..."
    migrate_file "$SOURCE_DIR/base-template-generator.md" "$TARGET_DIR/definitions/specialized/scaffolding/template-generator.md"

    # Specialized - Testing (2)
    info "Migrating SPECIALIZED/TESTING agents (2)..."
    migrate_file "$SOURCE_DIR/testing/unit/tdd-london-swarm.md" "$TARGET_DIR/definitions/specialized/testing/tdd-london-swarm.md"
    migrate_file "$SOURCE_DIR/testing/validation/production-validator.md" "$TARGET_DIR/definitions/specialized/testing/production-validator.md"

    # Coordination - Consensus (6)
    info "Migrating COORDINATION/CONSENSUS agents (6)..."
    migrate_file "$SOURCE_DIR/consensus/byzantine-coordinator.md" "$TARGET_DIR/definitions/coordination/consensus/byzantine-coordinator.md"
    migrate_file "$SOURCE_DIR/consensus/crdt-synchronizer.md" "$TARGET_DIR/definitions/coordination/consensus/crdt-synchronizer.md"
    migrate_file "$SOURCE_DIR/consensus/gossip-coordinator.md" "$TARGET_DIR/definitions/coordination/consensus/gossip-coordinator.md"
    migrate_file "$SOURCE_DIR/consensus/quorum-manager.md" "$TARGET_DIR/definitions/coordination/consensus/quorum-manager.md"
    migrate_file "$SOURCE_DIR/consensus/raft-manager.md" "$TARGET_DIR/definitions/coordination/consensus/raft-manager.md"
    migrate_file "$SOURCE_DIR/consensus/security-manager.md" "$TARGET_DIR/definitions/coordination/security/security-manager.md"

    # Coordination - Hive Mind (5)
    info "Migrating COORDINATION/HIVE-MIND agents (5)..."
    migrate_file "$SOURCE_DIR/hive-mind/collective-intelligence-coordinator.md" "$TARGET_DIR/definitions/coordination/hive-mind/collective-intelligence-coordinator.md"
    migrate_file "$SOURCE_DIR/hive-mind/queen-coordinator.md" "$TARGET_DIR/definitions/coordination/hive-mind/queen-coordinator.md"
    migrate_file "$SOURCE_DIR/hive-mind/scout-explorer.md" "$TARGET_DIR/definitions/coordination/hive-mind/scout-explorer.md"
    migrate_file "$SOURCE_DIR/hive-mind/swarm-memory-manager.md" "$TARGET_DIR/definitions/coordination/hive-mind/swarm-memory-manager.md"
    migrate_file "$SOURCE_DIR/hive-mind/worker-specialist.md" "$TARGET_DIR/definitions/coordination/hive-mind/worker-specialist.md"

    # Coordination - Performance (6)
    info "Migrating COORDINATION/PERFORMANCE agents (6)..."
    migrate_file "$SOURCE_DIR/optimization/benchmark-suite.md" "$TARGET_DIR/definitions/coordination/performance/benchmark-suite.md"
    migrate_file "$SOURCE_DIR/optimization/load-balancer.md" "$TARGET_DIR/definitions/coordination/performance/load-balancer.md"
    migrate_file "$SOURCE_DIR/consensus/performance-benchmarker.md" "$TARGET_DIR/definitions/coordination/performance/performance-benchmarker.md"
    migrate_file "$SOURCE_DIR/optimization/performance-monitor.md" "$TARGET_DIR/definitions/coordination/performance/performance-monitor.md"
    migrate_file "$SOURCE_DIR/optimization/resource-allocator.md" "$TARGET_DIR/definitions/coordination/performance/resource-allocator.md"
    migrate_file "$SOURCE_DIR/optimization/topology-optimizer.md" "$TARGET_DIR/definitions/coordination/performance/topology-optimizer.md"

    # Coordination - Swarm (3)
    info "Migrating COORDINATION/SWARM agents (3)..."
    migrate_file "$SOURCE_DIR/swarm/adaptive-coordinator.md" "$TARGET_DIR/definitions/coordination/swarm/adaptive-coordinator.md"
    migrate_file "$SOURCE_DIR/swarm/hierarchical-coordinator.md" "$TARGET_DIR/definitions/coordination/swarm/hierarchical-coordinator.md"
    migrate_file "$SOURCE_DIR/swarm/mesh-coordinator.md" "$TARGET_DIR/definitions/coordination/swarm/mesh-coordinator.md"

    # GitHub (13)
    info "Migrating GITHUB agents (13)..."
    migrate_file "$SOURCE_DIR/github/code-review-swarm.md" "$TARGET_DIR/definitions/github/code-review-swarm.md"
    migrate_file "$SOURCE_DIR/github/github-modes.md" "$TARGET_DIR/definitions/github/github-modes.md"
    migrate_file "$SOURCE_DIR/github/issue-tracker.md" "$TARGET_DIR/definitions/github/issue-tracker.md"
    migrate_file "$SOURCE_DIR/github/multi-repo-swarm.md" "$TARGET_DIR/definitions/github/multi-repo-swarm.md"
    migrate_file "$SOURCE_DIR/github/pr-manager.md" "$TARGET_DIR/definitions/github/pr-manager.md"
    migrate_file "$SOURCE_DIR/github/project-board-sync.md" "$TARGET_DIR/definitions/github/project-board-sync.md"
    migrate_file "$SOURCE_DIR/github/release-manager.md" "$TARGET_DIR/definitions/github/release-manager.md"
    migrate_file "$SOURCE_DIR/github/release-swarm.md" "$TARGET_DIR/definitions/github/release-swarm.md"
    migrate_file "$SOURCE_DIR/github/repo-architect.md" "$TARGET_DIR/definitions/github/repo-architect.md"
    migrate_file "$SOURCE_DIR/github/swarm-issue.md" "$TARGET_DIR/definitions/github/swarm-issue.md"
    migrate_file "$SOURCE_DIR/github/swarm-pr.md" "$TARGET_DIR/definitions/github/swarm-pr.md"
    migrate_file "$SOURCE_DIR/github/sync-coordinator.md" "$TARGET_DIR/definitions/github/sync-coordinator.md"
    migrate_file "$SOURCE_DIR/github/workflow-automation.md" "$TARGET_DIR/definitions/github/workflow-automation.md"

    # Platform - Flow Nexus (9)
    info "Migrating PLATFORM/FLOW-NEXUS agents (9)..."
    migrate_file "$SOURCE_DIR/flow-nexus/app-store.md" "$TARGET_DIR/definitions/platform/flow-nexus/app-store-manager.md"
    migrate_file "$SOURCE_DIR/flow-nexus/authentication.md" "$TARGET_DIR/definitions/platform/flow-nexus/authentication-manager.md"
    migrate_file "$SOURCE_DIR/flow-nexus/challenges.md" "$TARGET_DIR/definitions/platform/flow-nexus/challenge-coordinator.md"
    migrate_file "$SOURCE_DIR/flow-nexus/neural-network.md" "$TARGET_DIR/definitions/platform/flow-nexus/neural-network-specialist.md"
    migrate_file "$SOURCE_DIR/flow-nexus/payments.md" "$TARGET_DIR/definitions/platform/flow-nexus/payment-coordinator.md"
    migrate_file "$SOURCE_DIR/flow-nexus/sandbox.md" "$TARGET_DIR/definitions/platform/flow-nexus/sandbox-manager.md"
    migrate_file "$SOURCE_DIR/flow-nexus/swarm.md" "$TARGET_DIR/definitions/platform/flow-nexus/swarm-orchestrator.md"
    migrate_file "$SOURCE_DIR/flow-nexus/user-tools.md" "$TARGET_DIR/definitions/platform/flow-nexus/user-tools-manager.md"
    migrate_file "$SOURCE_DIR/flow-nexus/workflow.md" "$TARGET_DIR/definitions/platform/flow-nexus/workflow-coordinator.md"

    # Meta - Planning (3)
    info "Migrating META/PLANNING agents (3)..."
    migrate_file "$SOURCE_DIR/goal/code-goal-planner.md" "$TARGET_DIR/definitions/meta/planning/code-goal-planner.md"
    migrate_file "$SOURCE_DIR/goal/goal-planner.md" "$TARGET_DIR/definitions/meta/planning/goal-planner.md"
    migrate_file "$SOURCE_DIR/reasoning/goal-planner.md" "$TARGET_DIR/definitions/meta/planning/reasoning-goal-planner.md"

    # Meta - Reasoning (3)
    info "Migrating META/REASONING agents (3)..."
    migrate_file "$SOURCE_DIR/reasoning/agent.md" "$TARGET_DIR/definitions/meta/reasoning/reasoning-agent.md"
    migrate_file "$SOURCE_DIR/reasoning/example-reasoning-agent-template.md" "$TARGET_DIR/definitions/meta/reasoning/reasoning-template.md"
    migrate_file "$SOURCE_DIR/reasoning/README.md" "$TARGET_DIR/definitions/meta/reasoning/README.md"

    # Meta - SPARC (4)
    info "Migrating META/SPARC agents (4)..."
    migrate_file "$SOURCE_DIR/sparc/architecture.md" "$TARGET_DIR/definitions/meta/sparc/architecture-specialist.md"
    migrate_file "$SOURCE_DIR/sparc/pseudocode.md" "$TARGET_DIR/definitions/meta/sparc/pseudocode-specialist.md"
    migrate_file "$SOURCE_DIR/sparc/refinement.md" "$TARGET_DIR/definitions/meta/sparc/refinement-specialist.md"
    migrate_file "$SOURCE_DIR/sparc/specification.md" "$TARGET_DIR/definitions/meta/sparc/specification-specialist.md"

    # Meta - Templates (9)
    info "Migrating META/TEMPLATES agents (9)..."
    migrate_file "$SOURCE_DIR/templates/automation-smart-agent.md" "$TARGET_DIR/definitions/meta/templates/smart-agent-template.md"
    migrate_file "$SOURCE_DIR/templates/coordinator-swarm-init.md" "$TARGET_DIR/definitions/meta/templates/swarm-init-template.md"
    migrate_file "$SOURCE_DIR/templates/github-pr-manager.md" "$TARGET_DIR/definitions/meta/templates/github-pr-template.md"
    migrate_file "$SOURCE_DIR/templates/implementer-sparc-coder.md" "$TARGET_DIR/definitions/meta/templates/sparc-coder-template.md"
    migrate_file "$SOURCE_DIR/templates/memory-coordinator.md" "$TARGET_DIR/definitions/meta/templates/memory-coordinator-template.md"
    migrate_file "$SOURCE_DIR/templates/migration-plan.md" "$TARGET_DIR/definitions/meta/templates/migration-plan-template.md"
    migrate_file "$SOURCE_DIR/templates/orchestrator-task.md" "$TARGET_DIR/definitions/meta/templates/task-orchestrator-template.md"
    migrate_file "$SOURCE_DIR/templates/performance-analyzer.md" "$TARGET_DIR/definitions/meta/templates/performance-analyzer-template.md"
    migrate_file "$SOURCE_DIR/templates/sparc-coordinator.md" "$TARGET_DIR/definitions/meta/templates/sparc-coordinator-template.md"

    log "Agent migration completed!"
}

# Count migrated files
count_files() {
    local count=$(find "$TARGET_DIR/definitions" -name "*.md" | wc -l)
    log "Total files migrated: $count"

    if [ "$count" -eq 78 ]; then
        log "✓ All 78 agents successfully migrated!"
    else
        warn "⚠ Expected 78 agents, found $count"
    fi
}

# Validate migration
validate_migration() {
    log "Validating migration..."

    local errors=0

    # Check critical agents
    local critical_agents=(
        "definitions/core/coder.md"
        "definitions/core/planner.md"
        "definitions/coordination/swarm/adaptive-coordinator.md"
        "definitions/github/github-modes.md"
        "definitions/coordination/hive-mind/collective-intelligence-coordinator.md"
    )

    for agent in "${critical_agents[@]}"; do
        if [ ! -f "$TARGET_DIR/$agent" ]; then
            error "Critical agent missing: $agent"
            ((errors++))
        fi
    done

    if [ $errors -eq 0 ]; then
        log "✓ Validation passed - all critical agents present"
    else
        error "✗ Validation failed - $errors critical agents missing"
        exit 1
    fi
}

# Generate migration report
generate_report() {
    log "Generating migration report..."

    local report_file="$PROJECT_ROOT/docs/agent-migration-report.md"

    cat > "$report_file" << EOF
# Agent Migration Report

**Date**: $(date +'%Y-%m-%d %H:%M:%S')
**Status**: Completed

## Summary

- **Total Agents**: 78
- **Source**: \`.claude/agents/\`
- **Target**: \`src/agents/\`
- **Backup**: \`$BACKUP_DIR\`

## Migration Results

\`\`\`
$(find "$TARGET_DIR/definitions" -name "*.md" | wc -l) files successfully migrated
\`\`\`

## Directory Structure

\`\`\`
$(tree -L 3 "$TARGET_DIR" 2>/dev/null || find "$TARGET_DIR" -type d | head -20)
\`\`\`

## Agent Count by Category

- **Core**: $(find "$TARGET_DIR/definitions/core" -name "*.md" 2>/dev/null | wc -l)
- **Specialized**: $(find "$TARGET_DIR/definitions/specialized" -name "*.md" 2>/dev/null | wc -l)
- **Coordination**: $(find "$TARGET_DIR/definitions/coordination" -name "*.md" 2>/dev/null | wc -l)
- **GitHub**: $(find "$TARGET_DIR/definitions/github" -name "*.md" 2>/dev/null | wc -l)
- **Platform**: $(find "$TARGET_DIR/definitions/platform" -name "*.md" 2>/dev/null | wc -l)
- **Meta**: $(find "$TARGET_DIR/definitions/meta" -name "*.md" 2>/dev/null | wc -l)

## Log File

Full migration log: \`$LOG_FILE\`

## Next Steps

1. Review migrated files
2. Update cross-references
3. Generate agent registry
4. Update CLI tooling
5. Run integration tests
6. Remove old directory
EOF

    log "Report generated: $report_file"
}

# Main execution
main() {
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║          Agent Migration Script - 78 Agents               ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""

    # Initialize log
    echo "Agent Migration Log - $(date)" > "$LOG_FILE"

    log "Starting agent migration process..."

    # Execute migration steps
    backup_agents
    create_structure
    migrate_agents
    count_files
    validate_migration
    generate_report

    echo ""
    log "═══════════════════════════════════════════════════════════"
    log "Migration completed successfully!"
    log "═══════════════════════════════════════════════════════════"
    log "Backup: $BACKUP_DIR"
    log "Target: $TARGET_DIR"
    log "Log: $LOG_FILE"
    echo ""
}

# Run main function
main "$@"
