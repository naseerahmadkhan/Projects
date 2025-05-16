import os

# Excluded directories and files
EXCLUDED_DIRS = {'node_modules', '.git'}
EXCLUDED_FILES = {'package.json', 'package-lock.json', '.gitignore', 'generate_md.py'}

# Output file
OUTPUT_FILE = 'output.md'

def should_exclude(path):
    """Determine if a path should be excluded."""
    parts = path.split(os.sep)
    if any(part in EXCLUDED_DIRS for part in parts):
        return True
    if os.path.basename(path) in EXCLUDED_FILES:
        return True
    return False

def collect_files(root_dir):
    """Recursively collect all file paths excluding specific files and directories."""
    files_to_parse = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Modify dirnames in-place to skip excluded directories
        dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS]
        for filename in filenames:
            full_path = os.path.join(dirpath, filename)
            rel_path = os.path.relpath(full_path, root_dir)
            if not should_exclude(rel_path):
                files_to_parse.append(rel_path)
    return files_to_parse

def write_output(root_dir, files):
    """Write all file contents to the output markdown file."""
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        for file in files:
            out.write(f"# {file}\n")
            file_path = os.path.join(root_dir, file)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                out.write(content + "\n\n")
            except Exception as e:
                print(f"Error reading {file_path}: {e}")

if __name__ == "__main__":
    ROOT_DIR = "."  # Change this if needed
    files = collect_files(ROOT_DIR)
    write_output(ROOT_DIR, files)
    print(f"All content has been written to {OUTPUT_FILE}")

