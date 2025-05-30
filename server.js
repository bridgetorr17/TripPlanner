import express from 'express';
const app = express();

import mongoose from 'mongoose';
import connectDB from './config/database';

connectDB();

app.listen(8000, () => {
    console.log('server running');
})