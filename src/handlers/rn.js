import { isAbsolute, join, resolve } from 'path';
import { validPath, currentLocation } from '../utils/helpers.js'
import fs from 'fs/promises';

export const rn = async (currentPath, name, newName) => {
    let oldPath = isAbsolute(name) ? name : join(currentPath, name);
    const newPath = isAbsolute(newName) ? name : join(currentPath, newName);
    let valid = await validPath(oldPath);

    if(valid) {
        try{
            await fs.rename(oldPath, newPath);
            currentLocation(currentPath);
        } catch (err) {
            console.error('Operation failed');
        }
    } else {
        console.log(`File "${name}" not found. Try again!`);
    }
}