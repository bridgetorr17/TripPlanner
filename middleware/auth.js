const ensureAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/')
    }
}

const forwardAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/dashboard');
    }
    else{
        return next();
    }
}

export { ensureAuth, forwardAuth }