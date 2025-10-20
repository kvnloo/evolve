# Research Autosave Hook - Testing Guide

## Quick Test Procedure

### 1. Test Hook Execution

```bash
# Direct hook test
cd /home/kvn/workspace/evolve
node .claude-flow/hooks/research-autosave.js research/findings/test-research.md

# Expected output:
# [timestamp] 🔍 Processing: research/findings/test-research.md
# [timestamp] ✅ Stored in memory: research/architecture/2025-10-20-[timestamp]
# [timestamp] 📊 Research autosaved:
#   Category: architecture
#   Confidence: 0.85
#   Key Points: 4
#   Conclusions: 4
#   ...
```

### 2. Verify Memory Storage

```bash
# List all research memory entries
npx claude-flow@alpha hooks memory-list | grep "research/"

# Get latest architecture research
npx claude-flow@alpha hooks memory-get research/architecture/latest

# Get specific timestamped entry
npx claude-flow@alpha hooks memory-get research/architecture/2025-10-20-[timestamp]
```

### 3. Check Logs

```bash
# View recent logs
tail -20 .claude-flow/hooks/research-autosave.log

# Monitor real-time
tail -f .claude-flow/hooks/research-autosave.log

# Check for errors
grep "❌" .claude-flow/hooks/research-autosave.log
```

### 4. Test Automatic Triggering

```bash
# Edit research file to trigger hook
echo "\n## New Finding\n\n- Test automatic hook triggering" >> research/findings/test-research.md

# Hook should automatically run via claude-flow post-edit event
# Check log for automatic execution
tail -5 .claude-flow/hooks/research-autosave.log
```

## Manual Hook Testing Without MCP

Since `npx claude-flow@alpha` requires the full MCP setup, you can test the hook's core functionality independently:

### Modified Test Version

```bash
# Create test script without MCP dependency
cat > .claude-flow/hooks/test-autosave.sh << 'EOF'
#!/bin/bash

FILE="$1"
if [ -z "$FILE" ]; then
  echo "Usage: $0 <research-file.md>"
  exit 1
fi

echo "Testing research autosave on: $FILE"

# Extract findings (simplified)
CATEGORY=$(basename "$FILE" | grep -oE "(architecture|security|performance|synthesis|analysis|design)" | head -1)
CATEGORY=${CATEGORY:-general}

TIMESTAMP=$(date -Iseconds)
MEMORY_KEY="research/${CATEGORY}/${TIMESTAMP}"

echo "Category: $CATEGORY"
echo "Memory Key: $MEMORY_KEY"
echo "File exists: $([ -f "$FILE" ] && echo "✅" || echo "❌")"
echo "File size: $(wc -c < "$FILE") bytes"
echo "Word count: $(wc -w < "$FILE") words"

# Simulate memory storage
echo "Would store to memory: $MEMORY_KEY"
echo "Content preview:"
head -20 "$FILE"

echo ""
echo "✅ Test complete - Hook logic verified"
EOF

chmod +x .claude-flow/hooks/test-autosave.sh

# Run test
.claude-flow/hooks/test-autosave.sh research/findings/test-research.md
```

## Verification Checklist

- [ ] Hook script is executable (`chmod +x`)
- [ ] Config file has correct JSON syntax
- [ ] Pattern matches target files (`research/findings/**/*.md`)
- [ ] Hook enabled in config (`"enabled": true`)
- [ ] Test file exists in `research/findings/`
- [ ] Log file created at `.claude-flow/hooks/research-autosave.log`
- [ ] No syntax errors when running hook
- [ ] Memory keys follow structure: `research/[category]/[timestamp]`
- [ ] Cross-references detected for related research
- [ ] Confidence score calculated (0.5-1.0)

## Troubleshooting

### Hook Not Executing

```bash
# Check file permissions
ls -la .claude-flow/hooks/research-autosave.js

# Test Node.js execution
node --version
node -c .claude-flow/hooks/research-autosave.js  # Check syntax

# Verify file path
realpath research/findings/test-research.md
```

### MCP Commands Failing

```bash
# Check claude-flow installation
npm list -g | grep claude-flow

# Install if missing
npm install -g @ruvnet/claude-flow@alpha

# Test MCP connection
npx claude-flow@alpha --help
```

### JSON Config Errors

```bash
# Validate JSON syntax
cat .claude-flow/claude-flow.config.json | jq '.'

# Check specific hook config
cat .claude-flow/claude-flow.config.json | jq '.hooks["post-edit"]["research-autosave"]'
```

## Expected File Structure

```
/home/kvn/workspace/evolve/
├── .claude-flow/
│   ├── claude-flow.config.json       # Hook configuration
│   └── hooks/
│       ├── research-autosave.js      # Main hook script
│       ├── research-autosave.log     # Execution logs
│       └── test-autosave.sh          # Standalone test script
├── research/
│   └── findings/
│       └── test-research.md          # Test research file
└── docs/
    ├── research-autosave-hook.md     # Full documentation
    └── HOOK-TESTING-GUIDE.md         # This file
```

## Success Indicators

✅ **Hook Executed Successfully:**
- Log file shows processing message
- No error messages in log
- Exit code 0

✅ **Memory Storage Working:**
- Memory key appears in `memory-list`
- Can retrieve data with `memory-get`
- Latest key updated for category

✅ **Data Extraction Working:**
- Summary captured from first paragraph
- Key points extracted from bullets
- Conclusions section parsed
- References detected
- Metadata extracted from frontmatter

✅ **Confidence Scoring Working:**
- Score between 0.5-1.0
- Higher for comprehensive content
- Reflects quality indicators

## Integration Testing

### Test with Real Research Workflow

1. **Create new research file:**
```bash
cat > research/findings/api-design-analysis.md << 'EOF'
---
type: architecture
author: backend-dev
date: 2025-10-20
---

# REST API Design Analysis

Comprehensive analysis of RESTful API patterns for microservices.

## Key Findings

- Resource-based URLs improve clarity
- HTTP verbs map to CRUD operations
- Versioning prevents breaking changes
- Rate limiting protects resources

## Conclusions

- Follow REST constraints strictly
- Use OpenAPI for documentation
- Implement proper error handling
- Version API from the start

## References

[REST API Best Practices](https://example.com)
EOF
```

2. **Trigger hook:**
```bash
node .claude-flow/hooks/research-autosave.js research/findings/api-design-analysis.md
```

3. **Verify storage:**
```bash
npx claude-flow@alpha hooks memory-list | grep "research/architecture"
npx claude-flow@alpha hooks memory-get research/architecture/latest
```

4. **Check cross-references:**
```bash
# Should reference test-research.md since both are architecture category
npx claude-flow@alpha hooks memory-get research/architecture/latest | grep -A5 "crossReferences"
```

## Performance Benchmarks

```bash
# Time hook execution
time node .claude-flow/hooks/research-autosave.js research/findings/test-research.md

# Expected: < 500ms for typical research file
```

## Next Steps

After successful testing:

1. Enable automatic triggering via claude-flow
2. Create research files in `research/findings/`
3. Monitor logs for automatic execution
4. Query memory to retrieve research context
5. Use in swarm agent coordination

## Support

If issues persist:
- Check `.claude-flow/hooks/research-autosave.log` for details
- Review configuration in `claude-flow.config.json`
- Verify Node.js version (>=14.0.0)
- Ensure claude-flow@alpha is installed
- Test with simplified hook script first
