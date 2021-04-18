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


const Schema = mongoose.Schema

const petScheema = new Schema({
    pet_name: String,
    pet_age: Number,
    pet_type: String,
    pet_breed: String,
    assigned_vet: String,
    clinic_name: String,
})

const Pet = mongoose.model("pets", petScheema);

router.get("/", (req, res) => {
    Pet.find({}).then(
        (result) => {
            res.send(result);
        }).catch(
            (err) => {
                res.send(err);
            }
        )
})

router.get("/:name", (req, res) => {
    pet_name = req.params.name
    console.log(pet_name)
    Pet.find({pet_name: pet_name}).then(
        (result) => {
            res.send(result);
        }).catch(
            (err) => {
                res.send(err);
            }
        )
})    

router.post("/", (req, res)=> 
{
    if(req.body.pet_name === "" || 
    !req.body.pet_age ||
    req.body.pet_type === "" || 
    req.body.pet_breed === "" ||
    req.body.assigned_vet === "" || 
    req.body.clinic_name === ""){
        res.status(400).send("please check if all fields are filled up >:|")
    }else{
        const pet = Pet(
            {
                owner_name: req.body.pet_name, 
                pet_type: req.body.pet_age, 
                doctor_name: req.body.pet_type, 
                clinic_name: req.body.pet_breed,
                clinic_address: req.body.assigned_vet, 
                date: req.body.clinic_name
            })

        pet.save().then(
            () => {
                console.log("Insert Was Successfull")
                res.status(200).send("Insert Was Successful")
            }).catch(
                (err) => { 
                    console.log(err)
                })
    }
});





module.exports = router;