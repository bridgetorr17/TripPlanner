const ensureAuth = (req, res, next) => {
        if(req.isAuthenticated()){
            console.log('yes were authenticated')
            return next();
        }
        else{
            res.redirect('/')
        }
    }

export { ensureAuth }