const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const  Reviews = require("../Model/reviews.js"); 

const Listing = require("../Model/listing.js");

const {validateReview , isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviews = require("../Model/reviews.js");

// Reviews

// Post route

router.post("/" ,isLoggedIn, validateReview, wrapAsync( async (req ,res) =>{
    console.log("Params:", req.params);
   let listing = await Listing.findById(req.params.id)  
   if (!listing) {
   req.flash("error", "Listing does not exist");
   return res.redirect("/listings");
}  
   let newReview = new Reviews(req.body.review);
   newReview.author = req.user._id;
   listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();
       req.flash("success" , "New Review Created!");


    res.redirect(`/listings/${listing._id}`)
}));



// delete review route 

router.delete("/:reviewid" ,isLoggedIn ,isReviewAuthor, wrapAsync(async (req, res) =>{
let { id , reviewid} = req.params;
await Listing.findByIdAndUpdate(id , {$pull : { reviews: reviewid}});
await Reviews.findById(reviewid);
    req.flash("success" , "Review Deleted!");
res.redirect(`/listings/${id}`);

}));

module.exports = router;