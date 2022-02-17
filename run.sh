#!/bin/sh
opt=$1

if [[ "$opt" = "up" ]]; then
  docker-compose -f docker-compose-dev.yml up -d
elif [[ "$opt" = "up-build" ]]; then
  docker-compose -f docker-compose-dev.yml up --build -d
elif [[ "$opt" = "down" ]]; then
  docker-compose -f docker-compose-dev.yml down
fi
