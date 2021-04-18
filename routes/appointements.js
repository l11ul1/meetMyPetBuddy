// Import all necessary variable for database connection
const mongoose = require("mongoose");
const express = require("express"); 
const url = "mongodb+srv://vm1702:3989302As@cluster0.ljnio.mongodb.net/meet_my_pet_buddy-db?retryWrites=true&w=majority";
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const router = express.Router();

// Establish connection and return success or failure using promise 
mongoose.connect(url, connectionOptions).then(
    () => {
        console.log("Mongoose connected successfully");
    }
).catch(
    (err) => {
        console.log(`Mongoose failed to connect with a ${err}`);
    }
)

// Establish scheema
const Schema = mongoose.Schema
const ItemScheema = new Schema({
    owner_name: String, 
    pet_type: String, 
    doctor_name: String, 
    clinic_name: String, 
    clinic_address: String, 
    date: Date
})

const Appointment = mongoose.model("appointments", ItemScheema);

// List all appointments
router.get("/", (req,res)=> {
    Appointment.find({}).exec().then(
        (msg) => {
        res.send(msg);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    );
});

// Find all appointment records associated with the specific owner
router.get("/:owner_name", (req, res)=> {
    const owner_name = req.params.owner_name;
    console.log(owner_name);

    Appointment.find({owner_name: owner_name}).then(
        (result) => {
            if(result.length === 0){
                res.status(404).send("Sorry appointments for this user were not found :(")
            }else{
                res.send(result);
            }
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
});

// Find all appointments associated for a specific clinic
router.get("/clinics/:clinic_name", (req, res)=> {
    const clinic_name = req.params.clinic_name;
    console.log(clinic_name);

    Appointment.find({clinic_name: clinic_name}).then(
        (result) => {
            if(result.length === 0){
                res.status(404).send("Sorry appointments for this clinic were not found :(")
            }else{
                res.send(result);
            }
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
});

// Add new appointment mapping
router.post("/", (req, res)=> 
{
    if(req.body.owner_name === "" || 
    req.body.pet_type === "" ||
    req.body.doctor_name=== "" || 
    req.body.clinic_name === "" ||
    req.body.clinic_address === "" || 
    !req.body.date){
        res.status(400).send("please check if all fields are filled up >:|")
    }else{
        const appointment = Appointment(
            {
                owner_name: req.body.owner_name, 
                pet_type: req.body.pet_type, 
                doctor_name: req.body.doctor_name, 
                clinic_name: req.body.clinic_name,
                clinic_address: req.body.clinic_address, 
                date: req.body.date
            })

        appointment.save().then(
            () => {
                console.log("Insert Was Successfull")
                res.status(200).send("Insert Was Successful")
            }).catch(
                (err) => { 
                    console.log(err)
                })
    }
});

// Delete Mapping
router.delete("/:id", (req, res)=> {
    const appointment_id = req.params.id;
    console.log(appointment_id);

    Appointment.deleteOne({_id: appointment_id}).then(
        (result) => {
            if(result.length === 0){
                res.status(404).send("Sorry item was not found :(")
            }else{
                res.send("Delete was complete")
            }
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
});

/*
 * This mapping is used to update an element inside the document on mongo db 
 * To use from app use the url provided for the mapping and then pass two parameter 
 * ID of the Appointment and New Date
 * DON'T FORGET TO USE PATCH METHOD 
 * PATCH METHOD RETURN 204 ON SUCCESS
 */
router.patch("/reschedule/:id/:date", (req, res)=> {
    const id = req.params.id;
    const date = req.params.date;
    console.log(id);
    Appointment.updateOne({_id: id}, {$set: {date: date}}).then(
        () => {
            res.status(204).send("update was successful! :)")
            console.log("update was successful")
        }).catch(
            (err) => {
                console.log(`error: ${err}`);
            }
        )
});

module.exports = router;


