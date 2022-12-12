import { isAbsolute, join, resolve } from 'path';
import { validPath } from '../utils/helpers.js'
import fs from 'fs/promises';

export const rn = async (currentPath, name, newName) => {
    let oldPath = isAbsolute(name) ? name : join(currentPath, name);
    const newPath = isAbsolute(newName) ? name : join(currentPath, newName);
    let valid = await validPath(oldPath);

    if(valid) {
        try{
            await fs.rename(oldPath, newPath);
        } catch (err) {
            console.error('Operation failed');
        }
    } else {
        console.log(`File "${name}" not found. Try again!`);
    }
}