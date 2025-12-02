# Frequently Asked Questions (FAQ)

Common questions about the Claude Code Extended Framework.

## General Questions

### What is this framework?

The Claude Code Extended Framework is a configuration and automation system that extends Claude Code's capabilities with:
- SPARC methodology for systematic development
- Multi-agent coordination (54+ specialized agents)
- Project management system (CCPM)
- GitHub automation and workflows
- Shell script utilities

### Is this a Node.js/JavaScript framework?

No! This is primarily a **configuration and shell script framework** for Claude Code. While it integrates with MCP servers (which use Node.js), the framework itself consists of:
- Configuration files (`.claude/` directory)
- Bash shell scripts
- Documentation and guides
- GitHub workflows

### Do I need to know coding to use this?

Basic familiarity helps, but the framework is designed to be accessible:
- **Beginner**: Use slash commands and follow guides
- **Intermediate**: Customize configuration and scripts
- **Advanced**: Create custom agents and workflows

## Installation & Setup

### What are the prerequisites?

- Claude Code CLI
- Git (version 2.0+)
- Bash shell (Linux, macOS, or WSL on Windows)
- GitHub account (optional, but recommended)

### Do I need all the MCP servers?

No! Only `claude-flow` is required:
- **Required**: `claude-flow` (SPARC, agents, hooks)
- **Optional**: `ruv-swarm` (enhanced coordination)
- **Optional**: `flow-nexus` (cloud features, requires registration)

### How do I install just the essentials?

```bash
# 1. Clone the repository
git clone https://github.com/kvnloo/evolve.git
cd evolve

# 2. Install required MCP server
claude mcp add claude-flow npx claude-flow@alpha mcp start

# 3. You're ready to go!
```

## SPARC Methodology

### What is SPARC?

SPARC is a systematic development methodology:
- **S**pecification: Define requirements
- **P**seudocode: Design algorithms
- **A**rchitecture: Plan system structure
- **R**efinement: Test-Driven Development
- **C**ompletion: Integration and validation

### Do I have to use SPARC for everything?

No! SPARC is recommended for complex features, but you can:
- Use it selectively for important features
- Skip phases that don't apply
- Use traditional development when appropriate

### How is SPARC different from TDD?

SPARC **includes** TDD in the Refinement phase, but adds:
- Upfront specification and planning
- Algorithm design before coding
- Architectural planning
- Integration validation

## Multi-Agent System

### How many agents can I use at once?

Technically unlimited, but practical limits:
- **Recommended**: 3-5 agents for most tasks
- **Maximum effective**: 10-15 agents
- **Performance**: Diminishing returns beyond 15

### Do agents work independently?

Yes and no:
- Agents work on **different files** independently
- Agents **coordinate** through shared memory
- Agents **sync** through git commits
- Agents follow **file-level parallelism** (no conflicts)

### How do I choose which agents to use?

The framework auto-selects based on:
- Task type (coding, testing, review, etc.)
- File types (.sh, .md, .py, etc.)
- Complexity level
- Keywords in your request

You can also manually specify:
```bash
@agent-backend-dev "build REST API"
```

## Project Management (CCPM)

### What is CCPM?

Claude Code PM (CCPM) is a spec-driven development system:
- Create PRDs (Product Requirement Documents)
- Decompose into epics and issues
- Sync with GitHub Issues
- Track progress with git worktrees

### Do I need to use CCPM?

No! CCPM is optional. You can:
- Use traditional GitHub Issues directly
- Use your own project management tools
- Work without formal PM structure

### Can CCPM work with other PM tools?

CCPM is designed for GitHub Issues, but you can:
- Export PRDs to other systems
- Use PRDs as documentation only
- Integrate with external tools via APIs

## Git and GitHub

### Why use git worktrees?

Worktrees allow **true parallel development**:
- Multiple agents work simultaneously
- Each in isolated directory
- No file conflicts
- Easy context switching

### Do I have to use worktrees?

No! Worktrees are recommended for:
- Multi-agent parallel work
- Large epic implementations
- Complex feature development

For simple tasks, regular branches work fine.

### Can I use this with GitLab/Bitbucket?

The framework is optimized for GitHub, but you can:
- Use git features (worktrees, branches) with any host
- Adapt GitHub workflows to other CI/CD systems
- Use PM system locally without GitHub sync

## Shell Scripts

### Do all scripts follow the same patterns?

Yes! All scripts use:
```bash
#!/usr/bin/env bash
set -euo pipefail  # Strict mode
# Error handling
# Clear documentation
# Reusable functions
```

### Can I use other languages?

Yes! The framework supports:
- **Bash**: Primary for utilities
- **Python**: For complex logic (if needed)
- **Node.js**: For MCP integration
- **Any language**: For application code

### Why bash and not Python?

Bash is used for framework utilities because:
- Universal availability (Linux, macOS, WSL)
- Direct shell integration
- Low overhead
- Git and file system operations

Application code can be any language!

## Configuration

### Where is the main configuration?

`CLAUDE.md` in the project root is loaded by Claude Code CLI.

### Can I customize slash commands?

Yes! Add commands to `.claude/commands/`:
```bash
.claude/commands/myapp/deploy.md
```

Then use:
```
/myapp:deploy
```

### How do I disable features I don't need?

Remove or comment out in `CLAUDE.md`:
```markdown
<!-- Disabled CCPM
## PM System Overview
@.claude/rules/pm-system.md
-->
```

## Performance

### Why is execution slow?

Common causes:
- Too many MCP servers running
- Large repository size
- Network latency
- Too many concurrent agents

Solutions in [Troubleshooting Guide](troubleshooting.md).

### How can I speed things up?

1. **Limit concurrent agents**:
   ```bash
   export AGENT_CONCURRENCY=3
   ```

2. **Use local MCP servers**

3. **Optimize parallelization**:
   - Batch file operations
   - Use single-message multi-tool calls

4. **Enable ultra-compressed mode** for large operations

### What are the performance metrics?

- **84.8% SWE-Bench solve rate**
- **32.3% token reduction** (compression)
- **2.8-4.4x speed improvement** (parallelization)

## Security

### Is it safe to use?

Yes, if you follow best practices:
- Never commit secrets
- Review scripts before execution
- Validate repository URLs
- Use path standards (no absolute paths with usernames)

### Can I use this in production?

The framework itself is for **development workflows**, not production deployment. It helps you:
- Build production-ready code
- Automate development tasks
- Maintain code quality

### What about the shell scripts?

All scripts are:
- Open source (you can review)
- Follow security best practices
- Use input validation
- Avoid destructive operations without confirmation

## Troubleshooting

### Commands aren't working. What do I check?

1. Are you in the project directory? (`pwd`)
2. Does `CLAUDE.md` exist? (`ls CLAUDE.md`)
3. Are MCP servers running? (`claude mcp list`)
4. Are you authenticated? (`gh auth status`)

See [Troubleshooting Guide](troubleshooting.md) for more.

### Where can I get help?

1. **Documentation**: Check `docs/` directory
2. **Issues**: [GitHub Issues](https://github.com/kvnloo/evolve/issues)
3. **Discussions**: [GitHub Discussions](https://github.com/kvnloo/evolve/discussions)
4. **Security**: [SECURITY.md](../SECURITY.md)

## Contributing

### How can I contribute?

See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- Development setup
- Code style guidelines
- PR process
- Testing requirements

### Can I create custom agents?

Yes! You can:
- Define agent specifications
- Integrate with MCP coordination
- Share agents with community

(Advanced topic - documentation coming soon)

### Can I share my slash commands?

Absolutely! You can:
- Submit PR with new commands
- Share in GitHub Discussions
- Create plugin repositories

## Advanced Topics

### What is the "golden rule"?

**"1 MESSAGE = ALL RELATED OPERATIONS"**

Always batch operations in a single message:
```bash
# ✅ Good
TodoWrite { todos: [...all todos...] }
Read file1 file2 file3

# ❌ Bad
TodoWrite { todos: [todo1] }
Read file1
```

### How does neural training work?

The framework can learn patterns from your work:
- Successful operations are cached
- Patterns are recognized
- Future operations optimized

(Using `claude-flow` neural features)

### Can I extend the framework?

Yes! Extension points:
- Custom slash commands (`.claude/commands/`)
- Custom rules (`.claude/rules/`)
- Helper scripts (`.claude/helpers/`)
- GitHub workflows (`.github/workflows/`)

## Comparison

### How is this different from plain Claude Code?

Plain Claude Code + This Framework = Enhanced capabilities:
- Structured methodology (SPARC)
- Multi-agent coordination
- Project management integration
- Automated workflows
- Best practices enforcement

### Do I lose any Claude Code features?

No! This framework **extends** Claude Code, it doesn't replace anything. All native Claude Code features still work.

### Can I use this with other AI coding tools?

The configuration is Claude Code-specific, but:
- Shell scripts are universal
- Documentation is helpful reference
- Concepts are transferable
- PM system ideas can be adapted

## Licensing

### What license is this under?

MIT License - you can:
- Use commercially
- Modify freely
- Distribute
- Private use

See [LICENSE](../LICENSE) for details.

### Can I use this in my company?

Yes! MIT license allows commercial use. Just:
- Keep the license notice
- No warranty provided
- Contribution guidelines apply if contributing back

## Next Steps

- [Getting Started](getting-started.md)
- [Architecture Overview](architecture.md)
- [Configuration Reference](configuration-reference.md)
- [Troubleshooting](troubleshooting.md)

---

**Didn't find your answer?** [Ask in Discussions](https://github.com/kvnloo/evolve/discussions) or [open an issue](https://github.com/kvnloo/evolve/issues)!
