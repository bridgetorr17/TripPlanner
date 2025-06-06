import Trip from '../models/Trip.js';

const getTrip = (req, res) => {

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

export {getTrip, getCreateNewTrip, postCreateNewTrip};