//express
import express from 'express';
const app = express();

//mongodb
import mongoose, { mongo } from 'mongoose';
import {connectDB} from './config/database.js';

//env variables
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

//auth
import passport from './config/passport.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import flash from 'express-flash'

//method override
import methodOverride from 'method-override';

//routers
import {router as homeRoutes} from './routes/home.js';
import {router as dashboardRoutes} from './routes/dashboard.js';
import {router as tripRoutes} from './routes/trips.js';

connectDB();

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//for put and delete requests
app.use(methodOverride("_method"));

//sessions
const store = MongoStore.create({mongoUrl: process.env.DB_STRING})
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie:{
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//use routers
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/trips', tripRoutes);

app.listen(8000, () => {
    console.log('server running on port 8000');
})