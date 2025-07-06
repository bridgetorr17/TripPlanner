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
router.get('/sharedTrip/:id', tripController.getTrip);

//editTripController
router.put('/removeLocation/:id', editTripController.removeLocation);
router.put('/addLocation/:id', editTripController.addLocation);
router.get('/aiSuggestion/:id', editTripController.getSuggestion);
router.put('/aiSuggestion/:id', editTripController.addLocation);
router.get('/edit/:id', editTripController.getEditTrip);
router.put('/addContributor/:id', editTripController.putNewContributors);


export {router};