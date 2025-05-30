import express from 'express';
const router = express.Router();

import dashboardController from '../controllers/dashboard';

router.get('/', dashboardController.getDashboard);
router.get('/userTrips', dashboardController.getUserTrips);
router.get('/sharedTrips', dashboardController.getSharedTrips);

export {router};