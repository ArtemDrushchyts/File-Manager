import { resolve, parse } from 'path';
import fs from 'fs/promises';
import { createReadStream, createWriteStream, constants } from 'fs';
import { createBrotliDecompress  } from 'zlib';

export const decompress = async (currentPath, pathToFile, pathToDestination) => {
    const fileDir = resolve(currentPath, pathToFile);
    const newPathDir = resolve(currentPath, pathToDestination);
    const { base } = parse(fileDir);
    const newPath = resolve(newPathDir, base.replace('.br', ''));

    try {
        await fs.access(fileDir, constants.R_OK | constants.W_OK);
        await fs.access(newPathDir, constants.R_OK | constants.W_OK);
        const readStream = createReadStream(fileDir);
        const writeStream = createWriteStream(newPath);
        const unArchive = createBrotliDecompress();

        readStream.pipe(unArchive).pipe(writeStream);
    } catch (err) {
        console.error('Operation failed');
    }

}