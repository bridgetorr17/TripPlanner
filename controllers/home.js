import path from 'path';

const getHomePage = (req, res) => {
    const parentDir = path.dirname(import.meta.dirname);
    const pathName = path.join(parentDir, 'public', 'home.html');
    res.sendFile(pathName);
}

export {getHomePage};