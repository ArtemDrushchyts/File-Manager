import readline from 'readline';
import { up, cd, ls } from './src/handlers/handlers.js';
import { EOL, homedir } from 'os';
import { getUserName, currentLocation } from './src/utils/helpers.js';

const args = process.argv.slice(2);
let currentDir = homedir();

const fileManager = () => {

    const username = getUserName(args);
    process.stdout.write(`Welcome to the File Manager, ${username}! ${EOL}`);
    currentLocation(currentDir);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('line', async (line) => {
        line = line.trim();
        let [command, ...args] = line.split(' ');

        switch(true) {
            case command === 'up':
                currentDir = up(currentDir);
                currentLocation(currentDir);
                break;
            case command === 'cd':
                currentDir = await cd(currentDir, args[0]);
                currentLocation(currentDir);
                break;
            case command === 'ls':
                await ls(currentDir);
                break;
            default:
                console.log('Invalid input')
                break;
        }
    });

    rl.on('SIGINT', () => rl.close())
        .on('close', () => {
            process.stdout.write(`Thank you for using File Manager, ${username}, goodbye! ${EOL}`)
            process.exit(0);
        });
}

fileManager();