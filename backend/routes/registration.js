const express = require('express');
const route = express.Router();

const User = require("../models/userSchema");

route.post("/registration", async (req,res)=>{
    try{
    const {name,email,password} = req.body;

    const user = await User.create({
        name:username,
        email:useremail,
        password:userpassword
    });

    res.status(201).send(`user ${username} has been created`)
    }
    catch(err){
        res.json({
            message:"user could not be created sucessfully",
            error:err.message
        });
    }
});

module.exports = route;
