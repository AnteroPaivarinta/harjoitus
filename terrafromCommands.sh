# Tag the Docker images with the Azure Container Registry address
docker tag electricity-backend:latest electricityacr.azurecr.io/electricity-backend:latest
docker tag electricity-db:latest electricityacr.azurecr.io/electricity-db:latest

# Log in to the Azure Container Registry
az acr login --name electricityacr

# Push the images to ACR
docker push electricityacr.azurecr.io/electricity-backend:latest
docker push electricityacr.azurecr.io/electricity-db:latest

# Verify that the images are available in ACR
az acr repository list --name electricityacr --output table

# The output should show:
# electricity-backend
# electricity-db

# Create/update the Azure resources with Terraform
terraform apply