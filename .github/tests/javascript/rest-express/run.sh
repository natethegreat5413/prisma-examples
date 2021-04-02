#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma db seed --preview-feature
npm run dev &
pid=$!

sleep 15

npx newman run ../../postman_collections/rest.json --bail

kill "$pid"
