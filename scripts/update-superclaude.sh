#!/bin/bash
# Update SuperClaude framework files in the evolve project

set -e

echo "🔄 Updating SuperClaude framework..."

# Clone latest version
echo "📥 Cloning latest SuperClaude framework..."
cd /tmp
rm -rf superclaude-update
git clone --depth 1 https://github.com/SuperClaude-Org/SuperClaude_Framework.git superclaude-update

# Get version
VERSION=$(grep '^version = ' superclaude-update/pyproject.toml | cut -d'"' -f2)
echo "📦 Latest version: v$VERSION"

# Return to project root
cd - > /dev/null

# Backup existing files
echo "💾 Creating backup..."
BACKUP_DIR=".claude/superclaude-backup-$(date +%Y%m%d-%H%M%S)"
if [ -d ".claude/superclaude" ]; then
    cp -r .claude/superclaude "$BACKUP_DIR"
    echo "   Backup created at: $BACKUP_DIR"
fi

# Create directories
mkdir -p .claude/superclaude/core .claude/superclaude/modes

# Copy files
echo "📋 Copying framework files..."
cp /tmp/superclaude-update/src/superclaude/core/*.md .claude/superclaude/core/
cp /tmp/superclaude-update/src/superclaude/modes/*.md .claude/superclaude/modes/

# Update VERSION file
cat > .claude/superclaude/VERSION << EOF
SuperClaude Framework v$VERSION
Last Updated: $(date +%Y-%m-%d)
Source: https://github.com/SuperClaude-Org/SuperClaude_Framework

This directory contains the SuperClaude framework files for the evolve project.

Core Framework Files:
- PRINCIPLES.md - Software engineering principles
- RULES.md - Behavioral rules and standards
- FLAGS.md - Mode activation flags
- RESEARCH_CONFIG.md - Deep research configuration
- BUSINESS_PANEL_EXAMPLES.md - Business analysis examples
- BUSINESS_SYMBOLS.md - Symbol systems for efficient communication

Behavioral Modes:
- MODE_Brainstorming.md - Collaborative discovery
- MODE_Business_Panel.md - Multi-expert business analysis
- MODE_DeepResearch.md - Systematic investigation
- MODE_Introspection.md - Meta-cognitive analysis
- MODE_Orchestration.md - Intelligent tool selection
- MODE_Task_Management.md - Hierarchical task organization
- MODE_Token_Efficiency.md - Symbol-enhanced communication

To update these files, run: ./scripts/update-superclaude.sh
EOF

# Clean up
echo "🧹 Cleaning up..."
rm -rf /tmp/superclaude-update

# Summary
echo ""
echo "✅ SuperClaude framework updated successfully!"
echo ""
echo "📊 Summary:"
echo "   Version: v$VERSION"
echo "   Core files: $(ls -1 .claude/superclaude/core/*.md | wc -l)"
echo "   Mode files: $(ls -1 .claude/superclaude/modes/*.md | wc -l)"
echo "   Backup: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff .claude/superclaude/"
echo "2. Commit updates: git add .claude/superclaude/ && git commit -m 'chore: update SuperClaude framework to v$VERSION'"
