# Hybrid Architecture: VSCode Extension + MCP Server

## Overview

This document outlines the hybrid architecture combining:
- **VSCode Extension**: UI/UX layer for statusline display and user interaction
- **MCP Server**: Backend coordination layer for multi-instance communication
- **Baseline Tool**: Reuse rz1989s/claude-code-statusline components

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    VSCode Instance 1                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ VSCode Extension (UI Layer)                          │   │
│  │  • Statusbar Item (bottom right)                     │   │
│  │  • Sidebar Panel (multi-instance view)               │   │
│  │  • Command Palette (quick actions)                   │   │
│  │  • WebView (dashboard if needed)                     │   │
│  └──────────────┬───────────────────────────────────────┘   │
│                 │ VSCode Extension API                      │
│                 │ + WebSocket/STDIO                         │
└─────────────────┼───────────────────────────────────────────┘
                  │
                  ├──────────────┬──────────────┐
                  │              │              │
┌─────────────────▼───┐  ┌───────▼──────┐  ┌───▼──────────────┐
│  VSCode Instance 2  │  │  Instance 3  │  │  Instance N      │
│  (Same Extension)   │  │  (Same Ext)  │  │  (Same Ext)      │
└─────────────────┬───┘  └───────┬──────┘  └───┬──────────────┘
                  │              │              │
                  └──────────────┼──────────────┘
                                 │
                  ┌──────────────▼──────────────┐
                  │   MCP Server (Coordination) │
                  │  • Session Registry         │
                  │  • State Synchronization    │
                  │  • Event Broadcasting       │
                  │  • Memory Management        │
                  │  • Hook Processing          │
                  └──────────────┬──────────────┘
                                 │
                  ┌──────────────▼──────────────┐
                  │  Shared Data Layer          │
                  │  • Session State DB         │
                  │  • Coordination Events      │
                  │  • Metrics & Analytics      │
                  │  • Configuration Store      │
                  └─────────────────────────────┘
```

---

## Component Breakdown

### 1. VSCode Extension Layer

**Purpose**: User interface and VSCode integration

**Responsibilities**:
- Display statusline information in VSCode statusbar
- Provide sidebar panel for multi-instance view
- Handle user interactions (clicks, commands)
- Manage local instance state
- Communicate with MCP server

**Technology Stack**:
- TypeScript
- VSCode Extension API
- WebSocket client (for MCP communication)
- React (optional, for WebView dashboard)

**Key Files** (proposed structure):
```
vscode-extension/
├── src/
│   ├── extension.ts              # Entry point
│   ├── statusbar/
│   │   ├── StatusBarManager.ts   # Statusbar UI controller
│   │   └── InstanceIndicator.ts  # Instance visual identifier
│   ├── sidebar/
│   │   ├── SidebarProvider.ts    # Multi-instance panel
│   │   └── InstanceTreeView.ts   # Instance hierarchy
│   ├── mcp/
│   │   ├── MCPClient.ts          # MCP server connection
│   │   └── EventHandler.ts       # Handle server events
│   ├── config/
│   │   └── ConfigManager.ts      # User preferences
│   └── utils/
│       ├── InstanceIdentifier.ts # Instance ID/naming
│       └── ColorCoding.ts        # Visual differentiation
├── package.json
└── tsconfig.json
```

**Statusbar Display** (proposed):
```
┌─────────────────────────────────────────────────────────┐
│ VSCode Statusbar (bottom)                               │
├─────────────────────────────────────────────────────────┤
│ ... │ 🎯 Auth API │ 🟢 3 MCP │ $4.52 │ ⏱️ 15m │ 🔄 2/5 │ │
│     └─instance─┘  └─status─┘ └cost┘ └time┘ └prog─┘     │
└─────────────────────────────────────────────────────────┘

Click behaviors:
• Instance name → Quick switch menu
• MCP status → Server details
• Cost → Usage breakdown
• Progress → Detailed task view
```

---

### 2. MCP Server Layer

**Purpose**: Backend coordination and state management

**Responsibilities**:
- Maintain registry of all active instances
- Synchronize state across instances
- Process hooks from claude-flow
- Broadcast events to all connected clients
- Manage shared memory/coordination
- Provide orchestration APIs

**Technology Stack**:
- Node.js/TypeScript
- STDIO/WebSocket server
- SQLite (for session registry)
- Event emitter for broadcasting

**Key Files** (proposed structure):
```
mcp-server/
├── src/
│   ├── index.ts                  # MCP server entry
│   ├── registry/
│   │   ├── SessionRegistry.ts    # Track all instances
│   │   └── InstanceState.ts      # Per-instance state
│   ├── coordination/
│   │   ├── EventBroadcaster.ts   # Pub/sub events
│   │   └── StateSync.ts          # State synchronization
│   ├── hooks/
│   │   ├── HookProcessor.ts      # Process claude-flow hooks
│   │   └── HookRegistry.ts       # Hook type definitions
│   ├── tools/
│   │   ├── instance_list.ts      # MCP: List all instances
│   │   ├── instance_switch.ts    # MCP: Switch instance
│   │   ├── instance_status.ts    # MCP: Get instance status
│   │   └── coordination_state.ts # MCP: Coordination info
│   └── db/
│       └── schema.sql             # SQLite schema
├── package.json
└── tsconfig.json
```

**MCP Tools** (proposed):
```typescript
// List all active instances
mcp__statusline__instance_list()
// Returns: [
//   {id: "abc123", name: "Auth API", status: "running", ...},
//   {id: "def456", name: "DB Schema", status: "waiting", ...}
// ]

// Get specific instance status
mcp__statusline__instance_status(instance_id: string)
// Returns: {id, name, status, metrics, coordination, ...}

// Switch to instance
mcp__statusline__instance_switch(instance_id: string)
// Triggers: VSCode window focus via extension

// Update instance metadata
mcp__statusline__instance_update(instance_id, metadata)
// Updates: name, role, phase, tags, etc.

// Get coordination state
mcp__statusline__coordination_state()
// Returns: {
//   coordinated_groups: [...],
//   dependencies: [...],
//   blocked_instances: [...]
// }
```

---

### 3. Baseline Tool Integration

**Purpose**: Reuse existing component logic

**Strategy**: Extract and adapt components from rz1989s/claude-code-statusline

**Reusable Components**:
- ✅ `lib/git.sh` → Git status logic
- ✅ `lib/cost.sh` → Cost tracking integration
- ✅ `lib/mcp.sh` → MCP server status
- ✅ `lib/cache.sh` → Caching strategies
- ✅ `lib/config.sh` → Configuration parsing

**Adaptation Approach**:
1. Port Bash logic to TypeScript functions
2. Maintain same data collection patterns
3. Adapt caching for VSCode environment
4. Preserve configuration structure

**Example Port**:
```typescript
// Original: lib/git.sh
get_git_status() {
  local dirty_marker="${1:-*}"
  local branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
  ...
}

// Ported: vscode-extension/src/utils/git.ts
export async function getGitStatus(dirtyMarker: string = '*'): Promise<GitStatus> {
  const branch = await exec('git rev-parse --abbrev-ref HEAD');
  // ... same logic, TypeScript style
}
```

---

## Data Flow

### Instance Registration Flow
```
1. VSCode Extension Activation
   └→ Generate/restore instance ID
   └→ Read local instance metadata
   └→ Connect to MCP server (WebSocket/STDIO)

2. MCP Server Receives Connection
   └→ Register instance in SessionRegistry
   └→ Broadcast "instance_joined" event
   └→ Return current state to new instance

3. Other Instances Updated
   └→ Receive "instance_joined" event
   └→ Update their multi-instance view
   └→ Refresh coordination state
```

### Real-time Update Flow
```
1. Hook Triggers (e.g., post-tool, post-edit)
   └→ Claude Code → claude-flow hook script
   └→ Hook script → MCP server via MCP tool call

2. MCP Server Processes Hook
   └→ Update instance state in registry
   └→ Broadcast event to all connected instances
   └→ Log event for analytics

3. VSCode Extensions Receive Event
   └→ Update statusbar display
   └→ Update sidebar panel
   └→ Show notifications if needed
   └→ Update local cache
```

### Manual Interaction Flow
```
1. User Clicks Statusbar Item
   └→ VSCode Extension shows QuickPick menu
   └→ Menu populated with all instances from MCP

2. User Selects "Switch to Instance"
   └→ Extension calls MCP tool: instance_switch(id)
   └→ MCP server triggers window focus command
   └→ Target VSCode window comes to focus

3. User Views Sidebar Panel
   └→ Extension fetches all instances from MCP
   └→ Renders tree/grid view with status
   └→ User can click for details/actions
```

---

## Communication Protocols

### VSCode Extension ↔ MCP Server

**Protocol**: WebSocket (primary) + STDIO (fallback)

**Message Format**:
```typescript
interface MCPMessage {
  type: 'request' | 'response' | 'event' | 'error';
  id?: string;          // Request ID for correlation
  tool?: string;        // MCP tool name
  params?: any;         // Tool parameters
  result?: any;         // Response data
  event?: string;       // Event name for broadcasts
  timestamp: number;
}
```

**Example Messages**:
```typescript
// Request: Get instance list
{
  type: 'request',
  id: 'req-001',
  tool: 'instance_list',
  params: {},
  timestamp: 1729468800000
}

// Response: Instance list
{
  type: 'response',
  id: 'req-001',
  result: {instances: [...]},
  timestamp: 1729468800050
}

// Event: Instance status changed
{
  type: 'event',
  event: 'instance_status_changed',
  params: {
    instance_id: 'abc123',
    old_status: 'running',
    new_status: 'completed'
  },
  timestamp: 1729468800100
}
```

---

## Configuration Strategy

### User Configuration (settings.json)
```jsonc
{
  "claudeCodeStatusline.enabled": true,
  "claudeCodeStatusline.instanceIdentification": {
    "autoNaming": true,              // Auto-generate names
    "namingPattern": "{project}-{role}",
    "colorCoding": true,             // Use unique colors
    "showIcons": true                // Show role icons
  },
  "claudeCodeStatusline.display": {
    "statusbar": {
      "enabled": true,
      "format": "{icon} {name} | {mcp} | {cost} | {time} | {progress}",
      "maxLength": 50
    },
    "sidebar": {
      "enabled": true,
      "view": "tree",               // 'tree' | 'grid' | 'compact'
      "sortBy": "status"            // 'status' | 'name' | 'cost' | 'time'
    }
  },
  "claudeCodeStatusline.coordination": {
    "enabled": true,
    "showDependencies": true,
    "highlightBlocked": true,
    "groupByEpic": true
  },
  "claudeCodeStatusline.mcp": {
    "serverCommand": "npx statusline-mcp@latest",
    "reconnectDelay": 5000,
    "heartbeatInterval": 30000
  },
  "claudeCodeStatusline.updates": {
    "realtime": true,
    "pollInterval": 5000,           // milliseconds
    "eventDriven": true              // Use hooks when available
  }
}
```

### Instance Metadata (per-instance)
```typescript
interface InstanceMetadata {
  id: string;                        // Unique instance ID
  name: string;                      // User-friendly name
  role?: string;                     // Agent role (backend, frontend, etc.)
  phase?: string;                    // Development phase (spec, code, test)
  project: string;                   // Repository/project name
  epic?: string;                     // CCPM epic name
  branch?: string;                   // Git branch
  tags: string[];                    // Custom tags
  color?: string;                    // Visual identifier color
  icon?: string;                     // Custom icon/emoji
  created: number;                   // Creation timestamp
  lastActive: number;                // Last activity timestamp
}
```

---

## State Management

### Instance State Schema
```typescript
interface InstanceState {
  metadata: InstanceMetadata;
  status: 'idle' | 'running' | 'waiting' | 'completed' | 'error';
  metrics: {
    tokensUsed: number;
    costTotal: number;
    costSession: number;
    duration: number;              // seconds
  };
  git: {
    branch: string;
    isDirty: boolean;
    commits: number;
  };
  mcp: {
    servers: Array<{name: string; status: 'connected' | 'disconnected'}>;
    totalServers: number;
    connectedServers: number;
  };
  coordination?: {
    groupId?: string;              // Coordinated group
    dependencies?: string[];       // Depends on these instances
    blockedBy?: string[];          // Blocked by these instances
    progress?: number;             // 0-100
  };
  lastUpdate: number;
}
```

### Session Registry Schema (SQLite)
```sql
CREATE TABLE instances (
  id TEXT PRIMARY KEY,
  metadata JSON NOT NULL,
  state JSON NOT NULL,
  created_at INTEGER NOT NULL,
  last_active INTEGER NOT NULL,
  last_heartbeat INTEGER NOT NULL
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  instance_id TEXT,
  event_type TEXT NOT NULL,
  event_data JSON,
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (instance_id) REFERENCES instances(id)
);

CREATE TABLE coordination_groups (
  group_id TEXT PRIMARY KEY,
  name TEXT,
  epic TEXT,
  instance_ids JSON,        -- Array of instance IDs
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_events_instance ON events(instance_id);
CREATE INDEX idx_events_timestamp ON events(timestamp);
CREATE INDEX idx_instances_active ON instances(last_active);
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
**Goal**: Basic VSCode extension + MCP server communication

- [ ] Set up VSCode extension boilerplate
- [ ] Set up MCP server boilerplate
- [ ] Implement WebSocket communication
- [ ] Create instance registration flow
- [ ] Basic statusbar display (single instance)
- [ ] SQLite session registry
- [ ] Basic MCP tools (instance_list, instance_status)

**Deliverable**: Single-instance statusline working in VSCode

---

### Phase 2: Multi-Instance Core (Week 3-4)
**Goal**: Multi-instance discovery and display

- [ ] Instance auto-discovery
- [ ] Multi-instance view in sidebar
- [ ] Instance switching via command palette
- [ ] Visual differentiation (colors, icons)
- [ ] Real-time updates via WebSocket events
- [ ] Port baseline tool components (git, cost, MCP)

**Deliverable**: Can see and switch between multiple instances

---

### Phase 3: Coordination Features (Week 5-6)
**Goal**: Add orchestration capabilities

- [ ] Hook integration (pre-task, post-task, etc.)
- [ ] Coordination state tracking
- [ ] Dependency visualization
- [ ] Progress aggregation
- [ ] Blocked instance detection
- [ ] CCPM epic integration

**Deliverable**: Coordinated multi-instance workflows

---

### Phase 4: Polish & Advanced Features (Week 7-8)
**Goal**: Production-ready with advanced capabilities

- [ ] Configuration UI in VSCode
- [ ] Analytics dashboard (optional WebView)
- [ ] Advanced filtering/sorting/grouping
- [ ] Export/import instance configurations
- [ ] Performance optimization
- [ ] Comprehensive testing
- [ ] Documentation and examples

**Deliverable**: Production-ready release

---

## Technology Decisions

### Why VSCode Extension?
✅ Native integration with user's primary workspace
✅ Rich UI capabilities (statusbar, sidebar, WebView)
✅ Access to VSCode APIs (window management, commands)
✅ Marketplace distribution for easy installation
✅ TypeScript development (same as MCP server)

### Why MCP Server?
✅ Proven coordination pattern (claude-flow, ruv-swarm)
✅ Decoupled from VSCode (can support other editors later)
✅ Hook integration with existing claude-flow workflows
✅ Persistent state across VSCode restarts
✅ Scalable for many instances (centralized coordination)

### Why WebSocket over STDIO?
✅ Bidirectional real-time communication
✅ Event broadcasting to all clients
✅ Better for push notifications
✅ Lower latency for frequent updates
🔄 STDIO as fallback for compatibility

---

## Open Questions & Decisions Needed

### 1. Instance Identity
- **Auto-generate IDs** or let users set them?
- **Persist across restarts** or session-only?
- **Workspace-scoped** or global?

### 2. MCP Server Lifecycle
- **Single global server** or per-workspace?
- **Auto-start** on extension activation or manual?
- **Shutdown behavior** when all instances close?

### 3. Visual Design
- **Color palette**: How many unique colors needed?
- **Icon set**: Use existing emoji or custom SVG?
- **Layout**: Statusbar only or sidebar required?

### 4. Performance Targets
- **Update latency**: < 100ms acceptable?
- **Polling frequency**: Default to 5s or event-driven only?
- **Max instances**: Design for how many? (10? 50? 100?)

### 5. Integration Depth
- **CCPM integration**: Required or optional?
- **Hook dependencies**: Require claude-flow or standalone?
- **Baseline tool**: Port all components or selective?

---

## Next Steps

1. **Gather Requirements**: Complete discovery questionnaire
2. **Prototype**: Build Phase 1 foundation
3. **Iterate**: Test with real multi-instance workflows
4. **Refine**: Based on actual usage patterns
5. **Release**: VSCode marketplace + npm (MCP server)

---

## References

- [VSCode Extension API](https://code.visualstudio.com/api)
- [MCP Protocol Spec](https://github.com/modelcontextprotocol/specification)
- [rz1989s/claude-code-statusline](https://github.com/rz1989s/claude-code-statusline)
- [Research: claude-code-statusline-research.md](../../research/findings/claude-code-statusline-research.md)
