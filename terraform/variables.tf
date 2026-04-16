variable "region" {
  description = "The AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "The environment name"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "The overarching project name"
  type        = string
  default     = "fitnest"
}

variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = string
  default     = "fitnest-eks-cluster"
}