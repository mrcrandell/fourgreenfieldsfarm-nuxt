#!/bin/bash
set -e

echo "Running database migrations..."
# Use the DATABASE_URL as is (it already has the PgBouncer parameters)
npx prisma migrate deploy

# Only seed if explicitly requested
if [ "$FORCE_SEED" = "true" ]; then
  echo "Seeding database..."
  NODE_ENV=production npx prisma db seed
else
  echo "Skipping database seed (set FORCE_SEED=true to enable)"
fi

echo "Building application..."
npm run build:nuxt
