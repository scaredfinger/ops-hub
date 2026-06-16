#!/usr/bin/env bash
set -e

sudo apt-get update
sudo apt-get install -y ripgrep

if [ -n "$OPENCODE_VERSION" ]; then
    curl -fsSL https://opencode.ai/install | bash -s -- --version "$OPENCODE_VERSION"
fi

if [ -n "$CLAUDE_VERSION" ]; then
    curl -fsSL https://claude.ai/install.sh | bash -s -- "$CLAUDE_VERSION"
fi
