# Dev Academy Autumn 2026 Exercise

This project contains the backend and frontend services for the application. Make sure you have Docker and Node.js installed on your machine before getting started.

![Front-End UI](./README_Assets/UI.png)


## 🚀 Setup & Installation

Follow these steps to set up and run the application in your local development environment.

### 1. Initialize Backend & Database
Run the following commands starting from the project root

```bash


# Navigate to the backend directory, execute setup scripts, and install dependencies
cd backend
sh commands.sh
cd ..


# Start Docker containers (forces build and renews anonymous volumes)
cd backend/dev-academy-autumn-2026-exercise/
docker compose up --build --renew-anon-volumes -d
cd ../..

# Install front end packages
npm install


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


# Usage
You can filter the data by clicking a column header and then clicking the three-dot icon.

If you are running the application in the cloud, please wait a moment (up to 30 seconds) for the data to be retrieved from the database.


## Terraform and Azure Deployment

Terraform is used to create and manage the Azure infrastructure required to run the application. 

> [!WARNING]
> **Terraform cannot be executed directly from this repository.** The required Azure credentials and secrets have not been provided or committed to the repository for security reasons.

The deployment was performed in two stages because the Docker images need an existing Azure Container Registry (ACR) before they can be pushed to it. The Terraform configuration is located in the `azureTerraform.tf` file in the project root directory.


### Deployment process

1. Terraform was first applied to create the Azure Resource Group and Azure Container Registry:

```bash
terraform apply
```

2. After the ACR had been created, the Docker images were tagged with the ACR address, and the images were pushed to the registry:

```bash
docker tag electricity-backend:latest electricityacr.azurecr.io/electricity-backend:latest
docker tag electricity-db:latest electricityacr.azurecr.io/electricity-db:latest

az acr login --name electricityacr

docker push electricityacr.azurecr.io/electricity-backend:latest
docker push electricityacr.azurecr.io/electricity-db:latest
```


Finally, Terraform was applied again to create/update the Azure Container Instance and deploy the Docker images from ACR:
```bash
terraform apply
```

# Where Did I use AI?
I used AI to assist with selecting UI components, creating tests, and commenting the code.

Azure Container Apps was a familiar concept to me, but I had not used the actual service before. I used AI to learn how to utilize Azure Container Apps and how to deploy and run the backend containers, including the REST API and database, in the Azure environment.