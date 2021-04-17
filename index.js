
//import express 
const express = require("express");
const bodyParser = require('body-parser');
const appointments = require('./routes/appointements');



const app = express();
//For some reason we need to import body parser manually so that req.body would work
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const HTTP_PORT = process.env.PORT || 8080;
const onHttpStart = () => {
    console.log(`Server runs on ${HTTP_PORT}`);
}
app.listen(HTTP_PORT, onHttpStart);


app.use("/appointments", appointments);