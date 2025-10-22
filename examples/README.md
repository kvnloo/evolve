# Examples

Sample workflows and use cases for the Claude Code Extended Framework.

## Available Examples

### 1. SPARC Workflow
- `sparc-workflow-example.md` - Complete SPARC methodology walkthrough
- Demonstrates all 5 phases: Specification → Pseudocode → Architecture → Refinement → Completion

### 2. Custom Slash Command
- `custom-command-example.md` - Creating your own slash command
- Shows command file format and integration

### 3. Multi-Agent Coordination
- `multi-agent-example.md` - Parallel development with multiple agents
- Demonstrates git worktrees and agent coordination

### 4. Shell Script Helper
- `helper-script-example.sh` - Template for helper scripts
- Follows framework best practices

### 5. PM System Workflow
- `pm-workflow-example.md` - Using CCPM for project management
- PRD → Epic → Issues → Worktree workflow

## Running Examples

### SPARC Workflow Example

```bash
# Follow the guide
cat examples/sparc-workflow-example.md

# Try the commands
npx claude-flow sparc tdd "calculator function"
```

### Custom Command Example

```bash
# Create command from template
cp examples/custom-command-example.md .claude/commands/myapp/deploy.md

# Edit as needed
# Then use: /myapp:deploy
```

### Multi-Agent Example

```bash
# Follow the parallel development guide
cat examples/multi-agent-example.md

# Create worktrees as shown
git worktree add ../agent-backend epic/backend
git worktree add ../agent-frontend epic/frontend
```

## Contributing Examples

Have a useful workflow? Share it!

1. Create example file in `examples/`
2. Follow existing format
3. Include clear documentation
4. Add to this README
5. Submit PR

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

## Example Template

```markdown
# Example Title

## Overview
Brief description of what this example demonstrates

## Prerequisites
- Required tools
- Required setup

## Step-by-Step Guide
1. First step
2. Second step
3. etc.

## Expected Output
What you should see

## Common Issues
Troubleshooting tips

## Related Documentation
Links to relevant docs
```

## License

Examples are provided under the same MIT License as the project.
Feel free to use, modify, and share!
