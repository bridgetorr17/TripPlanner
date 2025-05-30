//express
import express from 'express';
const app = express();

//mongodb
import mongoose from 'mongoose';
import {connectDB} from './config/database.js';

//env variables
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

connectDB();

//routers


app.listen(8000, () => {
    console.log('server running');
})