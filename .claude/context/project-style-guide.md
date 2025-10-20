---
created: 2025-10-20T09:14:50Z
last_updated: 2025-10-20T09:14:50Z
version: 1.0
author: Claude Code PM System
---

# Project Style Guide

## Overview

This style guide defines coding standards, conventions, and best practices for the Evolve project. These standards ensure consistency, maintainability, and quality across all code contributions.

## General Principles

### From CLAUDE.md Configuration

1. **Concurrent Execution First** - All related operations in single messages
2. **No Root Pollution** - Never save working files to root folder
3. **Organized Structure** - Use appropriate subdirectories for all files
4. **Batch Operations** - Group related operations together
5. **Clean Architecture** - Clear separation of concerns
6. **Modular Design** - Files under 500 lines
7. **Environment Safety** - Never hardcode secrets

## File Organization

### Directory Structure

**Mandatory Directories**:
- `/src` - Source code files
- `/tests` - Test files
- `/docs` - Documentation and markdown files
- `/config` - Configuration files
- `/scripts` - Utility scripts
- `/examples` - Example code

**Configuration Directories**:
- `.claude/` - Claude Code configuration
- `.claude/commands/` - Custom slash commands
- `.claude/rules/` - Project rules
- `.claude/context/` - Context documentation
- `.claude/prds/` - Product requirement documents
- `.claude/epics/` - Epic decompositions (gitignored)

### File Naming Conventions

**General Rules**:
- Use lowercase with hyphens for multi-word filenames
- Be descriptive and specific
- Include category or type in name when appropriate

**Examples**:
```
✅ Good:
- user-authentication.ts
- database-connection.ts
- api-rate-limiter.ts
- test-user-service.ts

❌ Bad:
- UserAuth.ts (wrong case)
- db.ts (too vague)
- stuff.ts (non-descriptive)
- TEST_USER.ts (wrong case)
```

**Configuration Files**:
- Use `.example` suffix for template files
- JSON for structured config (`.json`)
- Markdown for documentation-style config (`.md`)
- YAML for hierarchical config (`.yml`)

### Module Organization

**Feature-Based Organization**:
```
src/
  feature-name/
    index.ts           # Public API
    feature-name.ts    # Core implementation
    feature-name.test.ts  # Tests
    types.ts           # Type definitions
    utils.ts           # Feature-specific utilities
```

**Layer-Based Organization**:
```
src/
  api/              # API layer
  domain/           # Business logic
  infrastructure/   # External integrations
  utils/            # Shared utilities
```

## Code Style

### Language-Specific Conventions

**TypeScript/JavaScript**:
- Use TypeScript for all new code
- camelCase for variables and functions
- PascalCase for classes and types
- UPPER_SNAKE_CASE for constants
- 2-space indentation
- Semicolons required
- Single quotes for strings

**Python**:
- snake_case for variables and functions
- PascalCase for classes
- UPPER_SNAKE_CASE for constants
- 4-space indentation
- Type hints required
- Follow PEP 8

**Shell Scripts**:
- snake_case for variables
- UPPER_SNAKE_CASE for environment variables
- Function names lowercase with underscores
- 2-space indentation
- Always quote variables

### Naming Conventions

**Variables**:
```typescript
// Good
const userCount = 10;
const isAuthenticated = true;
const authenticationToken = "...";

// Bad
const n = 10;                    // Too short
const authenticated = true;      // Ambiguous
const token = "...";            // Too vague
```

**Functions**:
```typescript
// Good
function calculateUserScore(user: User): number { }
function validateEmailAddress(email: string): boolean { }
async function fetchUserData(userId: string): Promise<User> { }

// Bad
function calc(u: any): number { }           // Unclear
function validate(email: string): boolean { } // Too vague
function getUserData(id: string) { }        // Missing async/return type
```

**Classes**:
```typescript
// Good
class UserAuthenticationService { }
class DatabaseConnectionPool { }
class RateLimiter { }

// Bad
class UserAuth { }       // Too abbreviated
class DB { }             // Too short
class Limiter { }        // Unclear what it limits
```

**Types/Interfaces**:
```typescript
// Good
interface UserProfile { }
type AuthenticationResult = { }
enum UserRole { }

// Bad
interface User { }           // Too generic for interface
type Result = { }           // Too vague
enum Role { }               // Missing context
```

### Code Structure

**File Length**:
- Maximum 500 lines per file
- Split into multiple files if exceeded
- Organize by feature or layer

**Function Length**:
- Aim for < 50 lines per function
- Single responsibility
- Clear, descriptive name

**Complexity**:
- Cyclomatic complexity < 10
- Nesting depth < 4 levels
- Refactor if exceeded

### Comments & Documentation

**When to Comment**:
```typescript
// Good: Explain WHY, not WHAT
// Using binary search because dataset is sorted and large
function findUser(id: string): User | null {
  // Implementation...
}

// Good: Document complex algorithm
/**
 * Implements Raft consensus algorithm for distributed coordination.
 * See: https://raft.github.io/
 */

// Bad: Obvious comments
// Set the user name
user.name = "John";

// Bad: Commented-out code
// const oldImplementation = () => { ... }
```

**Documentation Standards**:
- JSDoc/TSDoc for public APIs
- Explain parameters, return values, exceptions
- Include examples for complex functions
- Document architectural decisions

```typescript
/**
 * Authenticates user with credentials and returns session token.
 *
 * @param email - User's email address
 * @param password - User's password (will be hashed)
 * @returns Session token if authentication succeeds
 * @throws AuthenticationError if credentials invalid
 *
 * @example
 * ```typescript
 * const token = await authenticateUser("user@example.com", "password123");
 * ```
 */
async function authenticateUser(
  email: string,
  password: string
): Promise<string> {
  // Implementation...
}
```

## Testing Standards

### Test Organization

**Test File Location**:
- Co-located with source: `feature.test.ts` next to `feature.ts`
- Or dedicated test directory mirroring source structure

**Test Structure**:
```typescript
describe('UserAuthenticationService', () => {
  describe('authenticateUser', () => {
    it('should return session token for valid credentials', async () => {
      // Arrange
      const email = "user@example.com";
      const password = "password123";

      // Act
      const token = await authenticateUser(email, password);

      // Assert
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should throw error for invalid credentials', async () => {
      // Arrange, Act, Assert
      await expect(
        authenticateUser("user@example.com", "wrong")
      ).rejects.toThrow(AuthenticationError);
    });
  });
});
```

### Test Naming

**Pattern**: `should [expected behavior] when [condition]`

```typescript
// Good
it('should return user when ID exists')
it('should throw error when ID not found')
it('should cache result after first fetch')

// Bad
it('works')
it('test user function')
it('returns something')
```

### Test Coverage

- **Minimum**: 80% code coverage
- **Target**: 90%+ code coverage
- **Focus**: Critical paths, edge cases, error conditions
- **Exclude**: Generated code, type definitions, constants

## SPARC Methodology Integration

### Specification Phase
- Write requirements before code
- Define acceptance criteria
- Identify edge cases
- Document assumptions

### Pseudocode Phase
- Algorithm design before implementation
- Plain language or pseudocode
- Focus on logic, not syntax
- Review before coding

### Architecture Phase
- Design structure before building
- Identify components and boundaries
- Define interfaces and contracts
- Consider scalability and maintainability

### Refinement Phase (TDD)
1. Write failing test
2. Implement minimum code to pass
3. Refactor for quality
4. Repeat

### Completion Phase
- Integration testing
- Documentation updates
- Code review
- Deployment preparation

## Git Practices

### Commit Messages

**Format**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Formatting changes
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance

**Examples**:
```
feat(auth): Add JWT authentication

Implements JWT-based authentication with refresh tokens.
Includes middleware for protected routes.

Closes #123

fix(api): Handle rate limit errors gracefully

Previously would crash on 429 responses.
Now implements exponential backoff retry.

test(user): Add edge case tests for user creation
```

### Branch Naming

**Pattern**: `<type>/<description>`

**Examples**:
```
feature/user-authentication
fix/rate-limiter-crash
refactor/database-layer
docs/api-documentation
```

### Pull Request Guidelines

1. **One PR per feature/fix**
2. **Include tests**
3. **Update documentation**
4. **Link related issues**
5. **Request review from relevant agents**
6. **Address review comments**

## Error Handling

### Error Types

**Custom Errors**:
```typescript
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### Error Handling Patterns

**Try-Catch**:
```typescript
// Good: Specific error handling
try {
  await riskyOperation();
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Handle authentication failure
  } else if (error instanceof NetworkError) {
    // Handle network issues
  } else {
    // Handle unexpected errors
    logger.error('Unexpected error:', error);
    throw error;
  }
}

// Bad: Silent failure
try {
  await riskyOperation();
} catch (error) {
  // Nothing
}
```

**Result Pattern**:
```typescript
type Result<T, E> =
  | { success: true; value: T }
  | { success: false; error: E };

function parseUser(data: unknown): Result<User, ValidationError> {
  // Implementation...
}
```

## Performance Considerations

### Optimization Guidelines

1. **Measure First** - Profile before optimizing
2. **Avoid Premature Optimization** - Clarity first, optimize later
3. **Use Appropriate Data Structures** - Choose based on access patterns
4. **Cache When Beneficial** - But avoid stale data issues
5. **Batch Operations** - Reduce network/IO calls

### Async/Await Best Practices

```typescript
// Good: Parallel execution
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

// Bad: Sequential when unnecessary
const users = await fetchUsers();
const posts = await fetchPosts();
const comments = await fetchComments();
```

## Security Standards

### Never Hardcode Secrets

```typescript
// Bad
const apiKey = "sk_live_abc123...";
const dbPassword = "my_password";

// Good
const apiKey = process.env.API_KEY;
const dbPassword = process.env.DB_PASSWORD;
```

### Input Validation

```typescript
// Good: Validate all inputs
function createUser(email: string, password: string): User {
  if (!isValidEmail(email)) {
    throw new ValidationError('email', 'Invalid email format');
  }

  if (password.length < 8) {
    throw new ValidationError('password', 'Password too short');
  }

  // Implementation...
}
```

### SQL Injection Prevention

```typescript
// Bad: String concatenation
const query = `SELECT * FROM users WHERE email = '${email}'`;

// Good: Parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
const users = await db.query(query, [email]);
```

## Code Review Checklist

Before submitting code for review:

- [ ] SPARC methodology followed
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Error handling implemented
- [ ] Performance considered
- [ ] Security reviewed
- [ ] Commits follow convention
- [ ] PR description complete
- [ ] Related issues linked

## Style Enforcement

### Automated Tools

**Linting**: ESLint, Pylint, clippy, golangci-lint
**Formatting**: Prettier, black, rustfmt, gofmt
**Type Checking**: TypeScript, mypy
**Testing**: Jest, pytest, cargo test, go test

**Pre-commit Hooks**:
- Format code automatically
- Run linters
- Execute tests
- Validate commit messages

This style guide ensures consistency and quality across the Evolve project, enabling efficient collaboration between human developers and AI agents.
