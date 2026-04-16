# 🚀 AI-Assisted K8s Platform: Enterprise GitOps on AWS EKS

![AWS](https://img.shields.io/badge/AWS-EKS%20%7C%20ECR%20%7C%20VPC-FF9900?logo=amazonaws&style=flat-square)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?logo=terraform&style=flat-square)
![Kubernetes](https://img.shields.io/badge/Kubernetes-GitOps-326CE5?logo=kubernetes&style=flat-square)
![ArgoCD](https://img.shields.io/badge/ArgoCD-Continuous%20Delivery-EF7B4D?logo=argo&style=flat-square)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-2088FF?logo=githubactions&style=flat-square)
![Python](https://img.shields.io/badge/Python-AI%20Agent-3776AB?logo=python&style=flat-square)

## 📌 Project Overview
The AI-Assisted K8s Platform is an end-to-end, cloud-native microservices architecture deployed on Amazon Elastic Kubernetes Service (EKS). This project serves as a comprehensive demonstration of modern Cloud Engineering practices, featuring fully automated infrastructure provisioning, a strict GitOps CI/CD pipeline, and a custom LLM-powered Root Cause Analysis (RCA) agent for intelligent, self-healing observability.

## 🏗️ Architecture & Core Technologies

* **Infrastructure as Code (IaC):** AWS environment (VPC, private/public subnets, EKS Cluster, ECR Registries) provisioned immutably using modular **Terraform**.
* **Container Orchestration:** Microservices (Node.js backend, React frontend) orchestrated via **Kubernetes (AWS EKS)**.
* **Continuous Integration (CI):** **GitHub Actions** pipeline that securely authenticates with AWS via OIDC/Secrets, builds Docker images from nested directories, and pushes them to private ECR repositories upon code changes.
* **Continuous Delivery (CD):** **ArgoCD** deployed within the cluster, utilizing a pull-based GitOps methodology to ensure the live cluster state perfectly mirrors the `k8s/` manifests in this repository.
* **AIOps (Coming Soon):** A **Python-based LLM Agent** designed to monitor Kubernetes events, automatically detect `CrashLoopBackOff` or `ImagePullBackOff` errors, and generate human-readable RCA reports using generative AI.

## 📂 Repository Structure

Because this is a comprehensive monorepo, the automation pipelines live at the root, while the application and infrastructure code are nested within the main project folder.

```text
.
├── .github/workflows/             # CI Pipeline (GitHub Actions)
│   └── deploy.yaml                # Build & push workflow for nested microservices
└── simple-k8s-app/                # Main Application & Infrastructure Code
    ├── backend/                   # Node.js backend application source code & Dockerfile
    ├── frontend/                  # React frontend application source code & Dockerfile
    ├── k8s/                       # Kubernetes Manifests (The "GitOps Source of Truth")
    │   ├── backend/               # Backend Deployment, Service, ConfigMap
    │   ├── frontend/              # Frontend Deployment, Service
    │   └── database/               # Database Deployment, Service
    ├── terraform/                 # Infrastructure as Code
    │   ├── modules/               # Custom local modules (VPC, EKS, ECR)
    │   ├── main.tf                # Orchestration layer
    │   ├── variables.tf           # Environment variables
    │   └── outputs.tf             # EKS endpoints and ECR URLs
    └── ai-agent/                  # Python LLM Root Cause Analysis script (WIP)