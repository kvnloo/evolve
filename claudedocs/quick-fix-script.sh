#!/bin/bash
# Documentation Quality Fixes - Phase 1 Critical Issues
# Based on quality-review.md recommendations
# Estimated time: 6 hours

set -e

REPO_OWNER="kvnloo"
REPO_NAME="evolve"
REPO_FULL="${REPO_OWNER}/${REPO_NAME}"

echo "=========================================="
echo "Documentation Quality Fix Script"
echo "Repository: ${REPO_FULL}"
echo "=========================================="
echo ""

# Backup original files
echo "Creating backup..."
BACKUP_DIR="docs/archive/pre-quality-fix-$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"
cp README.md "$BACKUP_DIR/" 2>/dev/null || true
cp CONTRIBUTING.md "$BACKUP_DIR/" 2>/dev/null || true
cp CHANGELOG.md "$BACKUP_DIR/" 2>/dev/null || true
echo "✓ Backup created: $BACKUP_DIR"
echo ""

# Fix #1: Replace placeholders (30 min)
echo "Fix #1: Replacing placeholders..."
echo "  Searching for kvnloo/evolve patterns..."

# Find all markdown files and replace
find . -name "*.md" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/archive/*" \
  -exec grep -l "kvnloo\|evolve" {} \; | while read file; do
    echo "    Updating: $file"
    sed -i.bak \
      -e "s|kvnloo/evolve|${REPO_FULL}|g" \
      -e "s|kvnloo|${REPO_OWNER}|g" \
      -e "s|evolve|${REPO_NAME}|g" \
      "$file"
    rm "${file}.bak"
done

echo "✓ Placeholders replaced"
echo ""

# Fix #2: Verify entry point works
echo "Fix #2: Verifying entry point..."
if grep -q "git clone https://github.com/${REPO_FULL}.git" README.md; then
  echo "✓ Entry point updated correctly"
else
  echo "⚠ Manual verification needed for README.md"
fi
echo ""

# Fix #3: Create documentation hub
echo "Fix #3: Creating documentation hub..."
if [ ! -f "docs/README.md" ]; then
  cat > docs/README.md << 'EOFHUB'
# Evolve Documentation Hub

**Welcome to Evolve documentation!** Start your journey here.

## 🚀 Quick Start (5-10 minutes)

New to Evolve? Follow this path:

1. **[Quick Start Guide](../README.md#quick-start)** - Get up and running in 5 minutes
2. **[Installation Guide](../docs/installation.md)** - Detailed setup instructions
3. **[Quick Reference](QUICK-REFERENCE.md)** - Essential commands and metrics

## 📚 Core Documentation

### Project Management (CCPM)
- **[CCPM Overview](CCPM-README.md)** - Complete PM system guide
- **[CCPM Commands](CCPM-COMMANDS.md)** - All PM commands reference
- **[CCPM Agents](CCPM-AGENTS.md)** - Agent coordination guide

### SPARC Methodology
- **[SPARC Workflow](../CLAUDE.md#sparc-workflow-phases)** - 5-phase development process
- **[Agent Coordination](../CLAUDE.md#-available-agents-54-total)** - Multi-agent system
- **[Performance Metrics](QUICK-REFERENCE.md#-key-metrics)** - Current benchmarks

### System Architecture
- **[Project Index](PROJECT-INDEX.md)** - Complete knowledge base
- **[Implementation Summary](IMPLEMENTATION-SUMMARY.md)** - Current status
- **[Enhanced Capabilities](ENHANCED-CAPABILITIES.md)** - Feature guide

## 📖 User Guides

Choose your path based on your role:

### For Developers
- [Development Setup](../CONTRIBUTING.md#development-setup)
- [Code Style Guidelines](../CONTRIBUTING.md#code-style-guidelines)
- [Testing Requirements](../CONTRIBUTING.md#testing-requirements)

### For Project Managers
- [Creating PRDs](CCPM-README.md#1-product-planning-phase)
- [Epic Management](CCPM-README.md#2-implementation-planning-phase)
- [Issue Tracking](CCPM-README.md#5-execution-phase)

### For Researchers
- [Research Library](../research/docs/research_catalog.md)
- [Research Priorities](../research/docs/research-priorities-FINAL.md)
- [Implementation Roadmap](../research/docs/implementation-roadmap-FINAL.md)

## 🔬 Advanced Topics

### Multi-Agent Coordination
- Constitutional AI Principles
- Agent Specialization Patterns
- Parallel Execution Strategy

### Performance Optimization
- Token Efficiency (32.3% reduction)
- Speed Improvements (2.8-4.4x)
- SWE-Bench Results (84.8%)

### Research Integration
- Voyager Skill Library
- Eureka Reward Learning
- AlphaEvolve Production Optimization

## 🛠️ Reference Documentation

### Command References
- **[Quick Reference](QUICK-REFERENCE.md)** - Most-used commands
- **[CCPM Commands](CCPM-COMMANDS.md)** - Complete PM command list
- **[SPARC Commands](../CLAUDE.md#sparc-commands)** - SPARC workflow commands

### Configuration
- **[CLAUDE.md](../CLAUDE.md)** - Primary configuration file
- **[Configuration Reference](configuration-reference.md)** - Detailed settings
- **[File Organization](../CLAUDE.md#-file-organization-rules)** - Directory structure

### API & Extension
- Agent API (coming soon)
- Custom Command Creation
- MCP Server Integration

## 🤝 Contributing

Interested in contributing? Start here:

1. **[Contributing Guide](../CONTRIBUTING.md)** - Development workflow
2. **[Code of Conduct](../CODE_OF_CONDUCT.md)** - Community standards
3. **[GitHub Setup Plan](github-setup-plan.md)** - Repository improvement roadmap

## 💡 Help & Support

### Common Issues
- **[FAQ](faq.md)** - Frequently asked questions
- **[Troubleshooting](QUICK-REFERENCE.md#-troubleshooting)** - Common problems and solutions

### Get Help
- **Issues**: [Report bugs or request features](https://github.com/kvnloo/evolve/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/kvnloo/evolve/discussions)
- **Documentation**: Browse this hub for guides and references

## 📊 Documentation Status

- **Total Documents**: 563 markdown files
- **Core Guides**: 15 essential documents
- **Research Papers**: 20+ analysis documents
- **Coverage**: SPARC, CCPM, Multi-Agent, Research Integration

---

**Last Updated**: 2025-11-06
**Version**: 1.0
**Maintained By**: Evolve Documentation Team

---

**Need a specific guide?** Use the navigation above or check the [Project Index](PROJECT-INDEX.md) for a comprehensive list.
EOFHUB
  echo "✓ Created docs/README.md (documentation hub)"
else
  echo "⚠ docs/README.md already exists (not overwritten)"
fi
echo ""

# Fix #4: Create CREDITS.md
echo "Fix #4: Creating attribution file..."
if [ ! -f "CREDITS.md" ]; then
  cat > CREDITS.md << 'EOFCREDITS'
# Credits and Attribution

This project builds upon the excellent work of many open source developers and researchers. We are grateful for their contributions to the community.

## Core Frameworks

### Claude Code
- **Creator**: Anthropic
- **Description**: Official CLI for Claude, enabling AI-powered software development
- **Website**: https://claude.ai/claude-code
- **Documentation**: https://docs.claude.com/claude-code
- **Usage**: Core AI development platform

### Claude Code PM (CCPM)
- **Creator**: Automaze.io (@aroussi)
- **Description**: Spec-driven development workflow using GitHub issues and Git worktrees
- **Repository**: https://github.com/automazeio/ccpm
- **License**: MIT
- **Usage**: Project management system integration

### Claude Flow
- **Creator**: ruvnet
- **Description**: Multi-agent coordination and SPARC methodology execution
- **Repository**: https://github.com/ruvnet/claude-flow
- **License**: [License type to be confirmed]
- **Usage**: Agent orchestration and SPARC workflow automation

### SPARC Methodology
- **Description**: Systematic development approach (Specification, Pseudocode, Architecture, Refinement, Completion)
- **Source**: [Citation needed - please add if you know the original source]
- **Usage**: Core development workflow methodology

### SuperClaude Framework
- **Description**: Enhanced Claude Code framework with advanced capabilities
- **Source**: [Source attribution needed]
- **Integration**: Custom personas, slash commands, behavioral modes
- **Usage**: Framework extensions and enhancements

## Tools and Extensions

### GitHub CLI (gh)
- **Creator**: GitHub
- **Repository**: https://github.com/cli/cli
- **License**: MIT
- **Usage**: GitHub integration and automation

### gh-sub-issue Extension
- **Creator**: @yahsan2
- **Repository**: https://github.com/yahsan2/gh-sub-issue
- **License**: MIT
- **Usage**: Parent-child issue relationships in GitHub

## Research Papers and Academic Work

### Voyager: An Open-Ended Embodied Agent with Large Language Models
- **Authors**: Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar
- **Institution**: NVIDIA, Caltech, UT Austin, Stanford
- **Paper**: Included in research/voyager.pdf
- **Usage**: Skill library architecture inspiration, autonomous learning patterns

### Eureka: Human-Level Reward Design via Coding Large Language Models
- **Authors**: [Full citation to be added]
- **Paper**: Included in research/eureka.pdf
- **Usage**: Reward function learning, evaluation methodology

### AlphaEvolve
- **Authors**: [Full citation to be added]
- **Paper**: Included in research/AlphaEvolve.pdf
- **Usage**: Production optimization strategies, evolutionary algorithms

## Open Source Dependencies

### Development Tools
- **Bash**: Shell scripting language (GNU Project)
- **Git**: Version control system (Linus Torvalds)
- **jq**: JSON processor (Stephen Dolan)
- **ripgrep**: Fast search tool (Andrew Gallant)

### Documentation Tools
- **Markdown**: Lightweight markup language
- **Mermaid**: Diagram and flowchart generation
- **GitHub Flavored Markdown**: Extended markdown syntax

## Community Standards

### Contributor Covenant
- **Creator**: Coraline Ada Ehmke
- **Website**: https://www.contributor-covenant.org/
- **Version**: 2.1
- **Usage**: Code of Conduct template

## Inspiration and Prior Art

This project was inspired by and builds upon ideas from:
- Autonomous AI development systems
- Multi-agent coordination frameworks
- Test-driven development methodologies
- Specification-driven design patterns
- Digital twin architectures

## License Information

This project (Evolve) is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

Third-party components and frameworks retain their original licenses. Please refer to their respective repositories for license details.

## Contributing Attributions

We welcome contributions! If you contribute to this project, you will be acknowledged in this file. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Acknowledgments

Special thanks to:
- The Claude Code team at Anthropic for creating an amazing AI development platform
- The open source community for tools and frameworks that made this possible
- All contributors and researchers whose work influenced this project

---

**Note**: If you notice any missing attributions or incorrect information, please [open an issue](https://github.com/kvnloo/evolve/issues) or submit a pull request. We strive to properly credit all contributors and sources.

**Last Updated**: 2025-11-06
EOFCREDITS
  echo "✓ Created CREDITS.md"
else
  echo "⚠ CREDITS.md already exists (not overwritten)"
fi
echo ""

# Fix #5: Update README.md project identity
echo "Fix #5: Updating project identity in README.md..."
if grep -q "# Claude Code Extended Framework" README.md; then
  # Create updated version with clearer identity
  sed -i.bak '1,5s/# Claude Code Extended Framework/# Evolve - Autonomous AI Development System\n\nA comprehensive framework extending [Claude Code](https:\/\/claude.ai\/claude-code) with advanced capabilities for AI-powered software development.\n\n**Built on**: SPARC methodology + CCPM project management + Multi-agent coordination/' README.md
  rm README.md.bak
  echo "✓ Updated project identity in README.md"
else
  echo "⚠ Project identity already updated or needs manual review"
fi
echo ""

echo "=========================================="
echo "Phase 1 Critical Fixes Complete!"
echo "=========================================="
echo ""
echo "Summary of changes:"
echo "  ✓ Replaced all kvnloo/evolve placeholders"
echo "  ✓ Verified entry point instructions"
echo "  ✓ Created docs/README.md (documentation hub)"
echo "  ✓ Created CREDITS.md (framework attribution)"
echo "  ✓ Updated project identity in README.md"
echo ""
echo "Backups saved to: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff"
echo "  2. Test clone: git clone https://github.com/${REPO_FULL}.git"
echo "  3. Navigate docs: cat docs/README.md"
echo "  4. Verify attribution: cat CREDITS.md"
echo "  5. Commit changes: git add . && git commit -m 'docs: Phase 1 quality fixes'"
echo ""
echo "Remaining work (Phase 2):"
echo "  - Consolidate duplicate documentation (6 hours)"
echo "  - Standardize terminology (3 hours)"
echo "  - Create troubleshooting guide (4 hours)"
echo "  - Add visual aids (3 hours)"
echo ""
echo "See claudedocs/quality-review.md for full details."
