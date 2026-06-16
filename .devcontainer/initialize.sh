#!/usr/bin/env bash
set -e

HOST_UID=$(id -u)
HOST_GID=$(id -g)

echo "Preparing for UID=$HOST_UID;GID=$HOST_GID..."

touch .env
chown "$HOST_UID:$HOST_GID" .env
