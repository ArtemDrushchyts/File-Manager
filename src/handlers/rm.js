import fs from 'fs/promises';
import { constants } from 'fs';
import { resolve } from 'path';

export const rm = async (currentPath, arg) => {
    const pathToFile = resolve(currentPath, arg);
    try {
        await fs.access(pathToFile, constants.R_OK | constants.W_OK);
        await fs.unlink(pathToFile);
    } catch (err) {
        console.error('Operation failed');
    }
}