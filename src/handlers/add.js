import { isAbsolute, join } from 'path';
import fs from 'fs/promises';

export const add = async (currentPath, args) => {
    const newPath = isAbsolute(args) ? args : join(currentPath, args);
    try{
        await fs.writeFile(newPath, '');
    } catch (err) {
        console.error('Operation failed');
    }
}