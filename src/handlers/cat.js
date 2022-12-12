import { isAbsolute, join, resolve } from 'path';
import { createReadStream } from 'fs';
import { validPath } from '../utils/helpers.js'

export const cat = async (currentPath, args) => {
    let newPath = isAbsolute(args) ? args : join(currentPath, args);
    let valid = await validPath(newPath);

    if(valid) {
        try{
            newPath = resolve(newPath)
            const readStream = createReadStream(newPath, { encoding: 'utf8' });
            readStream.on('data', (chunk) => {
                process.stdout.write(chunk);
            });
            readStream.on('end', () => {
                readStream.destroy()
                console.log('\nFile has been read');
            })
        } catch (err) {
            console.error('Operation failed');
        }
    } else {
        console.log(`File "${args}" not found. Try again!`);
    }

}