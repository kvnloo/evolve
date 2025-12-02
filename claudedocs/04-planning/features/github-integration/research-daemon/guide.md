# Research Daemon Guide - Fixed Architecture

Autonomous overnight research daemon with direct Anthropic API integration.

## Overview

The Research Daemon enables continuous, autonomous research processing using direct API communication with Anthropic's models. This architecture eliminates the dependency on slash commands and provides reliable overnight operation.

### Architecture Improvements

**Previous Issue**: Tried to call `/sc:research-plan-only` from shell, which failed because slash commands only work inside Claude Code sessions.

**New Architecture**:
- **Direct Anthropic API**: Uses `@anthropic-ai/sdk` for reliable API communication
- **Claude Monitor Integration**: Tracks token usage for automatic model switching
- **MCP Coordination**: Optional claude-flow hooks for memory management
- **Cost Controls**: Automatic spending limits and emergency stops
- **Safety Features**: Circuit breakers, health checks, checkpoints

## Key Features

- **Continuous Operation**: Runs 8-12 hours autonomously
- **Direct API Integration**: No dependency on Claude CLI sessions
- **Automatic Model Switching**: Intelligent cost optimization
- **Checkpoint/Resume**: Save progress every 30 minutes
- **Safety Controls**: Multiple layers of protection
- **Token Tracking**: Real-time monitoring via claude monitor

## Quick Start

### Prerequisites

```bash
# Set your Anthropic API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Ensure directories exist
mkdir -p .claude-flow/daemons .claude-flow/logs .swarm/research/checkpoints .swarm/research/results memory

# Make daemon executable
chmod +x .claude-flow/daemons/research-daemon.js
```

### Create Research Queue

Create `memory/research-queue.json`:

```json
{
  "queries": [
    {
      "id": "research-001",
      "text": "Analyze the latest trends in AI agent architectures",
      "priority": "high",
      "tags": ["ai", "architecture"]
    },
    {
      "id": "research-002",
      "text": "Research best practices for token optimization in LLMs",
      "priority": "medium",
      "tags": ["llm", "optimization"]
    },
    {
      "id": "research-003",
      "text": "Investigate distributed computing patterns for AI systems",
      "priority": "low",
      "tags": ["distributed", "systems"]
    }
  ]
}
```

### Basic Usage

```bash
# Start daemon (fresh start)
node .claude-flow/daemons/research-daemon.js start

# Check status
node .claude-flow/daemons/research-daemon.js status

# View logs (last 50 lines)
node .claude-flow/daemons/research-daemon.js logs

# View more logs
node .claude-flow/daemons/research-daemon.js logs 200

# Stop daemon
node .claude-flow/daemons/research-daemon.js stop

# Resume from last checkpoint
node .claude-flow/daemons/research-daemon.js resume
```

## Architecture Details

### 1. Direct API Communication

The daemon uses the Anthropic SDK directly:

```javascript
const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Call API
const message = await anthropic.messages.create({
  model: currentModel,
  max_tokens: 8000,
  messages: [{
    role: 'user',
    content: researchPrompt
  }]
});
```

**Benefits**:
- No dependency on Claude CLI or sessions
- Works from any Node.js process
- Direct access to all API features
- Reliable error handling

### 2. Research Prompt Generation

The daemon generates research planning prompts automatically:

```javascript
buildResearchPrompt(query) {
  return `You are in autonomous research planning mode...

  **Query**: ${query}

  **Instructions**:
  1. Parse query and identify objectives
  2. Design multi-hop strategy
  3. Identify sources and methods
  4. Create execution roadmap
  5. Assess risks

  **Output**: JSON research plan...`;
}
```

### 3. Token Tracking

Integrates with `claude monitor` for real-time tracking:

```javascript
async readClaudeMonitor() {
  const output = execSync('claude monitor');
  // Parse tokens used, remaining, cost
  return {
    tokensUsed,
    tokensRemaining,
    estimatedCost
  };
}
```

### 4. Model Switching Logic

Automatically switches models based on token thresholds:

```javascript
// Tier 1: Claude Sonnet 4 (Default)
// Switches to Tier 2 at 50k tokens remaining

// Tier 2: Claude 3.5 Sonnet
// Switches to Tier 3 at 20k tokens remaining

// Tier 3: Claude 3.5 Haiku
// Runs until cost limit
```

## Configuration

Edit `.claude-flow/daemons/daemon-config.json`:

### Cost Controls

```json
{
  "costControls": {
    "maxCostPerSession": 50.0,
    "emergencyStop": 75.0,
    "tokenThresholds": {
      "switchToSonnet35": 50000,
      "switchToHaiku": 20000
    },
    "monitorInterval": 60000
  }
}
```

### Model Configuration

```json
{
  "models": {
    "default": "claude-sonnet-4-20250514",
    "sonnet35": "claude-3-5-sonnet-20241022",
    "haiku": "claude-3-5-haiku-20241022"
  }
}
```

### Safety Controls

```json
{
  "safetyControls": {
    "maxRuntimeHours": 12,
    "maxApiFailures": 5,
    "healthCheckInterval": 300000,
    "queryTimeout": 600000,
    "rateLimitDelay": 5000
  }
}
```

## Monitoring and Logging

### Real-Time Status

```bash
# Get current status
node .claude-flow/daemons/research-daemon.js status

# Output example:
{
  "running": true,
  "pid": 12345,
  "uptime": 7200000,
  "processedQueries": 15,
  "totalCost": 23.45,
  "currentModel": "claude-3-5-sonnet-20241022",
  "totalTokens": 450000,
  "errors": [],
  "modelSwitches": [...]
}
```

### Log Files

Logs are written to `.claude-flow/logs/research-daemon.log` in JSON format:

```bash
# View logs
node .claude-flow/daemons/research-daemon.js logs

# Follow logs in real-time
tail -f .claude-flow/logs/research-daemon.log | jq .
```

### Results Storage

Research results are stored in two places:

1. **Local Files**: `.swarm/research/results/[query-id]-[timestamp].json`
2. **Memory (Optional)**: Via claude-flow hooks at `research/results/[query-id]/[timestamp]`

## Checkpointing System

### Automatic Checkpoints

Checkpoints are saved every 30 minutes (configurable) to `.swarm/research/checkpoints/`.

**Checkpoint Contents**:
```json
{
  "id": 1729432800000,
  "timestamp": "2025-10-20T12:00:00.000Z",
  "state": {
    "running": true,
    "processedQueries": 5,
    "totalTokens": 125000,
    "totalCost": 18.50,
    "currentModel": "claude-3-5-sonnet-20241022",
    "modelSwitches": [...],
    "errors": []
  }
}
```

### Resume from Checkpoint

```bash
# Resume from last checkpoint
node .claude-flow/daemons/research-daemon.js resume
```

## Safety Features

### 1. Cost Limits

- **maxCostPerSession**: Graceful shutdown at limit
- **emergencyStop**: Hard stop at critical limit
- Continuous monitoring via claude monitor

### 2. Health Checks

Every 5 minutes:
- Check runtime against limit (12 hours default)
- Check API failure count
- Check cost against limits
- Auto-stop if unhealthy

### 3. Circuit Breaker

Handles transient API failures:
- Track consecutive failures
- Stop after threshold (5 default)
- Log all errors for debugging

### 4. Rate Limiting

5 second delay between queries (configurable) to avoid rate limits.

## Troubleshooting

### Daemon Won't Start

**Check API key**:
```bash
echo $ANTHROPIC_API_KEY
# Should output your API key

# If not set:
export ANTHROPIC_API_KEY="your-key-here"
```

**Check for existing process**:
```bash
cat .claude-flow/research-daemon.pid
ps aux | grep research-daemon

# Clean up stale PID:
rm .claude-flow/research-daemon.pid
```

**Check logs**:
```bash
tail -50 .claude-flow/logs/research-daemon.log
```

### SDK Installation Issues

The daemon auto-installs `@anthropic-ai/sdk` if missing. If this fails:

```bash
# Manual installation
cd .claude-flow
npm install @anthropic-ai/sdk

# Or globally
npm install -g @anthropic-ai/sdk
```

### High Cost/Token Usage

**Check current usage**:
```bash
claude monitor
node .claude-flow/daemons/research-daemon.js status
```

**Adjust thresholds**:
```json
{
  "tokenThresholds": {
    "switchToSonnet35": 100000,
    "switchToHaiku": 50000
  },
  "maxCostPerSession": 25.0
}
```

### API Failures

**Check logs for errors**:
```bash
node .claude-flow/daemons/research-daemon.js logs | grep ERROR
```

**Common causes**:
- Invalid API key
- Rate limiting (increase delay)
- Network issues
- Model availability

**Increase resilience**:
```json
{
  "safetyControls": {
    "queryTimeout": 900000,
    "maxApiFailures": 10,
    "rateLimitDelay": 10000
  }
}
```

## Testing

### Test Script

Use the provided test script:

```bash
# Run test
.claude-flow/daemons/test-daemon.sh
```

This will:
1. Check prerequisites (API key, directories)
2. Create sample research queue
3. Start daemon with test query
4. Monitor for 60 seconds
5. Show results
6. Clean up

### Manual Testing

```bash
# 1. Create minimal queue
echo '{
  "queries": [
    {
      "id": "test-001",
      "text": "What is the capital of France?",
      "priority": "high"
    }
  ]
}' > memory/research-queue.json

# 2. Start daemon
node .claude-flow/daemons/research-daemon.js start

# 3. Monitor in another terminal
watch -n 5 'node .claude-flow/daemons/research-daemon.js status'

# 4. Check results after completion
ls -lh .swarm/research/results/
cat .swarm/research/results/test-001-*.json | jq .
```

## Best Practices

### 1. Start Small

Test with 1-3 queries before overnight runs:
```json
{
  "queries": [
    {"id": "test-1", "text": "Simple test query", "priority": "high"}
  ]
}
```

### 2. Conservative Limits

Start with lower limits:
```json
{
  "maxCostPerSession": 25.0,
  "emergencyStop": 40.0,
  "maxRuntimeHours": 6
}
```

### 3. Monitor First Hour

Watch logs and status during first hour to ensure stable operation.

### 4. Regular Checkpoints

Keep checkpoint interval reasonable (30 minutes default) for easy recovery.

### 5. Review Results

After completion:
```bash
# List all results
ls -lh .swarm/research/results/

# View specific result
cat .swarm/research/results/research-001-*.json | jq .

# Extract just the response
cat .swarm/research/results/research-001-*.json | jq -r .response
```

## Production Deployment

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Start daemon with PM2
pm2 start .claude-flow/daemons/research-daemon.js --name research-daemon -- start

# Monitor
pm2 monit

# View logs
pm2 logs research-daemon

# Stop
pm2 stop research-daemon

# Auto-restart on system boot
pm2 startup
pm2 save
```

### Using Systemd

Create `/etc/systemd/system/research-daemon.service`:

```ini
[Unit]
Description=Research Daemon
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/evolve
Environment="ANTHROPIC_API_KEY=your-key-here"
ExecStart=/usr/bin/node .claude-flow/daemons/research-daemon.js start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable research-daemon
sudo systemctl start research-daemon
sudo systemctl status research-daemon
```

## Cost Estimation

### Token Costs (Approximate)

**Claude Sonnet 4**:
- Input: $3 per million tokens
- Output: $15 per million tokens
- Average query: ~$0.50

**Claude 3.5 Sonnet**:
- Input: $3 per million tokens
- Output: $15 per million tokens
- Average query: ~$0.40

**Claude 3.5 Haiku**:
- Input: $0.80 per million tokens
- Output: $4 per million tokens
- Average query: ~$0.10

### Session Cost Planning

**Example overnight session (10 hours)**:
- 20 queries total
- Mixed models (auto-switching)
- Estimated cost: $15-25

**Large research session**:
- 50 queries
- Complex analysis
- Estimated cost: $40-50

## Comparison to Previous Architecture

| Feature | Previous | New (Fixed) |
|---------|----------|-------------|
| API Communication | Slash commands via CLI | Direct Anthropic SDK |
| Reliability | Required Claude session | Standalone process |
| Error Handling | Limited | Comprehensive |
| Token Tracking | Manual | Automatic via monitor |
| Cost Controls | Basic | Multi-tier with emergency stop |
| Checkpointing | File-based | File + optional memory |
| Model Switching | Manual | Automatic |
| Monitoring | Logs only | Logs + real-time status |

## Support and Resources

### Documentation
- Main repo: https://github.com/ruvnet/claude-flow
- Anthropic SDK: https://github.com/anthropics/anthropic-sdk-typescript
- Claude monitor: `claude monitor --help`

### Common Issues
- Check `.claude-flow/logs/research-daemon.log` for errors
- Run `status` command for diagnostics
- Verify API key is set correctly
- Ensure all directories exist

---

**Last Updated**: 2025-10-20
**Version**: 2.0.0 (Fixed Architecture)
**Architecture**: Direct Anthropic API integration
