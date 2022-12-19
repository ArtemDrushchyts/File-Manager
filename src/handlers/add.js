import { isAbsolute, join } from 'path';
import fs from 'fs/promises';
import { currentLocation } from '../utils/helpers.js';

export const add = async (currentPath, args) => {
    const newPath = isAbsolute(args) ? args : join(currentPath, args);
    try{
        await fs.writeFile(newPath, '');
        currentLocation(currentPath);
    } catch (err) {
        console.error('Operation failed');
    }
}