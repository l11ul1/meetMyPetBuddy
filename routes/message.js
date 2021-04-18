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

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    pet: String,
    note: String,
    date: String
})

const Msg = mongoose.model("messages_table", MessageSchema)


// sample data

// const msg1 = new Msg({"pet": "Ahri", "note": "Dog is healthy", "date": "2021-03-02"})
// const msg2 = new Msg({"pet": "Bhan", "note" : "Cat needs some medication", "date": "2021-04-02"})

// msg1.save()
// msg2.save()

router.get("/api/msg", (req, res) => {
 Msg.find().exec().then(
        (results) => {
            console.log(results)
            res.send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting messages from database.")
        }
    )
});

router.get("/api/msg/pet/:pet_name", (req, res) => {
    console.log(req.params)
    const pet_name = req.params.pet_name;

    Msg.find({pet: pet_name}).exec().then(
        (results) => {
            console.log(results)
            res.status(200).send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting specific pet from database.")
        }
    )
})

router.post("/api/msg", (req, res) => {
    let newNoteForPet = req.body

    if("pet" in req.body && "note" in req.body && "date" in req.body) {
        NewMsgtoInsert = new Msg({"pet": req.body.pet,
        "note": req.body.note,
        "date": now})
        newNoteForPet.save()
        res.status(201).send({"msg" : "Message was successfully linked with pet"})
    }
    res.status(401).send({"msg" : "Missing some fields"})
})

router.delete("/api/msg/:pet", (req, res) => {
    const petName = req.params.pet
    
    Msg.deleteOne({pet: petName}).exec().then(
        (results) => {
            console.log(results)
            res.status(200).send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when finding the message to delete from database.")
        }
    )

})

// export
module.exports = router;
