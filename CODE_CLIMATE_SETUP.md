# Code Climate Integration Setup

This project is configured to work with Code Climate for code quality analysis and test coverage reporting.

## Setup Instructions

### 1. Code Climate Account Setup
1. Go to [Code Climate](https://codeclimate.com/) and sign up/log in
2. Add your GitHub repository to Code Climate
3. Go to your repository settings in Code Climate
4. Navigate to "Repo Settings" > "Test Coverage"
5. Copy the Test Reporter ID

### 2. GitHub Secrets Configuration
Add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add these repository secrets:

   - `CC_TEST_REPORTER_ID`: Your Code Climate Test Reporter ID
   - `CODECOV_TOKEN`: (Optional) Your Codecov token if you want dual coverage reporting

### 3. Code Climate Configuration
The `.codeclimate.yml` file in the repository root configures:
- ESLint integration for code quality checks
- Code duplication detection
- Complexity analysis
- Exclude patterns for test files and build artifacts

### 4. Coverage Reports
- Coverage reports are generated using Vitest with v8 provider
- Reports are sent to Code Climate automatically on main branch commits
- Coverage includes all TypeScript files in the `src/` directory
- Test files are excluded from coverage analysis

### 5. Local Development
To run coverage locally:
```bash
npm test -- --run --coverage
```

This will generate coverage reports in the `coverage/` directory.

## Code Quality Metrics
Code Climate will analyze:
- Code complexity
- Duplication
- ESLint violations
- Test coverage
- Maintainability score

## Badge Integration
After setup, you can add Code Climate badges to your README:

```markdown
[![Maintainability](https://api.codeclimate.com/v1/badges/YOUR_REPO_ID/maintainability)](https://codeclimate.com/github/YOUR_USERNAME/YOUR_REPO/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/YOUR_REPO_ID/test_coverage)](https://codeclimate.com/github/YOUR_USERNAME/YOUR_REPO/test_coverage)
```

Replace `YOUR_REPO_ID`, `YOUR_USERNAME`, and `YOUR_REPO` with your actual values.
