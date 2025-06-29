import Trip from '../models/Trip.js';
import User from '../models/User.js';
import { createPartFromFunctionResponse, GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

const getTrip = async (req, res) => {
    try{
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId).lean();
        const creator = await User.findById(trip.createdBy);
        const creatorName = creator.userName;

        const tripContributors = trip.contributors;
        
        const contNames = await Promise.all(
            tripContributors.map(async (cont) => {
                const contUser = await User.findById(cont);
                return contUser.userName;
            })
        )

        res.render('viewTrip.ejs', {trip: trip,
                                    creator: creatorName,
                                    contributors: contNames
        })
    }
    catch(err){
        console.error(err);
    }
}

const getSharedTrip = async (req, res) => {
    try{
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId).lean();
        const creator = await User.findById(trip.createdBy);
        const creatorName = creator.userName;

        const tripContributors = trip.contributors;
        
        const contNames = await Promise.all(
            tripContributors.map(async (cont) => {
                const contUser = await User.findById(cont);
                return contUser.userName;
            })
        )
        res.render('viewSharedTrip.ejs', {trip: trip,
                                    creator: creatorName,
                                    contributors: contNames
        })
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
    let contributors = req.body.tripContributors;

    if (!Array.isArray(contributors)) {
        contributors = [contributors];
    }

    console.log(contributors);

    const contributorIds = 
        await Promise.all(
            contributors.map(async (cont) => {
                console.log(`the first username is : ${cont}`);
                const user = await User.findOne({ userName: cont })
                return user ? user._id : null;
            })
        );

    try{
        await Trip.create({
            tripName: req.body.tripName,
            tripOrigin: req.body.tripOrigin,
            tripStops: Array.isArray(req.body.tripStops) ? req.body.tripStops : [req.body.tripStops],
            createdBy: req.user._id,
            contributors: contributorIds
        });

        res.redirect('/dashboard');
    }
    catch(err) {
        console.error(err);
    }
}

const putTripLocationUpdate = async (req, res) => {
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
            {$set: {
                tripStops: newStops
            }
        });

        res.status(200).send('Trip stops updated successfully')
    }
    catch(err){
        console.error(err);
    }
}

const putNewContributors = async (req, res) => {
    try{
        const newContributors = req.body.newContributors;
        const tripId = req.params.id;
        console.log(`friends to add: ${newContributors}`)

        if(!Array.isArray(newContributors)){
            return res.status(400).sed('newStops must be an array');
        }

        const newContributorIds = await Promise.all(
            newContributors.map(async (cont) => {
                const user = await User.findOne({ userName: cont })
                return user ? user._id : null;
            })
        );

        //trip that is being updated
        const trip = await Trip.findById(tripId);

        const validIds = newContributorIds.filter(id => id && id.toString() !== trip.createdBy.toString);

        //add new contributors to trip by id(if not already there)
        await Trip.findByIdAndUpdate(
            tripId,
            { $addToSet: {contributors: {$each: validIds} } },
            {new: true}
        );

        // Respond with JSON and redirect info
        return res.json({ success: true, redirectTo: `/trips/${tripId}` });
    }
    catch(err){
        console.error(err);
    }
}

const getSuggestion = async (req, res) => {
    try{
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

        const tripId = req.params.id;
        const trip = await Trip.findById(tripId);
        let tripStops = trip.tripStops;

        //request to gemini
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Consider these locations on a trip: ${tripStops}. Return the full trip, 
            with one added location at the logical positin in the array. Include the reason why 
            this would be a good addition in the 'reason' property. You should only include the 
            reason for your addition, not the already exisiting locations.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: 'object',
                    properties: {
                        tripStops: {
                            type: 'array',
                            items: { type: 'string'}
                        },
                        reason: {type: 'string'},
                        addedStop: {type: 'string'}
                    },
                    required: ['tripStops', 'reason']
                }
            }
        });

        const responseJSON = {
            'aiSuggestion' : response.text,
            'originalTrip' : tripStops
        }

        res.status(200).json(responseJSON);
    }
    catch(err){
        console.error(err);
    }
}

const deleteTrip = async (req, res) => {
    try{
        await Trip.findOneAndDelete({_id: req.body.tripId});
        res.redirect('/dashboard');
    }
    catch(err){
        console.error(err);
    }
}

export {getTrip, 
        getSharedTrip, 
        getCreateNewTrip, 
        postCreateNewTrip, 
        putTripLocationUpdate, 
        putNewContributors, 
        getSuggestion, 
        deleteTrip};