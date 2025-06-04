import path from 'path';

const getHomePage = (req, res) => {
    const parentDir = path.dirname(import.meta.dirname);
    const pathName = path.join(parentDir, 'public', 'home.html');
    res.sendFile(pathName);
}

const getLoginPage = (req, res) => {
    try{
        console.log('rendering the login')
        res.render('login.ejs', { error: [] })
    }
    catch(err){
        console.error(err);
    }
}

export {getHomePage, getLoginPage};