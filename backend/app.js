require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.mongo_url).then(()=>{
    console.log("mongoDB connected")
}).catch((error)=>{
    console.log("mongoDB connection failed:", error)
});

app.listen(5000, ()=>{
    console.log("Server running on port:5000")
})