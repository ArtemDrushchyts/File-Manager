import { join } from 'path';

export const up = (path) => {
    return join(path, '..');
};