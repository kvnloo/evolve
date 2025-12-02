# Claude Code Multi-Instance Statusline - Implementation Guide

## Overview

This guide explains the implementation architecture, design decisions, and integration points for the Claude Code Multi-Instance Statusline extension.

## Architecture

### Component Hierarchy

```
extension.ts (Entry Point)
    ├── ScrollableWidgetManager (Core Orchestrator)
    │   ├── Workspace Management (0-9)
    │   ├── Instance Navigation (circular scroll)
    │   └── State Persistence (VSCode globalState)
    │
    ├── StatusBarWidget (Compact Display)
    │   ├── Workspace indicator [WS:N]
    │   ├── Instance info with icon/status
    │   └── Scroll position ◀ N/M ▶
    │
    ├── SidebarWidget (Tree View)
    │   ├── Workspace nodes
    │   └── Instance nodes (clickable)
    │
    ├── QuickPickWidget (Command Palette)
    │   ├── Instance search
    │   ├── Workspace filtering
    │   └── Action items
    │
    └── MCPClient (Optional Coordination)
        ├── WebSocket connection
        ├── Heartbeat mechanism
        └── Request/response handling
```

### Data Flow

```
1. Instance Detection
   └─> Auto-detect from CCPM epics (.claude/epics)
   └─> Parse git repositories
   └─> Group by project/epic
   └─> Assign to workspaces

2. State Updates
   └─> Poll interval (default: 5s)
   └─> MCP server events (if enabled)
   └─> User interactions
   └─> Git status changes

3. Widget Updates
   └─> ScrollableWidgetManager emits events
   └─> StatusBarWidget refreshes statusbar
   └─> SidebarWidget refreshes tree
   └─> State persisted to globalState

4. User Interactions
   └─> Hotkeys trigger commands
   └─> Commands route to ScrollableWidgetManager
   └─> Manager updates internal state
   └─> Widgets refresh automatically
```

## Core Components

### 1. ScrollableWidgetManager

**Purpose**: Central orchestrator managing workspace navigation, instance scrolling, and widget coordination.

**Key Responsibilities**:
- Workspace switching (0-9 workspaces)
- Circular instance scrolling within workspaces
- State persistence using VSCode globalState
- Event emission for widget synchronization
- Instance detection and grouping

**State Structure**:
```typescript
{
  currentWorkspaceId: number;           // Active workspace (0-9)
  currentInstanceIndices: number[];     // Scroll position per workspace
  workspaces: WorkspaceConfig[];        // Workspace definitions
  instances: Map<number, InstanceState[]> // Instances grouped by workspace
}
```

**Navigation Logic**:
```typescript
// Workspace switching
switchWorkspace(workspaceId: number): void {
  if (workspaceId < 0 || workspaceId > 9) return;
  this.currentWorkspaceId = workspaceId;
  this.persistState();
  this.emit('workspace-changed');
}

// Circular scrolling
scrollRight(): void {
  const instances = this.getCurrentWorkspaceInstances();
  if (instances.length === 0) return;

  let currentIndex = this.currentInstanceIndices[this.currentWorkspaceId] || 0;
  currentIndex = (currentIndex + 1) % instances.length; // Circular
  this.currentInstanceIndices[this.currentWorkspaceId] = currentIndex;

  this.persistState();
  this.emit('instance-changed');
}
```

### 2. StatusBarWidget

**Purpose**: Compact statusbar display showing current workspace, instance, and navigation controls.

**Display Format**:
```
[WS:0] 🎯 Auth API (45%) ▶️ │ ◀ 1/3 ▶ │ 🔄 5 active
  │      │       │      │    │    │      │     └─ Total active
  │      │       │      │    │    └──────┴─ Scroll position
  │      │       │      │    └─ Separator
  │      │       │      └─ Status icon
  │      │       └─ Progress percentage
  │      └─ Instance name
  └─ Workspace ID
```

**Rendering Logic**:
```typescript
render(data: StatusBarData): void {
  const parts: string[] = [];

  // Workspace
  parts.push(`[WS:${data.workspace.id}]`);

  // Instance
  const icon = this.getInstanceIcon(data.instance);
  const status = this.getStatusIndicator(data.instance.status);
  const progress = data.instance.coordination?.progress
    ? `(${data.instance.coordination.progress}%)`
    : '';
  parts.push(`${icon} ${data.instance.name}${progress} ${status}`);

  // Scroll indicators
  if (this.showScrollIndicators && data.scrollPosition.total > 1) {
    parts.push('│');
    parts.push(`◀ ${data.scrollPosition.current}/${data.scrollPosition.total} ▶`);
  }

  // Active instances
  if (data.totalActiveInstances > 1) {
    parts.push(`│ 🔄 ${data.totalActiveInstances} active`);
  }

  this.statusBarItem.text = parts.join(' ');
}
```

### 3. SidebarWidget

**Purpose**: Hierarchical TreeView showing workspaces and their instances.

**Tree Structure**:
```
📁 Workspace 0: Overview (5 instances)
├─ 🎯 Auth API ● $1.23 15m ▰▰▰▰▰▱▱▱▱▱
├─ 🎨 Dashboard UI ● $0.87 23m ▰▰▰▰▰▰▰▱▱▱
└─ 🗄️ Database Schema ✓ $0.45 8m ▰▰▰▰▰▰▰▰▰▰

📁 Workspace 1: Auth System (2 instances)
├─ 🎯 Auth API ● $1.23 15m
└─ 🧪 Auth Tests ⏸️ $0.12 3m
```

**Node Creation**:
```typescript
class InstanceNode extends vscode.TreeItem {
  constructor(instance: InstanceState) {
    super(instance.name, vscode.TreeItemCollapsibleState.None);

    this.tooltip = this.createTooltip();
    this.iconPath = this.getIcon();         // Status-based icon
    this.description = this.getDescription(); // Metrics + progress

    // Click to focus
    this.command = {
      command: 'claudeCodeStatusline.focusInstance',
      arguments: [instance.id]
    };
  }
}
```

### 4. QuickPickWidget

**Purpose**: Command palette interface for fast instance switching with fuzzy search.

**Menu Structure**:
```typescript
// Workspace separators
🏠 Overview
  💻 Frontend Dev    ● Running   $1.23 │ 15m │ ▰▰▰▰▰▱▱▱▱▱
  🎯 Backend API     ● Running   $0.87 │ 23m │ ▰▰▰▰▰▰▰▱▱▱

📁 Project Alpha
  🧪 Tests           ⏸️ Waiting   $0.45 │ 8m  │ ▰▰▰▰▰▰▰▰▰▰
  🔧 DevOps         ✓ Completed $0.12 │ 3m  │ ▰▰▰▰▰▰▰▰▰▰

─────────────────
$(add) New Instance
$(refresh) Refresh
$(settings-gear) Settings
```

**Selection Handling**:
```typescript
private async handleSelection(item: InstanceQuickPickItem): Promise<void> {
  if (item.instanceId) {
    await this.switchToInstance(item.instanceId);
  } else if (item.action) {
    await this.handleAction(item.action);
  } else if (item.workspaceId !== undefined) {
    this.manager.switchWorkspace(item.workspaceId);
  }
}
```

### 5. MCPClient (Optional)

**Purpose**: WebSocket client for coordinating with central MCP server.

**Connection Management**:
```typescript
async connect(): Promise<void> {
  this.ws = new WebSocket(this.config.serverUrl);

  this.ws.on('open', () => {
    this.connected = true;
    this.emit('connected');
    this.startHeartbeat();
  });

  this.ws.on('message', (data) => {
    const message = JSON.parse(data);
    this.handleMessage(message);
  });

  this.ws.on('close', () => {
    this.connected = false;
    this.reconnect();
  });
}
```

**Request/Response Pattern**:
```typescript
private async sendMessage(message: MCPMessage): Promise<any> {
  const id = `req-${this.requestId++}`;
  message.id = id;

  return new Promise((resolve, reject) => {
    this.pendingRequests.set(id, resolve);

    const timeout = setTimeout(() => {
      this.pendingRequests.delete(id);
      reject(new Error(`Request timeout: ${message.tool}`));
    }, this.config.requestTimeout);

    this.ws.send(JSON.stringify(message));
  });
}
```

## Instance Detection

### Auto-Detection Strategy

**1. CCPM Epic Detection**
```typescript
async detectFromCCPM(): Promise<InstanceState[]> {
  const epicPath = config.get('detection.ccpmPath', '.claude/epics');
  const epics = await fs.readdir(epicPath);

  return epics.map(epic => ({
    id: epic,
    name: epic,
    project: epic,
    epic: epic,
    // Detect from epic metadata
  }));
}
```

**2. Git Repository Analysis**
```typescript
async detectFromGit(): Promise<InstanceState[]> {
  const repos = await this.findGitRepos();

  return repos.map(repo => ({
    id: repo.path,
    name: repo.name,
    project: repo.project,
    git: {
      branch: await this.getCurrentBranch(repo),
      isDirty: await this.isDirty(repo)
    }
  }));
}
```

**3. Workspace Assignment**
```typescript
assignToWorkspace(instance: InstanceState): number {
  // Workspace 0 is overview (contains all)
  if (instance.epic) {
    // Use epic hash for consistent assignment
    return (hashCode(instance.epic) % 9) + 1; // 1-9
  }
  if (instance.project) {
    return (hashCode(instance.project) % 9) + 1;
  }
  return 1; // Default workspace
}
```

## State Persistence

### Storage Schema
```typescript
interface PersistedState {
  version: string;                    // Schema version
  currentWorkspaceId: number;         // Last active workspace
  currentInstanceIndices: number[];   // Scroll positions
  workspaceAssignments: {             // Manual assignments
    [instanceId: string]: number;
  };
  customWorkspaces: {                 // User-defined workspaces
    [id: number]: {
      name: string;
      color?: string;
      icon?: string;
    };
  };
}
```

### Persistence Operations
```typescript
// Save state
private async persistState(): Promise<void> {
  const state: PersistedState = {
    version: '1.0.0',
    currentWorkspaceId: this.currentWorkspaceId,
    currentInstanceIndices: this.currentInstanceIndices,
    workspaceAssignments: this.workspaceAssignments,
    customWorkspaces: this.customWorkspaces
  };

  await this.context.globalState.update('statusline.state', state);
}

// Load state
private async loadState(): Promise<void> {
  const state = this.context.globalState.get<PersistedState>('statusline.state');

  if (state) {
    this.currentWorkspaceId = state.currentWorkspaceId || 0;
    this.currentInstanceIndices = state.currentInstanceIndices || [];
    this.workspaceAssignments = state.workspaceAssignments || {};
    this.customWorkspaces = state.customWorkspaces || {};
  }
}
```

## Extension Activation

### Activation Flow
```typescript
export async function activate(context: vscode.ExtensionContext) {
  // 1. Initialize MCP client (optional)
  if (config.get('mcp.enabled')) {
    mcpClient = new MCPClient(mcpConfig);
    await mcpClient.connect();
  }

  // 2. Create widget manager
  widgetManager = new ScrollableWidgetManager(context, mcpClient);

  // 3. Create widgets
  statusBarWidget = new StatusBarWidget(widgetManager);
  sidebarWidget = new SidebarWidget(widgetManager);
  quickPickWidget = new QuickPickWidget(widgetManager);

  // 4. Register commands
  registerCommands(context);
  registerHotkeyCommands(context);

  // 5. Start update polling
  startUpdatePolling();
}
```

## Hotkey System

### Command Registration
```typescript
// Workspace hotkeys (0-9)
for (let i = 0; i <= 9; i++) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      `claudeCodeStatusline.switchWorkspace${i}`,
      () => widgetManager.switchWorkspace(i)
    )
  );
}

// Navigation hotkeys
context.subscriptions.push(
  vscode.commands.registerCommand(
    'claudeCodeStatusline.scrollLeft',
    () => widgetManager.scrollLeft()
  )
);
```

### Keybinding Configuration
```json
{
  "key": "ctrl+shift+0",
  "mac": "cmd+shift+0",
  "command": "claudeCodeStatusline.switchWorkspace0"
}
```

## Testing Strategy

### Unit Tests
```typescript
describe('ScrollableWidgetManager', () => {
  it('should switch workspaces', () => {
    manager.switchWorkspace(1);
    expect(manager.getCurrentWorkspace().id).toBe(1);
  });

  it('should handle circular scrolling', () => {
    // 3 instances in workspace
    manager.scrollRight(); // 0 -> 1
    manager.scrollRight(); // 1 -> 2
    manager.scrollRight(); // 2 -> 0 (circular)
    expect(manager.getCurrentInstance()).toBe(instances[0]);
  });
});
```

### Integration Tests
```typescript
describe('Extension Integration', () => {
  it('should detect CCPM instances', async () => {
    const instances = await widgetManager.detectInstances();
    expect(instances.length).toBeGreaterThan(0);
  });

  it('should update statusbar on workspace change', async () => {
    await widgetManager.switchWorkspace(1);
    const text = statusBarWidget.statusBarItem.text;
    expect(text).toContain('[WS:1]');
  });
});
```

## Performance Considerations

### Optimization Strategies

**1. Efficient Polling**
```typescript
// Only poll when window is focused
vscode.window.onDidChangeWindowState((state) => {
  if (state.focused) {
    startUpdatePolling();
  } else {
    stopUpdatePolling();
  }
});
```

**2. Event Debouncing**
```typescript
private debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

**3. Lazy Loading**
```typescript
// Only load instance details when needed
async getInstanceDetails(id: string): Promise<InstanceState> {
  if (this.cache.has(id)) {
    return this.cache.get(id);
  }

  const instance = await this.loadInstance(id);
  this.cache.set(id, instance);
  return instance;
}
```

## Future Enhancements

### Planned Features
1. **Custom workspace colors and icons**
2. **Drag-and-drop instance assignment**
3. **Instance filtering and search**
4. **Custom metrics and KPIs**
5. **Remote coordination via MCP**
6. **Multi-user collaboration indicators**
7. **Historical session tracking**
8. **Cost optimization recommendations**

### Extension Points
```typescript
// Plugin system for custom detectors
interface InstanceDetector {
  detect(): Promise<InstanceState[]>;
  priority: number;
}

// Custom metric providers
interface MetricProvider {
  getMetrics(instance: InstanceState): Promise<Metrics>;
}
```

## Troubleshooting

### Common Issues

**Issue: Instances not detected**
- Check `.claude/epics` exists
- Verify `detection.ccpmPath` configuration
- Enable `detection.autoDetect`

**Issue: MCP connection fails**
- Verify `mcp.serverUrl` is correct
- Check MCP server is running
- Review firewall/network settings

**Issue: Hotkeys not working**
- Check for keybinding conflicts
- Verify extension is activated
- Review VSCode keybinding settings

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development setup and guidelines.
