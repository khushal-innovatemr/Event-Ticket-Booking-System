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

db;
dotenv.config();

app.use(express.json())     
app.use(bodyParser.json());

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const userId = uuidv4();

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).send({ error: "User Already Exists" });

        const hashed_password = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashed_password, userId: userId, role: role || "user" })
        await user.save();
        return res.send({msg:"User Registered Succesfully"})
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.post('/login',async(req,res) => {
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user) return res.status(400).json({error:"User Not Found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({error:"Invalid Credentials"});

        const token = jwt.sign({name: user.name, userId:user.userId, email: user.email, role:user.role},process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: "24h" });

        res.cookie('userId',user.id,{
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite:'strict'
        }).send({
            message:'Login Success',
            token: token,
            role: user.role,
        })
        console.log("cookies",req.cookies)
    } 
    catch(err){
        console.error("Login Error:",err);
        res.status(500).json({error:"Server Error"})
    }
})



module.exports = router;