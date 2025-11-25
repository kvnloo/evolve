---
description: Automatically select optimal workflow based on task type
agent: automation-agent
tags: [automation, workflow, selection, optimization]
---

# Workflow Select

Automatically select optimal workflow based on task type.

## Usage

```auto-shell
npx claude-flow automation workflow-select [options]
```

## Options

- `--task <description>` - Task description
- `--constraints <list>` - Workflow constraints
- `--preview` - Preview without executing

## Examples

### Select workflow for task

```auto-shell
npx claude-flow automation workflow-select --task "Deploy to production"
```

### With constraints

```auto-shell
npx claude-flow automation workflow-select --constraints "no-downtime,rollback"
```

### Preview mode

```auto-shell
npx claude-flow automation workflow-select --task "Database migration" --preview
```

## Workflow Selection Logic

### 1. Task Analysis

- Parses task description
- Identifies task type (deployment, migration, build, test)
- Extracts constraints and requirements
- Determines complexity level

### 2. Workflow Matching

- Matches task characteristics to workflow patterns
- Considers constraints (downtime, rollback, performance)
- Evaluates resource requirements
- Selects optimal workflow template

### 3. Execution Planning

- Configures workflow steps
- Sets up monitoring
- Prepares rollback procedures
- Schedules execution

## Common Workflow Types

### Deployment Workflows

- **Blue-Green Deployment**: Zero downtime, instant rollback
- **Canary Deployment**: Gradual rollout, risk mitigation
- **Rolling Deployment**: Sequential updates, controlled pace

### Migration Workflows

- **Database Migration**: Schema changes, data transformation
- **Service Migration**: Gradual service transition
- **Infrastructure Migration**: Platform/provider changes

### Build Workflows

- **CI/CD Pipeline**: Automated build, test, deploy
- **Release Workflow**: Version management, changelog generation
- **Artifact Management**: Build artifact storage and distribution

## See Also

- `auto-agent` - Automatic agent spawning
- `smart-spawn` - Intelligent agent management
- `workflow-create` - Create custom workflows
