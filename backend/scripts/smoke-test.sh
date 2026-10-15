#!/usr/bin/env bash
# Boots a backend image against a throwaway Postgres and exercises the API.
# Catches native-image failures (missing reflection hints etc.) that only show
# up at runtime, which the JVM test suite can't see.
#
# usage: scripts/smoke-test.sh <image>
set -euo pipefail

image=${1:?usage: $0 <image>}
id=smoke-$$
net=$id-net
port=18080

cleanup() {
  status=$?
  if [ "$status" -ne 0 ]; then docker logs "$id-app" 2>&1 | tail -50 || true; fi
  docker rm -f "$id-app" "$id-db" > /dev/null 2>&1 || true
  docker network rm "$net" > /dev/null 2>&1 || true
}
trap cleanup EXIT

docker network create "$net" > /dev/null
docker run -d --name "$id-db" --network "$net" \
  -e POSTGRES_DB=plarent -e POSTGRES_USER=plarent -e POSTGRES_PASSWORD=plarent \
  postgres:16-alpine > /dev/null
for _ in $(seq 30); do
  docker exec "$id-db" pg_isready -U plarent -d plarent > /dev/null 2>&1 && break
  sleep 1
done

docker run -d --name "$id-app" --network "$net" -p "$port:8080" \
  -e SPRING_DATASOURCE_URL="jdbc:postgresql://$id-db:5432/plarent" \
  -e SPRING_DATASOURCE_USERNAME=plarent -e SPRING_DATASOURCE_PASSWORD=plarent \
  "$image" > /dev/null

api=http://localhost:$port/api/plants
for _ in $(seq 60); do
  curl -sf -o /dev/null "$api" && break
  sleep 1
done

expect() { # <expected status> <description> <curl args...>
  local want=$1 what=$2; shift 2
  local got
  got=$(curl -s -o /tmp/$id.body -w '%{http_code}' "$@")
  if [ "$got" != "$want" ]; then
    echo "FAIL $what: expected $want, got $got: $(cat /tmp/$id.body)"
    exit 1
  fi
  echo "ok   $what ($got)"
}

expect 201 "create plant" -H 'Content-Type: application/json' \
  -d '{"name":"Monstera","species":"Monstera deliciosa","acquiredDate":"2024-03-01"}' "$api"
plant=$(grep -o '"id":"[^"]*"' /tmp/$id.body | cut -d'"' -f4)
expect 200 "list plants" "$api"
grep -q "$plant" /tmp/$id.body || { echo "FAIL list plants: created plant missing"; exit 1; }
expect 200 "get plant" "$api/$plant"
expect 400 "reject invalid plant" -H 'Content-Type: application/json' -d '{"name":"","species":""}' "$api"
expect 204 "delete plant" -X DELETE "$api/$plant"
expect 404 "get deleted plant" "$api/$plant"
rm -f /tmp/$id.body
