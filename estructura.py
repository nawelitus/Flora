import os

def list_files_and_folders(start_path=".", indent=0, exclude_dirs=None):
    """Recursively lists all files and folders starting from start_path."""
    if exclude_dirs is None:
        exclude_dirs = []

    try:
        items = sorted(os.listdir(start_path))
    except PermissionError:
        print(" " * indent + "[Permission Denied]")
        return

    for item in items:
        item_path = os.path.join(start_path, item)
        if os.path.isdir(item_path):
            if item not in exclude_dirs:
                print(" " * indent + f"├── /{item}")
                list_files_and_folders(item_path, indent + 4, exclude_dirs)
        else:
            print(" " * indent + f"├── {item}")

def save_structure_to_file(start_path=".", output_file="project_structure.txt", exclude_dirs=None):
    """Saves the structure of files and folders to a file."""
    if exclude_dirs is None:
        exclude_dirs = []

    with open(output_file, "w") as f:
        def recursive_write(path, indent):
            try:
                items = sorted(os.listdir(path))
            except PermissionError:
                f.write(" " * indent + "[Permission Denied]\n")
                return

            for item in items:
                item_path = os.path.join(path, item)
                if os.path.isdir(item_path):
                    if item not in exclude_dirs:
                        f.write(" " * indent + f"├── /{item}\n")
                        recursive_write(item_path, indent + 4)
                else:
                    f.write(" " * indent + f"├── {item}\n")

        f.write(f"Structure of {os.path.abspath(start_path)}:\n")
        recursive_write(start_path, 0)

if __name__ == "__main__":
    project_path = input("Enter the path to the React Vite project (default is current directory): ") or "."
    print("\nProject structure:\n")
    list_files_and_folders(project_path, exclude_dirs=["node_modules"])

    save_option = input("\nDo you want to save the structure to a file? (y/n): ").lower()
    if save_option == "y":
        output_file = input("Enter the output file name (default: project_structure.txt): ") or "project_structure.txt"
        save_structure_to_file(project_path, output_file, exclude_dirs=["node_modules"])
        print(f"\nStructure saved to {output_file}")
