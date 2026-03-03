terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0" 
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
  # If using global key (not recommended): api_email + api_key instead
}