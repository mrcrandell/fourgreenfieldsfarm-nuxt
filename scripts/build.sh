#!/bin/bash
set -e

echo "Running database migrations..."
npx prisma migrate deploy

echo "Seeding database..."
NODE_ENV=production npx prisma db seed

echo "Building application..."
npm run build
