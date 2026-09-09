terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-electricity"
  location = "northeurope"
}

resource "azurerm_container_registry" "acr" {
  name                = "electricityacr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  sku           = "Basic"
  admin_enabled = true
}

resource "azurerm_container_group" "electricity" {

  name                = "electricity-group"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_address_type = "Public"
  os_type         = "Linux"

  container {
    name   = "api"
    image  = "${azurerm_container_registry.acr.login_server}/electricity-backend:latest"
    cpu    = "1"
    memory = "1.5"

    ports {
      port     = 3000
      protocol = "TCP"
    }

    environment_variables = {
      HOST = "localhost"
      PORT = "3000"
    }
  }

  container {
    name   = "db"
    image  = "${azurerm_container_registry.acr.login_server}/electricity-db:latest"
    cpu    = "1"
    memory = "1.5"

    ports {
      port     = 5432
      protocol = "TCP"
    }

    environment_variables = {
      POSTGRES_USER     = "academy"
      POSTGRES_PASSWORD = "academy"
      POSTGRES_DB       = "electricity"
    }
  }

  image_registry_credential {
    server   = azurerm_container_registry.acr.login_server
    username = azurerm_container_registry.acr.admin_username
    password = azurerm_container_registry.acr.admin_password
  }
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "backend_ip" {
  value = azurerm_container_group.electricity.ip_address
}

output "backend_url" {
  value = "http://${azurerm_container_group.electricity.ip_address}:3000/api/dashboard"
}