const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const mongo_url = 'mongodb://127.0.0.1:27017/mentorship';
const Listing = require("./models/listings.js");
const Mentor = require("./models/mentorListing.js");
const { name } = require("ejs");

main()
    .then(() => { console.log("Connection Successful") })
    .catch((err) => { console.log(err) });


async function main() {
    try {
        await mongoose.connect(mongo_url);
    } catch (error) {
        console.log(error);
    }
};

// app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", async (req, res) => {
    res.send("Response Received");
    // res.render("index.ejs");
});

// let newData = new Listing({
//     title: "JEE Main",
//     description: "Crack JEE Main exam by knowing the correct path",
//     image: "https://drive.google.com/file/d/1tpW9hLhQPj547j-F8SfKrJA46TOQuMGf/view?usp=drive_link",
//     price: 15000
// });

// newData.save();

app.get("/mentor", async (req, res) => {
    let allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
    // console.log(allListings);
    // res.send("All Ok");
});

app.get("/mentor/:id/show", async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let showData = await Listing.findById(id);
    // console.log(showData);
    // let allListings = await Listing.find({});
    // res.render("index.ejs", { allListings });
    // console.log(allListings);
    // res.send("All Ok");
    let allMentors = await Mentor.find({});
    console.log(allMentors);
    res.render("show.ejs", { showData, allMentors });
})

app.post("/mentor/:id/buy", async (req, res) => {
    let { id } = req.params;
    let buydata = await Listing.findById(id);
    console.log(`Buying Data:${buydata}`);
    let mentorname = req.body;
    console.log(mentorname.Mentor);
    let mentordata = await Mentor.find({ name: mentorname.Mentor });
    console.log(mentordata);
    res.send("All Ok");
})

app.listen(port, () => {
    console.log(`You are listening on ${port}`);
});