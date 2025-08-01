resource "aws_ecs_service" "user_service" {
  name = "user-service"
  cluster = aws_ecs_cluster.ecs_cluster.arn
  launch_type = "FARGATE"
  enable_execute_command = true

  deployment_maximum_percent = 10
  deployment_minimum_healthy_percent = 100
  desired_count = 1
  task_definition = aws_ecs_task_definition.user-td.arn

  network_configuration {
    assign_public_ip = true
    security_groups = [aws_security_group.sg.id]
    subnets = [aws_subnet.sn1.id, aws_subnet.sn2.id, aws_subnet.sn3.id]
  }
}

resource "aws_ecs_task_definition" "user-td" {
  container_definitions = jsonencode([
    {
      name = "user-service"
      image = module.user_ecr_repositories.ecr_repository_url
      cpu = 256
      memory = 512
      essential = true
      portMappings = [
        {
          containerPort = 443
          hostPort = 443
        },
        {
          containerPort = 80
          hostPort = 80
        }
      ]
      environment = {
        PORT = 80
      }
    }
  ])
  family                = "user-service"
  requires_compatibilities = ["FARGATE"]

  cpu                  = "256"
  memory               = "512"
  network_mode         = "awsvpc"
}