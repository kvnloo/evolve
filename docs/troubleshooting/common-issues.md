# Troubleshooting Guide

Common issues and solutions for the Claude Code Extended Framework.

## MCP Server Issues

### MCP Server Not Starting

**Symptoms**: `claude mcp list` shows server as stopped or missing

**Solutions**:
```bash
# 1. Check if server is registered
claude mcp list

# 2. Re-add the server
claude mcp add claude-flow npx claude-flow@alpha mcp start

# 3. Check logs for errors
claude mcp logs claude-flow

# 4. Restart the server
claude mcp restart claude-flow
```

### MCP Server Connection Errors

**Symptoms**: Commands fail with "MCP server not available"

**Solutions**:
```bash
# Check network connectivity
ping github.com

# Verify npm/npx is working
npx --version

# Clear npm cache
npm cache clean --force

# Reinstall server
claude mcp remove claude-flow
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

## Command Issues

### Slash Commands Not Working

**Symptoms**: `/sc:command` not recognized

**Causes & Solutions**:
1. **Not in project directory**
   ```bash
   pwd  # Verify you're in project root
   cd /path/to/project
   ```

2. **CLAUDE.md not loaded**
   ```bash
   ls CLAUDE.md  # Verify file exists
   cat CLAUDE.md  # Check contents
   ```

3. **Command file missing or invalid**
   ```bash
   ls .claude/commands/sc/
   cat .claude/commands/sc/research.md  # Check format
   ```

### PM Commands Fail

**Symptoms**: `/pm:prd-new` returns errors

**Solutions**:
```bash
# 1. Check directory structure
ls -la .claude/prds/
ls -la .claude/epics/  # Should exist even if gitignored

# 2. Create missing directories
mkdir -p .claude/prds
mkdir -p .claude/epics

# 3. Check GitHub authentication
gh auth status
gh auth login  # If not authenticated
```

## Git and GitHub Issues

### Cannot Create GitHub Issues

**Symptoms**: PM commands fail when syncing to GitHub

**Solutions**:
```bash
# 1. Verify gh CLI is installed
gh --version

# 2. Check authentication
gh auth status
gh auth login  # Authenticate

# 3. Verify repository exists and you have access
gh repo view

# 4. Check remote URL
git remote get-url origin
# Should NOT be template repository (automazeio/ccpm)
```

### Worktree Issues

**Symptoms**: Cannot create or switch to worktree

**Solutions**:
```bash
# 1. List existing worktrees
git worktree list

# 2. Remove stale worktrees
git worktree prune

# 3. Create new worktree
git worktree add ../epic-name branch-name

# 4. If directory exists, remove it first
rm -rf ../epic-name
git worktree add ../epic-name branch-name
```

## Shell Script Issues

### Script Permission Denied

**Symptoms**: `./script.sh: Permission denied`

**Solution**:
```bash
chmod +x script.sh
./script.sh
```

### Script Syntax Errors

**Symptoms**: Script fails with syntax errors

**Debugging**:
```bash
# Check syntax without executing
bash -n script.sh

# Run with debug output
bash -x script.sh

# Use shellcheck
shellcheck script.sh
```

### Set -euo pipefail Errors

**Symptoms**: Script exits unexpectedly

**Understanding**:
- `-e`: Exit on any error
- `-u`: Exit on undefined variable
- `-o pipefail`: Fail if any command in pipeline fails

**Debugging**:
```bash
# Temporarily disable for debugging
# set +e  # Allow errors
# set +u  # Allow undefined vars

# Check which command is failing
bash -x script.sh 2>&1 | grep "^+"
```

## SPARC Workflow Issues

### SPARC Commands Not Found

**Symptoms**: `npx claude-flow sparc` not found

**Solutions**:
```bash
# 1. Check if claude-flow MCP is installed
claude mcp list | grep claude-flow

# 2. Test npx directly
npx claude-flow@alpha sparc modes

# 3. Reinstall if needed
npm install -g claude-flow@alpha
```

### SPARC Workflow Fails Mid-Process

**Symptoms**: Workflow stops during refinement phase

**Solutions**:
1. **Check logs**:
   ```bash
   claude mcp logs claude-flow
   ```

2. **Retry specific phase**:
   ```bash
   npx claude-flow sparc run refinement "feature"
   ```

3. **Check for file conflicts**:
   ```bash
   git status
   git diff
   ```

## Agent Coordination Issues

### Agents Conflicting on Files

**Symptoms**: Multiple agents modifying same file

**Solutions**:
1. **Check work stream assignments**:
   ```bash
   cat .claude/epics/epic-name/issue-123-analysis.md
   ```

2. **Verify file-level parallelism**:
   - Each agent should have distinct files
   - See `.claude/rules/agent-coordination.md`

3. **Use git worktrees for isolation**:
   ```bash
   git worktree add ../agent-a-workspace
   git worktree add ../agent-b-workspace
   ```

### Memory/State Synchronization Issues

**Symptoms**: Agents not seeing each other's work

**Solutions**:
```bash
# 1. Check memory status (if using serena MCP)
# memory_usage tool

# 2. Force sync with commits
git add .
git commit -m "Sync point"

# 3. Check hooks are running
ls .claude/helpers/*hooks*
```

## Performance Issues

### Slow Command Execution

**Causes & Solutions**:

1. **Too many MCP servers**:
   ```bash
   claude mcp list
   # Disable unused servers
   claude mcp remove unused-server
   ```

2. **Large repository**:
   ```bash
   # Use .gitignore effectively
   # Exclude node_modules, build artifacts
   ```

3. **Network latency**:
   ```bash
   # Check internet connection
   # Use local MCP servers when possible
   ```

### High Memory Usage

**Solutions**:
```bash
# 1. Limit concurrent agents
export AGENT_CONCURRENCY=3

# 2. Clear caches
npm cache clean --force

# 3. Restart MCP servers
claude mcp restart-all
```

## Documentation Issues

### Links Not Working

**Symptoms**: Broken links in documentation

**Solutions**:
```bash
# 1. Use markdown link checker
npx markdown-link-check docs/*.md

# 2. Fix relative paths
# Use: [text](./file.md) not [text](file.md)

# 3. Check GitHub Pages configuration
cat .github/workflows/docs.yml
```

### Markdown Rendering Issues

**Solutions**:
```bash
# 1. Validate markdown
markdownlint docs/*.md

# 2. Check for special characters
# Use proper escaping for: <, >, &, etc.

# 3. Preview locally
# Use VS Code or other markdown preview
```

## GitHub Actions Issues

### Workflow Not Triggering

**Symptoms**: Workflow doesn't run on push/PR

**Solutions**:
1. **Check workflow syntax**:
   ```bash
   # Use GitHub Actions validator
   # Or check in PR - GitHub validates automatically
   ```

2. **Verify triggers**:
   ```yaml
   on:
     push:
       branches: [ main ]  # Check branch name matches
       paths:
         - '**.sh'  # Check path patterns
   ```

3. **Check workflow permissions**:
   ```yaml
   permissions:
     contents: read
     issues: write  # Add needed permissions
   ```

### Shellcheck Workflow Failing

**Symptoms**: Shell script linting fails in CI

**Solutions**:
```bash
# 1. Run shellcheck locally
shellcheck scripts/*.sh

# 2. Fix common issues:
# - Quote variables: "$var" not $var
# - Use [[ ]] not [ ]
# - Set strict mode: set -euo pipefail

# 3. Add exclusions if needed (in workflow):
# SHELLCHECK_OPTS: -e SC2034  # Exclude specific checks
```

## Installation Issues

### Claude Code CLI Not Found

**Symptoms**: `claude` command not recognized

**Solutions**:
```bash
# 1. Check if installed
which claude

# 2. Install if missing
# Follow: https://docs.claude.com/claude-code

# 3. Add to PATH if needed
export PATH="$PATH:/path/to/claude"
```

### Git Not Configured

**Symptoms**: Git commands fail

**Solutions**:
```bash
# 1. Set user info
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 2. Verify configuration
git config --list
```

## Common Error Messages

### "CCPM template repository detected"

**Cause**: Trying to sync with template repo

**Solution**:
```bash
# Update remote to your own repository
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Verify
git remote get-url origin
```

### "Hook failed: pre-commit"

**Cause**: Pre-commit hook validation failed

**Solutions**:
```bash
# 1. Check what failed
git commit -v

# 2. Fix the issues
# - Run linting
# - Fix shell script errors
# - Validate syntax

# 3. Try commit again
git commit
```

### "No such file or directory"

**Cause**: Missing expected files/directories

**Solutions**:
```bash
# 1. Check current directory
pwd

# 2. Create missing directories
mkdir -p .claude/{prds,epics,context}

# 3. Verify structure
tree .claude  # Or ls -R .claude
```

## Getting Help

If issues persist:

1. **Check documentation**:
   - [Getting Started](getting-started.md)
   - [Configuration Reference](configuration-reference.md)
   - [FAQ](faq.md)

2. **Search existing issues**:
   - [GitHub Issues](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)

3. **Create new issue**:
   ```bash
   gh issue create --title "Bug: Description" --body "Details..."
   ```

4. **Join discussions**:
   - [GitHub Discussions](https://github.com/YOUR_USERNAME/YOUR_REPO/discussions)

## Debug Mode

Enable verbose logging:

```bash
# For bash scripts
set -x  # Enable debug output
# ... your commands ...
set +x  # Disable debug output

# For MCP servers
export DEBUG=claude-flow:*
claude mcp restart claude-flow

# For git operations
export GIT_TRACE=1
git push
```

## Collecting Diagnostic Information

When reporting issues:

```bash
# System info
uname -a
node --version
npm --version
git --version
claude --version

# MCP status
claude mcp list
claude mcp status

# Git status
git status
git remote -v
git log --oneline -5

# Directory structure
tree -L 2 .claude

# Recent errors
claude mcp logs claude-flow | tail -50
```

---

Still stuck? [Open an issue](https://github.com/YOUR_USERNAME/YOUR_REPO/issues/new) with diagnostic information!
