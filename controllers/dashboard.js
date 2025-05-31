export const getDashboard = (req, res) => {
    try{
        res.render('dashboard.ejs', { personalTrips: [] })
    }
    catch(err){
        console.error(err);
    }
}

export const getUserTrips = async (req, res) => {
    try{
        res.render('userTrips', { trips: [] });
    }
    catch(err){
        console.error(err);
    }
}

export const getSharedTrips = async (req, res) => {
    try{
        res.render('sharedTrips', { trips: [] });
    }
    catch(err){
        console.error(err);
    }
}