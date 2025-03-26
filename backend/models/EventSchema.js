const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name:{type:String,required:true},
    Event_date:{type:Date,required:true},
    Event_id:{type:String,required:true}, 
    type:{type:String,enum:["Conferences","Seminar","Festive","TradeShow","Party","Club"]},
    ticket_price:{type:String,required:true},   
    venue:{type:String,required:true},
    description:{type:String,required:true},
    image_url:{type:String,required:true},
    avail_ticket:{type:Number,max:100},
})

const Event = mongoose.model("Events",EventSchema);
module.exports = Event;