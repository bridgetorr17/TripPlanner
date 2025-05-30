import express from 'express';
router = express.Router();

import homeController from '../controllers/home';

router.get('/', homeController.getIndex);
router.get('/login', homeController.getLogin);
router.post('/login', homeController.postLogin);
router.get('/logout', homeController.logout);
router.get('/signup', homeController.getSignup);
router.post('/signup', homeController.postSignup);

export {router}