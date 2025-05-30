import express from 'express';
const router = express.Router();

import tripController from '../controllers/trip';

router.get('/', tripController.getTripPage);
router.get('/:id', tripController.getTripInfo);

router.get('/createNew', tripController.getCreateNewTripPage);
router.post('/createNew', tripController.createNewTrip);

router.put('/edit/:id', tripController.editTrip);
router.delete('/:id', tripController.deleteTrip);

export {router};