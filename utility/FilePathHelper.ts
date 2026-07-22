import path from 'path';
import fs from 'fs';

const PROJECT_ROOT = process.cwd();

export function getUploadFilePath(fileName: string): string {
    const filePath = path.join(PROJECT_ROOT, "uploadFiles", fileName);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Upload file not found: ${filePath}`);
    }
    return filePath;
}

export function getAuthFilePath(fileName: string): string {
    const filePath = path.join(PROJECT_ROOT, "Auth", `${fileName}.json`);
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    return filePath;
}

export function getAuthSetupFilePath(): string {
    return path.join(PROJECT_ROOT, "Auth", `auth.setup.ts`);
}
