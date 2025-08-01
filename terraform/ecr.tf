module "user_ecr_repositories" {
  source = "./module/ecr"

  project_name = var.project_name
  environment = var.environment
  service = "user"
}