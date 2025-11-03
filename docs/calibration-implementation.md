# Calibration Page Implementation

## Overview
Implemented a comprehensive 3-step calibration wizard for the Flow application that guides users through device connection and baseline/active EEG recording sessions.

## Created Files

### Main Page
- `/repos/flow/src/app/calibration/page.tsx` - Calibration page route with IndexedDB integration

### Core Components
- `/repos/flow/src/components/calibration/CalibrationWizard.tsx` - Main wizard orchestrator
- `/repos/flow/src/components/calibration/ProgressBar.tsx` - Step progress indicator

### Step Components
- `/repos/flow/src/components/calibration/steps/DeviceConnectionStep.tsx` - Step 1: Muse device connection
- `/repos/flow/src/components/calibration/steps/BaselineRecordingStep.tsx` - Step 2: 2-minute baseline recording
- `/repos/flow/src/components/calibration/steps/ActiveRecordingStep.tsx` - Step 3: 2-minute active task recording

### Visualization Components
- `/repos/flow/src/components/calibration/SignalQualityIndicator.tsx` - Per-channel signal quality display
- `/repos/flow/src/components/calibration/RecordingTimer.tsx` - Recording countdown with progress circle
- `/repos/flow/src/components/calibration/EEGVisualization.tsx` - Live EEG frequency band visualization

## Features Implemented

### ✅ Step-by-Step Wizard (3 Steps)
1. **Device Connection**
   - Uses `useMuseConnection` hook
   - Real-time connection state display
   - Signal quality indicators per channel (TP9, AF7, AF8, TP10)
   - Battery level monitoring
   - Error handling with retry option
   - Connection tips and instructions

2. **Baseline Recording (2 minutes)**
   - Eyes-closed resting state recording
   - Live EEG visualization during recording
   - Countdown timer with circular progress
   - Real-time frequency band analysis
   - Sample collection and metrics calculation

3. **Active Recording (2 minutes)**
   - Focused task recording
   - Same visualization as baseline
   - Task suggestions for optimal calibration
   - Metrics comparison with baseline

### ✅ Progress Tracking
- Overall progress bar showing step X of 4
- Percentage completion indicator
- Visual step transitions

### ✅ Live EEG Signal Quality
- Per-channel quality indicators (0-4 scale)
- Color-coded quality levels:
  - Green: Excellent (3-4)
  - Yellow: Good (2-3)
  - Orange: Fair (1-2)
  - Red: Poor (0-1)
- Quality bars for TP9, AF7, AF8, TP10

### ✅ Visual Feedback
- Frequency band visualization (Alpha, Beta, Theta, Gamma)
- Stacked bar charts showing relative band power
- Live stream statistics:
  - Sample rate (Hz)
  - Latency (ms)
  - Buffer size
  - Dropped samples
- Signal quality percentage

### ✅ IndexedDB Storage
- Saves calibration data via `sessionDB.createCalibration()`
- Stores:
  - Baseline metrics (focus, energy, stress)
  - Active recording data
  - Calculated thresholds
  - Environmental factors
  - Timestamp and session ID

### ✅ Navigation
- Automatic redirect to `/session` on completion
- "Skip calibration" option (uses defaults)
- Smooth step transitions

## User Flow

1. **Start**: User lands on `/calibration`
2. **Connection**: Connect Muse headband via Bluetooth
   - Shows connection status
   - Displays signal quality
   - Auto-proceeds when streaming
3. **Baseline**: Record 2-minute resting state
   - User relaxes with eyes closed
   - Live visualization of EEG
   - Metrics calculated automatically
4. **Active**: Record 2-minute focused task
   - User performs challenging task
   - Same live feedback
   - Peak performance captured
5. **Complete**: Success message + redirect
   - Data saved to IndexedDB
   - Personalized thresholds calculated
   - Redirect to `/session` page

## Data Flow

```
Device Connection
  ↓
useMuseConnection → ConnectionState
  ↓
EEG Stream
  ↓
useEEGStream → ProcessedEEG
  ↓
Recording Steps → Collected Samples
  ↓
Calculate Metrics → Baseline/Active Data
  ↓
Calculate Thresholds
  ↓
sessionDB.createCalibration()
  ↓
Redirect to /session
```

## Threshold Calculation

Personalized thresholds are calculated from baseline and active recordings:

- **Focus Threshold**: baseline × 1.2
- **Energy Threshold**: baseline × 1.1
- **Stress Threshold**: baseline × 0.8

These serve as personalized baselines for flow state detection.

## Visual Design

- Dark theme (gray-950 background)
- Blue accent color for primary actions
- Status indicators:
  - Green: Success/Connected
  - Yellow: Warning/In Progress
  - Red: Error
  - Blue: Active/Processing
- Smooth transitions and animations
- Responsive layout (max-width 4xl)

## Technical Details

### Dependencies
- `useMuseConnection` - Bluetooth connection management
- `useEEGStream` - Real-time EEG data processing
- `sessionDB` - IndexedDB storage wrapper
- `next/navigation` - Next.js routing

### Key Hooks
- `useState` - Component state management
- `useEffect` - Side effects and timers
- `useCallback` - Memoized callbacks
- `useRef` - Mutable references

### Data Types
- `EEGSample` - Raw EEG readings
- `ProcessedEEG` - Frequency band analysis
- `CalibrationData` - Stored calibration results

## Next Steps

Users who complete calibration will have personalized flow detection thresholds stored locally. The `/session` page will use these thresholds for real-time flow state monitoring.

Users who skip calibration will use default thresholds (0.5 baseline values).

## Notes

- All data stored locally in IndexedDB (privacy-first)
- No cloud sync or external storage
- Calibration can be re-run at any time
- Recommended to re-calibrate if conditions change significantly (different environment, time of day, mental state)
