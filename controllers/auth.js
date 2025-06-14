import passport from 'passport';
import validator from 'validator';
import User from '../models/User.js';
import { networkInterfaces } from 'os';

 const getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/dashboard')
    }
    res.render('login', { })
  }
  
const postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    // passport.authenticate('local', (err, user, info) => {
    //   if (err) { return next(err) }
    //   if (!user) {
    //     req.flash('errors', info)
    //     return res.redirect('/login')
    //   }
    //   req.logIn(user, (err) => {
    //     if (err) { return next(err) }
    //     req.flash('success', { msg: 'Success! You are logged in.' })
    //     res.redirect(req.session.returnTo || '/dashboard')
    //   })
    // })(req, res, next)
    passport.authenticate('local', {
      successReturnToOrRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true,
      keepSessionInfo: true,
    })(req, res, next);
  }
  
const logout = (req, res, next) => {
    console.log('session might not be defined', req.session);
    req.logout((err) => {
        if(err) { 
            console.error('Logout error', err)
            return next(err) 
        }
        console.log('after logout, session: ', req.session);
        
        req.session.destroy((err) => {
            if (err){
                console.log('Error : Failed to destroy the session during logout.', err)
                return next(err)
            }
            //res.clearCookie('connect.sid');
            res.redirect('/')
        })
        console.log('User has logged out.')
    })
  }
  
const getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/dashboard')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
const postSignup = async (req, res, next) => {
    try{
        const validationErrors = []
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
        if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
    
        if (validationErrors.length > 0) {
            console.log('here1')
            req.flash('errors', validationErrors)
            return res.redirect('../signup')
        }
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    
        const existingUser = await User.findOne({$or: [
            {email: req.body.email},
            {userName: req.body.userName}]})
            
        if(existingUser){
            console.log('here2')
            req.flash('errors', { msg: 'Account with that email address or username already exists.' })
            return res.redirect('../signup')
        }

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        req.logIn(user, (err) => {
            if(err){
                console.log('here3');
                console.log(err);
                return next(err)
            }
            console.log('redirecting to dashboard GET hopefully')
            return res.redirect('/dashboard')
        })
    }
    catch(err){
        console.log('here4')
        return next(err)
    }
  }

  export { getLogin, postLogin, logout, getSignup, postSignup}