#!/bin/bash

# Code Climate Test Reporter Setup Script
# This script helps set up Code Climate test reporter for local testing

echo "🔧 Setting up Code Climate Test Reporter..."

# Download the test reporter
if [ ! -f "./cc-test-reporter" ]; then
    echo "📥 Downloading Code Climate test reporter..."
    curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
    chmod +x ./cc-test-reporter
    echo "✅ Test reporter downloaded successfully"
else
    echo "✅ Test reporter already exists"
fi

# Check if QLTY_COVERAGE_TOKEN is set
if [ -z "$QLTY_COVERAGE_TOKEN" ]; then
    echo "⚠️  QLTY_COVERAGE_TOKEN environment variable is not set"
    echo "   Please set it with your Code Climate Coverage Token:"
    echo "   export QLTY_COVERAGE_TOKEN=your_coverage_token"
    echo ""
    echo "   You can find your Coverage Token in Code Climate:"
    echo "   Repository Settings > Test Coverage > QLTY Coverage Token"
    exit 1
fi

echo "🧪 Running tests with coverage..."
npm run test:coverage

echo "📊 Sending coverage to Code Climate..."
export CC_TEST_REPORTER_ID="$QLTY_COVERAGE_TOKEN"
./cc-test-reporter after-build --coverage-input-type lcov

echo "✅ Coverage report sent to Code Climate successfully!"

# Cleanup
echo "🧹 Cleaning up..."
rm -f ./cc-test-reporter

echo "🎉 Done!"
