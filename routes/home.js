import express from 'express';
import * as homeController from '../controllers/home.js';
import * as authController from '../controllers/auth.js';
import { forwardAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', homeController.getHomePage);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getlogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

export {router}