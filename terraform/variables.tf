variable "aws_region" {
  description = "Default AWS region to use for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
    description = "Environment for the resources (e.g., dev, staging, prod)"
    type        = string
    default     = "dev"
}

variable "project_name" {
    description = "Name of the project for tagging resources"
    type        = string
    default     = "pio-ecommerce"
}

variable "image_tag" {}