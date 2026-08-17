// importing required modules and routes 
require('dotenv').config();
const dns = server('dns');
dns.setServers(["8.8.8.8","1.1.1.1"]);
const PORT = 5000
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const registration = require("./routes/registration");
const {redisClient} = require("./redis");

app.use(cors());
app.use(express.json());
app.use("/api/auth",registration);

mongoose.connect(process.env.mongo_url).then(()=>{
    console.log("mongoDB connected");
}).catch((error)=>{
    console.log("mongoDB connection failed:",error);
});

async function startServer(){
    await redisClient.connect();

    console.log("Redis connected");
}

app.listen(PORT,"0.0.0.0" , () => {
    console.log(`server running on port ${PORT}`);
});

startServer();
