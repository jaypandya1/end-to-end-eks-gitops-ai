variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "fitnet-enterprise-cluster"
}

variable "vpc_id" {
  description = "The ID of the VPC where the cluster will be deployed"
  type        = string
}

variable "subnet_ids" {
  description = "A list of subnet IDs where the EKS nodes will be placed"
  type        = list(string)
}