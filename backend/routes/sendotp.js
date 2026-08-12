const express = require('express');
const route = express.Router();
const redisClient = require('../redis');
const twilio = require("twilio");

route.post("/send-otp", async (req,res)=>{
    const phoneNumber = req.body.phone;
    
    if(phoneNumber.length !== 10){
        return res.status(400).json({
            message:"Invalid Phone Number Lenght"
        });
    }

    if(isNaN(phoneNumber)){
        return res.status(400).json({
            message:"Phone Number Should Only Have Numerical Values"
        });
    }
    
    const firstDigit = Number(phoneNumber[0]);
    if(firstDigit < 6 || firstDigit > 9){
        return res.status(400).json({
            message:"Invalid Phone Number"
        })
    }

    const ratelimitkey = `otp:rate:${phoneNumber}`;
    const request = await redisClient.incr(ratelimitkey);
    
    const otpkey = `otp:${phoneNumber}`;

    if (request > 3){
        return res.status(429).json({
            message:"Too many OTP requests"
        });
    }

    const otp = Math.floor(Math.random() * 900000 + 100000)

    await redisClient.set(
        otpkey,
        otp,
        {
            EX:300
        }
    )

    res.status(200).json({
        message:"otp generated sucessfully"
    });

    const client = twilio(
    process.env.twilio_account_sid,
    process.env.twilio_auth_token
    );

    await twilioClient.messages.create({
        body: `Your OTP is ${otp}` ,
        from: process.env.twilio_phone_number,
        to: `+91${phoneNumber}`
    });
    // will implement ip blocking next
    
    
}) 