resource "aws_ecr_repository" "ecr_repositories" {
  name                 = "${var.project_name}-${var.service}-${var.environment}"
  image_tag_mutability = "IMMUTABLE"

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

resource "aws_ecr_lifecycle_policy" "ecr_lifecycle_policy" {
    repository = aws_ecr_repository.ecr_repositories.name

    policy = jsonencode({
        rules = [
        {
            rulePriority = 1
            description  = "Keep last 5 tagged images"
            selection    = {
                tagStatus = "tagged"
                countType = "imageCountMoreThan"
                countNumber = 5
                tagPrefixList = [var.environment, var.service]
            }
            action = {
                type = "expire"
            }
        }
        ]
    })
}

output "ecr_repository_url" {
  value = aws_ecr_repository.ecr_repositories.repository_url
}