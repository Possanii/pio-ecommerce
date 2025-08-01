resource "aws_vpc" "pio-ecommerce-vpc" {
  cidr_block = "10.0.0.0/16"
  instance_tenancy = "default"
  enable_dns_hostnames = true
}

resource "aws_subnet" "sn1" {
  vpc_id = aws_vpc.pio-ecommerce-vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "sn2" {
  vpc_id = aws_vpc.pio-ecommerce-vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "sn3" {
  vpc_id = aws_vpc.pio-ecommerce-vpc.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "us-east-1c"
  map_public_ip_on_launch = true
}

resource "aws_security_group" "sg" {
  name        = "default-sg"
  description = "Security group for applications. Allows HTTP and HTTPS traffic."
  vpc_id      = aws_vpc.pio-ecommerce-vpc.id

  ingress {
    description = "https"
    from_port = 443
    to_port   = 443
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "http"
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}