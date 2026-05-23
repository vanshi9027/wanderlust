const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const  Reviews = require("../Model/reviews.js"); 

const Listing = require("../Model/listing.js");

const {validateReview , isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviews = require("../Model/reviews.js");


const reviewControllers = require("../controllers/reviews");


// Reviews

// Post route

router.post("/" ,isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));



// delete review route 

router.delete("/:reviewid" ,isLoggedIn ,isReviewAuthor, wrapAsync(reviewControllers.deleteReview));

module.exports = router;