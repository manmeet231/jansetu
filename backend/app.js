// importing require modules and routes
require('dotenv').config();
const dns = require('dns');
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const PORT = 5000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const registration =require("./routes/registration");

// using the modules and the routes
app.use(cors());
app.use(express.json())
app.use("api/auth",registration);

// checking connection to the database
mongoose.connect(process.env.mongo_url).then(()=>{
    console.log("mongoDB connected")
}).catch((error)=>{
    console.log("mongoDB connection failed:", error)
});

// starting the server 
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port: ${PORT}`);
});