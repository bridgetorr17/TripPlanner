import express from 'express';
import * as tripController from '../controllers/trips.js';
import * as editTripController from '../controllers/editing.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

//tripController
router.get('/createNew', tripController.getCreateNewTrip);
router.post('/createNew', tripController.postCreateNewTrip);
router.delete('/delete/:id', tripController.deleteTrip);
router.get('/:id', ensureAuth, tripController.getTrip);
router.get('/sharedTrip/:id', tripController.getSharedTrip);

//editTripController
router.put('/removeLocation/:id', editTripController.removeLocation);
router.get('/edit/:id', editTripController.getEditTrip);
router.put('/edit/:id', editTripController.putTripLocationUpdate);
router.put('/edit/:id/friends', editTripController.putNewContributors);
router.get('/edit/:id/aiSuggestion', editTripController.getSuggestion);

export {router};