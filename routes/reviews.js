const express = require("express");
const router = express.Router({mergeParms : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const  Reviews = require("../Model/reviews.js"); 
const {reviewSchema} = require("../schema.js");
const Listing = require("../Model/listing.js");




const  validateReview  = (req, res ,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) =>el.message).join(",");
    throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

// Reviews

// Post route

router.post("/" , validateReview, wrapAsync( async (req ,res) =>{
    console.log("Params:", req.params);
   let listing = await Listing.findById(req.params.id)    
   let newReview = new Reviews(req.body.review);
   listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();
       req.flash("success" , "New Review Created!");


    res.redirect(`/listings/${listing._id}`)
}));



// delete review route 

router.delete("/:reviewId" , wrapAsync(async (req, res) =>{
let { id , reviewId} = req.params;
await Listing.findByIdAndUpdate(id , {$pull : { reviews: reviewId}});
await Reviews.findById(reviewId);
    req.flash("success" , "Review Deleted!");
res.redirect(`/listings/${id}`);

}));

module.exports = router;