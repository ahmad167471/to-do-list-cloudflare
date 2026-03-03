# FRONTEND → Cloudflare Pages

resource "cloudflare_pages_project" "todo_frontend" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = "main"

  build_config {
    build_command   = ""
    destination_dir = ""
    root_dir        = "frontend"  # Folder containing index.html
  }
}

# BACKEND → Cloudflare Worker

resource "cloudflare_workers_script" "todo_api" {
  account_id         = var.cloudflare_account_id
  name               = var.worker_name
  content            = file("${path.module}/../worker/index.js")
  compatibility_date = "2026-03-01"
}