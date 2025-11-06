# Contributing to Claude Code Extended Framework

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [SPARC Methodology](#sparc-methodology)
- [Code Style Guidelines](#code-style-guidelines)
- [File Organization](#file-organization)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Agent Coordination](#agent-coordination)
- [Adding New Features](#adding-new-features)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

- [Claude Code CLI](https://docs.claude.com/claude-code) installed
- Git configured with your name and email
- Bash shell environment (Linux, macOS, or WSL on Windows)
- Basic understanding of shell scripting

### Development Setup

1. **Fork and clone the repository:**
```bash
git fork https://github.com/kvnloo/evolve.git
git clone https://github.com/kvnloo/evolve.git
cd evolve
```

2. **Create a feature branch:**
```bash
git checkout -b feature/your-feature-name
```

3. **Set up MCP servers (recommended):**
```bash
claude mcp add claude-flow npx claude-flow@alpha mcp start
claude mcp add ruv-swarm npx ruv-swarm mcp start  # Optional
```

4. **Review the project structure:**
```bash
cat CLAUDE.md  # Main configuration
ls -la .claude/  # Configuration directory
cat docs/github-setup-plan.md  # Development roadmap
```

## Development Workflow

### SPARC Methodology

This project follows the SPARC methodology for systematic development:

1. **Specification**: Define requirements clearly
   - Write PRD if adding major feature
   - Create GitHub issue with detailed description
   - Identify success criteria

2. **Pseudocode**: Design before implementation
   - Outline algorithm/logic in comments
   - Plan function signatures and data structures
   - Review with maintainers if complex

3. **Architecture**: Document system design
   - Update architecture diagrams if needed
   - Document integration points
   - Explain design decisions

4. **Refinement**: Test-Driven Development
   - Write tests BEFORE implementation
   - Ensure tests fail initially
   - Implement until tests pass
   - Refactor while keeping tests green

5. **Completion**: Validate integration
   - Run full test suite
   - Update documentation
   - Verify no regressions

### Feature Branch Workflow

```bash
# Always work on feature branches, never on main
git checkout -b feature/descriptive-name

# Make incremental commits
git add .
git commit -m "feat: add user authentication helper"

# Keep branch updated with main
git fetch origin
git rebase origin/main

# Push when ready
git push origin feature/descriptive-name
```

## Code Style Guidelines

### Shell Scripts

**Follow these conventions for all `.sh` files:**

```bash
#!/usr/bin/env bash
set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Use descriptive variable names
readonly PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly CONFIG_DIR="${PROJECT_ROOT}/.claude"

# Add comments for complex logic
# Validates that the repository is not the CCPM template
validate_repository() {
  local remote_url
  remote_url=$(git remote get-url origin 2>/dev/null || echo "")

  if [[ "$remote_url" == *"automazeio/ccpm"* ]]; then
    echo "❌ ERROR: Cannot sync with template repository" >&2
    return 1
  fi
}

# Use functions for reusability
main() {
  validate_repository || exit 1
  # Implementation...
}

main "$@"
```

**Style Requirements:**
- Use `#!/usr/bin/env bash` shebang
- Set strict mode: `set -euo pipefail`
- Use `readonly` for constants
- Quote all variables: `"${variable}"`
- Use `local` for function variables
- Add descriptive comments
- Use meaningful function names
- Return early on errors
- Use `>&2` for error messages

### Configuration Files

**For `.md` files in `.claude/commands/`:**
```markdown
---
name: command-name
description: Brief description of what this command does
category: category-name
---

# Command Implementation

Detailed documentation and implementation...
```

**For rule files in `.claude/rules/`:**
```markdown
# Rule Title

Clear, actionable rules with examples.

## Section

✅ Correct examples
❌ Incorrect examples
```

## File Organization

**Critical Rule: NEVER save working files to the root folder**

Use these directories:

```
.claude/
├── commands/        # Slash command definitions
├── rules/           # Coordination and operation rules
├── helpers/         # Reusable shell scripts
├── prds/            # Product requirement documents
├── context/         # Project context files
└── statusline/      # Status line configuration

docs/                # Documentation and analysis
scripts/             # Utility scripts
.github/             # GitHub workflows and templates
```

### Path Standards

Follow `.claude/rules/path-standards.md`:
- Use relative paths for project files: `internal/auth/server.go`
- No absolute paths with usernames: ❌ `/Users/username/project/...`
- Cross-project references: `../project-name/file.go`

## Testing Requirements

### Shell Script Testing

```bash
# Run shellcheck on all scripts
shellcheck scripts/*.sh .claude/helpers/*.sh

# Test scripts in isolated environment
bash -n script.sh  # Syntax check
bash -x script.sh  # Debug mode
```

### Integration Testing

Before submitting PR:
```bash
# Test slash command execution
# (requires Claude Code CLI)

# Test helper scripts
./scripts/checkpoint.sh
./scripts/migrate-agents.sh --dry-run

# Verify GitHub workflows syntax
# (use GitHub Actions workflow validator)
```

## Pull Request Process

### Before Submitting

- [ ] Follow SPARC methodology (all 5 phases)
- [ ] Tests written and passing
- [ ] Shell scripts pass `shellcheck`
- [ ] Documentation updated
- [ ] Commit messages follow convention (see below)
- [ ] No hardcoded paths or secrets
- [ ] Files organized in correct directories

### Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(commands): add /sc:benchmark command for performance testing"
git commit -m "fix(helpers): resolve path resolution in checkpoint.sh"
git commit -m "docs(contributing): add shell script style guidelines"
```

### PR Template Checklist

When you open a PR, complete the template checklist:

```markdown
## SPARC Methodology Checklist
- [ ] Specification: Requirements clearly defined
- [ ] Pseudocode: Algorithm/logic designed before implementation
- [ ] Architecture: System design documented
- [ ] Refinement: TDD approach - tests written first
- [ ] Completion: Integration validated

## Code Quality
- [ ] Shell scripts pass shellcheck
- [ ] No new warnings introduced
- [ ] Files under 500 lines (per style guide)
- [ ] Code follows project style guide

## Security
- [ ] No hardcoded secrets or credentials
- [ ] No absolute paths with usernames
- [ ] Input validation implemented
```

## Agent Coordination

### Multi-Agent Development

If using git worktrees for parallel development:

**Follow `.claude/rules/agent-coordination.md`:**
- Only modify files in your assigned work stream
- Make atomic commits (single purpose)
- Update progress files regularly
- Never force push
- Communicate through commit messages

**Example workflow:**
```bash
# Create worktree for epic
git worktree add ../epic-auth-system epic/auth-system

# Check work assignment
cat .claude/epics/epic-name/issue-123-analysis.md

# Update progress
echo "✅ Completed database schema" >> stream-A.md
git add stream-A.md
git commit -m "Progress: Stream A - schema complete"
```

## Adding New Features

### Adding a Slash Command

1. Create command file in `.claude/commands/`:
```bash
# .claude/commands/sc/my-command.md
---
name: my-command
description: Brief description
category: utilities
---

# Implementation
Your command logic here...
```

2. Document usage in README or docs/
3. Add tests if applicable
4. Submit PR with example usage

### Adding a Helper Script

1. Create script in `.claude/helpers/`:
```bash
#!/usr/bin/env bash
set -euo pipefail

# .claude/helpers/my-helper.sh
# Description: What this helper does

main() {
  # Implementation
}

main "$@"
```

2. Make executable: `chmod +x .claude/helpers/my-helper.sh`
3. Run shellcheck: `shellcheck .claude/helpers/my-helper.sh`
4. Document in README or docs/
5. Add usage examples

### Adding Documentation

1. Add files to `docs/` directory:
   - Guides: `docs/guide-name.md`
   - Analysis: `docs/analysis-name.md`
   - Reference: `docs/reference-name.md`

2. Link from README.md if appropriate
3. Use relative paths for links
4. Include table of contents for long docs

### Modifying GitHub Workflows

1. Test syntax with GitHub Actions validator
2. Test in fork before submitting PR
3. Document any new environment variables needed
4. Explain workflow purpose in PR description

## Questions?

- **General questions**: Open a [Discussion](https://github.com/kvnloo/evolve/discussions)
- **Bug reports**: Open an [Issue](https://github.com/kvnloo/evolve/issues)
- **Feature requests**: Open an [Issue](https://github.com/kvnloo/evolve/issues) with `[FEATURE]` prefix
- **Security issues**: See [SECURITY.md](SECURITY.md)

## Recognition

Contributors are recognized in:
- Git commit history
- Release notes
- Project documentation

Thank you for contributing to make this project better! 🎉
