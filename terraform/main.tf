terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.0"

  backend "s3" {
    bucket         = "pio-ecommerce-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      environment = var.environment
      project     = var.project_name
    }
  }
}

locals {
  default_variables = {
    aws_region     = var.aws_region
    environment    = var.environment
    project_name   = var.project_name
    image_tag      = var.image_tag
  }
}