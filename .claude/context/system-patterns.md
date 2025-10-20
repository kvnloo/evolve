---
created: 2025-10-20T09:14:50Z
last_updated: 2025-10-20T09:14:50Z
version: 1.0
author: Claude Code PM System
---

# System Patterns

## Architectural Style

### Current Architecture: Research & Infrastructure Phase
The project is currently in a **setup and research phase** with no established production architecture. The focus is on:
- Infrastructure configuration
- Research documentation
- Coordination system establishment
- Agent orchestration framework

### Planned Architecture: SPARC-Driven Development
When development begins, the architecture will follow:
- **Specification-First Design** - Requirements before implementation
- **Test-Driven Development** - Tests before code
- **Clean Architecture** - Separation of concerns with clear boundaries
- **Modular Design** - Loosely coupled, highly cohesive components
- **Agent-Coordinated** - Distributed agent collaboration patterns

## Design Patterns

### Coordination Patterns

#### 1. Hierarchical Coordination (Tree-Based)
**Pattern**: Queen-led hierarchical structure with specialized workers
- **Use Case**: Complex tasks requiring central coordination
- **Agent**: `hierarchical-coordinator`
- **Benefits**: Clear authority, efficient task delegation
- **Trade-offs**: Single point of coordination, potential bottleneck

#### 2. Mesh Coordination (Peer-to-Peer)
**Pattern**: Distributed decision-making with peer communication
- **Use Case**: Parallel independent tasks
- **Agent**: `mesh-coordinator`
- **Benefits**: No single point of failure, high parallelism
- **Trade-offs**: Complex coordination, potential conflicts

#### 3. Adaptive Coordination (Dynamic)
**Pattern**: Topology switches based on task requirements
- **Use Case**: Varying complexity and coordination needs
- **Agent**: `adaptive-coordinator`
- **Benefits**: Optimized for current task, flexible
- **Trade-offs**: Switching overhead, complexity

### Consensus Patterns

#### Byzantine Fault Tolerance
**Pattern**: Multi-agent consensus with malicious actor detection
- **Use Case**: Critical decisions requiring high reliability
- **Agent**: `byzantine-coordinator`
- **Benefits**: Security, resilience to malicious agents
- **Trade-offs**: Performance overhead, complexity

#### Raft Consensus
**Pattern**: Leader-based log replication
- **Use Case**: Distributed state synchronization
- **Agent**: `raft-manager`
- **Benefits**: Strong consistency, proven algorithm
- **Trade-offs**: Leader bottleneck, network dependency

#### Gossip Protocol
**Pattern**: Eventually consistent peer-to-peer propagation
- **Use Case**: Scalable information dissemination
- **Agent**: `gossip-coordinator`
- **Benefits**: Highly scalable, network-efficient
- **Trade-offs**: Eventual consistency, propagation delay

#### CRDT (Conflict-Free Replicated Data Types)
**Pattern**: Merge without coordination
- **Use Case**: Distributed data synchronization
- **Agent**: `crdt-synchronizer`
- **Benefits**: No coordination needed, automatic merge
- **Trade-offs**: Limited operation types, memory overhead

### Memory Patterns

#### Distributed Memory
**Pattern**: Shared memory across agent swarm
- **Agent**: `swarm-memory-manager`
- **Use Case**: Cross-agent context sharing
- **Benefits**: Consistent state, shared knowledge
- **Trade-offs**: Synchronization overhead, potential conflicts

#### Session Memory
**Pattern**: Persistent context across sessions
- **Use Case**: Long-running projects, context preservation
- **Benefits**: Continuity, reduced rework
- **Trade-offs**: Storage requirements, stale data risk

#### Agent Memory
**Pattern**: Agent-specific memory stores
- **Use Case**: Specialized agent state
- **Benefits**: Isolation, focused context
- **Trade-offs**: Duplication, coordination complexity

## Data Flow

### Request Flow (SPARC Methodology)

```
User Request
    ↓
1. Specification Phase
    ↓ (Requirements Analysis)
2. Pseudocode Phase
    ↓ (Algorithm Design)
3. Architecture Phase
    ↓ (System Design)
4. Refinement Phase (TDD)
    ↓ (Test → Code → Refactor)
5. Completion Phase
    ↓ (Integration & Validation)
Delivered Feature
```

### Agent Coordination Flow

```
Task Request
    ↓
Swarm Initialization (topology selection)
    ↓
Agent Spawning (parallel via Task tool)
    ↓
Pre-Task Hooks (preparation)
    ↓
Parallel Execution (coordination via memory)
    ↓
Post-Task Hooks (cleanup & reporting)
    ↓
Task Completion (synthesis & validation)
```

### Memory Coordination Flow

```
Agent Action
    ↓
Write to Memory (key-value with metadata)
    ↓
Memory Synchronization (across swarm)
    ↓
Other Agents Read (consistent view)
    ↓
Conflict Resolution (CRDT or consensus)
    ↓
Persistent Storage (session continuity)
```

## Component Organization

### Layered Architecture (Planned)

```
┌─────────────────────────────────────┐
│     User Interface / CLI            │
├─────────────────────────────────────┤
│     Command Layer                   │
│  (PM commands, context commands)    │
├─────────────────────────────────────┤
│     Orchestration Layer             │
│  (SPARC, agent coordination)        │
├─────────────────────────────────────┤
│     Agent Layer                     │
│  (54 specialized agents)            │
├─────────────────────────────────────┤
│     Coordination Layer              │
│  (Swarm, consensus, memory)         │
├─────────────────────────────────────┤
│     Infrastructure Layer            │
│  (Git, GitHub, hooks, MCP)          │
└─────────────────────────────────────┘
```

### Module Boundaries

**Separation of Concerns**:
- **Configuration** (`.claude/`) - Isolated from code
- **Commands** (`.claude/commands/`) - Command interface layer
- **Rules** (`.claude/rules/`) - Policy and standards layer
- **Context** (`.claude/context/`) - Knowledge and state layer
- **Source Code** (`src/` - planned) - Implementation layer
- **Tests** (`tests/` - planned) - Verification layer

## Integration Patterns

### Hook-Based Integration
**Pattern**: Event-driven automation via hooks
- **Pre-task hooks**: Setup and preparation
- **Post-edit hooks**: Automatic formatting, memory updates
- **Post-task hooks**: Cleanup and reporting
- **Session hooks**: State management

**Benefits**:
- Automatic coordination
- Consistent workflows
- Reduced manual work
- Error prevention

### GitHub Integration Pattern
**Pattern**: Bidirectional sync with GitHub
- **Outbound**: PRD → Epic → Issues → PR
- **Inbound**: Issue status → Local context
- **Continuous**: Real-time synchronization

**Benefits**:
- Single source of truth
- Team visibility
- Standard workflows

### MCP Server Integration
**Pattern**: Protocol-based service coordination
- **Claude Flow**: Primary orchestration
- **Ruv-Swarm**: Enhanced coordination (optional)
- **Flow-Nexus**: Cloud features (optional)

**Benefits**:
- Extensible architecture
- Optional capabilities
- Standard protocols

## Common Patterns Observed

### Configuration Management
- **External Configuration**: `.claude/` directory structure
- **Multiple Formats**: Markdown (CLAUDE.md), JSON (.mcp.json), Shell scripts
- **Version Controlled**: Configuration as code
- **Example-Based**: `.example` files for templates

### Documentation Organization
- **Hierarchical**: Topic-based directory structure
- **Co-located**: Related docs together (`research/`, `docs/`)
- **Structured**: Consistent naming and organization
- **Phased**: Research organized by phases and topics

### Scripting Patterns
- **Helper Scripts**: Located in `.claude/helpers/`
- **Executable**: Proper permissions set
- **Shell-Based**: Bash scripts for automation
- **Purpose-Specific**: Each script has clear responsibility

## Anti-Patterns to Avoid

### From CLAUDE.md Configuration

❌ **Sequential Operations** - Execute related operations in parallel, not sequentially
❌ **Root File Pollution** - Never save working files to root folder
❌ **Multiple Messages** - Batch all related operations in single message
❌ **Individual Todos** - Always batch todos (5-10+ in one call)
❌ **Hardcoded Secrets** - Never hardcode sensitive information
❌ **Assumption-Based Config** - Always verify against official documentation
❌ **Large Files** - Keep files under 500 lines
❌ **Mixed Concerns** - Maintain clear separation of responsibilities

## Future Pattern Considerations

### As Development Progresses

1. **Domain-Driven Design** - Organize by business domains
2. **Repository Pattern** - Abstract data access
3. **Factory Pattern** - Agent creation and initialization
4. **Strategy Pattern** - Coordination topology selection
5. **Observer Pattern** - Event notification and hooks
6. **Command Pattern** - Slash command implementation
7. **Facade Pattern** - Simplified interfaces for complex subsystems

### Scalability Patterns

1. **Caching** - Memory and computation optimization
2. **Load Balancing** - Agent workload distribution
3. **Circuit Breaker** - Fault tolerance in distributed operations
4. **Retry with Backoff** - Resilient external integrations
5. **Bulkhead** - Isolation for fault containment

The system emphasizes **coordination**, **automation**, and **distributed intelligence** through well-defined patterns for agent collaboration, memory management, and workflow orchestration.
