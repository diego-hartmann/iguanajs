#!/usr/bin/env bash
set -e

CONTAINER_ID=$1

if [ -z "$CONTAINER_ID" ]; then
  echo "Usage: ./scripts/reset-postgres.sh <container_id>"
  exit 1
fi

echo "🦎  Stopping container $CONTAINER_ID..."
docker stop "$CONTAINER_ID"
echo ""

echo "🦎  Removing container $CONTAINER_ID..."
docker rm "$CONTAINER_ID"
echo ""

echo "🦎  Finding volumes for $CONTAINER_ID..."
VOLUMES=$(docker inspect "$CONTAINER_ID" --format '{{ range .Mounts }}{{ .Name }} {{ end }}' || true)
echo ""

if [ -n "$VOLUMES" ]; then
  echo "🦎  Removing volumes: $VOLUMES"
  docker volume rm $VOLUMES
else
  echo "⚠️  No named volumes found."
fi
echo ""

echo "🦎  Starting docker compose..."
docker compose up -d
echo ""

echo "🦎  Done ✅"
