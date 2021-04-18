// import all necessary variable for database connection
const mongoose = require("mongoose");
const express = require("express"); 
const url = "mongodb+srv://vm1702:3989302As@cluster0.ljnio.mongodb.net/meet_my_pet_buddy-db?retryWrites=true&w=majority";
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const router = express.Router();

//establish connection and return success or failure using promise 
mongoose.connect(url, connectionOptions).then(
    () => {
        console.log("Mongoose connected successfully");
    }
).catch(
    (err) => {
        console.log(`Mongoose failed to connect with a ${err}`);
    }
)


// (val name:String, val age:Int, val type:String, val breed:String, Vet: String, Clinic: String)

const Schema = mongoose.Schema

const petScheema = new Schema({
    pet_name: String,
    pet_age: Number,
    pet_type: String,
    pet_breed: String,
    assigned_vet: String,
    clinic_name: Number,
})

const Appointment = mongoose.model("pets", petScheema);

