import Trip from '../models/Trip.js';
import User from '../models/User.js';

const tripDetails = async (tripId) => {
    const trip = await Trip.findById(tripId).lean();
    const creator = await User.findById(trip.createdBy);
    const creatorName = creator.userName;

    const tripContributors = trip.contributors;
    let contNames = [];
    if(tripContributors[0] !== null) {
        contNames = await Promise.all(
            tripContributors.map(async (cont) => {
                const contUser = await User.findById(cont);
                return contUser.userName;
            })
        )
    }

    return {
        trip: trip,
        creator: creatorName,
        contributors: contNames
    }
}

export { tripDetails }