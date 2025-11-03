# Analytics Page - User Guide

## Quick Start

Access the analytics dashboard at `/analytics` to view your Flow session history and performance metrics.

## Features Overview

### 📊 Dashboard Sections

1. **Overall Metrics** - Aggregate statistics across all sessions
2. **Week Comparison** - Current week vs last week performance
3. **Flow Score History** - Visual chart of recent sessions
4. **Session History Table** - Detailed list of all sessions

## Using Filters

### Opening Filters
Click the "Filters" button in the Session History section header.

### Available Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| **Start Date** | Only show sessions from this date onward | `2024-01-01` |
| **End Date** | Only show sessions up to this date | `2024-12-31` |
| **Min Duration** | Sessions lasting at least X minutes | `30` |
| **Min Flow Score** | Sessions scoring at least X | `60` |
| **Max Flow Score** | Sessions scoring at most X | `90` |

### Applying Filters
1. Enter filter values in the filter panel
2. Results update automatically as you type
3. Click "Reset Filters" to clear all filters

## Exporting Data

### CSV Export
**Best for**: Spreadsheet analysis, data manipulation
**Contains**: Session metadata, scores, timestamps
**Format**: Comma-separated values

Click the "CSV" button to download sessions as CSV file.

### JSON Export
**Best for**: Backup, data migration, programmatic access
**Contains**: Complete session data including metrics and events
**Format**: Structured JSON with metadata

Click the "JSON" button to download comprehensive JSON export.

### Export Filename Format
- CSV: `flow-sessions-YYYY-MM-DD.csv`
- JSON: `flow-data-YYYY-MM-DD.json`

## Understanding Metrics

### Session Statistics

| Metric | Description | Good Range |
|--------|-------------|------------|
| **Avg Flow Score** | Average flow state across session | 60-100 |
| **Peak Flow** | Highest flow score achieved | 80-100 |
| **Duration** | Total active session time | 25-90 min |
| **Interruptions** | Number of context switches | 0-3 |

### Week Comparison

Shows percentage change from last week:
- 🟢 Green arrow up = Improvement
- 🔴 Red arrow down = Decline
- Percentage shows magnitude of change

### Flow Score Color Coding

| Score | Color | Meaning |
|-------|-------|---------|
| 70-100 | 🟢 Green | Deep flow state |
| 40-69 | 🟡 Yellow | Focused work |
| 0-39 | 🔴 Red | Distracted |

## Managing Sessions

### Deleting Sessions

**Safety Feature**: Double-click required
1. Click trash icon once → Button turns red
2. Click again within 3 seconds → Session deleted
3. Wait 3 seconds → Confirmation expires, try again

**Note**: Deletion is permanent and cannot be undone.

### Viewing Session Details

Currently shows in table:
- Date and time of session
- Session duration
- Average and peak flow scores
- Number of interruptions
- Session tags (if any)

## Pagination

- Shows 10 sessions per page
- Use arrow buttons to navigate
- Current page shown at bottom
- Total sessions and range displayed

## Chart Interaction

The Flow Score History chart (powered by SessionChart component) includes:

### Controls
- **Zoom In/Out**: Focus on specific time periods
- **Reset Zoom**: Return to full view
- **Export Chart**: Download as PNG image
- **Toggle Series**: Click legend items to show/hide

### Reading the Chart
- **X-axis**: Time (HH:MM:SS format)
- **Y-axis**: Score (0-100 scale)
- **Lines**: Different metrics (Flow, Attention, Relaxation, Cognitive Load)
- **Hover**: See exact values at any point

## Tips for Best Use

### Regular Review
- Check analytics weekly to track progress
- Look for patterns in flow scores
- Identify optimal session times
- Review interruption frequency

### Setting Goals
- Use peak scores as benchmarks
- Track improvement over weeks
- Aim to reduce interruptions
- Increase average session duration

### Data Export
- Export monthly for records
- Use CSV for Excel analysis
- Use JSON for complete backup
- Compare exports over time

### Filtering Strategies

**Find your best sessions**:
- Min Flow Score: 80
- Sort by date to see recent wins

**Analyze recent performance**:
- Start Date: 7 days ago
- End Date: Today

**Deep work sessions only**:
- Min Duration: 45 minutes
- Min Flow Score: 70

## Troubleshooting

### No sessions showing
- Check if filters are too restrictive
- Click "Reset Filters"
- Verify sessions exist in database

### Export not working
- Check browser download permissions
- Ensure sessions are loaded
- Try different export format

### Chart not displaying
- Ensure at least one session exists
- Check that sessions have flow scores
- Refresh the page

### Delete not working
- Click trash icon twice quickly
- Confirmation expires after 3 seconds
- Check for error messages

## Privacy & Data

- **Local Storage**: All data stored in IndexedDB
- **No Cloud Sync**: Data stays on your device
- **Export Control**: You control all exports
- **Deletion**: Permanent removal from database

## Keyboard Shortcuts

Currently no keyboard shortcuts implemented.
Consider adding:
- `E` - Export
- `F` - Toggle filters
- `→` - Next page
- `←` - Previous page
- `Del` - Delete selected session

## Mobile Usage

The analytics page is responsive:
- Cards stack vertically on mobile
- Table scrolls horizontally
- Filters take full width
- Chart adapts to screen size

## Accessibility

- Color-blind friendly indicators
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatible

## Related Pages

- `/session` - Active session monitoring
- `/` - Home dashboard
- `/settings` - Configure preferences

## Support

For issues or feature requests, check:
- Project documentation
- GitHub issues
- Implementation notes in codebase
