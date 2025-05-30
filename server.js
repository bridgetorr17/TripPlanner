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

app.use(express.static('public'));

//routers
import {router as homeRoutes} from './routes/home.js';

//use routers
app.use('/', homeRoutes);

app.listen(8000, () => {
    console.log('server running');
})