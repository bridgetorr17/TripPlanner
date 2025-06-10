import Trip from '../models/Trip.js';

const getTrip = async (req, res) => {
    try{
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId).lean();
        res.render('viewTrip.ejs', {trip: trip})
    }
    catch(err){
        console.error(err);
    }
}

const getCreateNewTrip = async (req, res) => {
    try{
        res.render('createTrip.ejs')
    }
    catch(err){
        console.error(err);
    }
}

const postCreateNewTrip = async (req, res) => {
    try{
        await Trip.create({
            tripName: req.body.tripName,
            tripOrigin: req.body.tripOrigin,
            tripStops: Array.isArray(req.body.tripStops) ? req.body.tripStops : [req.body.tripStops],
            createdBy: req.user._id
        });

        console.log('Trip has been create');

        res.redirect('/dashboard');
    }
    catch(err) {
        console.error(err);
    }
}

const updateTrip = async (req, res) => {
    try{
        const newStops = req.body.newStops;
        const tripId = req.params.id;

        if(!Array.isArray(newStops)){
            return res.status(400).sed('newStops must be an array');
        }

        const trip = await Trip.findById(tripId);

        if(!trip){
            return res.status(404).send('Trip not found');
        }

        await Trip.updateOne(
            {_id: tripId},
            {$push : {
                tripStops : {
                    $each: newStops,
                    $position: trip.tripStops.length
                }
            }
        });

        res.status(200).send('Trip stops updated successfully')
    }
    catch(err){
        console.error(err);
    }
}

const deleteTrip = async (req, res) => {
    try{
        await Trip.findOneAndDelete({_id: req.body.tripId});
        console.log('Deleted Trip');
        res.redirect('/dashboard');
    }
    catch(err){
        console.error(err);
    }
}

export {getTrip, getCreateNewTrip, postCreateNewTrip, updateTrip, deleteTrip};