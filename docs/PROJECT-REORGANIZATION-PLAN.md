# Project Structure Reorganization Plan
**Generated**: 2025-10-20
**Status**: Planning Phase (No Execution)
**Scope**: Complete Structural Overhaul

## 🚨 Critical Flaws Identified

### 1. **Structural Issues**
- **746 MD files** scattered without clear taxonomy
- **7 hidden directories** creating confusion (.claude, .claude-flow, .hive-mind, .swarm, etc.)
- **No source code directory** - Missing `/src` despite being mandated
- **No test infrastructure** - `/tests` directory absent
- **No build system** - No package.json, tsconfig, or build configuration
- **Mixed organizational patterns** - Both `.claude/` and `.claude-flow/` with overlapping purposes

### 2. **Configuration Chaos**
- **Multiple config locations**: `.claude/settings.json`, `.claude/ccpm.config`, `.mcp.json`
- **Format inconsistency**: JSON, YAML, Markdown, Shell scripts
- **Duplicate agent definitions**: Same agents in multiple locations
- **No environment management**: Secrets and configs mixed

### 3. **Documentation Sprawl**
- **152 files in research/** - No clear categorization
- **Overlapping doc locations**: `/docs`, `/research/docs`, `.claude/commands`
- **No versioning strategy**: Mixed final/draft/outdated docs
- **Poor discoverability**: No index or navigation structure

### 4. **Memory/State Fragmentation**
- **4 separate memory locations**: `/memory`, `/research/memory`, `.hive-mind/memory`, `.swarm/research`
- **No clear persistence strategy**: Session data scattered
- **Duplicate storage**: Same data in multiple formats

### 5. **Command/Agent Confusion**
- **311 files in .claude/** - Overwhelming complexity
- **54+ agents** without clear hierarchy
- **100+ commands** with unclear relationships
- **No dependency management**: Unknown inter-agent dependencies

## 🎯 Reorganization Strategy

### Phase 1: Core Structure Establishment

```
evolve/                              # Project root
├── src/                            # SOURCE CODE (New)
│   ├── core/                      # Core functionality
│   │   ├── orchestrator/          # Main orchestration engine
│   │   ├── executor/              # Task execution system
│   │   ├── memory/                # Unified memory management
│   │   └── utils/                 # Shared utilities
│   ├── agents/                    # Agent implementations
│   │   ├── base/                  # Base agent classes
│   │   ├── specialized/           # Specialized agents
│   │   └── registry.ts            # Agent registry
│   ├── integrations/              # External integrations
│   │   ├── mcp/                   # MCP server integrations
│   │   ├── github/                # GitHub integration
│   │   └── cloud/                 # Cloud services
│   └── cli/                       # Command-line interface
│       ├── commands/              # CLI commands
│       └── parser/                # Command parser
│
├── tests/                          # TEST INFRASTRUCTURE (New)
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   ├── e2e/                       # End-to-end tests
│   └── fixtures/                  # Test fixtures
│
├── config/                         # UNIFIED CONFIG (Consolidated)
│   ├── default.json               # Default configuration
│   ├── development.json           # Development overrides
│   ├── production.json            # Production settings
│   ├── schemas/                   # JSON schemas
│   └── .env.example               # Environment template
│
├── lib/                           # COMPILED OUTPUT (New)
│   └── [compiled TypeScript]
│
├── scripts/                       # BUILD & UTILITY SCRIPTS
│   ├── build/                    # Build scripts
│   ├── deploy/                   # Deployment scripts
│   └── utils/                    # Utility scripts
│
├── docs/                          # DOCUMENTATION (Reorganized)
│   ├── architecture/             # System architecture
│   ├── api/                      # API documentation
│   ├── guides/                   # User guides
│   │   ├── getting-started.md
│   │   ├── agent-development.md
│   │   └── command-creation.md
│   ├── reference/                # Reference documentation
│   └── index.md                  # Documentation hub
│
├── .claude/                       # CLAUDE-SPECIFIC (Streamlined)
│   ├── agents/                   # Agent definitions only
│   ├── commands/                 # Command definitions only
│   ├── workflows/                # Workflow definitions
│   └── rules/                    # Operational rules
│
├── research/                      # RESEARCH (Organized)
│   ├── active/                   # Current research
│   ├── archive/                  # Completed research
│   └── plans/                    # Research plans
│
├── data/                          # DATA & PERSISTENCE (New)
│   ├── memory/                   # Unified memory store
│   ├── sessions/                 # Session data
│   ├── cache/                    # Cache storage
│   └── logs/                     # Application logs
│
├── packages/                      # MONOREPO PACKAGES (New)
│   ├── @evolve/core/             # Core package
│   ├── @evolve/agents/           # Agents package
│   ├── @evolve/mcp/              # MCP integration package
│   └── @evolve/cli/              # CLI package
│
├── .github/                       # GITHUB CONFIG
│   ├── workflows/                # GitHub Actions
│   ├── ISSUE_TEMPLATE/           # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md  # PR template
│
├── package.json                   # ROOT PACKAGE (New)
├── tsconfig.json                  # TypeScript CONFIG (New)
├── turbo.json                     # TURBOREPO CONFIG (New)
├── .env.example                   # ENVIRONMENT TEMPLATE
├── .gitignore                     # GIT IGNORE
├── README.md                      # PROJECT README
└── CONTRIBUTING.md                # CONTRIBUTION GUIDE
```

### Phase 2: Configuration Consolidation

#### Unified Configuration System
```typescript
// config/schema.ts
interface ProjectConfig {
  version: string;
  environment: 'development' | 'production' | 'test';

  core: {
    orchestrator: OrchestratorConfig;
    executor: ExecutorConfig;
    memory: MemoryConfig;
  };

  agents: {
    registry: AgentRegistryConfig;
    defaults: AgentDefaultsConfig;
  };

  integrations: {
    mcp: MCPConfig;
    github: GitHubConfig;
    cloud: CloudConfig;
  };

  sparc: {
    methodology: SPARCConfig;
    phases: PhaseConfig[];
  };
}
```

#### Environment Management
```bash
# .env.example
NODE_ENV=development
LOG_LEVEL=debug

# MCP Servers
MCP_CLAUDE_FLOW_ENABLED=true
MCP_RUV_SWARM_ENABLED=false
MCP_FLOW_NEXUS_ENABLED=false

# GitHub Integration
GITHUB_TOKEN=
GITHUB_REPO=

# API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

### Phase 3: Agent Consolidation

#### Agent Hierarchy
```yaml
Core Agents (5):
  ├── researcher
  ├── coder
  ├── reviewer
  ├── tester
  └── planner

Specialized Agents (20):
  ├── Architecture (3)
  │   ├── system-architect
  │   ├── solution-designer
  │   └── pattern-analyst
  ├── Development (5)
  │   ├── backend-developer
  │   ├── frontend-developer
  │   ├── mobile-developer
  │   ├── ml-engineer
  │   └── devops-engineer
  ├── Quality (3)
  │   ├── security-auditor
  │   ├── performance-analyst
  │   └── quality-engineer
  └── Coordination (9)
      ├── swarm-coordinator
      ├── task-orchestrator
      ├── memory-manager
      └── [others...]

Meta Agents (10):
  ├── SPARC Agents (4)
  │   ├── specification
  │   ├── pseudocode
  │   ├── architecture
  │   └── refinement
  └── Flow Agents (6)
      ├── workflow-designer
      ├── pipeline-manager
      └── [others...]
```

### Phase 4: Migration Strategy

#### File Migration Map
```yaml
Current → New Location:

# Agents
.claude/agents/**/*.md → src/agents/definitions/
.claude-backup/*/agents/ → [DELETE - redundant]

# Commands
.claude/commands/**/*.md → src/cli/commands/definitions/
.claude/commands/pm/ → packages/@evolve/cli/src/pm/

# Configuration
.claude/settings.json → config/default.json
.claude/ccpm.config → config/github.json
.mcp.json → config/integrations/mcp.json

# Research
research/*.md → research/active/
research/findings/ → research/archive/findings/
research/deep-research-*/ → research/archive/projects/

# Memory/State
memory/* → data/memory/global/
research/memory/* → data/memory/research/
.hive-mind/memory/* → data/memory/swarm/
.swarm/research/* → data/memory/swarm/research/

# Documentation
docs/* → docs/guides/
research/docs/* → docs/reference/research/
```

### Phase 5: Build System Setup

#### Package.json Structure
```json
{
  "name": "@evolve/root",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "dev": "turbo run dev --parallel",
    "clean": "turbo run clean",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "turbo": "^1.10.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0",
    "eslint": "^8.0.0"
  }
}
```

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "incremental": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "lib", "tests"]
}
```

### Phase 6: Documentation Restructure

#### Documentation Hierarchy
```markdown
docs/
├── index.md                    # Main documentation hub
├── architecture/
│   ├── overview.md             # System overview
│   ├── components.md           # Component architecture
│   ├── data-flow.md           # Data flow diagrams
│   └── decisions/             # ADRs
├── api/
│   ├── rest-api.md            # REST API docs
│   ├── cli-reference.md       # CLI command reference
│   └── agent-api.md           # Agent API docs
├── guides/
│   ├── getting-started.md     # Quick start guide
│   ├── installation.md        # Installation guide
│   ├── configuration.md       # Configuration guide
│   ├── agent-development.md   # Creating agents
│   ├── command-creation.md    # Creating commands
│   └── troubleshooting.md     # Common issues
└── reference/
    ├── agents/                 # Agent reference
    ├── commands/              # Command reference
    ├── sparc/                 # SPARC methodology
    └── glossary.md            # Terms and concepts
```

### Phase 7: Testing Infrastructure

#### Test Structure
```typescript
// tests/unit/agents/researcher.test.ts
import { describe, it, expect } from 'vitest';
import { ResearcherAgent } from '@/agents/specialized/researcher';

describe('ResearcherAgent', () => {
  it('should initialize with correct configuration', () => {
    // Test implementation
  });

  it('should execute research tasks in parallel', () => {
    // Test implementation
  });
});

// tests/integration/orchestrator.test.ts
describe('Orchestrator Integration', () => {
  it('should coordinate multiple agents', async () => {
    // Test implementation
  });
});

// tests/e2e/sparc-workflow.test.ts
describe('SPARC Workflow E2E', () => {
  it('should complete full SPARC cycle', async () => {
    // Test implementation
  });
});
```

## 📋 Implementation Roadmap

### Stage 1: Foundation (Week 1)
1. Create base directory structure
2. Initialize package.json and build system
3. Set up TypeScript configuration
4. Create monorepo structure with Turborepo

### Stage 2: Core Migration (Week 2)
1. Migrate agent definitions to new structure
2. Consolidate configuration files
3. Unify memory/state management
4. Create agent registry system

### Stage 3: Code Implementation (Week 3)
1. Implement core orchestrator
2. Create base agent classes
3. Build CLI framework
4. Set up MCP integrations

### Stage 4: Testing & Documentation (Week 4)
1. Write unit tests for core components
2. Create integration test suite
3. Reorganize and update documentation
4. Create API documentation

### Stage 5: Cleanup & Optimization (Week 5)
1. Remove redundant files and directories
2. Optimize import paths
3. Update all references
4. Performance testing

## 🎯 Success Metrics

### Quantitative
- **File reduction**: 1291 → ~500 files (60% reduction)
- **Directory reduction**: 427 → ~100 directories (75% reduction)
- **Documentation consolidation**: 746 MD → ~200 MD files (73% reduction)
- **Test coverage**: 0% → 80% minimum
- **Build time**: Establish baseline < 30 seconds

### Qualitative
- Clear separation of concerns
- Intuitive navigation structure
- Consistent naming conventions
- Unified configuration management
- Comprehensive test coverage
- Improved developer experience

## ⚠️ Risk Assessment

### High Risk
1. **Data Loss**: Backup critical files before migration
2. **Breaking Changes**: Existing workflows may break
3. **Integration Failures**: MCP servers may need reconfiguration

### Mitigation Strategies
1. Create full backup before starting
2. Implement changes in feature branch
3. Migrate incrementally with validation
4. Maintain compatibility layer during transition
5. Document all breaking changes

## 🔄 Rollback Plan

### Checkpoints
1. After each stage completion
2. Before any destructive operations
3. After configuration changes
4. Before removing old structures

### Rollback Procedure
```bash
# Create backup
git checkout -b reorganization-backup
git add -A && git commit -m "Pre-reorganization backup"

# If rollback needed
git checkout main
git reset --hard reorganization-backup
```

## 📊 Validation Checklist

### Pre-Migration
- [ ] Full backup created
- [ ] All stakeholders notified
- [ ] Dependencies documented
- [ ] Test environment ready

### During Migration
- [ ] Stage 1: Foundation complete
- [ ] Stage 2: Core migration verified
- [ ] Stage 3: Code implementation tested
- [ ] Stage 4: Documentation updated
- [ ] Stage 5: Cleanup validated

### Post-Migration
- [ ] All tests passing
- [ ] Documentation accurate
- [ ] No broken references
- [ ] Performance benchmarks met
- [ ] Team training completed

## 🚀 Next Steps

### Immediate Actions (Do Not Execute Yet)
1. Review this plan with stakeholders
2. Gather feedback on proposed structure
3. Identify any missing components
4. Prioritize migration stages
5. Set timeline for execution

### Preparation Tasks
1. Create detailed backup strategy
2. Set up test environment
3. Document current dependencies
4. Create migration scripts
5. Prepare team communication

---

**Note**: This is a PLANNING document. No files have been moved or modified. Execute only after review and approval.