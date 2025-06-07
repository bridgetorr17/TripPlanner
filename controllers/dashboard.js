import Trip from '../models/Trip.js'

const getDashboard = async (req, res) => {
    try{
        let userTrips = await Trip.find({createdBy:req.user.id})
        res.render('dashboard.ejs', { 
            name: req.user.userName,
            userTrips: userTrips});
    }
    catch(err){
        console.error(err);
    }
}

const getUserTrips = async (req, res) => {
    try{
        res.render('userTrips', { trips: [] });
    }
    catch(err){
        console.error(err);
    }
}

const getSharedTrips = async (req, res) => {
    try{
        res.render('sharedTrips', { trips: [] });
    }
    catch(err){
        console.error(err);
    }
}

export { getDashboard, getUserTrips, getSharedTrips}