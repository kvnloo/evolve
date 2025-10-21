# Assign Instance to Workspace

Assign an agent instance to a specific workspace for organization.

## Usage

```
/statusline:assign-instance <workspace-id> <instance-name>
```

## Arguments

- `<workspace-id>`: Workspace number 1-9 (0 is reserved for Overview)
- `<instance-name>`: Name of the agent instance to assign

## Examples

```bash
# Assign backend-dev agent to Backend workspace (1)
/statusline:assign-instance 1 backend-dev

# Assign frontend-coder to Frontend workspace (2)
/statusline:assign-instance 2 frontend-coder

# Assign test-runner to Testing workspace (4)
/statusline:assign-instance 4 test-runner
```

## Implementation

```bash
#!/bin/bash

WORKSPACE_ID="${1}"
INSTANCE_NAME="${2}"

if [ -z "$WORKSPACE_ID" ] || [ -z "$INSTANCE_NAME" ]; then
  echo "Usage: /statusline:assign-instance <workspace-id> <instance-name>"
  echo ""
  echo "Available workspaces:"
  .claude/statusline/scripts/list-workspaces.sh
  exit 1
fi

.claude/statusline/scripts/assign-instance.sh "$WORKSPACE_ID" "$INSTANCE_NAME"
```

## Workflow

1. **Spawn agents** using Task tool or claude-flow
2. **Assign to workspace** for organization
3. **Switch to workspace** to focus on specific work
4. **View progress** in that workspace context

## Related Commands

- `/statusline:switch-workspace` - Switch between workspaces
- `/statusline:list-workspaces` - Show all workspace assignments
- `/statusline:get-agents` - Show all active agents
