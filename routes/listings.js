const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../Model/listing.js"); // 
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");



router
    .route("/")
    .get(wrapAsync(listingControllers.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingControllers.createListing));




// new route

router.get("/new", isLoggedIn, listingControllers.renderNewform);


router
    .route("/:id")
    .get( listingControllers.showListing)
    .put(isLoggedIn, isOwner, validateListing,
        wrapAsync(listingControllers.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));









//Edit route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.editListing));




module.exports = router;