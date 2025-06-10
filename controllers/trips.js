import Trip from '../models/Trip.js';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

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

const getSuggestion = async (req, res) => {
    try{
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

        const tripId = req.params.id;
        const tripStops = await Trip.findById(tripId).tripStops;

        console.log(tripStops);
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

export {getTrip, getCreateNewTrip, postCreateNewTrip, updateTrip, getSuggestion, deleteTrip};