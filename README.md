# Dev Academy Autumn 2026 Exercise

This project contains the backend and frontend services for the application. Make sure you have Docker and Node.js installed on your machine before getting started.

![Front-End UI](./README_Assets/UI.png)


## 🚀 Setup & Installation

Follow these steps to set up and run the application in your local development environment.

### 1. Initialize Backend & Database
Run the following commands starting from the project root

```bash
# Start Docker containers (forces build and renews anonymous volumes)
cd backend/dev-academy-autumn-2026-exercise/
docker compose up --build --renew-anon-volumes -d

# Navigate to the backend directory, execute setup scripts, and install dependencies
cd ..
sh commands.sh
npm install
cd ..
```

---


### 2. Run
 This project can be run in locally  or in cloud with these commands after installation

```bash
# Run locally
npm run dev
```

```bash
# Run in cloud
npm run dev:cloud
```

### 3. Test
 JEST files can be found in src/functions folder and E2E tests can be found in /src/e2e folder. Run the following commands for running tests from the project root

```bash
# Run JEST tests 
npm test

#Run e2e tests
npx playwright test
```


# Azure REST-API Container Apps Data

![Front-End UI](./README_Assets/azure_data.png)