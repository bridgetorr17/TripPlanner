import Trip from '../models/Trip.js';
import User from '../models/User.js';
import {tripDetails} from '../middleware/tripDetails.js';
import { createPartFromFunctionResponse, GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

const getEditTrip = async (req, res) => {
    try{
        const tripId = req.params.id;
        const details = await tripDetails(tripId);

        console.log(req.user.id)
        console.log(details.trip.createdBy.toString())

        res.render('editTrip.ejs', {trip: details,
                                    ai: {
                                        suggestion: '',
                                        reason: '',
                                        action: 'GET',
                                        actionName: 'Get suggested location'
                                    },
                                    user: req.user
        })
    }
    catch(err){
        console.error(err);
    }
}

const removeLocation = async (req, res) => {
    try{
        const tripId = req.params.id;
        const location = req.query.location;

        await Trip.findByIdAndUpdate(
            tripId,
            { $pull : { tripStops: location } },
            { new: true}
        );

        const details = await tripDetails(tripId);

        res.render('editTrip.ejs', {trip: details,
                                    ai: {
                                        suggestion: '',
                                        reason: '',
                                        action: 'GET',
                                        actionName: 'Get suggested location'
                                    },
                                    user: req.user
        })
    }
    catch(err){
        console.error(err);
    }
}

const addLocation = async (req, res) => {
    try{
        const tripId = req.params.id;
        const newLocation = req.body.newLocation;

        await Trip.findByIdAndUpdate(
            tripId,
            { $push: { tripStops: newLocation } },
            { new: true }
        );

        const details = await tripDetails(tripId);
        console.log(details);
        res.render('editTrip.ejs', {trip: details,
                                    ai: {
                                        suggestion: '',
                                        reason: '',
                                        action: 'GET',
                                        actionName: 'Get suggested location'
                                    },
                                    user: req.user
        })
    }
    catch(err){
        console.error(err);
    }
}

const putNewContributors = async (req, res) => {
    try{
        const newContributor = req.body.newTripper;
        const tripId = req.params.id;
        console.log(`friend to add: ${newContributor}`)

        const newCont = await User.findOne({ userName: newContributor });

        //trip that is being updated
        const trip = await Trip.findById(tripId);

        //add new contributors to trip by id(if not already there)
        await Trip.findByIdAndUpdate(
            tripId,
            { $push: {contributors: newCont._id} },
            {new: true}
        );

        const details = await tripDetails(tripId);

        console.log(details);
        res.render('editTrip.ejs', {trip: details,
                                    ai: {
                                        suggestion: '',
                                        reason: '',
                                        action: 'GET',
                                        actionName: 'Get suggested location'
                                    },
                                    user: req.user
        })
    }
    catch(err){
        console.error(err);
    }
}

const getSuggestion = async (req, res) => {

    try{
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

        const tripId = req.params.id;
        const details = await tripDetails(tripId);

        //request to gemini
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Consider these locations on a trip: ${details.trip.tripStops}. Return the full trip, 
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

        const parsed = JSON.parse(response.text);

        res.render('editTrip.ejs', {trip: details,
                                    ai: {
                                        suggestion: parsed.addedStop,
                                        reason: parsed.reason,
                                        action: 'PUT',
                                        actionName: 'Add suggested location'
                                    },
                                    user: req.user
        })

    }
    catch(err){
        console.error(err);
    }
}


export {getEditTrip,
        removeLocation,
        addLocation, 
        putNewContributors, 
        getSuggestion};