const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../Model/listing.js"); // 
const {isLoggedIn , isOwner,validateListing} = require("../middleware.js");








// index route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
});

// new route

router.get("/new", isLoggedIn ,(req, res) => {
    res.render("listings/new.ejs");
    
});
// create route
router.post("/", isLoggedIn,  validateListing, wrapAsync(async (req, res, next) => {


    const newListing = new Listing(req.body.listing);

    console.log("User at create:", req.user); // should show user
   
    newListing.owner = req.user._id;

    console.log("After setting owner:", newListing);
    await newListing.save();
    req.flash("success", "New Listing Created!");


    res.redirect("/listings");


}));

// show route 
router.get("/:id",wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner");

    if (!listing) {
        req.flash("error", " listing you requested for does not exist");
         return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}));


//Edit route 
router.get("/:id/edit", isLoggedIn , isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", " listing you requested for does not exist");
         return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

//Update route 
router.put("/:id" 
    ,isLoggedIn,  isOwner, validateListing,
     wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

// delete Route 
router.delete("/:id" ,isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    let deletelisting = await Listing.findByIdAndDelete(id);
    // console.log(deletelisting);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));


module.exports = router;