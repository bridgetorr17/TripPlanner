import express from 'express';
import * as homeController from '../controllers/home.js';

const router = express.Router();

router.get('/', homeController.getHomePage);
router.get('/login', homeController.getLogin);
router.post('/login', homeController.postLogin);
router.get('/logout', homeController.logout);
router.get('/signup', homeController.getSignup);
router.post('/signup', homeController.postSignup);

export {router}