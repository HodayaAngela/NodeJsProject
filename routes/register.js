const express = require("express");
const router = express.Router();
const joi = require('joi');
const User = require('../models/User');
// Allowing Access
const jwt = require("jsonwebtoken");
// encrypted password
const bcrypt = require("bcrypt");

// joi schema
const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email().min(6),
    password: joi.string().required().min(8),
    biz: joi.boolean().required()
  });
  
// 1
router.post('/', async(req,res)=>{
    try {
    // joi validation
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    //cheack if user exist in DB 
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");

    // add new user
    user = new User(req.body);

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  
    // create token
    // 1. paload 2. key 
    const genToken = jwt.sign(
        { _id: user._id, biz: user.biz },
        process.env.jwtKey
      );
  
    // save new user
    await user.save();
    res.status(201).send({ token: genToken });
      
    } catch (error) {
        res.status(400).send('Error in register'+ error);
    }
})


module.exports= router;