Phase 1: Modular Cloud Foundation 🏗️
We use Terraform to build a secure, multi-tier network and a managed Kubernetes cluster.

📂 Directory Structure
Plaintext
terraform/
├── main.tf          # Root "orchestrator"
├── variables.tf     # Global environment settings
└── modules/
    ├── vpc/         # Networking (Public/Private subnets)
    └── eks/         # EKS Cluster & Managed Node Groups
🛠️ Execution Steps
Initialize: terraform init to download providers and modules.

Plan: terraform plan to verify the 50+ resources being created.

Deploy: terraform apply --auto-approve (approx. 15-minute runtime).

Connect: aws eks update-kubeconfig --region us-east-1 --name conduit-enterprise-dev

Phase 2: Application Containerization 📦
We transform the raw source code into secure, production-ready Docker images.

🏗️ The Multi-Stage Strategy
Instead of one large image, we use a "Build" stage and a "Run" stage.

Stage 1 (Build): Contains full compilers, npm, and source code.

Stage 2 (Production): Contains only the compiled artifacts and the minimal runtime.

📂 Application Layout
Plaintext
application/
├── backend/    # Node.js API
│   └── Dockerfile
└── frontend/   # React SPA
    └── Dockerfile
🔒 Security Highlights
Non-Root Execution: Containers run as a standard user, not root.

Distroless/Alpine Bases: Minimal operating system footprint to reduce vulnerabilities.