# Statusline Workspace System

Complete guide to the Claude Code Statusline workspace management system for organizing agent instances across multiple workspaces.

## 🎯 Overview

The workspace system allows you to organize agent instances into 10 separate workspaces (0-9), making it easier to manage multiple agents working on different aspects of your project simultaneously.

### Workspace Layout

- **Workspace 0**: Overview (all instances)
- **Workspace 1**: Backend
- **Workspace 2**: Frontend
- **Workspace 3**: Database
- **Workspace 4**: Testing
- **Workspace 5**: DevOps
- **Workspace 6**: Documentation
- **Workspace 7**: Research
- **Workspace 8**: Integration
- **Workspace 9**: Deployment

## 📁 File Structure

```
.claude/statusline/
├── config.json                    # Workspace configuration
├── state.json                     # Current workspace state
├── workspace-assignments.json     # Instance assignments
├── scripts/
│   ├── switch-workspace.sh       # Switch between workspaces
│   ├── assign-instance.sh        # Assign instances
│   └── list-workspaces.sh        # View all workspaces
└── README.md                      # Documentation
```

## 🚀 Quick Start

### 1. List Available Workspaces

```bash
/statusline:list-workspaces
# or
.claude/statusline/scripts/list-workspaces.sh
```

### 2. Assign Agents to Workspaces

```bash
# Assign backend agent to Backend workspace (1)
/statusline:assign-instance 1 backend-api-dev

# Assign frontend agent to Frontend workspace (2)
/statusline:assign-instance 2 frontend-ui-coder

# Assign database agent to Database workspace (3)
/statusline:assign-instance 3 db-migration-specialist
```

### 3. Switch Between Workspaces

```bash
# Switch to Backend workspace
/statusline:switch-workspace 1

# Switch to Frontend workspace
/statusline:switch-workspace 2

# Return to Overview
/statusline:switch-workspace 0
```

## 🎮 Usage Patterns

### Pattern 1: Full-Stack Development

```bash
# Setup workspace assignments
/statusline:assign-instance 1 backend-api-dev
/statusline:assign-instance 2 frontend-ui-coder
/statusline:assign-instance 3 database-architect
/statusline:assign-instance 4 test-engineer

# Work on backend
/statusline:switch-workspace 1
# ... backend development ...

# Switch to frontend
/statusline:switch-workspace 2
# ... frontend development ...

# Review all work
/statusline:switch-workspace 0
```

### Pattern 2: Epic-Based Organization

```bash
# Epic: User Authentication System
/statusline:assign-instance 1 auth-backend
/statusline:assign-instance 2 auth-ui
/statusline:assign-instance 4 auth-tester
/statusline:assign-instance 6 auth-docs

# Work through epic by workspace
/statusline:switch-workspace 1  # Backend implementation
/statusline:switch-workspace 2  # UI components
/statusline:switch-workspace 4  # Testing
/statusline:switch-workspace 6  # Documentation
```

### Pattern 3: Team Collaboration

```bash
# Team 1: Core Features (Workspaces 1-3)
/statusline:assign-instance 1 core-backend
/statusline:assign-instance 2 core-frontend
/statusline:assign-instance 3 core-database

# Team 2: Testing & Quality (Workspaces 4-5)
/statusline:assign-instance 4 qa-tester
/statusline:assign-instance 5 qa-integration

# Team 3: DevOps & Deployment (Workspaces 5,9)
/statusline:assign-instance 5 devops-engineer
/statusline:assign-instance 9 deployment-manager
```

## 🔧 Configuration

### Customize Workspace Names

Edit `.claude/statusline/config.json`:

```json
{
  "workspaceNames": {
    "0": "Overview",
    "1": "API Development",
    "2": "UI/UX",
    "3": "Data Layer",
    "4": "Quality Assurance",
    "5": "Infrastructure",
    "6": "Technical Docs",
    "7": "R&D",
    "8": "System Integration",
    "9": "Production Deploy"
  }
}
```

### Set Maximum Instances

```json
{
  "maxInstancesPerWorkspace": 10
}
```

### Configure Display Format

```json
{
  "display": {
    "format": "[WS:{workspace}] {icon} {name} ({progress}%) {status}",
    "icons": {
      "backend": "🎯",
      "frontend": "🎨",
      "database": "🗄️",
      "testing": "🧪"
    }
  }
}
```

## 📊 State Management

### State File Structure

`.claude/statusline/state.json`:
```json
{
  "workspace": 1,
  "instance": 0,
  "lastUpdate": "2025-10-21T16:13:39Z"
}
```

### Assignment File Structure

`.claude/statusline/workspace-assignments.json`:
```json
[
  {
    "workspace": 1,
    "instance": "backend-api-dev",
    "assignedAt": "2025-10-21T16:13:39Z"
  },
  {
    "workspace": 2,
    "instance": "frontend-ui-coder",
    "assignedAt": "2025-10-21T16:13:46Z"
  }
]
```

## 🎨 Visual Indicators

### Workspace Display

```
╔══════════════════════════════════════════════════════════╗
║           STATUSLINE WORKSPACE OVERVIEW                 ║
╚══════════════════════════════════════════════════════════╝

→ [0] Overview             (ALL instances)    ← Current
  [1] Backend              (2 instances)
      • backend-api
      • backend-db
  [2] Frontend             (1 instances)
      • frontend-ui
  [3] Database             (0 instances)
```

### Status Indicators

- `→` Current workspace
- `✅` Completed tasks
- `▶️` Running agents
- `⏸️` Waiting agents
- `❌` Error states

## 🔍 Advanced Features

### Query Current State

```bash
# Show current workspace
cat .claude/statusline/state.json | jq .

# Show all assignments
cat .claude/statusline/workspace-assignments.json | jq .

# Count instances per workspace
jq '[.[] | .workspace] | group_by(.) | map({workspace: .[0], count: length})' \
  .claude/statusline/workspace-assignments.json
```

### Reassign Instances

```bash
# Reassignment prompts for confirmation
/statusline:assign-instance 2 backend-api-dev
# ⚠️  Instance 'backend-api-dev' is already assigned to Workspace 1
# Reassign to Workspace 2? (y/n)
```

### Clear Assignments

```bash
# Remove all assignments from workspace 1
jq 'map(select(.workspace != 1))' \
  .claude/statusline/workspace-assignments.json > temp.json
mv temp.json .claude/statusline/workspace-assignments.json
```

## 🔗 Integration with Claude Flow

### Notify on Workspace Switch

The system automatically notifies claude-flow when switching workspaces:

```bash
npx claude-flow@alpha hooks notify --message "Workspace: Backend"
```

### Memory Coordination

Agents can use memory to coordinate across workspaces:

```bash
# Agent in Workspace 1 stores API contract
npx claude-flow@alpha hooks memory-store --key "api/contracts/users" --value "{...}"

# Agent in Workspace 2 retrieves contract
npx claude-flow@alpha hooks memory-get --key "api/contracts/users"
```

## 🎹 Keyboard Shortcuts (Coming Soon)

Configure in your editor:

- `Ctrl+Shift+0` → Workspace 0 (Overview)
- `Ctrl+Shift+1` → Workspace 1 (Backend)
- `Ctrl+Shift+2` → Workspace 2 (Frontend)
- `Ctrl+Shift+3-9` → Workspaces 3-9

## 🐛 Troubleshooting

### Issue: Workspace assignments not showing

**Solution**: Check file permissions and JSON validity
```bash
chmod 644 .claude/statusline/workspace-assignments.json
jq . .claude/statusline/workspace-assignments.json
```

### Issue: Switch workspace fails

**Solution**: Ensure state file exists
```bash
mkdir -p .claude/statusline
echo '{"workspace": 0, "instance": 0}' > .claude/statusline/state.json
```

### Issue: jq not found

**Solution**: Install jq
```bash
# Ubuntu/Debian
sudo apt-get install jq

# macOS
brew install jq

# Fedora
sudo dnf install jq
```

## 📚 Related Documentation

- [Statusline Configuration Guide](./CONFIGURATION.md)
- [Agent Coordination Patterns](./AGENT-COORDINATION.md)
- [Multi-Workspace Development](./MULTI-WORKSPACE-DEV.md)
- [Performance Optimization](./PERFORMANCE.md)

## 🎯 Best Practices

1. **Assign instances immediately** after spawning agents
2. **Use Overview (0)** for general monitoring
3. **Dedicated workspaces** for focused work
4. **Consistent naming** for instances (e.g., `{role}-{epic}-{type}`)
5. **Regular cleanup** of completed assignments
6. **Document workspace purposes** in config.json comments
7. **Coordinate via memory** for cross-workspace dependencies

## 🚀 Future Enhancements

- [ ] Workspace-specific configurations
- [ ] Auto-assignment rules
- [ ] Workspace templates
- [ ] Visual workspace switcher UI
- [ ] Workspace health monitoring
- [ ] Cross-workspace analytics
- [ ] Workspace cloning
- [ ] Workspace import/export

## 📝 Examples

See `examples/` directory for:
- Full-stack development workflow
- Epic-based organization
- Team collaboration patterns
- Multi-repo orchestration
- CI/CD pipeline integration
