import Trip from '../models/Trip.js';
import User from '../models/User.js';
import {tripDetails} from '../middleware/tripDetails.js';
import { createPartFromFunctionResponse, GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

const getTrip = async (req, res) => {
    try{
        const tripId = req.params.id;
        const details = await tripDetails(tripId);

        console.log(details);
        res.render('viewTrip.ejs', {trip: details})
    }
    catch(err){
        console.error(err);
    }
}

const getCreateNewTrip = async (req, res) => {
    console.log('creating new trip')
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
const deleteTrip = async (req, res) => {
    console.log('delete trip function reached');
    try{
        await Trip.findOneAndDelete({_id: req.params.id});
        console.log('deleted and redirected')
        res.redirect('/dashboard');
    }
    catch(err){
        console.error(err);
    }
}

export {getTrip, 
        getCreateNewTrip, 
        postCreateNewTrip, 
        deleteTrip};