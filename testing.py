import os
import json
import subprocess

# === CONFIG ===
EXTENSION_PATH = "/root/playground/extensions-codebase/besafe"
OUTPUT_DIR = "file_results"  # per-file outputs
COMBINED_OUTPUT = "combined_report.md"
MAX_CHARS = 10000  # trim very large files
NUM_TOP_FILES = 5  # top N files by size

# === PROMPT TEMPLATE ===
PROMPT = """You are a security expert analyzing a single Chrome extension file for potential security risks.

Focus on:
- data theft
- privacy violations
- suspicious network requests
- dangerous permissions
- code obfuscation
- credential harvesting

Provide ONLY this format:

**FILE**: {filename}

**RISK_LEVEL**: [SAFE/LOW/MEDIUM/HIGH/CRITICAL]

**RISK_SCORE**: [1–5]

**MALICIOUS_INDICATORS**:
[List suspicious patterns or "None identified"]

**ATTACK_VECTORS**:
[Explain potential risks briefly or "None identified"]

**RECOMMENDATIONS**:
[Security recommendations or "File appears safe"]

Be concise but thorough. Respond only in the above format.
"""

# === HELPERS ===
def get_files_by_size(path, exclude_files=[]):
    files = []
    for root, _, filenames in os.walk(path):
        for f in filenames:
            if f in exclude_files:
                continue
            if f.endswith((".js", ".json", ".html", ".ts")):
                full_path = os.path.join(root, f)
                try:
                    size = os.path.getsize(full_path)
                    files.append((full_path, size))
                except:
                    continue
    files.sort(key=lambda x: x[1], reverse=True)
    return [f[0] for f in files[:NUM_TOP_FILES]]

def analyze_file(filepath):
    try:
        with open(filepath, "r", errors="ignore") as f:
            content = f.read(MAX_CHARS)
    except Exception as e:
        return f"**FILE**: {os.path.basename(filepath)}\n**ERROR**: {e}"

    user_prompt = PROMPT.format(filename=os.path.basename(filepath)) + "\n\n" + content

    try:
        result = subprocess.run(
            ["opencode", "run", "--json", user_prompt],
            capture_output=True,
            text=True,
            check=True
        )
        data = json.loads(result.stdout)
        return data.get("text", "").strip() or "No output"
    except subprocess.CalledProcessError as e:
        return f"**FILE**: {os.path.basename(filepath)}\n**ERROR**: {e.stderr.strip()}"
    except Exception as e:
        return f"**FILE**: {os.path.basename(filepath)}\n**ERROR**: {e}"

# === MAIN ===
os.makedirs(OUTPUT_DIR, exist_ok=True)
all_results = []

# Step 1: always analyze manifest.json
manifest_path = os.path.join(EXTENSION_PATH, "manifest.json")
if os.path.exists(manifest_path):
    print(f"Analyzing manifest: {manifest_path}")
    result = analyze_file(manifest_path)
    all_results.append(result)
    with open(os.path.join(OUTPUT_DIR, "manifest.json.md"), "w") as f:
        f.write(result)

# Step 2: analyze top N largest files (excluding manifest.json)
top_files = get_files_by_size(EXTENSION_PATH, exclude_files=["manifest.json"])
for file_path in top_files:
    print(f"Analyzing: {file_path}")
    result = analyze_file(file_path)
    all_results.append(result)
    file_name = os.path.basename(file_path).replace("/", "_")
    with open(os.path.join(OUTPUT_DIR, f"{file_name}.md"), "w") as f:
        f.write(result)

# Step 3: save combined report
with open(COMBINED_OUTPUT, "w") as f:
    f.write("\n\n".join(all_results))

print(f"\n✅ POC complete. Per-file results in '{OUTPUT_DIR}', combined report: {COMBINED_OUTPUT}")
