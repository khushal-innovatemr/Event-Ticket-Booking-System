const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    booking_date:{type:Date,default:Date.now()},
    Booking_id:{type:String,required:true,ref:'User'},
    Event_id:{type:String,required:true,ref:'Event'},
    tickets_left:{type:Number,required:true}
})

const Booking = mongoose.model("Event",BookingSchema);
module.exports = Booking;