import os
import time
from kubernetes import client, config, watch
import google.generativeai as genai

# ---------------------------------------------------------
# Step 1: Initialize the LLM (The Brain)
# ---------------------------------------------------------
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable not set!")

genai.configure(api_key=api_key)
# Using flash for fast, cost-effective log analysis
model = genai.GenerativeModel('gemini-2.5-flash')

# ---------------------------------------------------------
# Step 2: Initialize Kubernetes Client (The Eyes)
# ---------------------------------------------------------
# This loads your local ~/.kube/config to talk to AWS EKS
config.load_kube_config()
v1 = client.CoreV1Api()

NAMESPACE = "fitnest"
print(f"🤖 AI Controller initialized. Watching for pod crashes in '{NAMESPACE}'...")

def analyze_failure(pod_name):
    print(f"\n⚠️ Crash detected in pod: {pod_name}. Fetching logs...")
    try:
        # Fetch the last 50 lines of logs from the crashing pod
        logs = v1.read_namespaced_pod_log(name=pod_name, namespace=NAMESPACE, tail_lines=50)
        
        if not logs.strip():
            print("Logs are empty. The container likely failed before writing output.")
            return

        # ---------------------------------------------------------
        # Step 3: LLM Integration (The Diagnosis)
        # ---------------------------------------------------------
        prompt = f"""
        You are a Senior Site Reliability Engineer. Analyze these Kubernetes logs from the crashing pod '{pod_name}'.
        Provide a very brief 2-sentence summary of the root cause, followed by a bulleted 1-2 step technical fix.
        Logs:
        {logs}
        """
        
        print("⏳ Sending logs to LLM for root cause analysis...")
        response = model.generate_content(prompt)
        
        print("\n" + "="*60)
        print(f"🧠 AI Root Cause Analysis for: {pod_name}")
        print("="*60)
        print(response.text)
        print("="*60 + "\n")
        
    except client.exceptions.ApiException as e:
        print(f"❌ Kubernetes API Error fetching logs for {pod_name}: {e}")

# ---------------------------------------------------------
# The Watcher Loop
# ---------------------------------------------------------
w = watch.Watch()
processed_pods = set() # Tracks pods so we don't spam the LLM for the same crash loop

try:
    for event in w.stream(v1.list_namespaced_pod, namespace=NAMESPACE):
        pod = event['object']
        status = pod.status
        
        # Check if the pod has container statuses reported
        if status.container_statuses:
            for container in status.container_statuses:
                state = container.state.waiting
                
                # Trigger on CrashLoopBackOff or Error
                if state and state.reason in ["CrashLoopBackOff", "Error"]:
                    pod_name = pod.metadata.name
                    
                    # Only analyze a specific pod's crash once per script run
                    if pod_name not in processed_pods:
                        processed_pods.add(pod_name)
                        analyze_failure(pod_name)

except KeyboardInterrupt:
    print("\n🛑 AI Controller stopped.")