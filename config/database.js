import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: triggerAsyncId,
            useFindAndModify: false,
            useCreateIndex: true,
        })
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;