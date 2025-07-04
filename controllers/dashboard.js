import Trip from '../models/Trip.js'

const getDashboard = async (req, res) => {
    try{
        let userTrips = await Trip.find({createdBy:req.user.id})
        let sharedTrips = await Trip.find({contributors: { $all: [req.user.id]}})
        res.render('dashboard.ejs', { 
            name: req.user.userName,
            userTrips: userTrips,
            sharedTrips: sharedTrips});
    }
    catch(err){
        console.error(err);
    }
}

export { getDashboard}