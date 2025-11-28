# Research Daemon - Quick Start Guide

Get the research daemon running in 5 minutes.

## Prerequisites (30 seconds)

```bash
# 1. Set your Anthropic API key
export ANTHROPIC_API_KEY="your-api-key-here"

# 2. Verify it's set
echo $ANTHROPIC_API_KEY
```

## Quick Test (2 minutes)

```bash
# Run the automated test script
.claude-flow/daemons/test-daemon.sh
```

This will:
- ✅ Check all prerequisites
- ✅ Create a test research queue
- ✅ Start the daemon
- ✅ Monitor for 60 seconds
- ✅ Show results
- ✅ Clean up

## Manual Test (5 minutes)

### Step 1: Create Research Queue

```bash
# Use the example queue
cp memory/research-queue.example.json memory/research-queue.json

# Or create a simple one
cat > memory/research-queue.json << 'EOF'
{
  "queries": [
    {
      "id": "test-001",
      "text": "Create a comprehensive research plan for understanding modern AI agent architectures",
      "priority": "high",
      "tags": ["ai", "architecture"]
    }
  ]
}
EOF
```

### Step 2: Start Daemon

```bash
node .claude-flow/daemons/research-daemon.js start
```

Expected output:
```
[2025-10-20T...] [INFO] Anthropic client initialized successfully
[2025-10-20T...] [INFO] Research daemon started
```

### Step 3: Monitor Status

```bash
# In another terminal
watch -n 5 'node .claude-flow/daemons/research-daemon.js status'
```

Or manually:
```bash
node .claude-flow/daemons/research-daemon.js status
```

### Step 4: View Logs

```bash
# Watch logs in real-time
tail -f .claude-flow/logs/research-daemon.log

# Or view last 50 lines
node .claude-flow/daemons/research-daemon.js logs 50
```

### Step 5: Check Results

```bash
# List results
ls -lh .swarm/research/results/

# View specific result
cat .swarm/research/results/test-001-*.json | jq .

# Extract just the response
cat .swarm/research/results/test-001-*.json | jq -r .response
```

### Step 6: Stop Daemon

```bash
node .claude-flow/daemons/research-daemon.js stop
```

## Common Commands

```bash
# Start daemon
node .claude-flow/daemons/research-daemon.js start

# Resume from last checkpoint
node .claude-flow/daemons/research-daemon.js resume

# Check status
node .claude-flow/daemons/research-daemon.js status

# View logs (last N lines)
node .claude-flow/daemons/research-daemon.js logs [N]

# Stop daemon
node .claude-flow/daemons/research-daemon.js stop
```

## Troubleshooting

### "ANTHROPIC_API_KEY not set"
```bash
export ANTHROPIC_API_KEY="your-key-here"
```

### "Failed to initialize Anthropic client"
The daemon will auto-install `@anthropic-ai/sdk`. If it fails:
```bash
cd .claude-flow
npm install @anthropic-ai/sdk
```

### "Daemon already running"
```bash
# Stop existing daemon
node .claude-flow/daemons/research-daemon.js stop

# Or force cleanup
rm .claude-flow/research-daemon.pid
```

### "No research queue found"
```bash
# Create a queue file
cp memory/research-queue.example.json memory/research-queue.json
```

## Configuration

Edit `.claude-flow/daemons/daemon-config.json` to adjust:

```json
{
  "costControls": {
    "maxCostPerSession": 50.0,
    "emergencyStop": 75.0
  },
  "safetyControls": {
    "maxRuntimeHours": 12
  }
}
```

## Example Output

### Successful Start
```bash
$ node .claude-flow/daemons/research-daemon.js start

[2025-10-20T16:30:00.000Z] [INFO] Anthropic client initialized successfully
[2025-10-20T16:30:01.000Z] [INFO] Research daemon started
{
  "pid": 12345,
  "model": "claude-sonnet-4-20250514",
  "resumed": false
}
[2025-10-20T16:30:02.000Z] [INFO] Processing query: test-001
[2025-10-20T16:30:15.000Z] [INFO] Research completed
{
  "queryId": "test-001",
  "inputTokens": 1234,
  "outputTokens": 5678,
  "model": "claude-sonnet-4-20250514"
}
[2025-10-20T16:30:16.000Z] [INFO] Query processed: test-001
```

### Status Check
```bash
$ node .claude-flow/daemons/research-daemon.js status

{
  "running": true,
  "pid": 12345,
  "uptime": 120000,
  "processedQueries": 1,
  "totalCost": 0.45,
  "currentModel": "claude-sonnet-4-20250514",
  "totalTokens": 6912
}
```

### Results
```bash
$ cat .swarm/research/results/test-001-*.json | jq .

{
  "queryId": "test-001",
  "query": "Create a comprehensive research plan...",
  "response": "{\n  \"query\": \"...\",\n  \"objectives\": {...},\n  ...\n}",
  "model": "claude-sonnet-4-20250514",
  "timestamp": "2025-10-20T16:30:15.000Z",
  "tokens": {
    "input": 1234,
    "output": 5678,
    "total": 6912
  }
}
```

## Next Steps

1. ✅ Test with simple query (done above)
2. 📝 Create your production research queue
3. 🎯 Adjust cost limits if needed
4. 🚀 Start overnight research session
5. 📊 Review results in the morning

## Full Documentation

- **Architecture Guide**: `/docs/RESEARCH-DAEMON-GUIDE.md`
- **Implementation Summary**: `/docs/RESEARCH-DAEMON-SUMMARY.md`
- **Test Script**: `/.claude-flow/daemons/test-daemon.sh`
- **Example Queue**: `/memory/research-queue.example.json`

---

**Ready to research autonomously!** 🚀
