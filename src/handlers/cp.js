import { createReadStream, createWriteStream, constants } from 'fs';
import fs from 'fs/promises';
import { resolve, parse } from 'path';
import { currentLocation } from '../utils/helpers.js';

export const cp = async (currentPath, pathToFile, pathToNewDir, remove) => {

    let oldPath = resolve(currentPath, pathToFile);
    const { base } = parse(oldPath);
    let newPath = resolve(currentPath, pathToNewDir)
    let newPathFile = resolve(currentPath, pathToNewDir, base);

    try {
        await fs.access(oldPath, constants.R_OK | constants.W_OK);
        await fs.access(newPath, constants.R_OK | constants.W_OK);
        const readStream = createReadStream(oldPath);
        const writeStream = createWriteStream(newPathFile);
        await readStream.pipe(writeStream).on('finish', () => {
            if(remove) {
                remove(oldPath);
                console.log(`File ${base} successfully moved to ${newPath}`)
            } else {
                console.log(`File ${base} successfully copied to ${newPath}`);
            }
            currentLocation(currentPath);
        })
    } catch (err) {
        console.error('Operation failed');
    }
}