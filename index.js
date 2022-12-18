import readline from 'readline';
import { up, cd, ls, cat, add, rn, cp, mv, rm, os, hash, compress, decompress } from './src/handlers/handlers.js';
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
        // prompt: currentLocation(currentDir)
    });

    rl.on('line', async (line) => {
        line = line.trim();
        let [command, ...args] = line.split(' ');

        switch(true) {
            case command === '.exit':
                rl.close();
                break;
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
                currentLocation(currentDir);
                break;
            case command === 'cat':
                await cat(currentDir, args[0]);
                currentLocation(currentDir);
                break;
            case command === 'add':
                await add(currentDir, args[0]);
                currentLocation(currentDir);
                break;
            case command === 'rn':
                await rn(currentDir, args[0], args[1]);
                currentLocation(currentDir);
                break;
            case command === 'cp':
                await cp(currentDir, args[0], args[1]);
                currentLocation(currentDir);
                break;
            case command === 'mv':
                await mv(currentDir, args[0], args[1]);
                currentLocation(currentDir);
                break;
            case command === 'rm':
                await rm(currentDir, args[0]);
                currentLocation(currentDir);
                break;
            case command === 'os':
                await os(currentDir, args[0]);
                currentLocation(currentDir);
                break;
            case command === 'hash':
                await hash(currentDir, args[0]);
                currentLocation(currentDir);
                break;
            case command === 'compress':
                await compress(currentDir, args[0], args[1]);
                currentLocation(currentDir);
                break;
            case command === 'decompress':
                await decompress(currentDir, args[0], args[1]);
                currentLocation(currentDir);
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