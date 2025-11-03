# Security Policy

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| < 1.0   | :x:                |

**Note**: This project is currently in active development. The `main` branch receives all security updates.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

**[INSERT SECURITY EMAIL]**

You should receive a response within 48 hours. If for some reason you do not, please follow up to ensure we received your original message.

### What to Include

Please include the following information in your report:

- **Type of vulnerability** (e.g., command injection, path traversal, XSS, etc.)
- **Full paths of affected source file(s)**
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue**, including how an attacker might exploit it

This information will help us triage your report more quickly.

## Security Update Process

### Timeline

- **Acknowledgment**: Within 48 hours of report
- **Initial Assessment**: Within 5 business days
- **Fix Development**: Depends on severity and complexity
- **Public Disclosure**: After fix is deployed or 90 days from report (whichever comes first)

### Severity Levels

We use the following severity classifications:

**Critical**: Vulnerabilities that can be exploited remotely without authentication
- Timeline: Fix within 7 days
- Examples: Remote code execution, arbitrary file write

**High**: Vulnerabilities requiring some user interaction or local access
- Timeline: Fix within 30 days
- Examples: Command injection, path traversal, privilege escalation

**Medium**: Vulnerabilities with limited impact or requiring specific conditions
- Timeline: Fix within 60 days
- Examples: Information disclosure, denial of service

**Low**: Minimal impact vulnerabilities
- Timeline: Fix in next regular release
- Examples: Minor information leaks, configuration issues

## Security Best Practices

### For Contributors

When contributing to this project, please:

1. **Never commit secrets**: No API keys, tokens, passwords, or credentials
2. **Validate all inputs**: Especially in shell scripts and user-facing commands
3. **Use absolute paths carefully**: Avoid exposing user directory structures
4. **Follow path standards**: See `.claude/rules/path-standards.md`
5. **Review GitHub operations**: See `.claude/rules/github-operations.md`
6. **Use safe shell practices**:
   ```bash
   set -euo pipefail  # Exit on error, undefined vars
   # Quote all variables
   echo "${variable}"
   # Validate user input
   [[ "${input}" =~ ^[a-zA-Z0-9_-]+$ ]] || exit 1
   ```

### For Users

When using this framework:

1. **Review scripts before execution**: Understand what helper scripts do
2. **Don't share credentials**: Keep API keys and tokens secure
3. **Use environment variables**: For sensitive configuration
4. **Keep dependencies updated**: Especially MCP servers
5. **Review GitHub permissions**: Before syncing with repositories

## Known Security Considerations

### Shell Script Execution

This framework executes shell scripts with user-provided input. Users should:
- Review all scripts before running
- Understand the SPARC methodology and command structure
- Only use trusted slash commands
- Validate repository URLs before GitHub operations

### MCP Server Integration

This framework integrates with external MCP servers:
- **claude-flow**: Official, maintained by ruvnet
- **ruv-swarm**: Optional, maintained by ruvnet
- **flow-nexus**: Optional, requires authentication

Verify MCP server sources before installation.

### GitHub Integration

The framework can create and modify GitHub issues/PRs:
- Always validates repository origin (see `.claude/rules/github-operations.md`)
- Prevents accidental operations on template repository
- Users should verify `git remote get-url origin` before syncing

### Path Privacy

The framework includes protections against exposing user paths:
- Automatically normalizes paths in documentation
- Prevents absolute paths with usernames in GitHub syncs
- See `.claude/rules/path-standards.md` for details

## Security Updates

We will publish security advisories through:
- GitHub Security Advisories
- Release notes with `[SECURITY]` prefix
- Email notification to reported vulnerabilities

## Third-Party Dependencies

This framework depends on:
- **Claude Code CLI**: Official Anthropic tool
- **Git**: Standard version control
- **Bash**: Shell scripting environment
- **MCP Servers** (optional): claude-flow, ruv-swarm, flow-nexus

Users are responsible for keeping these dependencies updated.

## Disclosure Policy

We follow coordinated disclosure:
1. **Private reporting**: Report received and acknowledged
2. **Fix development**: Working with reporter to develop fix
3. **Fix deployment**: Update released to users
4. **Public disclosure**: Advisory published after 90 days or when fix is deployed

We appreciate security researchers who:
- Allow reasonable time for fixes
- Do not publicly disclose until fix is available
- Do not exploit vulnerabilities maliciously

## Contact

For security concerns:
- **Email**: [INSERT SECURITY EMAIL]
- **PGP Key**: [INSERT PGP KEY IF AVAILABLE]

For general questions:
- **GitHub Issues**: For non-security bugs
- **GitHub Discussions**: For questions and ideas

Thank you for helping keep this project secure!
