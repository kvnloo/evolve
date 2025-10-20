# Research Daemon Guide

Autonomous overnight research daemon with cost controls and Claude monitor integration.

## Overview

The Research Daemon enables continuous, autonomous research processing that runs overnight (8-12 hours) with intelligent cost controls, automatic model switching, and comprehensive safety features.

### Key Features

- **Continuous Operation**: Runs 8-12 hours autonomously
- **Cost Controls**: Automatic model switching and spending limits
- **Claude Monitor Integration**: Real-time token tracking and cost estimation
- **Checkpoint/Resume**: Save progress every 30 minutes and resume from any checkpoint
- **Safety Controls**: Circuit breakers, health checks, and emergency stops
- **Intelligent Model Switching**: Automatically switches between models based on token usage

## Quick Start

### Installation

```bash
# Ensure directories exist
mkdir -p .claude-flow/daemons .claude-flow/logs .swarm/research/checkpoints memory

# Make daemon executable
chmod +x .claude-flow/daemons/research-daemon.js
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

## Configuration

The daemon is configured via `/home/kvn/workspace/evolve/.claude-flow/daemons/daemon-config.json`:

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

**Parameters:**
- `maxCostPerSession`: Maximum spending per session ($50 default)
- `emergencyStop`: Hard limit that forces immediate shutdown ($75)
- `tokenThresholds`: When to switch models based on remaining tokens
- `monitorInterval`: How often to check token usage (60s default)

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

**Model Switching Logic:**
1. Start with `claude-sonnet-4-20250514` (highest quality)
2. Switch to `claude-3-5-sonnet-20241022` when < 50k tokens remaining
3. Switch to `claude-3-5-haiku-20241022` when < 20k tokens remaining

### Safety Controls

```json
{
  "safetyControls": {
    "maxRuntimeHours": 12,
    "maxApiFailures": 5,
    "healthCheckInterval": 300000,
    "queryTimeout": 600000,
    "rateLimitDelay": 5000,
    "circuitBreaker": {
      "enabled": true,
      "failureThreshold": 3,
      "resetTimeout": 300000
    }
  }
}
```

**Safety Features:**
- **Runtime Limit**: Daemon stops after 12 hours
- **API Failure Tracking**: Stops after 5 consecutive API failures
- **Health Checks**: Every 5 minutes
- **Query Timeout**: Each query limited to 10 minutes
- **Rate Limiting**: 5 second delay between queries
- **Circuit Breaker**: Automatic recovery from transient failures

## Claude Monitor Integration

The daemon integrates with the `claude monitor` command to track token usage and costs in real-time.

### How It Works

```javascript
// Daemon reads claude monitor output
const monitorData = await readClaudeMonitor();

// Check token thresholds
if (monitorData.tokensRemaining < 50000) {
  switchModel('claude-3-5-sonnet-20241022');
}

// Check cost limits
if (monitorData.estimatedCost >= 50) {
  stopDaemon();
}
```

### Monitor Data Structure

```json
{
  "tokensUsed": 150000,
  "tokensRemaining": 45000,
  "estimatedCost": 12.50,
  "model": "claude-sonnet-4-20250514"
}
```

## Research Queue Setup

Create a research queue in `/home/kvn/workspace/evolve/memory/research-queue.json`:

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

## Checkpointing System

### Automatic Checkpoints

Checkpoints are saved every 30 minutes to `.swarm/research/checkpoints/`.

**Checkpoint Contents:**
- Current state (tokens, cost, progress)
- Model selection history
- Errors and warnings
- Processed queries
- Configuration snapshot

**Checkpoint Format:**
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
    "modelSwitches": [...]
  }
}
```

### Resume from Checkpoint

```bash
# Resume from last checkpoint
node .claude-flow/daemons/research-daemon.js resume
```

The daemon will:
1. Load the latest checkpoint
2. Restore state and configuration
3. Continue from where it left off
4. Skip already processed queries

## Monitoring and Logging

### Real-Time Status

```bash
# Get current status
node .claude-flow/daemons/research-daemon.js status

# Output:
{
  "running": true,
  "pid": 12345,
  "uptime": 7200000,
  "processedQueries": 15,
  "totalCost": 23.45,
  "currentModel": "claude-3-5-sonnet-20241022"
}
```

### Log Files

Logs are written to `.claude-flow/logs/research-daemon.log` in JSON format:

```json
{"timestamp":"2025-10-20T12:00:00.000Z","level":"INFO","message":"Daemon started","data":{"pid":12345}}
{"timestamp":"2025-10-20T12:01:00.000Z","level":"INFO","message":"Processing query: research-001"}
{"timestamp":"2025-10-20T12:05:00.000Z","level":"INFO","message":"Model switch","data":{"from":"claude-sonnet-4","to":"claude-3-5-sonnet"}}
```

**View logs:**
```bash
# Last 50 lines
node .claude-flow/daemons/research-daemon.js logs

# Last 200 lines
node .claude-flow/daemons/research-daemon.js logs 200

# Follow logs in real-time
tail -f .claude-flow/logs/research-daemon.log | jq .
```

## Model Switching

### Automatic Switching

The daemon automatically switches models based on token thresholds:

**Tier 1: Claude Sonnet 4** (Default)
- Highest quality responses
- Best for complex research
- Switches to Tier 2 at 50k tokens remaining

**Tier 2: Claude 3.5 Sonnet**
- Good quality, lower cost
- Balanced performance
- Switches to Tier 3 at 20k tokens remaining

**Tier 3: Claude 3.5 Haiku**
- Fastest, most economical
- Simple queries and summaries
- Runs until cost limit

### Model Switch Events

Each model switch is logged:

```json
{
  "timestamp": "2025-10-20T12:30:00.000Z",
  "from": "claude-sonnet-4-20250514",
  "to": "claude-3-5-sonnet-20241022",
  "reason": "token_threshold",
  "tokensRemaining": 48500
}
```

## Safety Features

### Circuit Breakers

The daemon includes circuit breakers to handle transient failures:

```json
{
  "circuitBreaker": {
    "enabled": true,
    "failureThreshold": 3,
    "resetTimeout": 300000
  }
}
```

**How it works:**
1. Track API call failures
2. After 3 consecutive failures, open circuit
3. Wait 5 minutes before retrying
4. Test with single request
5. Close circuit if successful

### Health Checks

Health checks run every 5 minutes:

```json
{
  "timestamp": "2025-10-20T12:05:00.000Z",
  "runtime": 7200000,
  "maxRuntime": 43200000,
  "apiFailures": 1,
  "maxApiFailures": 5,
  "cost": 18.50,
  "maxCost": 50.00,
  "healthy": true,
  "issues": []
}
```

**Automatic Actions:**
- Stop daemon if max runtime exceeded
- Stop if too many API failures
- Warn when approaching cost limits

### Emergency Stop

Hard stop triggers at $75 (configurable):

```javascript
if (totalCost >= emergencyStop) {
  log('CRITICAL', 'Emergency stop - cost limit reached');
  await saveCheckpoint();
  await stop();
  process.exit(1);
}
```

## Advanced Usage

### Custom Configuration

Override default config by editing `daemon-config.json`:

```json
{
  "costControls": {
    "maxCostPerSession": 100.0,
    "emergencyStop": 150.0
  },
  "safetyControls": {
    "maxRuntimeHours": 24
  },
  "checkpointIntervalMinutes": 15
}
```

### Programmatic Usage

Use the daemon as a module:

```javascript
const ResearchDaemon = require('./.claude-flow/daemons/research-daemon.js');

const daemon = new ResearchDaemon('./custom-config.json');

daemon.on('model-switch', (data) => {
  console.log('Model switched:', data);
});

daemon.on('checkpoint', (checkpoint) => {
  console.log('Checkpoint saved:', checkpoint.id);
});

await daemon.start();
```

### Custom Research Commands

Modify the research execution in `processResearchQueue()`:

```javascript
// Use different research command
const researchCmd = `/sc:research-deep "${query.text}"`;

// Or use custom parameters
const researchCmd = `/sc:research "${query.text}" --depth=comprehensive --sources=20`;
```

## Troubleshooting

### Daemon Won't Start

**Check for existing process:**
```bash
cat .claude-flow/research-daemon.pid
ps aux | grep research-daemon
```

**Clean up stale PID:**
```bash
rm .claude-flow/research-daemon.pid
node .claude-flow/daemons/research-daemon.js start
```

### High Cost/Token Usage

**Check current usage:**
```bash
claude monitor
node .claude-flow/daemons/research-daemon.js status
```

**Adjust thresholds:**
```json
{
  "tokenThresholds": {
    "switchToSonnet35": 100000,
    "switchToHaiku": 50000
  }
}
```

### API Failures

**Check logs:**
```bash
node .claude-flow/daemons/research-daemon.js logs | grep ERROR
```

**Increase timeout:**
```json
{
  "safetyControls": {
    "queryTimeout": 900000,
    "maxApiFailures": 10
  }
}
```

### Checkpoint Recovery

**List checkpoints:**
```bash
ls -lh .swarm/research/checkpoints/
```

**Manually load checkpoint:**
```javascript
const checkpoint = JSON.parse(
  fs.readFileSync('.swarm/research/checkpoints/checkpoint-<id>.json')
);
```

## Best Practices

### 1. Start Small

Begin with a small queue (3-5 queries) to test:
```bash
# Test run with 3 queries
node .claude-flow/daemons/research-daemon.js start
```

### 2. Monitor First Hour

Watch logs and status during first hour:
```bash
# Terminal 1: Watch logs
tail -f .claude-flow/logs/research-daemon.log | jq .

# Terminal 2: Check status periodically
watch -n 60 'node .claude-flow/daemons/research-daemon.js status'
```

### 3. Set Conservative Limits

Start with lower cost limits:
```json
{
  "maxCostPerSession": 25.0,
  "emergencyStop": 40.0
}
```

### 4. Regular Checkpoints

Keep checkpoint interval reasonable:
```json
{
  "checkpointIntervalMinutes": 30
}
```

### 5. Review Results

Check results after completion:
```bash
ls -lh .swarm/research/checkpoints/result-*.json
cat .swarm/research/checkpoints/result-research-001.json | jq .
```

## Performance Tips

### Optimize Query Design

**Good queries:**
- Specific and focused
- Clear research objectives
- Reasonable scope

**Avoid:**
- Overly broad queries
- Multiple unrelated topics
- Vague requirements

### Token Efficiency

**Model selection strategy:**
- Use Sonnet 4 for complex analysis
- Switch to Sonnet 3.5 for standard research
- Use Haiku for simple lookups

### Rate Limiting

Adjust delay between queries:
```json
{
  "safetyControls": {
    "rateLimitDelay": 10000
  }
}
```

## Integration Examples

### With /sc:research

```javascript
const researchCmd = `/sc:research-plan-only "${query.text}"`;
```

### With Memory System

```javascript
// Save results to memory
fs.writeFileSync(
  'memory/research-results.json',
  JSON.stringify(results, null, 2)
);
```

### With GitHub Integration

```javascript
// Post results to GitHub issue
execSync(`gh issue comment ${issueId} --body "${results}"`);
```

## Cost Estimation

### Token Costs (Approximate)

**Claude Sonnet 4:**
- Input: $3 per million tokens
- Output: $15 per million tokens
- Average query: ~$0.50

**Claude 3.5 Sonnet:**
- Input: $3 per million tokens
- Output: $15 per million tokens
- Average query: ~$0.40

**Claude 3.5 Haiku:**
- Input: $0.80 per million tokens
- Output: $4 per million tokens
- Average query: ~$0.10

### Session Cost Planning

**Example overnight session (10 hours):**
- 20 queries total
- Mixed models (auto-switching)
- Estimated cost: $15-25

**Large research session:**
- 50 queries
- Complex analysis
- Estimated cost: $40-50

## Security Considerations

### API Key Protection

Daemon uses environment variables:
```bash
export ANTHROPIC_API_KEY="your-key-here"
node .claude-flow/daemons/research-daemon.js start
```

### Process Isolation

Run daemon in isolated environment:
```bash
# Use systemd or pm2 for production
pm2 start .claude-flow/daemons/research-daemon.js --name research-daemon
```

### File Permissions

Secure daemon files:
```bash
chmod 700 .claude-flow/daemons/
chmod 600 .claude-flow/daemons/daemon-config.json
```

## Production Deployment

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Start daemon with PM2
pm2 start .claude-flow/daemons/research-daemon.js --name research-daemon

# Monitor
pm2 monit

# View logs
pm2 logs research-daemon

# Stop
pm2 stop research-daemon
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

## Support and Resources

### Documentation
- Main repo: https://github.com/ruvnet/claude-flow
- SPARC methodology: /docs/SPARC-GUIDE.md
- Claude monitor: `claude monitor --help`

### Common Issues
- GitHub Issues: Report bugs and feature requests
- Logs: Check `.claude-flow/logs/research-daemon.log`
- Status: Run `status` command for diagnostics

### Community
- Share research findings
- Contribute improvements
- Report use cases

## License

This daemon is part of the claude-flow project and follows the same license terms.

---

**Last Updated**: 2025-10-20
**Version**: 1.0.0
**Maintainer**: Claude Code with claude-flow integration
