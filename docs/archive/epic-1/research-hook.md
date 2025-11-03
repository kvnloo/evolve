# Research Autosave Hook - Quick Start Guide

## 🚀 5-Minute Setup

### 1. Verify Installation ✅

```bash
# Check hook exists
ls -la .claude-flow/hooks/research-autosave.js

# Check configuration
cat .claude-flow/claude-flow.config.json | jq '.hooks["post-edit"]["research-autosave"]'

# Verify directories
ls -ld .swarm/research/
```

### 2. Test Hook

```bash
# Run test
node .claude-flow/hooks/research-autosave.js research/findings/test-research.md

# Check output
tail -10 .claude-flow/hooks/research-autosave.log

# Verify storage
ls -lh .swarm/research/architecture/
```

### 3. Create Research File

```bash
cat > research/findings/my-analysis.md << 'EOF'
---
type: architecture
author: my-name
date: 2025-10-20
---

# My Research Analysis

This is my research summary that will be automatically saved to memory.

## Key Findings

- Finding 1: Important discovery
- Finding 2: Critical insight
- Finding 3: Actionable recommendation

## Conclusions

- Conclusion 1: Main takeaway
- Conclusion 2: Next steps

## References

[Source 1](https://example.com)
EOF
```

### 4. Trigger Hook

```bash
# Edit file triggers hook automatically
echo "\n- Finding 4: New insight" >> research/findings/my-analysis.md

# Or run manually
node .claude-flow/hooks/research-autosave.js research/findings/my-analysis.md
```

### 5. Access Memory

```bash
# View latest architecture research
cat .swarm/research/architecture/latest.json | jq '.'

# Quick summary
cat .swarm/research/architecture/latest.json | jq -r '.summary'

# Statistics
cat .swarm/research/architecture/latest.json | jq '{
  category,
  confidence,
  keyPoints: .keyPoints | length,
  conclusions: .conclusions | length
}'
```

---

## 📊 Common Commands

### View All Research

```bash
# List all categories with entry counts
for cat in architecture security performance synthesis analysis design; do
  count=$(ls .swarm/research/$cat/*.json 2>/dev/null | grep -v latest | wc -l)
  echo "$cat: $count entries"
done
```

### Find High-Quality Research

```bash
# Find research with confidence > 0.8
find .swarm/research -name "*.json" -exec jq 'select(.confidence > 0.8) | {category, confidence, filePath}' {} \;
```

### Search Keywords

```bash
# Search for keyword in all research
grep -r "authentication" .swarm/research --include="*.json"

# Search in summaries only
find .swarm/research -name "latest.json" -exec jq -r 'select(.summary | contains("API")) | .filePath' {} \;
```

### Export Research

```bash
# Backup all research
tar -czf research-backup-$(date +%Y%m%d).tar.gz .swarm/research/

# Export as markdown
for cat in architecture security performance; do
  echo "# $cat Research"
  jq -r '.summary' ".swarm/research/$cat/latest.json" 2>/dev/null
  echo ""
done > research-export.md
```

---

## 🎯 Usage Patterns

### Pattern 1: Daily Research

```bash
# Morning: Review yesterday's research
for cat in architecture security performance synthesis analysis design; do
  echo "=== $cat ==="
  jq -r '.summary' ".swarm/research/$cat/latest.json" 2>/dev/null | head -3
done

# During work: Create research files as needed
vim research/findings/api-security-$(date +%Y%m%d).md
# (Hook auto-triggers on save)

# Evening: Export daily summary
jq -r '.keyPoints[]' .swarm/research/*/latest.json | head -20
```

### Pattern 2: Project Research

```bash
# Start: Initialize project research
mkdir -p research/findings/project-x/

# Research phase: Document findings
echo "# Project X Analysis" > research/findings/project-x/analysis.md
# (Add content, hook triggers)

# Review: Consolidate learnings
jq -s '[.[] | {category, keyPoints, conclusions}]' .swarm/research/*/latest.json > project-x-research.json
```

### Pattern 3: Team Collaboration

```bash
# Share research: Export to git
git add .swarm/research/
git commit -m "Research findings: $(date +%Y-%m-%d)"
git push

# Sync: Pull teammate research
git pull
cat .swarm/research/security/latest.json | jq -r '.conclusions[]'
```

---

## ⚠️ Troubleshooting

### Hook Not Running

```bash
# Check enabled
jq '.hooks["post-edit"]["research-autosave"].enabled' .claude-flow/claude-flow.config.json

# Test directly
node .claude-flow/hooks/research-autosave.js research/findings/test-research.md

# Check permissions
chmod +x .claude-flow/hooks/research-autosave.js
```

### No Output

```bash
# Check logs
tail -20 .claude-flow/hooks/research-autosave.log

# Debug mode
node --trace-warnings .claude-flow/hooks/research-autosave.js research/findings/test-research.md
```

### Storage Issues

```bash
# Verify directories
ls -la .swarm/research/

# Check disk space
df -h .

# Test write
echo '{}' > .swarm/research/test.json && rm .swarm/research/test.json
```

---

## 📈 Expected Results

### Good Research File (Confidence ≥ 0.8)

```markdown
---
type: architecture
author: backend-dev
date: 2025-10-20
tags: [api, security, performance]
---

# Comprehensive Analysis

Detailed summary paragraph with context.

## Key Findings

- Finding 1 with evidence
- Finding 2 with data
- Finding 3 with examples
- Finding 4 with rationale
- Finding 5 with implications

## Analysis Details

(2000+ words of detailed analysis)

## Conclusions

- Actionable conclusion 1
- Actionable conclusion 2
- Actionable conclusion 3

## References

[Reference 1](url1)
[Reference 2](url2)
[Reference 3](url3)
```

**Result:** Confidence = 1.00

### Basic Research File (Confidence ≥ 0.6)

```markdown
# Quick Analysis

Short summary.

## Findings

- Point 1
- Point 2
- Point 3

## Conclusion

Main takeaway.
```

**Result:** Confidence = 0.6-0.7

---

## 🎓 Next Steps

1. **Create your first research file**
2. **Test manual hook execution**
3. **Verify JSON storage**
4. **Access memory from agents**
5. **Set up automatic triggering**

---

## 📚 Full Documentation

- **Comprehensive Guide:** `docs/research-autosave-hook.md`
- **Testing Procedures:** `docs/HOOK-TESTING-GUIDE.md`
- **Implementation Details:** `docs/RESEARCH-HOOK-FINAL-SUMMARY.md`
- **Storage Documentation:** `.swarm/research/README.md`

---

**Status:** ✅ Ready to use
**Date:** 2025-10-20
