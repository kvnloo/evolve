# Research Autosave Hook System

## Overview

Automated hook system that saves research findings to memory when files in `research/findings/` are edited.

## Architecture

### Hook Trigger
- **Event**: `post-edit`
- **Pattern**: `research/findings/**/*.md`
- **Script**: `.claude-flow/hooks/research-autosave.js`

### Memory Structure

```
research/
  architecture/
    2025-10-20-[timestamp] → Full research data
    latest → Most recent research
  security/
    2025-10-20-[timestamp]
    latest
  performance/
    2025-10-20-[timestamp]
    latest
  synthesis/
    2025-10-20-[timestamp]
    latest
  analysis/
    2025-10-20-[timestamp]
    latest
  design/
    2025-10-20-[timestamp]
    latest
```

### Data Schema

Each memory entry contains:

```javascript
{
  filePath: string,           // Original file path
  timestamp: string,          // ISO 8601 timestamp
  category: string,           // Research category
  confidence: number,         // Quality score (0-1)
  analysisType: string,       // Type from metadata
  summary: string,            // First paragraph summary
  keyPoints: string[],        // Extracted bullet points
  conclusions: string[],      // From conclusions section
  references: Array<{         // Extracted links
    title: string,
    url: string
  }>,
  crossReferences: string[],  // Related memory keys
  metadata: {                 // Frontmatter + computed
    wordCount: number,
    lastModified: string,
    ...frontmatter
  }
}
```

## Features

### 1. Automatic Category Detection
- Extracts from filename keywords
- Checks content for category headers
- Defaults to "general" if ambiguous

### 2. Intelligent Content Extraction
- **Frontmatter**: YAML metadata parsing
- **Summary**: First paragraph after title
- **Key Points**: All bullet points
- **Conclusions**: Dedicated section extraction
- **References**: Markdown links

### 3. Confidence Scoring
Calculates quality score based on:
- Structured sections (+0.1)
- Metadata presence (+0.1)
- References (+0.1)
- Multiple key points (+0.1)
- Conclusions (+0.1)
- Content length (+0.05-0.1)

Range: 0.5 (basic) to 1.0 (comprehensive)

### 4. Cross-Reference Tracking
- Finds related research in same category
- Builds knowledge graph connections
- Enables synthesis across findings

### 5. Dual Storage
- Timestamped key: `research/[category]/[date]-[timestamp]`
- Latest key: `research/[category]/latest`

## Usage

### Automatic Triggering

Simply edit any file in `research/findings/`:

```bash
# Create or edit research file
vim research/findings/my-analysis.md

# Hook automatically triggers on save
# Memory stored with structured key
```

### Manual Testing

```bash
# Test hook directly
node .claude-flow/hooks/research-autosave.js research/findings/test-research.md

# List stored research
npx claude-flow@alpha hooks memory-list | grep research

# Retrieve specific research
npx claude-flow@alpha hooks memory-get research/architecture/latest

# Retrieve timestamped version
npx claude-flow@alpha hooks memory-get research/architecture/2025-10-20-1729425600000
```

### Query Patterns

```bash
# Get all architecture research
npx claude-flow@alpha hooks memory-list | grep "research/architecture"

# Get latest from each category
for cat in architecture security performance synthesis analysis design; do
  echo "=== $cat ==="
  npx claude-flow@alpha hooks memory-get "research/$cat/latest"
done

# Search by confidence (requires jq)
npx claude-flow@alpha hooks memory-get research/architecture/latest | jq 'select(.confidence > 0.8)'
```

## Configuration

### Hook Settings

Edit `.claude-flow/claude-flow.config.json`:

```json
{
  "hooks": {
    "post-edit": {
      "research-autosave": {
        "enabled": true,
        "pattern": "research/findings/**/*.md",
        "config": {
          "memory_prefix": "research/",
          "categories": ["architecture", "security", ...],
          "auto_cross_reference": true,
          "store_latest": true
        }
      }
    }
  }
}
```

### Custom Categories

Add to `categories` array in config:

```json
"categories": [
  "architecture",
  "security",
  "performance",
  "synthesis",
  "analysis",
  "design",
  "custom-category"  // Your category
]
```

### Memory Retention

```json
{
  "memory": {
    "retention": {
      "default": "30d",
      "research": "90d"  // Keep research longer
    }
  }
}
```

## Integration

### Pre-Task Context Restoration

```bash
# Before starting research task
npx claude-flow@alpha hooks session-restore --session-id "research-session"
npx claude-flow@alpha hooks memory-get research/architecture/latest
```

### Post-Task Export

```bash
# After completing research
npx claude-flow@alpha hooks session-end --export-metrics true
```

### Swarm Coordination

Research memory accessible to all swarm agents:

```javascript
// Agent can read research context
const architectureResearch = await memory.get('research/architecture/latest');
const securityResearch = await memory.get('research/security/latest');

// Agent stores findings
await memory.store('research/analysis/2025-10-20-findings', analysis);
```

## Logging

### View Hook Logs

```bash
# Real-time monitoring
tail -f .claude-flow/hooks/research-autosave.log

# Recent activity
tail -20 .claude-flow/hooks/research-autosave.log

# Search for errors
grep "❌" .claude-flow/hooks/research-autosave.log
```

### Log Format

```
[2025-10-20T10:30:45.123Z] 🔍 Processing: research/findings/analysis.md
[2025-10-20T10:30:45.234Z] ✅ Stored in memory: research/analysis/2025-10-20-1729425645234
[2025-10-20T10:30:45.235Z] 📊 Research autosaved:
  Category: analysis
  Confidence: 0.85
  Key Points: 5
  Conclusions: 3
  References: 2
  Cross-refs: 4
  Memory Key: research/analysis/2025-10-20-1729425645234
```

## Best Practices

### 1. Structured Research Files

```markdown
---
type: architecture
confidence: 0.85
author: agent-name
date: 2025-10-20
tags: [api, microservices, scalability]
---

# Title

Brief summary in first paragraph.

## Key Findings

- Point 1
- Point 2
- Point 3

## Conclusions

- Conclusion 1
- Conclusion 2

## References

[Source 1](url1)
[Source 2](url2)
```

### 2. Category Organization

- Use category keywords in filenames
- Add category headers in content
- Include type in frontmatter

### 3. Cross-Referencing

- Reference related research in content
- Use consistent memory keys
- Build knowledge graphs

### 4. Quality Indicators

- Add frontmatter metadata
- Structure with headers
- Include references
- Write comprehensive conclusions
- Aim for 2000+ words for depth

## Troubleshooting

### Hook Not Triggering

```bash
# Check hook is enabled
cat .claude-flow/claude-flow.config.json | jq '.hooks["post-edit"]["research-autosave"].enabled'

# Verify file pattern match
echo "research/findings/test.md" | grep -E "research/findings/.*.md"

# Check hook permissions
ls -la .claude-flow/hooks/research-autosave.js

# Test manually
node .claude-flow/hooks/research-autosave.js research/findings/test-research.md
```

### Memory Storage Failing

```bash
# Check claude-flow installation
npx claude-flow@alpha --version

# Test memory commands
npx claude-flow@alpha hooks memory-list

# Check disk space
df -h /tmp

# Review error logs
grep "Error storing" .claude-flow/hooks/research-autosave.log
```

### Low Confidence Scores

Improve by adding:
- Structured headers (##)
- Frontmatter metadata
- Multiple key points (3+)
- Conclusions section
- External references
- Longer content (2000+ words)

## Performance

- **Processing Time**: ~50-200ms per file
- **Memory Overhead**: ~10-50KB per research entry
- **Hook Execution**: Asynchronous, non-blocking
- **Cross-Reference Lookup**: ~100-300ms

## Security

- Files read with filesystem permissions
- Memory stored in claude-flow secure backend
- No external API calls (except claude-flow)
- Logs sensitive info redacted
- Temp files cleaned up immediately

## Future Enhancements

1. **Semantic Search**: Vector embeddings for research similarity
2. **Auto-Tagging**: AI-based tag generation
3. **Synthesis Triggers**: Auto-generate synthesis when threshold met
4. **Graph Visualization**: Knowledge graph UI
5. **Slack/Discord Notifications**: Research alerts
6. **GitHub Integration**: Commit research to repository
7. **Export Formats**: PDF, HTML, Notion, Obsidian

## API Reference

### Hook Interface

```javascript
// Input: File path as first argument
process.argv[2] // → "research/findings/analysis.md"

// Output: Exit code
process.exit(0) // Success
process.exit(1) // Failure

// Logging
log(message) // Append to log file and stdout
```

### Memory Commands

```bash
# Store
npx claude-flow@alpha hooks memory-store --key "KEY" --file "FILE"

# Retrieve
npx claude-flow@alpha hooks memory-get "KEY"

# List
npx claude-flow@alpha hooks memory-list

# Delete
npx claude-flow@alpha hooks memory-delete "KEY"
```

## License

Part of evolve project using SPARC methodology with Claude-Flow orchestration.
