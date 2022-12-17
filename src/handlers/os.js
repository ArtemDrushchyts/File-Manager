import { EOL, cpus, userInfo, arch } from 'os';

export const os = async (currentPath, arg) => {
    try {
        const { username, homedir } = userInfo();
        const cpusInformation = () => {
            const info = cpus().map(({model, speed}, index) => {
                const Speed =  `${speed / 1000}GHz`;
                const Model = model
                const CPU = index + 1;
                return { CPU, Model , Speed }
            })
            return info
        }

        const osParam = {
            '--EOL': JSON.stringify(EOL),
            '--cpus': cpusInformation(),
            '--homedir': homedir,
            '--username': username,
            '--architecture': arch()
        }

        console.table(osParam[arg] || `parameter ${arg} specified incorrectly`)
    } catch (err) {
        console.error('Operation failed');
    }
}