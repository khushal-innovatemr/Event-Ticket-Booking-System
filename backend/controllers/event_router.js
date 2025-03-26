const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const { v4: uuidv4 } = require('uuid');
const db = require('../dbconfig');
const dotenv = require('dotenv');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const Event = require('../models/EventSchema');

db;
dotenv.config();

app.use(express.json())     
app.use(bodyParser.json());


router.post('/add-event',async(req,res) => {
    const {name,Event_date,ticket_price,venue,description,image_url,type,avail_ticket} = req.body;
    const Event_id = uuidv4();

    try{
        let event = await Event.findOne({name});
        if (event) return res.status(400).send({ error: "Event Already Exists" });

        event = new Event({name,Event_date,Event_id,ticket_price,venue,description,image_url,type,avail_ticket})
        await event.save();
        return res.send({msg:"Event Registered Succesfully"})
    }
    catch(error){
        console.error("Event Registration error:", error);
        res.status(500).json({ error: "Server Error" });
    }
})

router.get('/view-event', async (req, res) => {
  try {
      console.log("sadddddddddddddd");
      const ViewEvents = await Event.find({}, 'name description Event_id Event_date ticket_price venue type avail_ticket');
      console.log(ViewEvents);
      if (!ViewEvents || ViewEvents.length === 0) {
          return res.status(204).json({ message: "No Events found" }); 
      }
      return res.json(ViewEvents);
  } catch (err) {
      console.error("View tasks error:", err);
      return res.status(500).json({ error: "Server Error" });
  }
});


module.exports = router;
