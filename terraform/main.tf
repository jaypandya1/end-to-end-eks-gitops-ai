
# VPC Module
module "vpc" {
  source = "./modules/vpc"


  vpc_name = "${var.project_name}-vpc-${var.environment}"
  vpc_cidr = "10.0.0.0/16"
}

# EKS Module
module "eks" {
  source = "./modules/eks"

  cluster_name = "${var.project_name}-${var.environment}"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
}


module "ecr_backend" {
  source          = "./modules/ecr"
  repository_name = "fitnest-backend"
}

module "ecr_frontend" {
  source          = "./modules/ecr"
  repository_name = "fitnest-frontend"
}