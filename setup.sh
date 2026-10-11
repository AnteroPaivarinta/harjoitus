
#!/bin/bash
set -e

echo "Setting up backend..."
cd backend
sh commands.sh
cd ..

echo "Starting Docker containers..."
cd backend/dev-academy-autumn-2026-exercise
docker compose up --build --renew-anon-volumes -d
cd ../..

echo "Installing frontend dependencies..."
npm install

echo "Setup completed successfully!"
