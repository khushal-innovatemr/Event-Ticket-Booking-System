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
const multer = require('multer');
const verify = require('../middleware/auth');
const Booking = require('../models/BookingSchema');

db;
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add-event', upload.single('image'), async (req, res) => {
    const { name, Event_date, ticket_price, venue, description, type, avail_ticket} = req.body;
    const Event_id = uuidv4();

    try {
        let event = await Event.findOne({ name });
        if (event) return res.status(400).send({ error: "Event Already Exists" });

        const imageData = req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null;

        event = new Event({ name, Event_date, Event_id, ticket_price, venue, description, type, image_url: imageData, avail_ticket });
        await event.save();
        return res.send({ msg: "Event Registered Successfully" });
    } catch (error) {
        console.error("Event Registration error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});


router.get('/view-event',verify, async (req, res) => {
    try {
        const role = req.user.role;
        console.log(role);        
        const ViewEvents = await Event.find({}, 'name description Event_id Event_date ticket_price venue type avail_ticket image_url').sort({ type: 1 });
        const eventsWithImageUrl = ViewEvents.map(event => ({
                ...event._doc,
                image_url: (event.image_url && event.image_url.data) ? `data:${event.image_url.contentType};base64,${event.image_url.data.toString('base64')}` : null
            }));
        return res.json(eventsWithImageUrl);
    } catch (err) {
        console.error("View event error:", err);
        return res.status(500).json({ error: "Server Error" });
    }
});


router.post('/book/:id', verify, async (req, res) => {
    try {
        const {Ticket} = req.body;
        console.log(req.body);
        const Booking_id = req.user.userId;
        const evId = req.params.id; 
    
        
        const event = await Event.findOne({ Event_id: evId });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        
        if (event.avail_ticket <= 0) {
            return res.status(400).json({ message: "No tickets available" });
        }

        const existingBooking = await Booking.findOne({ Booking_id:Booking_id, Event_id: evId });
        // if (existingBooking) {
        //     return res.status(400).json({ message: "You have already booked the ticket" });
        // }

        const date = Date.now();
        const newBooking = new Booking({ Booking_id, Event_id: evId, date ,Ticket});
        
        event.avail_ticket -= Ticket;
        const updateResult = await Event.updateOne({ Event_id: evId }, { avail_ticket: event.avail_ticket });

        await newBooking.save();
        res.status(200).json({ message: "Booking successful" });
    } catch (err) {
        console.error("Unable to book tickets", err);
        return res.status(500).json({ error: "Server Error" });
    }
});

router.get('/views', verify, async (req, res) => {
    const role = req.user.role;
    console.log('x',role);        
    if (req.user.role === 'admin') {
      try {
        const users = await User.find({ role: { $in: ['user', 'organizer'] } }, 'name email role');
        return res.json(users);
      } catch (err) {
        console.error("Fetching users error:", err);
        res.status(500).json({ error: "Server Error" });
      }
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  });



module.exports = router;
