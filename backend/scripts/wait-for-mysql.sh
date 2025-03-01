#!/bin/sh

until 
bunx prisma migrate deploy; do
  echo "MySQL is unavailable - sleeping"
  sleep 3
done

until
bun prisma/seed.ts; do
  echo "Prisma seed failed - sleeping"
  sleep 3
done


bun start
