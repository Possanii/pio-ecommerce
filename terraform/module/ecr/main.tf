resource "aws_ecr_repository" "ecr_repositories" {
  name                 = "${var.project_name}-${var.service}-${var.environment}"
  image_tag_mutability = "MUTABLE"

  lifecycle {
    create_before_destroy = true
  }

  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    service = var.service
    environment = var.environment
  }
}

output "ecr_repository_url" {
  value = aws_ecr_repository.ecr_repositories.repository_url
}