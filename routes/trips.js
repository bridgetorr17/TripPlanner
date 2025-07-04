import express from 'express';
import * as tripController from '../controllers/trips.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/createNew', tripController.getCreateNewTrip);
router.post('/createNew', tripController.postCreateNewTrip);

router.get('/edit/:id/aiSuggestion', tripController.getSuggestion);

router.delete('/delete/:id', tripController.deleteTrip);

router.get('/edit/:id', tripController.getEditTrip);
router.put('/edit/:id', tripController.putTripLocationUpdate);
router.put('/edit/:id/friends', tripController.putNewContributors);

router.get('/:id', ensureAuth, tripController.getTrip);
router.get('/sharedTrip/:id', tripController.getSharedTrip);

export {router};