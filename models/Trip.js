import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
    tripName:{
        type: String,
        required: true,
    },
    tripOrigin:{
        type: String,
        required: true,
    },
    tripStops: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contributors: [mongoose.Schema.Types.ObjectId]
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;