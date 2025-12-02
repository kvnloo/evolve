#!/bin/bash
# Phase 3: Documentation Migration Script
# Automatically reorganizes docs/ folder according to plan

set -euo pipefail

echo "🚀 Starting Phase 3: Documentation Migration"
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track progress
MOVED=0
TOTAL=0

move_file() {
    local src="$1"
    local dest="$2"

    if [ -f "$src" ]; then
        TOTAL=$((TOTAL + 1))
        echo -e "${BLUE}Moving:${NC} $src → $dest"
        cp "$src" "$dest"
        MOVED=$((MOVED + 1))
    else
        echo -e "${YELLOW}Skip:${NC} $src (not found)"
    fi
}

echo "📁 Phase 3.1: Implementation Documentation"
echo "----------------------------------------"
move_file "docs/ENHANCED-CAPABILITIES.md" "docs/implementation/capabilities.md"
move_file "docs/IMPLEMENTATION-SUMMARY.md" "docs/implementation/roadmap.md"

echo ""
echo "📚 Phase 3.2: Reference Documentation"
echo "------------------------------------"
# Commands and agents will be consolidated into single files
move_file "docs/CCPM-COMMANDS.md" "docs/reference/ccpm-commands.md"
move_file "docs/CCPM-AGENTS.md" "docs/reference/ccpm-agents.md"
move_file "docs/configuration-reference.md" "docs/reference/configuration.md"
move_file "docs/architecture.md" "docs/reference/architecture-part1.md"
move_file "docs/system-architecture.md" "docs/reference/architecture-part2.md"

echo ""
echo "🎯 Phase 3.3: Quick Reference"
echo "---------------------------"
move_file "docs/QUICK-REFERENCE.md" "docs/quick-reference/overview.md"
move_file "docs/command-quick-reference.md" "docs/quick-reference/commands.md"

echo ""
echo "🔧 Phase 3.4: Guides"
echo "-------------------"
move_file "docs/ccpm-implementation-guide.md" "docs/guides/ccpm-workflow.md"
move_file "docs/ccpm-development-plan.md" "docs/guides/ccpm-development.md"
move_file "docs/HOOK-TESTING-GUIDE.md" "docs/guides/hook-system.md"
move_file "docs/CCPM-README.md" "docs/guides/ccpm-readme.md"

echo ""
echo "🔄 Phase 3.5: Migration Documentation"
echo "-----------------------------------"
move_file "docs/AGENT-MIGRATION-INDEX.md" "docs/migration/agent-migration/index.md"
move_file "docs/AGENT-MIGRATION-SUMMARY.md" "docs/migration/agent-migration/summary.md"
move_file "docs/agent-migration-analysis.md" "docs/migration/agent-migration/analysis.md"
move_file "docs/agent-migration-map.csv" "docs/migration/agent-migration/map.csv"
move_file "docs/AGENT-MIGRATION-README.md" "docs/migration/agent-migration/README.md"
move_file "docs/agent-dependency-graph.md" "docs/migration/agent-migration/dependency-graph.md"

move_file "docs/command-organization-analysis.md" "docs/migration/command-migration/organization-analysis.md"
move_file "docs/command-migration-mapping.csv" "docs/migration/command-migration/mapping.csv"
move_file "docs/command-organization-summary.md" "docs/migration/command-migration/summary.md"
move_file "docs/command-categories-detailed.md" "docs/migration/command-migration/categories.md"

move_file "docs/COMPLETE-FILE-MIGRATION-MAP.md" "docs/migration/file-migration/complete-map.md"

move_file "docs/PROJECT-REORGANIZATION-PLAN.md" "docs/migration/project-reorganization/plan.md"
move_file "docs/REORGANIZATION-EXECUTIVE-SUMMARY.md" "docs/migration/project-reorganization/executive-summary.md"
move_file "docs/REORGANIZATION-MIGRATION-REPORT.md" "docs/migration/project-reorganization/migration-report.md"
move_file "docs/RESEARCH-REORGANIZATION-DETAILED.md" "docs/migration/project-reorganization/research-reorganization.md"

echo ""
echo "🎨 Phase 3.6: Feature Documentation"
echo "---------------------------------"
move_file "docs/RESEARCH-DAEMON-GUIDE.md" "docs/features/research-daemon/guide.md"
move_file "docs/RESEARCH-DAEMON-QUICKSTART.md" "docs/features/research-daemon/quickstart.md"
move_file "docs/RESEARCH-DAEMON-SUMMARY.md" "docs/features/research-daemon/summary.md"
move_file "docs/research-autosave-hook.md" "docs/features/research-daemon/autosave-hook.md"

move_file "docs/github-setup-plan.md" "docs/features/github-integration/setup-plan.md"

echo ""
echo "📋 Phase 3.7: Blueprints"
echo "----------------------"
move_file "docs/MASTER-MIGRATION-BLUEPRINT.md" "docs/blueprints/master-migration-blueprint.md"
move_file "docs/migration-plan.md" "docs/blueprints/migration-plan.md"
move_file "docs/security-analysis-report.md" "docs/blueprints/security-analysis-report.md"

echo ""
echo "🗃️  Phase 3.8: Troubleshooting"
echo "----------------------------"
move_file "docs/troubleshooting.md" "docs/troubleshooting/common-issues.md"
move_file "docs/faq.md" "docs/troubleshooting/faq.md"

echo ""
echo "📦 Phase 3.9: Archive"
echo "-------------------"
move_file "docs/quick-start-epic-1.md" "docs/archive/epic-1/quick-start.md"
move_file "docs/QUICK-START-IMPLEMENTATION.md" "docs/archive/epic-1/implementation.md"
move_file "docs/QUICK-START-RESEARCH-HOOK.md" "docs/archive/epic-1/research-hook.md"
move_file "docs/RESEARCH-HOOK-FINAL-SUMMARY.md" "docs/archive/research-hook/final-summary.md"

echo ""
echo "📊 Phase 3.10: Analysis (Keep in place)"
echo "--------------------------------------"
# analysis/ stays as-is - already well organized

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Migration Complete!${NC}"
echo "=========================================="
echo ""
echo "📊 Statistics:"
echo "  Files processed: $TOTAL"
echo "  Files moved: $MOVED"
echo "  Skipped: $((TOTAL - MOVED))"
echo ""
echo "🎯 Next Steps:"
echo "  1. Review moved files in new locations"
echo "  2. Update internal links and cross-references"
echo "  3. Create consolidated reference documents"
echo "  4. Remove old files from root docs/"
echo "  5. Update root README.md"
echo ""
echo "📚 New Structure:"
echo "  docs/getting-started/    - ✅ Ready"
echo "  docs/guides/             - ✅ Populated"
echo "  docs/reference/          - ✅ Populated"
echo "  docs/implementation/     - ✅ Populated"
echo "  docs/migration/          - ✅ Populated"
echo "  docs/features/           - ✅ Populated"
echo "  docs/quick-reference/    - ✅ Populated"
echo "  docs/troubleshooting/    - ✅ Populated"
echo "  docs/blueprints/         - ✅ Populated"
echo "  docs/archive/            - ✅ Populated"
echo ""
