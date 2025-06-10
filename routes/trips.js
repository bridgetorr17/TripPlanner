import express from 'express';
import * as tripController from '../controllers/trips.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/createNew', tripController.getCreateNewTrip);
router.post('/createNew', tripController.postCreateNewTrip);
router.get('/:id', ensureAuth, tripController.getTrip);
router.put('/edit/:id', tripController.updateTrip);
router.delete('/delete', tripController.deleteTrip);

export {router};