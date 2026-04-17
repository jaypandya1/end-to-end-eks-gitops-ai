# 🚀 GitOps Platform Engineering on AWS EKS

![AWS](https://img.shields.io/badge/AWS-EKS%20%7C%20ECR%20%7C%20VPC-FF9900?logo=amazonaws&style=flat-square)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Platform%20Engineering-326CE5?logo=kubernetes&style=flat-square)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-EF7B4D?logo=argo&style=flat-square)
![Prometheus](https://img.shields.io/badge/Prometheus-Observability-E6522C?logo=prometheus&style=flat-square)
![Grafana](https://img.shields.io/badge/Grafana-Metrics%20%26%20Dashboards-F46800?logo=grafana&style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?logo=docker&style=flat-square)
![Python](https://img.shields.io/badge/Python-AIOps%20Controller-3776AB?logo=python&style=flat-square)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI/CD-2088FF?logo=githubactions&style=flat-square)

---

## 🧭 Summary
Engineered a **highly available, self-healing GitOps platform** on AWS EKS that automates infrastructure provisioning, secure delivery, and continuous observability. This portfolio-grade system demonstrates **platform engineering** principles, combining **GitOps, IaC, and AIOps** to deliver reliable, scalable cloud operations.

---

## 🏗️ Architecture (Platform + GitOps Flow)
![Architecture (Platform + GitOps Flow)](image-2.png)

## 🔑 Key Infrastructure Pillars

### ✅ Automated CI/CD (GitOps)
- **GitHub Actions** builds and pushes container images to **ECR**
- **ArgoCD** continuously syncs Kubernetes manifests for **zero‑downtime delivery**

### 🔐 Enterprise Security
- **Bitnami Sealed Secrets** enables cryptographic secret management (Git‑safe)

### 📈 Active Observability
- **Prometheus + Grafana + Alertmanager** with Slack-based incident routing

### 🧠 AIOps & Auto‑Triage
- **Custom Python controller** watches Kubernetes crashes and generates LLM-based RCA for `CrashLoopBackOff` events

---

## 🧰 Core Tech Stack

**Platform & Cloud**
- AWS (EKS, ECR, VPC, IAM)
- Terraform (modular IaC)

**Kubernetes & GitOps**
- Kubernetes (manifests in `k8s/`)
- ArgoCD (GitOps controller)

**Observability**
- Prometheus
- Grafana
- Alertmanager → Slack

**AIOps**
- Python + Kubernetes API
- Gemini LLM for root-cause diagnostics

**CI/CD**
- GitHub Actions
- Docker

---

## 🗂️ Repository Structure (Infrastructure Focus)

```text
.
├── .github/workflows/        # GitHub Actions CI pipeline
│   └── deploy.yaml
├── terraform/                # Modular IaC for VPC, EKS, ECR
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── modules/
│       ├── vpc/
│       ├── eks/
│       └── ecr/
├── k8s/                      # GitOps source of truth (manifests)
│   ├── backend/
│   ├── frontend/
│   ├── database/
│   ├── namespace.yaml
│   ├── fitness-ingress.yaml
│   └── fitness-secrets.yaml
├── argocd-app.yaml           # ArgoCD application definition
├── alertmanager-values.yaml  # Alert routing to Slack
├── sealed-secret.yaml         # Encrypted secrets (Bitnami Sealed Secrets)
├── ai_controller.py           # AIOps controller for crash diagnostics
```

---

## 🚀 Getting Started

1. **Provision AWS infrastructure**
   - Use Terraform in `terraform/` to create VPC, EKS cluster, and ECR.

2. **Bootstrap GitOps**
   - Install ArgoCD in the cluster.
   - Apply `argocd-app.yaml` to sync manifests in `k8s/`.

3. **Deploy CI/CD**
   - Push to `main` triggers GitHub Actions to build and publish images to ECR.

4. **Enable observability**
   - Deploy Prometheus/Grafana stack.
   - Apply `alertmanager-values.yaml` and `sealed-secret.yaml` to route alerts to Slack.

## Fitnest App (Secured)

<img width="1440" height="900" alt="FITNEST_SECURE" src="https://github.com/user-attachments/assets/d0056367-ac58-49d6-8c77-47019526cf14" />

## ArgoCD DashBoard

<img width="1440" height="900" alt="ARGOCD" src="https://github.com/user-attachments/assets/abb3acb2-928d-41d0-9e1c-5f3ac24c8557" />

## Github Actions CI workflow Kubernetes

<img width="1440" height="900" alt="GIHUB_ACTIONS_CI_WORKFLOW_1" src="https://github.com/user-attachments/assets/24614ad2-abf7-40e2-95f2-fafc66ae3273" />

## Github Actions CI workflow FrontEnd + Backend

<img width="1440" height="900" alt="GITHUB_ACTIONS_CI_WORKFLOW_2" src="https://github.com/user-attachments/assets/06f81c8e-7995-405a-b1af-c41814b668ac" />

## Grafana Dashboard

<img width="1440" height="900" alt="GRAFANA" src="https://github.com/user-attachments/assets/4cc25933-9213-436b-9bf8-09e9b5093ed1" />

## Python RCA 

<img width="1406" height="857" alt="LLM RCA" src="https://github.com/user-attachments/assets/6da1ae7f-86e0-4ec1-be8b-0d532a1239f9" />

## Slack Integration EKS 

<img width="1440" height="900" alt="SLACK_CONNECTION" src="https://github.com/user-attachments/assets/20b5d4a4-b6a8-4264-8880-1f708cd5ead8" />







