import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DB_STRING)

        console.log(`mongodb connection: ${conn.connection.host}`)
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

export { connectDB };