import { isAbsolute, join } from 'path';
import fs, { constants } from 'fs/promises';

export const cd = async (currentPath, args) => {
    const newPath = isAbsolute(args) ? args : join(currentPath, args);
    try {
        await fs.access(newPath, constants.R_OK | constants.W_OK)
        return newPath;
    } catch (err) {
        console.error('Operation failed');
        return currentPath;
    }
}