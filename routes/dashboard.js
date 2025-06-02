import express from 'express';
import * as dashboardController from '../controllers/dashboard.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();
router.get('/', ensureAuth, dashboardController.getDashboard);

router.get('/userTrips', dashboardController.getUserTrips);
router.get('/sharedTrips', dashboardController.getSharedTrips);

export {router};