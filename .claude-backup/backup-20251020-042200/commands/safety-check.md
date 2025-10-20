# Safety Check Command

Verify Constitutional AI compliance before executing actions.

## Usage
```
/safety:check "<proposed_action>"
```

## Constitutional AI Principles [IMMUTABLE]

These safety constraints **CANNOT be modified** by any autonomous process:

### 1. Safety First
Never compromise physical safety of facility, personnel, or systems.

### 2. Data Integrity
Maintain audit trails for all system modifications. No data loss without explicit approval.

### 3. Human Oversight Required For:
- Physical system changes affecting operations
- Financial transactions or commitments
- External communications on behalf of organization
- Data deletion or irreversible operations
- Scope expansion beyond defined boundaries

### 4. Transparency
Provide clear explanations for all decisions. Document reasoning in audit logs.

### 5. Bounded Autonomy
Operate within defined scope. Escalate edge cases to human oversight.

### 6. Fail-Safe Operations
Default to safe states on uncertainty. Never assume; always verify.

### 7. Privacy Protection
Respect data privacy and security requirements. No PII exposure.

### 8. Continuous Evaluation
Track and report performance metrics. Monitor for safety degradation.

## Research Warning

**45% safety degradation** observed in self-evolving systems without constitutional constraints!

From Shanghai AI Lab research:
- Safety refusal rates: **99.4% → 54.4%** in autonomous evolution
- Without immutable principles: **Unacceptable risk for production**

## Implementation

### Step 1: Classify Action Type

```javascript
const action_type = classify({
  "read_operation": "low_risk",
  "write_file": "medium_risk",
  "execute_command": "medium_risk",
  "delete_data": "high_risk",
  "external_api": "high_risk",
  "financial": "critical_risk",
  "physical_system": "critical_risk"
});
```

### Step 2: Check Against Constitutional Principles

```bash
# Run safety validation
npx claude-flow@alpha hooks pre-task \
  --description "Safety check: {proposed_action}" \
  --validate-safety true
```

```javascript
// Safety validation logic
function validateSafety(action) {
  const violations = [];

  // Check each principle
  if (affects_physical_safety(action)) {
    violations.push("Principle 1: Safety First");
  }

  if (lacks_audit_trail(action)) {
    violations.push("Principle 2: Data Integrity");
  }

  if (requires_human_approval(action) && !has_approval(action)) {
    violations.push("Principle 3: Human Oversight");
  }

  // ... check all 8 principles

  return violations.length === 0 ? "SAFE" : violations;
}
```

### Step 3: Risk Assessment Matrix

| Risk Level | Examples | Required Action |
|------------|----------|----------------|
| **Low** | Read files, view data, search | Proceed automatically |
| **Medium** | Write files, run commands | Log with audit trail |
| **High** | Delete data, external API calls | Human review recommended |
| **Critical** | Financial, physical systems | Human approval REQUIRED |

### Step 4: Approval Workflow

For actions requiring human oversight:

```bash
# Pause execution
echo "⚠️  ACTION REQUIRES HUMAN APPROVAL"
echo ""
echo "Proposed Action: {action}"
echo "Risk Level: {risk_level}"
echo "Reason: {reason}"
echo ""
echo "Constitutional Principles Triggered:"
echo "  - {principle_1}"
echo "  - {principle_2}"
echo ""
echo "Approve? (y/n): "
```

### Step 5: Audit Logging

```bash
# Log all safety checks
npx claude-flow@alpha memory store \
  --key "safety/audit/{timestamp}" \
  --namespace security \
  --ttl 31536000 \
  --value '{
    "timestamp": "{timestamp}",
    "action": "{action}",
    "risk_level": "{risk}",
    "principles_checked": [...],
    "violations": [],
    "approved": true,
    "approved_by": "{user_id}"
  }'
```

## Circuit Breakers

Automatic termination triggers:

```javascript
const CIRCUIT_BREAKERS = {
  max_cost_per_day: 50, // USD
  max_api_calls_per_hour: 1000,
  max_task_duration: 1800, // 30 minutes in seconds
  max_file_deletions_per_hour: 10,
  max_external_api_calls_per_hour: 100
};

function checkCircuitBreakers() {
  if (daily_cost > CIRCUIT_BREAKERS.max_cost_per_day) {
    triggerShutdown("Cost limit exceeded");
  }
  // ... check all breakers
}
```

## Fail-Safe Defaults

On uncertainty or error:

```javascript
function handleUncertainty(action) {
  // Default to SAFE state
  return {
    execute: false,
    reason: "Uncertainty detected - defaulting to safe state",
    required_action: "Human review required",
    escalation: true
  };
}
```

## Example Checks

### Safe Action
```
/safety:check "Read project configuration file"

✅ SAFE
- Risk Level: Low
- Principles: All compliant
- Proceed automatically
```

### Medium Risk Action
```
/safety:check "Write unit test file"

⚠️  MEDIUM RISK
- Risk Level: Medium
- Audit trail: Enabled
- Git commit required: Yes
- Proceed with logging
```

### Critical Risk Action
```
/safety:check "Delete production database"

🛑 CRITICAL RISK - HUMAN APPROVAL REQUIRED
- Risk Level: Critical
- Violations:
  ✗ Principle 1: Safety First (data loss)
  ✗ Principle 2: Data Integrity (irreversible)
  ✗ Principle 3: Human Oversight (required)
- Action: BLOCKED pending approval
- Escalation: Required
```

## Integration

Use before ANY potentially risky action:

```bash
# Before file operations
/safety:check "Delete temporary files in /tmp/"

# Before external calls
/safety:check "Call external payment API"

# Before system changes
/safety:check "Modify production configuration"
```

## Monitoring Dashboard

Track safety metrics:

```javascript
{
  "safety_score": 99.8, // Target: > 99%
  "policy_violations": 0, // Target: 0
  "human_overrides": 3, // Track frequency
  "circuit_breaker_triggers": 1, // Investigate each
  "risk_distribution": {
    "low": 847,
    "medium": 123,
    "high": 12,
    "critical": 2
  }
}
```

## Benefits

- **Zero safety violations** in production (target)
- **Transparent decision-making** with audit trails
- **Fail-safe by default** prevents accidents
- **Measurable safety metrics** for continuous monitoring
- **45% degradation prevented** vs autonomous evolution

## Remember

**These principles are IMMUTABLE.** Any attempt to modify them autonomously is itself a safety violation and will trigger immediate escalation to human oversight.

Safety is not optional. It's the foundation of all autonomous operation.
