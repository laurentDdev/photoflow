require("dotenv").config();

const mongoose = require("mongoose");
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const mySocket = require("./socket")

const express = require('express');
const cookieParser = require('cookie-parser');

const router = require('./_routes');

const app = express();

app.use(cors());

app.use(express.static('src/public'));

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

const server = http.createServer(app)

const io = mySocket(server);


mongoose.connect(process.env.DATABASE_URL, {}).then(() => {
    console.log("Connected to database  successfully");
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err);
})



