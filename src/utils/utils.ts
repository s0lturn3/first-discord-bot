import fs from 'fs';
import path from 'path';

/**
 * Recursively scans a directory for files matching a specific extension.
 * @param directory Target directory path.
 * @param extension Target extension including or excluding the dot (e.g., '.json' or 'json').
 */
export async function getFilesRecursive(directory: string, extension: string): Promise<string[]> {
    const targetExt = extension.startsWith('.') ? extension.toLowerCase() : `.${extension.toLowerCase()}`;
    let results: string[] = [];

    // Read directory entries as Dirent objects to avoid extra stat calls
    const entries = fs.readdirSync(directory, { withFileTypes: true, recursive: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        const index = entry.name.indexOf('.');
        const fullExt = entry.name.substring(index, entry.name.length);

        if (entry.isDirectory()) {
            // Recursively fetch files from subdirectories and merge
            results = results.concat(await getFilesRecursive(fullPath, targetExt));
        }
        else if (entry.isFile() && fullExt.toLowerCase() === targetExt) {
            results.push(fullPath);
        }
    }

    return results;
}