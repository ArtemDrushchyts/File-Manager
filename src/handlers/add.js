import { isAbsolute, join } from 'path';
import fs, { constants } from 'fs/promises';

export const add = async (currentPath, args) => {
    const newPath = isAbsolute(args) ? args : join(currentPath, args);
    try{
        await fs.access(newPath, constants.R_OK | constants.W_OK);
        await fs.readFile(newPath, '', 'utf8');
    } catch (err) {
        console.error('Operation failed');
    }
}