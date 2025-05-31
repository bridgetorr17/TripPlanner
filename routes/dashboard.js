import express from 'express';
import * as dashboardController from '../controllers/dashboard.js';

const router = express.Router();
router.get('/', dashboardController.getDashboard);

router.get('/userTrips', dashboardController.getUserTrips);
router.get('/sharedTrips', dashboardController.getSharedTrips);
console.log('here')
export {router};