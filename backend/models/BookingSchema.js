const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    Booking_id: {
        type: String,
        required: true
    },
    Event_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    Ticket:{
        type:Number,
        required:true
    }
})

const Booking = mongoose.model("Booking",BookingSchema);
module.exports = Booking;