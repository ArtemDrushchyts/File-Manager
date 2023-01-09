import { resolve } from 'path';
import fs from 'fs/promises';
import { constants } from 'fs';
import { createHash } from 'crypto';

export const hash = async (currentPath, arg) => {
    const pathToFile = resolve(currentPath, arg);
    try {
        await fs.access(pathToFile, constants.R_OK | constants.W_OK);
        const content = await fs.readFile(pathToFile, { encoding: 'utf-8' });
        const hash = createHash('sha256').update(content).digest('hex');
        console.log(hash);
    } catch (err) {
        console.error('Operation failed');
    }
}