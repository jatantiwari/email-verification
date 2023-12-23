const express = require('express');
const User = require('../model/User');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // by express validater
require('dotenv').config();
const bcrypt = require('bcryptjs'); // importing bcryptjs
const jwt = require('jsonwebtoken');
const JWT_Screte_STRING = process.env.SCRETE_TOKEN

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  post: 587,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL,
    pass: process.env.PASSKEY,
  },
});

router.post('/register', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be entered atleast of 6 characters').isLength({ min: 6 })

], async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email })


    if (user) {
      if (!user.isVerified) {
        return res.json({ "message": "registered but not verified" })
      }
      else {

        return res.json({ "message": "already registered" });
      }
    }
    else {
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const data = {
        user: {
          id: user.id,
          email: user.email
        }
      }
      // console.log(user.id);
      const userToken = jwt.sign(data, JWT_Screte_STRING);
      const info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: req.body.email, // list of receivers
        subject: "Email Verifivation for Jatan", // Subject line
        html:` <p>Hello,</p>
        <p>Click the following link to verify your email:</p>
        <a href="http://localhost:3000/verify/${userToken}" target="_blank">Email Verify</a>
        <p>Thank you!</p>`
      });

      console.log("Message sent: %s", info.messageId);
      res.json({ "message": "User Registered" });
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).send("Unable to get database");

  }
})

router.put('/verify/:id', async (req, res) => {
  try {
    const token = req.params.id;
    jwt.verify(token, JWT_Screte_STRING, async (err, decoded) => {
      if (err) {
        console.error('Error decoding JWT:', err);
        res.json({ "message": "error" })
      } else {
        // console.log('Decoded JWT payload:', decoded);
        const id = decoded.user.id
        const updateVerify = await User.findByIdAndUpdate(id, { isVerified: true });
        if (updateVerify) {
          return res.json({ "message": "done" })
        }
        else {
          return res.json({ "message": "not done" })
        }
      }
    });
  }
  catch (error) {
    return res.json({ "message": error.message })
  }
})

router.put('/login', async (req, res) => {
  try {
    const {email, password} = req.body

    // console.log(req.body)
    const user = await User.findOne({ email: email})
    if(user){
      if(!user.isVerified){
        return res.json({"message":"please verify email using the link we have sent"});
      }
      else{
        if(user.password===password){
          const data = {
            user: {
              id: user.id,
              email: user.email
            }
          }
          // console.log(user.id);
          const userToken = jwt.sign(data, JWT_Screte_STRING);
          res.cookie('token', userToken, { httpOnly: true });
          return res.json({"message":"login sucessfully","token":userToken});
        }
        else{
          return res.json({"message":"invalid password"});
        }
      }
    }
    else{
      return res.json({"message":"email not registered"});
    }
  }
  catch (error) {
    return res.json({ "message": error.message })
  }
})
module.exports = router;

