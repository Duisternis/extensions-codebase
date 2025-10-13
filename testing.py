#!/usr/bin/env python3
import os
import sys
import subprocess
from pathlib import Path
from datetime import datetime

# Configuration
OUTPUT_DIR = "file_results"
COMBINED_OUTPUT = "combined_report.md"
MAX_CHARS = 10000
NUM_TOP_FILES = 5

MANIFEST_PROMPT = """Analyze this Chrome extension manifest.json for security risks.

Focus on:
- Permissions: Are they excessive or dangerous?
- Host access: Does it request broad access?
- External resources: Any suspicious sources?
- CSP weaknesses

Format:
**FILE**: manifest.json
**RISK_LEVEL**: [SAFE/LOW/MEDIUM/HIGH/CRITICAL]
**RISK_SCORE**: [1-5]
**MALICIOUS_INDICATORS**: [Specific findings or "None"]
**ATTACK_VECTORS**: [How it could harm users or "None"]
**RECOMMENDATIONS**: [Actions needed or "Appears safe"]
"""

FILE_PROMPT = """Analyze this Chrome extension file: {filename}

Focus on:
- Data collection: What data is accessed and where does it go?
- User tracking: Any monitoring of user behavior?
- Network requests: Suspicious destinations or patterns?
- Dangerous APIs: Code execution, debugging, or injection?
- Obfuscation: Attempts to hide functionality?

Format:
**FILE**: {filename}
**RISK_LEVEL**: [SAFE/LOW/MEDIUM/HIGH/CRITICAL]
**RISK_SCORE**: [1-5]
**MALICIOUS_INDICATORS**: [Specific findings or "None"]
**ATTACK_VECTORS**: [How it could harm users or "None"]
**RECOMMENDATIONS**: [Actions needed or "Appears safe"]
"""

FINAL_PROMPT = """Based on the file analyses below, provide a comprehensive security assessment.

Requirements:
- Use the HIGHEST risk level found
- List specific findings (URLs, functions, permissions)
- Explain the attack chain if malicious
- Be technical and specific

Format:
**RISK_LEVEL**: [Highest from analyses]
**RISK_SCORE**: [Highest from analyses]
**MALICIOUS_INDICATORS**: [Specific findings from all files]
**AFFECTED_FILES**: [Which files have issues]
**ATTACK_VECTORS**: [Complete attack explanation]
**RECOMMENDATIONS**: [Prioritized actions]
**OVERALL_ASSESSMENT**: [3-5 sentence summary]

File Analyses:
"""


def log(msg, level="INFO"):
    """Print timestamped log message."""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[{timestamp}] {level}: {msg}")


def get_top_files(path, num_files, exclude=None):
    """Get largest relevant files from extension directory."""
    exclude = exclude or []
    files = []
    
    # Prioritize certain file types
    priority_patterns = ["background", "content", "inject", "popup"]
    
    for root, _, filenames in os.walk(path):
        for f in filenames:
            if f in exclude or not f.endswith((".js", ".json", ".html", ".ts")):
                continue
            
            full_path = Path(root) / f
            try:
                size = full_path.stat().st_size
                # Boost priority for key files
                priority_boost = 0
                for pattern in priority_patterns:
                    if pattern in f.lower():
                        priority_boost = 1000000
                        break
                files.append((full_path, size + priority_boost))
            except OSError:
                continue
    
    files.sort(key=lambda x: x[1], reverse=True)
    return [str(f[0]) for f in files[:num_files]]


def analyze_file(filepath, prompt_template, model, is_manifest=False):
    """Analyze a single file using opencode."""
    filename = Path(filepath).name
    log(f"Reading {filename}...")
    
    try:
        with open(filepath, "r", errors="ignore") as f:
            content = f.read(MAX_CHARS)
    except Exception as e:
        return f"**FILE**: {filename}\n**ERROR**: Failed to read file: {e}"
    
    # Use appropriate prompt
    if is_manifest:
        prompt = prompt_template + "\n\n" + content
    else:
        prompt = prompt_template.format(filename=filename) + "\n\n" + content
    
    log(f"Analyzing {filename} with {model}...")
    try:
        result = subprocess.run(
            ["opencode", "run", "-m", model, prompt],
            capture_output=True,
            text=True,
            timeout=300
        )
        
        if result.returncode != 0:
            error_msg = result.stderr.strip() or "Unknown error"
            log(f"Analysis failed for {filename}: {error_msg}", "ERROR")
            return f"**FILE**: {filename}\n**ERROR**: {error_msg}"
        
        output = result.stdout.strip()
        if not output:
            log(f"No output for {filename}", "WARN")
            return f"**FILE**: {filename}\n**ERROR**: No output received"
        
        log(f"✓ Completed {filename}", "SUCCESS")
        return output
        
    except subprocess.TimeoutExpired:
        log(f"Timeout analyzing {filename}", "ERROR")
        return f"**FILE**: {filename}\n**ERROR**: Analysis timeout"
    except Exception as e:
        log(f"Error analyzing {filename}: {e}", "ERROR")
        return f"**FILE**: {filename}\n**ERROR**: {e}"


def combine_results(results, model):
    """Generate final assessment from individual file analyses."""
    log("Generating final assessment...")
    
    combined_text = "\n\n".join(results)
    prompt = FINAL_PROMPT + "\n\n" + combined_text
    
    try:
        result = subprocess.run(
            ["opencode", "run", "-m", model, prompt],
            capture_output=True,
            text=True,
            timeout=300
        )
        
        if result.returncode == 0 and result.stdout.strip():
            log("✓ Final assessment complete", "SUCCESS")
            return result.stdout.strip()
        else:
            log("Could not generate final assessment", "WARN")
            return "**ERROR**: Failed to generate final assessment"
            
    except Exception as e:
        log(f"Error generating final assessment: {e}", "ERROR")
        return f"**ERROR**: {e}"


def main():
    # Parse arguments
    if len(sys.argv) < 3:
        print("Usage: python script.py <extension_path> <model>")
        print("Example: python script.py /path/to/extension ollama/qwen3:30b-120k")
        sys.exit(1)
    
    EXTENSION_PATH = sys.argv[1]
    MODEL = sys.argv[2]
    
    # Validate extension path
    if not os.path.exists(EXTENSION_PATH):
        log(f"Extension path does not exist: {EXTENSION_PATH}", "ERROR")
        sys.exit(1)
    
    log("="*60)
    log("Chrome Extension Security Analysis")
    log("="*60)
    log(f"Extension: {EXTENSION_PATH}")
    log(f"Model: {MODEL}")
    log("="*60)
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    all_results = []
    
    # Analyze manifest first
    manifest_path = Path(EXTENSION_PATH) / "manifest.json"
    if manifest_path.exists():
        log("\n=== Analyzing manifest.json ===")
        result = analyze_file(manifest_path, MANIFEST_PROMPT, MODEL, is_manifest=True)
        all_results.append(result)
        
        with open(Path(OUTPUT_DIR) / "manifest.json.md", "w") as f:
            f.write(result)
    else:
        log("manifest.json not found", "WARN")
    
    # Analyze top files
    log(f"\n=== Finding top {NUM_TOP_FILES} files ===")
    top_files = get_top_files(EXTENSION_PATH, NUM_TOP_FILES, exclude=["manifest.json"])
    log(f"Selected: {[Path(f).name for f in top_files]}")
    
    for idx, file_path in enumerate(top_files, 1):
        log(f"\n=== File {idx}/{len(top_files)}: {Path(file_path).name} ===")
        result = analyze_file(file_path, FILE_PROMPT, MODEL)
        all_results.append(result)
        
        safe_name = Path(file_path).name.replace("/", "_")
        with open(Path(OUTPUT_DIR) / f"{safe_name}.md", "w") as f:
            f.write(result)
    
    # Generate final assessment
    log("\n=== Generating final assessment ===")
    final_assessment = combine_results(all_results, MODEL)
    
    # Save combined report
    with open(COMBINED_OUTPUT, "w") as f:
        f.write("# Chrome Extension Security Analysis Report\n\n")
        f.write(f"**Extension**: {EXTENSION_PATH}\n")
        f.write(f"**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"**Model**: {MODEL}\n\n")
        f.write("---\n\n")
        f.write("## Final Assessment\n\n")
        f.write(final_assessment)
        f.write("\n\n---\n\n")
        f.write("## Individual File Analyses\n\n")
        for idx, result in enumerate(all_results, 1):
            f.write(f"### File {idx}\n\n")
            f.write(result)
            f.write("\n\n")
    
    log("\n" + "="*60)
    log("✅ Analysis complete", "SUCCESS")
    log(f"Results: {COMBINED_OUTPUT}")
    log("="*60)


if __name__ == "__main__":
    main()
