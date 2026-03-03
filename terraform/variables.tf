variable "cloudflare_api_token" {
  type        = string
  sensitive   = true
  nullable    = false
  description = <<EOT
Cloudflare API Token with the following minimum permissions:
- Account → Cloudflare Pages: Edit (for Pages projects and domains)
- Account → Workers Scripts: Edit (for uploading Worker scripts)
- Account → Workers Routes: Edit (for creating Worker routes)
- Zone → DNS: Edit (for managing DNS records like CNAME for Pages)
Optional extras: Account → Workers KV Storage: Edit (if using KV bindings later)
Create via dashboard: My Profile → API Tokens → Create Token → Custom Token
EOT
}

variable "cloudflare_account_id" {
  type        = string
  sensitive   = true
  nullable    = false
  description = "Your 32-character hexadecimal Cloudflare Account ID (find in dashboard → Overview)"
}

variable "zone_id" {
  type        = string
  nullable    = false
  description = "Zone ID of the domain where you'll host the app (dashboard → your domain → Overview)"
}

variable "custom_domain" {
  type        = string
  default     = ""
  description = "Optional custom domain for the frontend (e.g. 'todo.example.com'). Leave empty to skip custom domain resources."
}

variable "worker_name" {
  type        = string
  default     = "todo-api"
  description = "Name of the Cloudflare Worker script (used for the backend API)"
}

variable "pages_project_name" {
  type        = string
  default     = "todo-frontend"
  description = "Name of the Cloudflare Pages project (must match what you created in dashboard)"
}

# Optional – if you want to make GitHub connection configurable later (though manual for now)
variable "github_repo_owner" {
  type        = string
  default     = ""
  description = "GitHub username/organization that owns the repo (informational only – Git connect is manual)"
}

variable "github_repo_name" {
  type        = string
  default     = ""
  description = "Name of the GitHub repository (informational only – Git connect is manual)"
}