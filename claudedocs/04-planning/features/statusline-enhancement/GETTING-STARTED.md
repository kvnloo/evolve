# Getting Started with Claude Code Multi-Instance Statusline

Quick start guide for installing and using the Claude Code Multi-Instance Statusline extension.

## Installation

### Option 1: From VSCode Marketplace (Coming Soon)
```bash
# Search for "Claude Code Multi-Instance Statusline" in VSCode Extensions
code --install-extension claude-code.claude-code-statusline
```

### Option 2: From Source
```bash
# Clone repository
git clone https://github.com/kvnloo/evolve.git
cd evolve/src/statusline-extension

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension
npm run package

# Install
code --install-extension claude-code-statusline-1.0.0.vsix
```

## First Steps

### 1. Verify Installation
After installing, you should see:
- StatusBar item on the right: `[WS:0] No instances`
- Sidebar panel: "Claude Code Instances"

### 2. Configure Auto-Detection

**Open VSCode Settings** (`Ctrl+,` or `Cmd+,`)

```json
{
  // Enable auto-detection
  "claudeCodeStatusline.detection.autoDetect": true,

  // Set CCPM path (default: .claude/epics)
  "claudeCodeStatusline.detection.ccpmPath": ".claude/epics",

  // Update interval (milliseconds)
  "claudeCodeStatusline.updateInterval": 5000
}
```

### 3. Test Instance Detection

**If using CCPM:**
```bash
# Ensure .claude/epics exists
mkdir -p .claude/epics/auth-system
mkdir -p .claude/epics/dashboard-ui

# Reload VSCode
# Ctrl+Shift+P → "Developer: Reload Window"
```

**Manual test:**
```bash
# Open VSCode Command Palette (Ctrl+Shift+P)
# Type: "Claude Code: Refresh Instances"
```

### 4. Learn the Hotkeys

#### Workspace Navigation
- **Ctrl+Shift+0** - Switch to Workspace 0 (Overview)
- **Ctrl+Shift+1** - Switch to Workspace 1
- **Ctrl+Shift+2-9** - Switch to Workspaces 2-9

#### Instance Navigation
- **Ctrl+Shift+←** - Scroll to previous instance
- **Ctrl+Shift+→** - Scroll to next instance
- **Ctrl+Shift+I** - Open quick pick menu

> **Mac Users:** Replace `Ctrl` with `Cmd`

## Basic Usage

### Viewing Instances

**StatusBar (Compact View)**
```
[WS:0] 🎯 Auth API (45%) ▶️ │ ◀ 1/3 ▶ │ 🔄 5 active
```
- Click to open quick pick menu
- Shows current workspace, instance, and navigation

**Sidebar Panel (Detailed View)**
```
📁 Workspace 0: Overview (5 instances)
├─ 🎯 Auth API ● $1.23 15m ▰▰▰▰▰▱▱▱▱▱
├─ 🎨 Dashboard UI ● $0.87 23m
└─ 🗄️ Database ✓ $0.45 8m
```
- Click instance to focus
- Hover for detailed tooltip

### Switching Between Instances

**Method 1: Hotkeys (Fastest)**
```
Ctrl+Shift+1    → Switch to Workspace 1
Ctrl+Shift+→    → Next instance
Ctrl+Shift+←    → Previous instance
```

**Method 2: Quick Pick Menu**
```
Ctrl+Shift+I    → Open menu
Type to search  → Filter instances
Enter           → Switch to instance
```

**Method 3: Sidebar**
```
Click instance in sidebar panel → Focuses that instance
```

### Understanding Workspaces

**Workspace 0: Overview**
- Shows all active instances across all workspaces
- Auto-populated, cannot be edited
- Use for global view of all activity

**Workspaces 1-9: Project Workspaces**
- Auto-assigned based on CCPM epics/projects
- Group related instances together
- Customize assignments in settings

### Reading Instance Information

**Status Indicators**
- ● **Running** - Active work in progress
- ⏸️ **Waiting** - Blocked or paused
- ✓ **Completed** - Task finished
- ❌ **Error** - Something went wrong
- ○ **Idle** - No current activity

**Icons by Role**
- 🎯 Backend
- 🎨 Frontend
- 🗄️ Database
- 🧪 Testing
- 📝 Documentation
- 🔧 DevOps
- 🔒 Security
- 💻 General

**Metrics**
- **$1.23** - Session cost
- **15m** - Time elapsed
- **▰▰▰▰▰▱▱▱▱▱** - Progress bar (50%)

## Advanced Features

### MCP Server Coordination (Optional)

**Enable MCP Integration:**
```json
{
  "claudeCodeStatusline.mcp.enabled": true,
  "claudeCodeStatusline.mcp.serverUrl": "ws://localhost:8080"
}
```

**Benefits:**
- Cross-instance synchronization
- Dependency tracking
- Centralized coordination
- Real-time updates

**Setup MCP Server:**
```bash
# Install MCP server (example)
npm install -g @claude/mcp-server

# Start server
mcp-server start --port 8080
```

### Custom Workspace Names

```json
{
  "claudeCodeStatusline.customWorkspaces": {
    "1": {
      "name": "Authentication System",
      "icon": "🔐",
      "color": "#ff6b6b"
    },
    "2": {
      "name": "Dashboard UI",
      "icon": "📊",
      "color": "#4ecdc4"
    }
  }
}
```

### Manual Instance Assignment

```json
{
  "claudeCodeStatusline.workspaceAssignments": {
    "instance-auth-api": 1,
    "instance-dashboard": 2,
    "instance-database": 1
  }
}
```

## Workflows

### Multi-Epic Development

**Scenario:** Working on 3 epics simultaneously

```bash
# Workspace 1: Auth System
Ctrl+Shift+1  → Switch to auth workspace
  Instance 1: Backend API
  Instance 2: Frontend components
  Instance 3: Tests

# Workspace 2: Dashboard
Ctrl+Shift+2  → Switch to dashboard workspace
  Instance 1: Data visualization
  Instance 2: API integration

# Workspace 0: Overview
Ctrl+Shift+0  → See all 5 instances at once
```

### Rapid Context Switching

**Quick switch between related tasks:**
```
Working on auth API    → Ctrl+Shift+1
Need to check tests    → Ctrl+Shift+→ (scroll to tests)
Back to API            → Ctrl+Shift+← (scroll back)
Overview all progress  → Ctrl+Shift+0
```

### Team Coordination

**See what everyone is working on:**
```
Workspace 0: Overview
  ● Backend Team: 3 instances running
  ● Frontend Team: 2 instances running
  ● Testing Team: 1 instance waiting

Click instance → Jump to team's work
```

## Troubleshooting

### No Instances Detected

**Check:**
1. `.claude/epics` directory exists
2. Auto-detection is enabled
3. Correct `ccpmPath` configuration

**Fix:**
```bash
# Verify directory
ls -la .claude/epics

# Reload VSCode
Ctrl+Shift+P → "Developer: Reload Window"

# Manual refresh
Ctrl+Shift+P → "Claude Code: Refresh Instances"
```

### Hotkeys Not Working

**Check:**
1. Extension is activated
2. No keybinding conflicts

**Fix:**
```bash
# View keybindings
Ctrl+K Ctrl+S → Search "claudeCodeStatusline"

# Check for conflicts (red warning icon)
# Customize if needed
```

### StatusBar Not Showing

**Check:**
1. StatusBar is visible (View → Appearance → Show Status Bar)
2. Extension is enabled

**Fix:**
```bash
# Show statusbar
View → Appearance → Show Status Bar

# Reload extension
Ctrl+Shift+P → "Developer: Reload Window"
```

### MCP Connection Issues

**Check:**
1. MCP server is running
2. Correct server URL
3. Network/firewall settings

**Fix:**
```bash
# Test connection
curl ws://localhost:8080

# Check server logs
# Verify firewall allows WebSocket connections
```

## Tips & Tricks

### Productivity Boosts

**1. Muscle Memory for Workspaces**
```
Ctrl+Shift+1 → Always auth work
Ctrl+Shift+2 → Always frontend
Ctrl+Shift+3 → Always testing
```

**2. Quick Status Check**
```
Ctrl+Shift+0 → Overview all instances
Check progress bars → See what's completing
```

**3. Search for Specific Instance**
```
Ctrl+Shift+I → Quick pick
Type "auth" → Find auth-related instances
Enter → Jump there
```

### Customization

**Reduce Visual Clutter**
```json
{
  "claudeCodeStatusline.showScrollIndicators": false
}
```

**Faster Updates**
```json
{
  "claudeCodeStatusline.updateInterval": 2000  // 2 seconds
}
```

**Custom Workspace Organization**
```json
{
  "claudeCodeStatusline.customWorkspaces": {
    "1": { "name": "Critical Path", "icon": "🚨" },
    "2": { "name": "In Review", "icon": "👀" },
    "3": { "name": "Backlog", "icon": "📋" }
  }
}
```

## Next Steps

- **Read**: [Implementation Guide](implementation/IMPLEMENTATION-GUIDE.md) for technical details
- **Explore**: [Design Documentation](design/scrollable-widget-system.md) for architecture
- **Contribute**: [GitHub Issues](https://github.com/kvnloo/evolve/issues) for feedback

## Support

**Get Help:**
- 📖 [Documentation](.)
- 🐛 [Report Issues](https://github.com/kvnloo/evolve/issues)
- 💬 [Discussions](https://github.com/kvnloo/evolve/discussions)

**Quick Links:**
- [Configuration Reference](CONFIGURATION.md)
- [Keyboard Shortcuts](KEYBOARD-SHORTCUTS.md)
- [FAQ](FAQ.md)
