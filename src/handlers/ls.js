import fs from 'fs';
import { currentLocation } from '../utils/helpers.js';

export const ls = async (currentPath) => {
    let list = [];
    try {
        await fs.readdir(currentPath, { withFileTypes: true }, (err, files) => {
            if(err) throw err
            files.forEach(file => {
                list.push({
                    Name: file.name,
                    Type: file.isDirectory() ? 'directory' : 'file'
                });
            });
            const sortList = list.sort();
            console.table(sortList);
            currentLocation(currentPath);
        })
    } catch (err) {
        console.error('Operation failed');
    }
}