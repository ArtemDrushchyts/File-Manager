import { access } from 'fs/promises';
import { constants } from 'fs';

export const getUserName = (args) => {
    return args[0].split('=')[1] || 'Anonymous';
};

export const currentLocation = (path) => {
    return console.log(`You are currently in ${path}`);
};

export const validPath = async (path) => {
    try {
        await access(path, constants.R_OK | constants.W_OK);
        return true;
    } catch (err) {
        return false;
    }
}