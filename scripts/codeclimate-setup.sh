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

# Check if CC_TEST_REPORTER_ID is set
if [ -z "$CC_TEST_REPORTER_ID" ]; then
    echo "⚠️  CC_TEST_REPORTER_ID environment variable is not set"
    echo "   Please set it with your Code Climate Test Reporter ID:"
    echo "   export CC_TEST_REPORTER_ID=your_test_reporter_id"
    echo ""
    echo "   You can find your Test Reporter ID in Code Climate:"
    echo "   Repository Settings > Test Coverage > Test Reporter ID"
    exit 1
fi

echo "🧪 Running tests with coverage..."
npm run test:coverage

echo "📊 Sending coverage to Code Climate..."
./cc-test-reporter after-build --coverage-input-type lcov

echo "✅ Coverage report sent to Code Climate successfully!"

# Cleanup
echo "🧹 Cleaning up..."
rm -f ./cc-test-reporter

echo "🎉 Done!"
