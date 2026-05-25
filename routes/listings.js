const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../Model/listing.js"); // 
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router
    .route("/")
    .get(wrapAsync(listingControllers.index))
     .post(isLoggedIn ,
         validateListing , 
         upload.single('listing[image]') 
         , wrapAsync(listingControllers.createListing));
     
 
   




// new route

router.get("/new", isLoggedIn, listingControllers.renderNewform);


router
    .route("/:id")
    .get( listingControllers.showListing)
    .put(isLoggedIn, isOwner, upload.single('listing[image]') , validateListing,  
        wrapAsync(listingControllers.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));









//Edit route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.editListing));




module.exports = router;