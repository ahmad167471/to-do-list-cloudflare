# OUTPUTS

output "pages_project_name" {
  description = "Cloudflare Pages project name"
  value       = cloudflare_pages_project.todo_frontend.name
}

output "pages_subdomain" {
  description = "Cloudflare Pages default subdomain"
  value       = cloudflare_pages_project.todo_frontend.subdomain
}

output "pages_url" {
  description = "Live URL of the Pages project"
  value       = "https://${cloudflare_pages_project.todo_frontend.subdomain}.pages.dev"
}

output "worker_name" {
  description = "Cloudflare Worker script name"
  value       = cloudflare_workers_script.todo_api.name
}

output "worker_script_id" {
  description = "Worker script ID"
  value       = cloudflare_workers_script.todo_api.id
}