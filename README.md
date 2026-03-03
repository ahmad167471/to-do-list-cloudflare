# To-Do List Web Application

A full-stack To-Do List web application that demonstrates **frontend UI**, **Cloudflare Workers backend**, and **KV storage**, along with Terraform infrastructure setup.

---

## 🌟 Goal

The goal of this project is to create a simple and interactive To-Do List application with a responsive frontend and a cloud-based backend, while learning:

- Cloudflare Workers and KV storage
- Frontend-backend integration via REST API
- Terraform for infrastructure management

---

## 🛠️ Features

- Add, delete, and view tasks
- Persistent storage using Cloudflare Workers KV
- CORS-enabled API for frontend interaction
- Infrastructure as Code setup using Terraform
- Separate environments (Dev / Prod) managed through `tfvars`

---

## 🗂 Project Structure
```.
├── frontend/
│ ├── index.html
│ └── script.js
├── worker/
│ ├── index.js
│ └── wrangler.toml
├── terraform/
│ ├── main.tf
│ ├── variables.tf
│ └── backend.tf
├── .gitignore
└── README.md
```

---

## ⚡ Backend (Cloudflare Worker)

The backend is implemented using **Cloudflare Workers** with KV storage:

- **API Endpoints**:
  - `GET /api` → List all tasks
  - `POST /api` → Add a new task (`{"text":"Task Name"}`)
  - `DELETE /api/:id` → Delete a task by ID

- **CORS enabled** for frontend integration.
- KV namespace binding required (`TODOS_NEW`).

> ⚠️ **Backend Issue**: Initially, there was an error in the KV binding due to invalid namespace ID format. The KV namespace was recreated and properly bound to the worker.

---

## 🖥 Frontend

- Built using vanilla HTML, CSS, and JS
- Connects to Worker backend via `fetch` API
- Supports:
  - Enter key to add task
  - Delete button to remove tasks
  - Render empty state if no tasks

---

## Deployment

### 1. Cloudflare Worker

1. Login to Cloudflare CLI:
```bash
wrangler login
```
---
## Deploy Worker:
```
wrangler deploy
```
Make sure the KV namespace is correctly bound in wrangler.toml:
```
[[kv_namespaces]]
binding = "TODOS_NEW"
id = "<your-kv-namespace-id>"
```
## 2. Terraform (Optional)

Terraform is used to create cloud infrastructure like EC2, VPC, and security groups for other parts of the project.

Initialize and apply:
```
terraform init
terraform apply -var-file="dev.tfvars"
```