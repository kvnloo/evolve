# Visual Design Mockups - Multi-Instance Statusline

## 1. VSCode Statusbar Designs

### Option A: Compact Single-Line
```
┌─────────────────────────────────────────────────────────────────┐
│ VSCode Status Bar (bottom right)                                │
├─────────────────────────────────────────────────────────────────┤
│ ... │ 🎯 Auth API │ 🟢 3/4 MCP │ $4.52 │ ⏱️ 15m │ 🔄 2/5 │ ▼  │
│     └─instance──┘  └─servers─┘  └cost┘  └time┘  └prog─┘  └more┘│
└─────────────────────────────────────────────────────────────────┘

Elements:
• 🎯 Instance icon (role-based: 🎯 API, 🎨 UI, 🗄️ DB, 🧪 Test)
• "Auth API" - Instance name (user-defined or auto-generated)
• 🟢 3/4 MCP - Green dot + connected/total MCP servers
• $4.52 - Current session cost
• ⏱️ 15m - Time elapsed since start
• 🔄 2/5 - Progress (2 of 5 tasks completed)
• ▼ - Dropdown for quick actions

Interactions:
• Click instance name → Quick switch menu (show all instances)
• Click MCP → Server health details
• Click cost → Usage breakdown
• Click time → Session history
• Click progress → Task list view
• Click ▼ → More actions menu
```

---

### Option B: Multi-Instance Bar (when multiple instances detected)
```
┌─────────────────────────────────────────────────────────────────┐
│ VSCode Status Bar (bottom right)                                │
├─────────────────────────────────────────────────────────────────┤
│ ... │ [1] 🎯 Auth API* │ [2] 🎨 UI ✓ │ [3] 🗄️ DB ⏸️ │ +2 │ ▼  │
│     └─active────────┘  └completed─┘  └paused───┘  └more └menu┘│
└─────────────────────────────────────────────────────────────────┘

Color Coding:
• [1] 🎯 Auth API* - Blue border (active/focused instance)
• [2] 🎨 UI ✓     - Green background (completed)
• [3] 🗄️ DB ⏸️    - Gray/dim (paused/waiting)
• +2              - Badge showing 2 more instances (click to expand)

Status Indicators:
• * = Currently active instance
• ✓ = Completed
• ⏸️ = Paused/waiting
• ❌ = Error state
• 🔄 = In progress
```

---

### Option C: Minimalist Mode (space-constrained)
```
┌─────────────────────────────────────────────────────────────┐
│ VSCode Status Bar (bottom right)                            │
├─────────────────────────────────────────────────────────────┤
│ ... │ 🎯 Auth │ 3 MCP │ $4.52 │ 2/5 │ ▼                     │
└─────────────────────────────────────────────────────────────┘

Hover tooltip shows full details:
┌──────────────────────────────────────┐
│ Instance: Auth API                   │
│ Role: Backend Development            │
│ Status: Running (15m)                │
│ MCP Servers: 3/4 connected           │
│   ✓ sequential-thinking              │
│   ✓ context7                         │
│   ✓ magic                            │
│   ✗ playwright (disconnected)        │
│ Cost: $4.52 (session)                │
│ Progress: 2/5 tasks (40%)            │
│ Git: feature/auth-api (clean)        │
│                                      │
│ Click for actions ▼                  │
└──────────────────────────────────────┘
```

---

## 2. Sidebar Panel Designs

### Tree View (Hierarchical Organization)
```
┌─────────────────────────────────────────────────────┐
│ CLAUDE CODE INSTANCES                          ⚙️ ↻ │
├─────────────────────────────────────────────────────┤
│ 📁 Auth Epic (3 instances)                          │
│   ├─ 🎯 Auth API          [●] $4.52  15m  2/5       │
│   ├─ 🧪 Auth Tests        [✓] $1.23  8m   5/5       │
│   └─ 📝 Auth Docs         [○] $0.00  0m   0/3       │
│                                                      │
│ 📁 Database Refactor (2 instances)                  │
│   ├─ 🗄️ Schema Migration  [●] $2.10  22m  1/4       │
│   └─ 🧪 DB Tests          [⏸️] $0.45  3m   0/2       │
│                                                      │
│ 📂 Independent (1 instance)                         │
│   └─ 🎨 UI Polish         [●] $0.85  12m  3/8       │
│                                                      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Total: 6 instances | 4 running | Cost: $9.15       │
└─────────────────────────────────────────────────────┘

Legend:
• [●] Running    [✓] Completed    [○] Not started
• [⏸️] Paused     [❌] Error       [🔄] In progress

Interactions:
• Click instance → Focus that VSCode window
• Right-click → Context menu (pause, stop, configure)
• Click epic/folder → Collapse/expand group
• ⚙️ → Settings    ↻ → Refresh all
```

---

### Grid View (Visual Dashboard)
```
┌─────────────────────────────────────────────────────────────┐
│ CLAUDE CODE INSTANCES                    [Tree] [Grid*] ⚙️  │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│ │ 🎯 Auth API  │ │ 🧪 Auth Tests│ │ 📝 Auth Docs │         │
│ │ ●  Running   │ │ ✓  Completed │ │ ○  Idle      │         │
│ │              │ │              │ │              │         │
│ │ 🟢 3/4 MCP   │ │ 🟢 3/4 MCP   │ │ 🔴 0/4 MCP   │         │
│ │ $4.52 | 15m  │ │ $1.23 | 8m   │ │ $0.00 | 0m   │         │
│ │ ▰▰▰▰▱▱▱▱▱▱   │ │ ▰▰▰▰▰▰▰▰▰▰   │ │ ▱▱▱▱▱▱▱▱▱▱   │         │
│ │ 2/5 tasks    │ │ 5/5 tasks    │ │ 0/3 tasks    │         │
│ └──────────────┘ └──────────────┘ └──────────────┘         │
│                                                              │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│ │ 🗄️ Schema    │ │ 🧪 DB Tests  │ │ 🎨 UI Polish │         │
│ │ ●  Running   │ │ ⏸️ Paused     │ │ ●  Running   │         │
│ │              │ │              │ │              │         │
│ │ 🟢 4/4 MCP   │ │ 🟡 2/4 MCP   │ │ 🟢 3/4 MCP   │         │
│ │ $2.10 | 22m  │ │ $0.45 | 3m   │ │ $0.85 | 12m  │         │
│ │ ▰▰▱▱▱▱▱▱▱▱   │ │ ▱▱▱▱▱▱▱▱▱▱   │ │ ▰▰▰▰▰▰▱▱▱▱   │         │
│ │ 1/4 tasks    │ │ 0/2 tasks    │ │ 3/8 tasks    │         │
│ └──────────────┘ └──────────────┘ └──────────────┘         │
│                                                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 6 instances | 4 running, 1 completed, 1 paused | $9.15     │
└─────────────────────────────────────────────────────────────┘

Interactions:
• Click card → Focus instance window
• Hover card → Show detailed tooltip
• Double-click → Open instance settings
```

---

### Compact List View (Dense Information)
```
┌─────────────────────────────────────────────────────────────┐
│ INSTANCES                     [⬆️ Sort] [🔍 Filter]  [Tree] │
├─────────────────────────────────────────────────────────────┤
│ ● 🎯 Auth API        3/4 MCP  $4.52  15m  ▰▰▰▰▱ 2/5        │
│ ✓ 🧪 Auth Tests      3/4 MCP  $1.23   8m  ▰▰▰▰▰ 5/5        │
│ ○ 📝 Auth Docs       0/4 MCP  $0.00   0m  ▱▱▱▱▱ 0/3        │
│ ● 🗄️ Schema          4/4 MCP  $2.10  22m  ▰▰▱▱▱ 1/4        │
│ ⏸️ 🧪 DB Tests        2/4 MCP  $0.45   3m  ▱▱▱▱▱ 0/2        │
│ ● 🎨 UI Polish       3/4 MCP  $0.85  12m  ▰▰▰▰▰▰ 3/8       │
├─────────────────────────────────────────────────────────────┤
│ Total: 6 | Running: 4 | Cost: $9.15 | Avg: 10m            │
└─────────────────────────────────────────────────────────────┘

Features:
• Sort by: status, name, cost, time, progress
• Filter by: epic, role, status
• Color-coded status indicators
• Progress bars for quick scanning
```

---

## 3. Quick Switch Menu (Command Palette)

```
┌─────────────────────────────────────────────────────────────┐
│ > Switch Claude Code Instance                               │
├─────────────────────────────────────────────────────────────┤
│ 🎯 Auth API             ● Running    $4.52  15m  2/5 ▰▰▰▰▱  │
│ 🧪 Auth Tests           ✓ Completed  $1.23   8m  5/5 ▰▰▰▰▰  │
│ 📝 Auth Docs            ○ Idle       $0.00   0m  0/3 ▱▱▱▱▱  │
│ 🗄️ Schema Migration     ● Running    $2.10  22m  1/4 ▰▰▱▱▱  │
│ 🧪 DB Tests             ⏸️ Paused     $0.45   3m  0/2 ▱▱▱▱▱  │
│ 🎨 UI Polish            ● Running    $0.85  12m  3/8 ▰▰▰▰▰▰ │
└─────────────────────────────────────────────────────────────┘

Fuzzy search enabled:
• Type "auth" → Shows Auth API, Auth Tests, Auth Docs
• Type "run" → Shows all running instances
• Type "err" → Shows instances with errors
• Type "$" → Sorts by cost

Keyboard shortcuts:
• Enter → Switch to selected instance
• Cmd+1-9 → Quick switch to numbered instance
• Cmd+N → Create new instance
• Cmd+X → Close current instance
```

---

## 4. Context Menu Actions

```
┌─────────────────────────────────────┐
│ Instance: Auth API                  │
├─────────────────────────────────────┤
│ 🔍 Focus Window                     │
│ ⏸️ Pause Instance                    │
│ 🔄 Restart Instance                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ✏️ Rename Instance                   │
│ 🏷️ Edit Tags                         │
│ 🎨 Change Color/Icon                │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 📊 View Metrics                     │
│ 📁 Open in File Explorer            │
│ 🔗 Copy Instance ID                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ❌ Stop Instance                     │
└─────────────────────────────────────┘
```

---

## 5. Detail View / Hover Tooltip

```
┌────────────────────────────────────────────────────────┐
│ 🎯 Auth API                                   [Edit] [X]│
├────────────────────────────────────────────────────────┤
│ Status:        ● Running (15 minutes)                  │
│ Role:          Backend API Development                 │
│ Epic:          Authentication System                   │
│ Branch:        feature/auth-api (clean)                │
│                                                         │
│ 🔌 MCP Servers (3/4 connected):                        │
│   ✓ sequential-thinking     10ms latency               │
│   ✓ context7                 5ms latency               │
│   ✓ magic                   12ms latency               │
│   ✗ playwright              (disconnected)             │
│                                                         │
│ 💰 Costs:                                              │
│   Session:     $4.52                                   │
│   Today:       $12.34                                  │
│   This Week:   $87.65                                  │
│                                                         │
│ 📊 Progress (2/5 tasks - 40%):                         │
│   ✓ Design API schema                                  │
│   ✓ Implement authentication middleware                │
│   ● Add rate limiting          [In Progress]           │
│   ○ Write integration tests                            │
│   ○ Update API documentation                           │
│                                                         │
│ 🔗 Coordination:                                       │
│   Depends on: [DB Schema]                              │
│   Blocks: [Auth Tests], [Auth Docs]                    │
│                                                         │
│ [Focus] [Pause] [Configure] [View Logs]                │
└────────────────────────────────────────────────────────┘
```

---

## 6. Color Schemes & Visual Identity

### Instance Color Palette
```
Role-Based Colors (can be overridden by user):

🎯 Backend:    Blue (#3B82F6)
🎨 Frontend:   Purple (#A855F7)
🗄️ Database:   Green (#10B981)
🧪 Testing:    Orange (#F59E0B)
📝 Docs:       Gray (#6B7280)
🔧 DevOps:     Red (#EF4444)
🔒 Security:   Yellow (#FBBF24)
🎭 Custom:     User-defined

Status Colors:
● Running:     Green (#10B981)
✓ Completed:   Blue (#3B82F6)
⏸️ Paused:      Gray (#9CA3AF)
❌ Error:       Red (#EF4444)
○ Idle:        Light Gray (#D1D5DB)

MCP Server Health:
🟢 Connected:   Green
🟡 Degraded:    Yellow (high latency)
🔴 Disconnected: Red
```

### Icon System
```
Role Icons (emoji-based, can be customized):
🎯 Backend Development
🎨 Frontend/UI Development
🗄️ Database Work
🧪 Testing
📝 Documentation
🔧 DevOps/Infrastructure
🔒 Security/Auth
🌐 API Development
📊 Analytics/Metrics
🤖 AI/ML Development

Status Icons:
● Active/Running
✓ Completed
○ Not Started
⏸️ Paused
❌ Error
🔄 In Progress
⚠️ Warning
🔔 Notification
```

---

## 7. Notification & Alert System

### Toast Notifications
```
┌────────────────────────────────────────┐
│ ⚠️ Instance "DB Schema" Blocked         │
│ Waiting for "Auth API" to complete    │
│                                        │
│ [View Details] [Dismiss]               │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ✓ Instance "Auth Tests" Completed      │
│ All 5 tasks finished ($1.23)          │
│                                        │
│ [View Report] [Dismiss]                │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ❌ Instance "UI Polish" Error           │
│ MCP server "playwright" disconnected  │
│                                        │
│ [Reconnect] [View Logs] [Dismiss]      │
└────────────────────────────────────────┘
```

---

## 8. Settings/Configuration UI

```
┌─────────────────────────────────────────────────────────────┐
│ Claude Code Statusline Settings                             │
├─────────────────────────────────────────────────────────────┤
│ 📊 Display                                                   │
│   ✓ Show in statusbar                                       │
│   ✓ Show sidebar panel                                      │
│   Format: [Dropdown: Compact | Detailed | Custom]           │
│   Max statusbar length: [50] characters                     │
│                                                              │
│ 🎨 Visual Identity                                           │
│   ✓ Use color coding                                        │
│   ✓ Show role icons                                         │
│   ✓ Show status indicators                                  │
│   Color scheme: [Dropdown: Auto | Light | Dark | Custom]    │
│                                                              │
│ 🔄 Updates                                                   │
│   ✓ Real-time updates                                       │
│   Poll interval: [5000] ms                                  │
│   ✓ Use event-driven updates (hooks)                        │
│                                                              │
│ 🎯 Instance Naming                                           │
│   ✓ Auto-generate names                                     │
│   Pattern: [Dropdown: {project}-{role} | Custom]            │
│   [Edit Custom Pattern...]                                  │
│                                                              │
│ 🔗 Coordination                                              │
│   ✓ Show dependencies                                       │
│   ✓ Highlight blocked instances                             │
│   ✓ Group by epic/project                                   │
│                                                              │
│ 🔌 MCP Server                                                │
│   Command: [npx statusline-mcp@latest]                      │
│   ✓ Auto-start on activation                                │
│   Reconnect delay: [5000] ms                                │
│                                                              │
│ [Reset to Defaults]  [Save]  [Cancel]                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Principles

1. **Glanceable**: Critical info visible at a glance without clicking
2. **Scalable**: Works with 2-3 instances and 15+ instances
3. **Customizable**: Users can tailor to their workflow preferences
4. **Consistent**: Visual language across all views
5. **Accessible**: Color-blind friendly, keyboard navigable
6. **Performant**: Updates don't impact VSCode responsiveness

---

## Next Steps

1. User testing with mockups to validate design direction
2. Prototype in VSCode extension
3. Iterate based on real usage feedback
4. Finalize visual design system
