import express from 'express';
const app = express();

import mongoose from 'mongoose';
import {connectDB} from './config/database.js';

import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

connectDB();

app.listen(8000, () => {
    console.log('server running');
})