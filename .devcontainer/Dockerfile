# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm

RUN mkdir -p \
    /home/node/.claude \
    /home/node/.local/share/opencode \
    /home/node/.local/state/opencode \
    /home/node/.local/state/claude \
    /home/node/.local/share/claude \
    && chown -R node:node /home/node/.claude /home/node/.local

# Set the working directory
WORKDIR /workspace
