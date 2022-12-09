import {homedir} from 'os';

function fileManager() {
    // console.log('file manager project start');
    console.log(process.argv);
    const user = process.argv.slice(3);
    let userName = process.argv.splice(3)[0].slice(11);
    console.log(userName);
    console.log(homedir())
}

fileManager();