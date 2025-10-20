# Claude Code Statusline Enhancement

Multi-instance orchestration statusline using existing `rz1989s/claude-code-statusline` extension with claude-flow integration.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  rz1989s/claude-code-statusline Extension (UI Layer)    │
│  Displays statusbar, provides VSCode integration        │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐       ┌───────▼────────┐
│  Claude Code   │       │  claude-flow   │
│  Commands      │◄──────│  Hooks & MCP   │
│  (.claude/     │       │  (Agent Info)  │
│   commands/)   │       │                │
└───────┬────────┘       └────────────────┘
        │
        ├── get-agents.md      → Query active agents
        ├── scroll-left.md     → Navigate instances ←
        ├── scroll-right.md    → Navigate instances →
        ├── switch-workspace.md → Switch workspace 0-9
        ├── refresh.md         → Force refresh data
        └── config.md          → Configure behavior
```

## Features

### 🎯 Multi-Instance Management
- **Workspace 0**: Overview of all active agents
- **Workspaces 1-9**: Project/epic-specific grouping
- **Auto-detection**: From CCPM epics and claude-flow swarms

### ⌨️ Hotkey Navigation
- `Ctrl+Shift+←/→` - Scroll through instances
- `Ctrl+Shift+0-9` - Switch workspaces
- `/statusline/refresh` - Force data refresh

### 📊 Data Sources
- **claude-flow**: Active swarms, agent lists, memory usage
- **SuperClaude**: Task agents, coordination state
- **CCPM**: Epic detection, project organization
- **Git**: Branch context, repository info

## Installation

### 1. Install Base Extension
```bash
# Already installed: rz1989s/claude-code-statusline v2.10.0
```

### 2. Initialize Configuration
```bash
# Run from project root
cd /home/kvn/workspace/evolve

# Initialize statusline config
claude /statusline/config init

# Verify setup
claude /statusline/get-agents
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

## Usage

### View Active Agents
```bash
claude /statusline/get-agents
```

**Output:**
```
📊 Claude Flow Agents:
  ✅ agent-backend-specialist
  ✅ agent-frontend-dev
  ✅ agent-tester

🤖 SuperClaude Agents:
  ✅ Task researcher
  ✅ Task coder

📁 Current Workspace: Workspace 1 (Auth System)
🌿 Git Branch: feature/auth-api
```

### Navigate Instances
```bash
# Scroll through instances
claude /statusline/scroll-right  # ▶
claude /statusline/scroll-left   # ◀

# Switch workspaces
claude /statusline/switch-workspace 0  # Overview
claude /statusline/switch-workspace 1  # Workspace 1
```

### Force Refresh
```bash
claude /statusline/refresh
```

**Output:**
```
🔄 Refreshing statusline data...
Active Agents: 5
Memory Usage: 45MB
✅ Refresh complete
```

## State Management

### State File
Location: `.claude/statusline/state.json`

```json
{
  "workspace": 0,
  "instance": 0,
  "agentCount": 5,
  "lastRefresh": "2025-10-20T12:34:56Z",
  "swarmActive": true
}
```

### Workspace Assignments
Location: `.claude/statusline/workspace-assignments.json`

```json
[
  {"instance": "agent-backend", "workspace": 1, "epic": "auth-system"},
  {"instance": "agent-frontend", "workspace": 2, "epic": "dashboard"},
  {"instance": "agent-tester", "workspace": 1, "epic": "auth-system"}
]
```

## Integration with claude-flow

### Hooks Used
```bash
# Get agent list
npx claude-flow@alpha hooks agent-list

# Get swarm status
npx claude-flow@alpha hooks swarm-status

# Get memory usage
npx claude-flow@alpha hooks memory-usage

# Send notifications
npx claude-flow@alpha hooks notify --message "..."
```

### Auto-detection
Automatically detects agents from:
1. `npx claude-flow@alpha hooks agent-list`
2. CCPM epics in `.claude/epics/`
3. Running Task agents (SuperClaude)
4. Git repository context

## Statusline Display Format

**Configured in** `.claude/statusline/config.json`:

```
[WS:0] 🎯 Auth API (45%) ▶️ │ ◀ 1/5 ▶ │ 🔄 5 active
  │      │       │      │    │    │      │     └─ Total active
  │      │       │      │    │    └──────┴─ Scroll position
  │      │       │      │    └─ Separator
  │      │       │      └─ Status icon
  │      │       └─ Progress percentage
  │      └─ Instance name
  └─ Workspace ID
```

## Customization

### Change Display Format
```bash
claude /statusline/config set display.format "[{workspace}] {name} {status}"
```

### Update Refresh Interval
```bash
claude /statusline/config set autoRefreshInterval 3000
```

### Rename Workspace
Edit `.claude/statusline/config.json`:
```json
{
  "workspaceNames": {
    "1": "My Custom Workspace Name"
  }
}
```

## Troubleshooting

### No Agents Detected
```bash
# Check claude-flow
npx claude-flow@alpha hooks agent-list

# Check state file
cat .claude/statusline/state.json

# Force refresh
claude /statusline/refresh
```

### Workspace Assignment Issues
```bash
# Reset assignments
rm .claude/statusline/workspace-assignments.json

# Refresh to auto-detect
claude /statusline/refresh
```

### Config Problems
```bash
# Reset to defaults
claude /statusline/config reset

# Re-initialize
claude /statusline/config init
```

## Next Steps

1. **Configure workspaces** - Name your workspaces in config
2. **Test navigation** - Try scroll-left/right commands
3. **Customize display** - Adjust format to your preference
4. **Set up hotkeys** - Configure VSCode keybindings for commands

## Files Structure

```
.claude/
├── commands/
│   └── statusline/
│       ├── get-agents.md
│       ├── scroll-left.md
│       ├── scroll-right.md
│       ├── switch-workspace.md
│       ├── refresh.md
│       └── config.md
└── statusline/
    ├── README.md (this file)
    ├── config.json
    ├── state.json
    ├── workspace-assignments.json
    └── agents-cache.txt
```
