require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const PORT = 5000;
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.mongo_url).then(()=>{
    console.log("mongoDB connected")
}).catch((error)=>{
    console.log("mongoDB connection failed:", error)
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port: ${PORT}`);
});