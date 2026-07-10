import path = require("node:path");
import * as fs from "node:fs";

const PROJECT_ROOT = process.cwd();

export function getUploadFilePath(fileName: string): string {
    const p = path.join(PROJECT_ROOT, "uploadFiles", fileName);
    if (!fs.existsSync(p)) {
        throw new Error(`Upload file not found: ${p}`);
    }
    return p;
}
