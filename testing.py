#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path
from datetime import datetime

# Configuration
EXTENSION_PATH = "/root/playground/extensions-codebase/besafe"
OUTPUT_DIR = "file_results"
COMBINED_OUTPUT = "combined_report.md"
MAX_CHARS = 10000
NUM_TOP_FILES = 5
MODEL = "ollama/qwen3:30b-120k"

FILE_PROMPT = """You are a security expert analyzing a Chrome extension file.
Focus on: data theft, privacy violations, suspicious network requests, dangerous permissions, code obfuscation, credential harvesting.

Provide ONLY this format:
**FILE**: {filename}
**RISK_LEVEL**: [SAFE/LOW/MEDIUM/HIGH/CRITICAL]
**RISK_SCORE**: [1-5]
**MALICIOUS_INDICATORS**:
[List suspicious patterns or "None identified"]
**ATTACK_VECTORS**:
[Explain potential risks briefly or "None identified"]
**RECOMMENDATIONS**:
[Security recommendations or "File appears safe"]
"""

FINAL_PROMPT = """You are a security expert providing a final assessment of a Chrome extension.
Based on the individual file analyses provided, give an OVERALL assessment.

REQUIRED FORMAT:
**RISK_LEVEL**: [SAFE/LOW/MEDIUM/HIGH/CRITICAL]
**RISK_SCORE**: [1-5]
**MALICIOUS_INDICATORS**:
[Consolidated list or "None identified"]
**AFFECTED_FILES**:
[List files with issues or "None"]
**ATTACK_VECTORS**:
[How this could harm users or "None identified"]
**RECOMMENDATIONS**:
[Security recommendations or "Extension appears secure"]
**OVERALL_ASSESSMENT**:
[2-3 sentence summary with risk justification]
"""


def log(msg, level="INFO"):
    """Print timestamped log message."""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[{timestamp}] {level}: {msg}")


def get_top_files(path, num_files, exclude=None):
    """Get largest relevant files from extension directory."""
    exclude = exclude or []
    files = []
    
    for root, _, filenames in os.walk(path):
        for f in filenames:
            if f in exclude or not f.endswith((".js", ".json", ".html", ".ts")):
                continue
            
            full_path = Path(root) / f
            try:
                size = full_path.stat().st_size
                files.append((full_path, size))
            except OSError:
                continue
    
    files.sort(key=lambda x: x[1], reverse=True)
    return [str(f[0]) for f in files[:num_files]]


def analyze_file(filepath, prompt_template):
    """Analyze a single file using opencode."""
    filename = Path(filepath).name
    log(f"Reading {filename}...")
    
    try:
        with open(filepath, "r", errors="ignore") as f:
            content = f.read(MAX_CHARS)
    except Exception as e:
        return f"**FILE**: {filename}\n**ERROR**: Failed to read file: {e}"
    
    prompt = prompt_template.format(filename=filename) + "\n\n" + content
    
    log(f"Analyzing {filename} with {MODEL}...")
    try:
        result = subprocess.run(
            ["opencode", "run", "-m", MODEL, prompt],
            capture_output=True,
            text=True,
            timeout=300  # 5 min timeout
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


def combine_results(results):
    """Generate final assessment from individual file analyses."""
    log("Generating final assessment...")
    
    combined_text = "\n\n".join(results)
    prompt = FINAL_PROMPT + "\n\nINDIVIDUAL FILE ANALYSES:\n\n" + combined_text
    
    try:
        result = subprocess.run(
            ["opencode", "run", "-m", MODEL, prompt],
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
    log("Starting Chrome Extension Security Analysis")
    log(f"Extension path: {EXTENSION_PATH}")
    log(f"Model: {MODEL}")
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    all_results = []
    
    # Analyze manifest first
    manifest_path = Path(EXTENSION_PATH) / "manifest.json"
    if manifest_path.exists():
        log("=== Analyzing manifest.json ===")
        result = analyze_file(manifest_path, FILE_PROMPT)
        all_results.append(result)
        
        with open(Path(OUTPUT_DIR) / "manifest.json.md", "w") as f:
            f.write(result)
    else:
        log("manifest.json not found", "WARN")
    
    # Analyze top files
    log(f"=== Finding top {NUM_TOP_FILES} files ===")
    top_files = get_top_files(EXTENSION_PATH, NUM_TOP_FILES, exclude=["manifest.json"])
    log(f"Found {len(top_files)} files to analyze")
    
    for idx, file_path in enumerate(top_files, 1):
        log(f"=== File {idx}/{len(top_files)} ===")
        result = analyze_file(file_path, FILE_PROMPT)
        all_results.append(result)
        
        safe_name = Path(file_path).name.replace("/", "_")
        with open(Path(OUTPUT_DIR) / f"{safe_name}.md", "w") as f:
            f.write(result)
    
    # Generate final assessment
    log("=== Generating Final Assessment ===")
    final_assessment = combine_results(all_results)
    
    # Save combined report
    with open(COMBINED_OUTPUT, "w") as f:
        f.write("# Chrome Extension Security Analysis Report\n\n")
        f.write(f"**Extension**: {EXTENSION_PATH}\n")
        f.write(f"**Analysis Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"**Model**: {MODEL}\n\n")
        f.write("---\n\n")
        f.write("## Final Assessment\n\n")
        f.write(final_assessment)
        f.write("\n\n---\n\n")
        f.write("## Individual File Analyses\n\n")
        f.write("\n\n".join(all_results))
    
    log("=" * 60)
    log(f"✅ Analysis complete!", "SUCCESS")
    log(f"Per-file results: {OUTPUT_DIR}/")
    log(f"Combined report: {COMBINED_OUTPUT}")


if __name__ == "__main__":
    main()
