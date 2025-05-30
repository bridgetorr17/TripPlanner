import path from 'path';

const getHomePage = (req, res) => {
    const parentDir = path.dirname(import.meta.dirname);
    const pathName = path.join(parentDir, 'public', 'home.html');
    res.sendFile(pathName);
}

const getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
}

const postLogin = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
}

const logout = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
}

const getSignup = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
}

const postSignup = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
}

export {getHomePage, getLogin, postLogin, logout, getSignup, postSignup};