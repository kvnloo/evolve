# Scrollable Widget System Design

## Overview

A multi-workspace scrollable widget system that allows users to navigate between 0-9 widget workspaces using hotkeys (arrow keys, 0-9 numbers) within the VSCode statusbar.

---

## Architecture

### Workspace Concept

```
┌─────────────────────────────────────────────────────────────┐
│ Workspace 0: Overview                                        │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │Instance 1│ │Instance 2│ │Instance 3│ │Instance 4│        │
│ │ Auth API │ │ UI Tests │ │ DB Schema│ │ Security │        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Workspace 1: Auth Epic                                       │
│ ┌────────────────────┐ ┌────────────────────┐               │
│ │ Auth API           │ │ Auth Tests         │               │
│ │ ● Running (45%)    │ │ ✓ Completed (100%) │               │
│ │ $4.52 | 15m        │ │ $1.23 | 8m         │               │
│ └────────────────────┘ └────────────────────┘               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Workspace 2: Database Epic                                   │
│ ┌────────────────────┐ ┌────────────────────┐               │
│ │ Schema Migration   │ │ DB Tests           │               │
│ │ ● Running (25%)    │ │ ⏸️ Paused (0%)      │               │
│ └────────────────────┘ └────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## Statusbar Integration

### Compact Statusbar Display

```
┌─────────────────────────────────────────────────────────────┐
│ VSCode Statusbar (bottom right)                              │
├─────────────────────────────────────────────────────────────┤
│ ... │ [WS:0] 🎯 Auth API (45%) ▶️ │ ◀ 1/3 ▶ │ 🔄 4 active │ │
│     └workspace─┘ └current instance┘ └scroll─┘ └─summary─┘  │
└─────────────────────────────────────────────────────────────┘

Elements:
• [WS:0] - Current workspace indicator (0-9)
• 🎯 Auth API (45%) ▶️ - Current instance info (from active workspace)
• ◀ 1/3 ▶ - Scroll position (workspace 1 of 3 total)
• 🔄 4 active - Total active instances across all workspaces
```

---

## Hotkey Navigation

### Keyboard Shortcuts

```typescript
// Workspace switching (Cmd/Ctrl + Shift + 0-9)
"claudeCodeStatusline.switchWorkspace0": "ctrl+shift+0"  // Overview
"claudeCodeStatusline.switchWorkspace1": "ctrl+shift+1"  // Workspace 1
"claudeCodeStatusline.switchWorkspace2": "ctrl+shift+2"  // Workspace 2
// ... up to 9

// Scrolling within workspace (Cmd/Ctrl + Arrow)
"claudeCodeStatusline.scrollLeft":  "ctrl+shift+left"   // Previous instance in workspace
"claudeCodeStatusline.scrollRight": "ctrl+shift+right"  // Next instance in workspace

// Quick actions (Cmd/Ctrl + Shift + letter)
"claudeCodeStatusline.showQuickPick": "ctrl+shift+i"    // Show all instances
"claudeCodeStatusline.focusCurrent":  "ctrl+shift+f"    // Focus current instance window
"claudeCodeStatusline.nextWorkspace": "ctrl+shift+]"    // Next workspace
"claudeCodeStatusline.prevWorkspace": "ctrl+shift+["    // Previous workspace
```

---

## Workspace Configuration

### Workspace Types

**Workspace 0: Overview** (Default)
- Shows all instances across all workspaces
- Grid or compact list view
- Quick navigation to any instance
- Aggregated metrics

**Workspaces 1-9: Custom Groupings**
- Auto-grouped by epic/project (CCPM integration)
- User-defined custom groups
- Tag-based filtering
- Role-based grouping

### Auto-grouping Rules

```typescript
interface WorkspaceConfig {
  id: number;              // 0-9
  name: string;            // "Overview", "Auth Epic", "Custom Group"
  groupingMode: 'epic' | 'project' | 'role' | 'tag' | 'manual';
  filter?: {
    epic?: string;
    project?: string;
    role?: string;
    tags?: string[];
  };
  layout: 'grid' | 'list' | 'compact';
  sortBy: 'status' | 'name' | 'cost' | 'time' | 'progress';
}

// Example configurations
const workspaces: WorkspaceConfig[] = [
  {
    id: 0,
    name: "Overview",
    groupingMode: 'manual',
    layout: 'grid',
    sortBy: 'status'
  },
  {
    id: 1,
    name: "Auth Epic",
    groupingMode: 'epic',
    filter: { epic: 'epic/auth-system' },
    layout: 'list',
    sortBy: 'progress'
  },
  {
    id: 2,
    name: "Backend Work",
    groupingMode: 'role',
    filter: { role: 'backend' },
    layout: 'grid',
    sortBy: 'status'
  }
];
```

---

## Widget Components

### 1. ScrollableWidgetManager

**Responsibility**: Orchestrates workspace navigation and widget rendering

```typescript
class ScrollableWidgetManager {
  private workspaces: Map<number, Workspace>;
  private currentWorkspaceId: number = 0;
  private currentInstanceIndex: number = 0;

  constructor(
    private statusBarItem: vscode.StatusBarItem,
    private mcpClient: MCPClient
  ) {}

  // Workspace navigation
  switchWorkspace(workspaceId: number): void;
  nextWorkspace(): void;
  prevWorkspace(): void;

  // Instance scrolling within workspace
  scrollLeft(): void;
  scrollRight(): void;

  // Widget rendering
  renderStatusBar(): void;
  updateWorkspace(workspaceId: number): void;

  // Hotkey handlers
  registerHotkeys(): void;
}
```

**File**: `src/statusline-extension/widgets/ScrollableWidgetManager.ts`

---

### 2. StatusBarWidget

**Responsibility**: Renders compact statusbar display with scroll indicators

```typescript
class StatusBarWidget {
  private statusBarItem: vscode.StatusBarItem;

  constructor(private manager: ScrollableWidgetManager) {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
  }

  render(data: StatusBarData): void {
    const { workspace, instance, position, total } = data;

    // Format: [WS:0] 🎯 Auth API (45%) ▶️ │ ◀ 1/3 ▶
    this.statusBarItem.text = this.formatDisplay(data);
    this.statusBarItem.tooltip = this.createTooltip(data);
    this.statusBarItem.command = 'claudeCodeStatusline.showQuickPick';
    this.statusBarItem.show();
  }

  private formatDisplay(data: StatusBarData): string;
  private createTooltip(data: StatusBarData): string;

  // Visual effects
  highlightActive(): void;
  showScrollAnimation(direction: 'left' | 'right'): void;
}
```

**File**: `src/statusline-extension/widgets/StatusBarWidget.ts`

---

### 3. SidebarWidget

**Responsibility**: Full workspace view with instance cards/list

```typescript
class SidebarWidget implements vscode.TreeDataProvider<InstanceNode> {
  private _onDidChangeTreeData = new vscode.EventEmitter<InstanceNode | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  constructor(
    private manager: ScrollableWidgetManager,
    private mcpClient: MCPClient
  ) {}

  // TreeView implementation
  getTreeItem(element: InstanceNode): vscode.TreeItem;
  getChildren(element?: InstanceNode): InstanceNode[];

  // Workspace display
  renderWorkspace(workspaceId: number): void;
  renderInstanceCard(instance: InstanceState): InstanceNode;

  // Interactions
  onInstanceClick(instance: InstanceState): void;
  onWorkspaceChange(workspaceId: number): void;

  refresh(): void;
}
```

**File**: `src/statusline-extension/widgets/SidebarWidget.ts`

---

### 4. QuickPickWidget

**Responsibility**: Command palette interface for quick switching

```typescript
class QuickPickWidget {
  constructor(private manager: ScrollableWidgetManager) {}

  async show(): Promise<void> {
    const items = await this.buildQuickPickItems();
    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: 'Switch to instance or workspace',
      matchOnDescription: true,
      matchOnDetail: true
    });

    if (selected) {
      await this.handleSelection(selected);
    }
  }

  private async buildQuickPickItems(): Promise<QuickPickItem[]> {
    // Build items for:
    // - All workspaces (0-9)
    // - All instances with status
    // - Actions (new, refresh, settings)
  }

  private async handleSelection(item: QuickPickItem): Promise<void>;
}
```

**File**: `src/statusline-extension/widgets/QuickPickWidget.ts`

---

## Scroll Behavior

### Visual Feedback

```typescript
// Scroll animation system
class ScrollAnimator {
  private animationFrame: number | null = null;

  scrollLeft(statusBar: StatusBarWidget): void {
    // Animate: Current → [fade out] → Previous [fade in]
    this.animate('left', () => {
      statusBar.render(/* previous instance */);
    });
  }

  scrollRight(statusBar: StatusBarWidget): void {
    // Animate: Current → [fade out] → Next [fade in]
    this.animate('right', () => {
      statusBar.render(/* next instance */);
    });
  }

  private animate(direction: 'left' | 'right', callback: () => void): void {
    // Show directional indicator (◀ or ▶) briefly
    // Fade transition between instances
    // Update statusbar text smoothly
  }
}
```

### Circular Scrolling

```typescript
// When at end, wrap to beginning
scrollRight(): void {
  if (this.currentInstanceIndex >= this.instances.length - 1) {
    this.currentInstanceIndex = 0;  // Wrap to first
  } else {
    this.currentInstanceIndex++;
  }
  this.renderStatusBar();
}

scrollLeft(): void {
  if (this.currentInstanceIndex <= 0) {
    this.currentInstanceIndex = this.instances.length - 1;  // Wrap to last
  } else {
    this.currentInstanceIndex--;
  }
  this.renderStatusBar();
}
```

---

## Workspace Auto-Detection

### CCPM Integration

```typescript
class WorkspaceDetector {
  constructor(private mcpClient: MCPClient) {}

  async detectWorkspaces(): Promise<WorkspaceConfig[]> {
    const instances = await this.mcpClient.getInstances();

    // Auto-detect epics from branch names
    const epicGroups = this.groupByEpic(instances);

    // Create workspace configs
    const workspaces: WorkspaceConfig[] = [
      { id: 0, name: "Overview", groupingMode: 'manual' }
    ];

    // Assign epics to workspaces 1-9
    let workspaceId = 1;
    for (const [epicName, instances] of Object.entries(epicGroups)) {
      if (workspaceId > 9) break;

      workspaces.push({
        id: workspaceId++,
        name: epicName,
        groupingMode: 'epic',
        filter: { epic: epicName },
        layout: 'grid',
        sortBy: 'progress'
      });
    }

    return workspaces;
  }

  private groupByEpic(instances: InstanceState[]): Map<string, InstanceState[]> {
    // Group by branch pattern: epic/auth-system → "Auth System"
    // or by CCPM epic metadata
  }
}
```

---

## Configuration

### User Settings

```jsonc
{
  "claudeCodeStatusline.workspaces": {
    "enabled": true,
    "autoDetect": true,           // Auto-create workspaces from epics
    "maxWorkspaces": 10,           // 0-9
    "defaultWorkspace": 0,         // Start on Overview
    "showScrollIndicators": true,  // Show ◀ ▶ arrows
    "animateTransitions": true,    // Smooth scrolling animation
    "circularScrolling": true      // Wrap at ends
  },
  "claudeCodeStatusline.workspaceLayouts": {
    "overview": "grid",            // grid | list | compact
    "epic": "list",
    "custom": "grid"
  },
  "claudeCodeStatusline.hotkeys": {
    // Configurable hotkey bindings
    "enabled": true,
    "customBindings": {}
  }
}
```

---

## State Persistence

### Workspace State

```typescript
interface WorkspaceState {
  currentWorkspaceId: number;
  currentInstanceIndex: number;
  workspaceConfigs: WorkspaceConfig[];
  lastUpdated: number;
}

class StatePersistence {
  private context: vscode.ExtensionContext;

  async saveState(state: WorkspaceState): Promise<void> {
    await this.context.globalState.update('workspaceState', state);
  }

  async loadState(): Promise<WorkspaceState | undefined> {
    return this.context.globalState.get('workspaceState');
  }

  async restoreLastSession(): Promise<void> {
    const state = await this.loadState();
    if (state) {
      // Restore workspace and scroll position
    }
  }
}
```

---

## Implementation Plan

### Phase 1: Core Scrolling (Agent 1)
- [ ] ScrollableWidgetManager class
- [ ] Workspace switching logic
- [ ] Instance scrolling (left/right)
- [ ] State management

### Phase 2: StatusBar Widget (Agent 2)
- [ ] StatusBarWidget class
- [ ] Compact display rendering
- [ ] Scroll indicators (◀ ▶)
- [ ] Click handlers

### Phase 3: Sidebar Widget (Agent 3)
- [ ] SidebarWidget class
- [ ] TreeView implementation
- [ ] Workspace display
- [ ] Instance cards

### Phase 4: Quick Pick Widget (Agent 4)
- [ ] QuickPickWidget class
- [ ] Command palette integration
- [ ] Item building
- [ ] Selection handling

### Phase 5: MCP Integration (Agent 5)
- [ ] MCPClient class
- [ ] WebSocket connection
- [ ] Instance state sync
- [ ] Event handling

### Phase 6: Extension Boilerplate (Agent 6)
- [ ] Extension activation
- [ ] Command registration
- [ ] Hotkey bindings
- [ ] Configuration loading

---

## Example Usage

### User Workflow

1. **Start with Overview (Workspace 0)**
   - See all 6 instances in grid view
   - Press `Ctrl+Shift+1` → Switch to "Auth Epic" workspace

2. **Navigate Auth Epic (Workspace 1)**
   - See 2 instances: Auth API, Auth Tests
   - Press `Ctrl+Shift+Right` → Scroll from Auth API to Auth Tests
   - Press `Ctrl+Shift+Right` → Wrap back to Auth API

3. **Quick Switch**
   - Press `Ctrl+Shift+I` → Open Quick Pick
   - Type "schema" → Find DB Schema instance
   - Enter → Switch to Workspace 2, focus DB Schema

4. **Direct Workspace Jump**
   - Press `Ctrl+Shift+2` → Jump directly to Database Epic workspace
   - Press `Ctrl+Shift+0` → Return to Overview

---

## File Structure

```
src/statusline-extension/
├── widgets/
│   ├── ScrollableWidgetManager.ts   ← Agent 1
│   ├── StatusBarWidget.ts           ← Agent 2
│   ├── SidebarWidget.ts             ← Agent 3
│   ├── QuickPickWidget.ts           ← Agent 4
│   └── WorkspaceDetector.ts         ← Agent 1
├── mcp/
│   ├── MCPClient.ts                 ← Agent 5
│   └── types.ts                     ← Agent 5
├── utils/
│   ├── ScrollAnimator.ts            ← Agent 1
│   └── StatePersistence.ts          ← Agent 1
├── types/
│   └── index.ts                     ← Shared types
└── extension.ts                     ← Agent 6
```

---

## Success Criteria

✅ **Functional**:
- Can navigate between 0-9 workspaces using hotkeys
- Scrolling left/right works within each workspace
- Auto-detects epics and creates workspaces
- Persists state across VSCode restarts

✅ **Performance**:
- Scroll transitions < 100ms
- No lag when switching workspaces
- Supports 15+ instances without slowdown

✅ **UX**:
- Clear visual indicators for current workspace
- Smooth animations (if enabled)
- Intuitive hotkey bindings
- Accessible tooltips and descriptions

---

**Next**: Parallel implementation by 6 agents, each working on separate files to avoid concurrency issues.
