import express from 'express';
import * as tripController from '../controllers/trips.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/createNew', tripController.getCreateNewTrip);
router.post('/createNew', tripController.postCreateNewTrip);
router.get('/edit/aiSuggestion/:id', tripController.getSuggestion);
router.delete('/delete', tripController.deleteTrip);
router.get('/:id', ensureAuth, tripController.getTrip);
router.get('/sharedTrip/:id', tripController.getSharedTrip);
router.put('/edit/:id', tripController.updateTrip);
router.put('/edit/:id/friends', tripController.addFriends);

export {router};