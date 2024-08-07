require("dotenv").config();

const mongoose = require("mongoose");
const express = require('express');
const cookieParser = require('cookie-parser');

const router = require('./_routes');

const app = express();

app.use(express.static('src/public'));

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);



mongoose.connect(process.env.DATABASE_URL, {}).then(() => {
    console.log("Connected to database  successfully");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err);
})



