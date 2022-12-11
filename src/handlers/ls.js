import fs from 'fs';

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
            const sortList = list.sort()
            console.table(sortList)
        })
    } catch (err) {
        console.error('Operation failed');
    }
}