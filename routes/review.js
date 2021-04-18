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

const ReviewSchema = new Schema({
    written_by: String,
    review_description: String,
    clinic_name: String,
    doctor_name: String,
    date: Date,
    rating: Number,
    feedback_given: String
})

const Review = mongoose.model("reviews_table", ReviewSchema)

// sample data

// const review1 = new Review({"written_by": "John Smith", "review_description": "This clinic was possibly the best clinic I could have ever went", "clinic_name": "Clinic of Oakville", "doctor_name": "Dr. Hofsterror"})
// const review2 = new Review({"written_by": "Carina Barosa", "review_description" : "100% do not recommend", "clinic_name": "Animal Hospital of Mississauga", "doctor_name": "Dr. Cream" })
// const review3 = new Review({"written_by": "Hector Vintelli", "review_description" : "Please say no", "clinic_name": "Animal Hospital of Oakville", "doctor_name": "Dr. Stoich"})

// insert sample data

// review1.save()
// review2.save()
// review3.save()



// list of url endpoints that your server will respond to
router.get("/api/reviews", (req, res) => {
 Review.find().exec().then(
        (results) => {
            console.log(results)
            res.send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting reviews from database.")
        }
    )
});

router.get("/api/reviews/customer/:written_by", (req, res) => {
    console.log(req.params)
    const reviewName = req.params.written_by;

    Review.find({written_by: reviewName}).exec().then(
        (results) => {
            console.log(results)
            res.status(200).send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting custoemr reviews from database.")
        }
    )
})

router.get("/api/reviews/clinic/:clinic_name", (req, res) => {
    console.log(req.params)
    const reviewClinicName = req.params.clinic_name;

    Review.find({clinic_name: reviewClinicName}).exec().then(
        (results) => {
            console.log(results)
            res.status(200).send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting clinic reviews from database.")
        }
    )
})

router.post("/api/reviews", (req, res) => {
    let ReviewToInsert = req.body
    console.log(`Would like to insert a new review data : ${ReviewToInsert}`)
    var now = (new Date()).toJSON();

    if("written_by" in req.body && "review_description" in req.body && "rating" in req.body && ("clinic_name" in req.body || "doctor_name" in req.body)) {
        ReviewToInsert = new Review({"written_by": req.body.written_by,
        "review_description": req.body.review_description,
        "clinic_name": req.body.clnic_name,
        "doctor_name" : req.body.doctor_name,
        "date": now,
        "rating": req.body.rating})
        ReviewToInsert.save()
        res.status(201).send({"msg" : "Review was successfully inserted"})
    }
    res.status(401).send({"msg" : "Sorry, you are missing some fields"})
})

router.delete("/api/reviews/:id", (req, res) => {
    const ReviewId = req.params.id
    
    Review.deleteOne({_id: ReviewId}).exec().then(
        (results) => {
            console.log(results)
            res.status(200).send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when finding the review to delete from database.")
        }
    )

})

router.patch("/api/items/:id/:feedback_given", (req, res) => {
    const ReviewId = req.params.id;
    const ReviewFeedback = req.params.feedback_given;
    console.log(id);
    Appointment.updateOne({_id: ReviewId}, {$set: {feedback_given: ReviewFeedback}}).then(
        () => {
            res.status(204).send("update was successful! :)")
            console.log("update was successful")
        }).catch(
            (err) => {
                console.log(`error: ${err}`);
            }
        )
})

// export
module.exports = router;
