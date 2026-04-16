output "backend_ecr_url" {
  description = "URL of the backend ECR repository"
  value       = module.ecr_backend.repository_url
}

output "frontend_ecr_url" {
  description = "URL of the frontend ECR repository"
  value       = module.ecr_frontend.repository_url
}