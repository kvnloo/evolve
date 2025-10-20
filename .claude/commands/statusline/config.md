# Configure Statusline

Configure statusline behavior, appearance, and data sources.

## Configuration File

Location: `.claude/statusline/config.json`

```json
{
  "autoRefreshInterval": 5000,
  "enableAutoRefresh": true,
  "showScrollIndicators": true,
  "maxInstancesPerWorkspace": 10,
  "dataSources": {
    "claudeFlow": true,
    "superClaude": true,
    "ccpm": true,
    "git": true
  },
  "workspaceNames": {
    "0": "Overview",
    "1": "Auth System",
    "2": "Dashboard",
    "3": "API",
    "4": "Database",
    "5": "Testing",
    "6": "DevOps",
    "7": "Documentation",
    "8": "Research",
    "9": "Misc"
  },
  "display": {
    "format": "[WS:{workspace}] {icon} {name} ({progress}%) {status} │ ◀ {current}/{total} ▶",
    "icons": {
      "backend": "🎯",
      "frontend": "🎨",
      "database": "🗄️",
      "testing": "🧪",
      "docs": "📝",
      "devops": "🔧",
      "security": "🔒",
      "api": "🌐"
    },
    "statusIndicators": {
      "running": "▶️",
      "waiting": "⏸️",
      "completed": "✅",
      "error": "❌",
      "idle": "○"
    }
  }
}
```

## Usage

```bash
# Initialize config with defaults
/statusline/config init

# Update specific setting
/statusline/config set autoRefreshInterval 3000

# Get current config
/statusline/config get

# Reset to defaults
/statusline/config reset
```

## Implementation

```bash
#!/bin/bash

ACTION="${1:-get}"
KEY="$2"
VALUE="$3"

CONFIG_FILE=".claude/statusline/config.json"
mkdir -p "$(dirname $CONFIG_FILE)"

case $ACTION in
  init)
    if [ -f "$CONFIG_FILE" ]; then
      echo "⚠️  Config already exists. Use 'reset' to overwrite."
      exit 0
    fi

    cat > "$CONFIG_FILE" <<'EOF'
{
  "autoRefreshInterval": 5000,
  "enableAutoRefresh": true,
  "showScrollIndicators": true,
  "maxInstancesPerWorkspace": 10,
  "dataSources": {
    "claudeFlow": true,
    "superClaude": true,
    "ccpm": true,
    "git": true
  },
  "workspaceNames": {
    "0": "Overview",
    "1": "Workspace 1",
    "2": "Workspace 2",
    "3": "Workspace 3",
    "4": "Workspace 4",
    "5": "Workspace 5",
    "6": "Workspace 6",
    "7": "Workspace 7",
    "8": "Workspace 8",
    "9": "Workspace 9"
  },
  "display": {
    "format": "[WS:{workspace}] {icon} {name} ({progress}%) {status} │ ◀ {current}/{total} ▶",
    "icons": {
      "backend": "🎯",
      "frontend": "🎨",
      "database": "🗄️",
      "testing": "🧪",
      "docs": "📝",
      "devops": "🔧",
      "security": "🔒",
      "api": "🌐"
    },
    "statusIndicators": {
      "running": "▶️",
      "waiting": "⏸️",
      "completed": "✅",
      "error": "❌",
      "idle": "○"
    }
  }
}
EOF
    echo "✅ Config initialized at $CONFIG_FILE"
    ;;

  get)
    if [ ! -f "$CONFIG_FILE" ]; then
      echo "❌ Config not found. Run: /statusline/config init"
      exit 1
    fi

    if [ -n "$KEY" ]; then
      jq -r ".$KEY" "$CONFIG_FILE"
    else
      cat "$CONFIG_FILE"
    fi
    ;;

  set)
    if [ ! -f "$CONFIG_FILE" ]; then
      echo "❌ Config not found. Run: /statusline/config init"
      exit 1
    fi

    if [ -z "$KEY" ] || [ -z "$VALUE" ]; then
      echo "Usage: /statusline/config set <key> <value>"
      exit 1
    fi

    # Update config
    jq --arg key "$KEY" --arg val "$VALUE" '.[$key] = $val' "$CONFIG_FILE" > "${CONFIG_FILE}.tmp"
    mv "${CONFIG_FILE}.tmp" "$CONFIG_FILE"
    echo "✅ Updated $KEY = $VALUE"
    ;;

  reset)
    rm -f "$CONFIG_FILE"
    $0 init
    echo "✅ Config reset to defaults"
    ;;

  *)
    echo "Usage: /statusline/config {init|get|set|reset}"
    exit 1
    ;;
esac
```
