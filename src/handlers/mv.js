import fs from 'fs/promises';
import { cp } from './cp.js';

export const mv = async (currentPath, pathToFile, pathToNewDir) => {
    const remove = async (path) => {
        await fs.unlink(path)
    }
    await cp(currentPath, pathToFile, pathToNewDir, remove);
}