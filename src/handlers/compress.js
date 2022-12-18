import { resolve, parse } from 'path';
import fs from 'fs/promises';
import { createReadStream, createWriteStream, constants } from 'fs';
import { createBrotliCompress } from 'zlib';

export const compress = async (currentPath, pathToFile, pathToDestination) => {
    const fileDir = resolve(currentPath, pathToFile);
    const newPathDir = resolve(currentPath, pathToDestination);
    const { base } = parse(fileDir);
    const newPathWithFileExt = resolve(newPathDir, base.endsWith('.br') ? base : base + '.br')

    try {
        await fs.access(fileDir, constants.R_OK | constants.W_OK);
        await fs.access(newPathDir, constants.R_OK | constants.W_OK);
        const readStream = createReadStream(fileDir);
        const writeStream = createWriteStream(newPathWithFileExt);
        const archiveToBr = createBrotliCompress();
        
        readStream.pipe(archiveToBr).pipe(writeStream);
    } catch (err) {
        console.error('Operation failed');
    }
}