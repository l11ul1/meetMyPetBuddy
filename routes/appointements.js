//import all necessary variable for database connection
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

//establish scheema
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


router.put("/reschedule/:id", (req, res)=> {
    const id = req.params.id;
    console.log(id);

    res.status(501).send("sorry this feature is not implemented yet :C")
});

module.exports = router;


