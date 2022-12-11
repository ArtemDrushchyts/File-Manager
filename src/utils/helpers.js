export const getUserName = (args) => {
    return args[0].split('=')[1] || 'Anonymous';
};

export const currentLocation = (path) => {
    return console.log(`You are currently in ${path}`);
};