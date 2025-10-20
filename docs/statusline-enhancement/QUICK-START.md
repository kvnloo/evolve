# Claude Code Statusline Enhancement - Quick Start

## ✅ What Was Built

A **Claude Code native** statusline enhancement system that hooks into `rz1989s/claude-code-statusline` extension and integrates with claude-flow for multi-instance orchestration.

### Architecture

```
rz1989s/claude-code-statusline (UI)
           ↓
   Claude Code Commands (.claude/commands/statusline/)
           ↓
   claude-flow Hooks (agent info, swarm status)
           ↓
   State Management (.claude/statusline/)
```

## 📦 Files Created

### Commands (in `.claude/commands/statusline/`)
- ✅ `get-agents.md` - Query active agents from claude-flow
- ✅ `scroll-left.md` - Navigate instances ← (circular)
- ✅ `scroll-right.md` - Navigate instances → (circular)
- ✅ `switch-workspace.md` - Switch between workspaces 0-9
- ✅ `refresh.md` - Force refresh agent data
- ✅ `config.md` - Configure statusline behavior

### Documentation
- ✅ `.claude/statusline/README.md` - Complete usage guide

## 🚀 Quick Setup

### 1. Initialize Configuration
```bash
cd /home/kvn/workspace/evolve

# Create config directory
mkdir -p .claude/statusline

# Initialize with defaults (run the bash code from config.md)
# Or manually create .claude/statusline/config.json
```

### 2. Test Commands

**Get active agents:**
```bash
# From command palette or direct execution
# Execute the bash code from .claude/commands/statusline/get-agents.md
```

**Navigate instances:**
```bash
# Execute scroll-right.md bash code
# Execute scroll-left.md bash code
```

**Switch workspaces:**
```bash
# Execute switch-workspace.md with argument 0-9
```

## 📊 How It Works

### Data Flow

1. **Agent Detection**
   ```bash
   npx claude-flow@alpha hooks agent-list
   → Returns active agents/swarms
   ```

2. **State Storage**
   ```json
   .claude/statusline/state.json
   {
     "workspace": 0,
     "instance": 2,
     "agentCount": 5
   }
   ```

3. **Workspace Assignment**
   ```json
   .claude/statusline/workspace-assignments.json
   [
     {"instance": "agent-backend", "workspace": 1, "epic": "auth"}
   ]
   ```

### Navigation

**Circular Scrolling:**
```
Instances: [A, B, C]
Position: 0 (A)

Scroll Right → 1 (B)
Scroll Right → 2 (C)
Scroll Right → 0 (A)  ← Wraps around
```

**Workspace System:**
- **Workspace 0**: Overview (all instances)
- **Workspaces 1-9**: Auto-assigned by epic/project

## 🎯 Integration Points

### claude-flow Hooks Used

```bash
# List agents
npx claude-flow@alpha hooks agent-list

# Swarm status
npx claude-flow@alpha hooks swarm-status

# Memory usage
npx claude-flow@alpha hooks memory-usage

# Notifications
npx claude-flow@alpha hooks notify --message "..."
```

### Auto-Detection Sources

1. **CCPM Epics**: `.claude/epics/*/`
2. **Git Context**: Current branch, project
3. **Process List**: Running Task agents
4. **claude-flow**: Active swarms

## 📝 Next Steps

### 1. Manual Testing

Since Claude Code doesn't auto-discover these commands yet, test by:

1. Copy bash code from each `.md` file
2. Run in terminal from project root
3. Verify state files are created
4. Check `.claude/statusline/state.json`

### 2. VSCode Keybinding (Optional)

Add to VSCode `keybindings.json`:
```json
{
  "key": "ctrl+shift+left",
  "command": "workbench.action.terminal.sendSequence",
  "args": { "text": "cd $WORKSPACE && bash .claude/commands/statusline/scroll-left.md\n" }
}
```

### 3. Configure Workspaces

Edit `.claude/statusline/config.json`:
```json
{
  "workspaceNames": {
    "1": "Auth System",
    "2": "Dashboard UI",
    "3": "API Layer"
  }
}
```

### 4. Test with Active Agents

```bash
# Start some agents
npx claude-flow@alpha swarm init --topology mesh

# Spawn agents
npx claude-flow@alpha agent spawn --type researcher
npx claude-flow@alpha agent spawn --type coder

# Check statusline
# Run get-agents.md bash code
```

## 🔧 Customization

### Display Format

In `.claude/statusline/config.json`:
```json
{
  "display": {
    "format": "[WS:{workspace}] {icon} {name} ({progress}%) {status}"
  }
}
```

### Icons & Indicators

```json
{
  "display": {
    "icons": {
      "backend": "🎯",
      "custom": "🚀"
    },
    "statusIndicators": {
      "running": "▶️",
      "custom": "⭐"
    }
  }
}
```

## 💡 Usage Examples

### Scenario: Multi-Epic Development

```bash
# Epic 1: Auth System
Workspace 1: agent-auth-api, agent-auth-tests

# Epic 2: Dashboard
Workspace 2: agent-dashboard-ui, agent-data-viz

# Overview all work
Workspace 0: All 4 agents
```

**Navigate:**
```bash
# View overview
switch-workspace 0

# Focus on auth work
switch-workspace 1
scroll-right  # auth-api → auth-tests

# Check dashboard
switch-workspace 2
```

## 🐛 Troubleshooting

### Commands Not Found
- ✅ Files are in `.claude/commands/statusline/`
- ❌ Not auto-discovered by Claude Code yet
- **Workaround**: Run bash code manually

### No Agents Detected
```bash
# Verify claude-flow works
npx claude-flow@alpha hooks agent-list

# Check if swarm is active
npx claude-flow@alpha hooks swarm-status
```

### State File Issues
```bash
# Reset state
rm -rf .claude/statusline/state.json

# Run refresh (refresh.md bash code)
```

## 📚 Reference

- **Full Guide**: `.claude/statusline/README.md`
- **Commands**: `.claude/commands/statusline/*.md`
- **Config**: `.claude/statusline/config.json`
- **State**: `.claude/statusline/state.json`

---

**Status**: ✅ Commands Created, Ready for Testing
**Integration**: claude-flow hooks, CCPM epics, Git context
**UI Layer**: rz1989s/claude-code-statusline (already installed)
