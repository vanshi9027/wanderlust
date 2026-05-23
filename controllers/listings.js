const Listing = require("../Model/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
};

module.exports.renderNewform =  (req, res) => {
    res.render("listings/new.ejs");
    
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({ path : "reviews", populate: { path: "author"}})
    .populate("owner");

    if (!listing) {
        req.flash("error", " listing you requested for does not exist");
         return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};


module.exports.createListing = async (req, res, next) => {


    const newListing = new Listing(req.body.listing);

    console.log("User at create:", req.user); // should show user
   
    newListing.owner = req.user._id;

    console.log("After setting owner:", newListing);
    await newListing.save();
    req.flash("success", "New Listing Created!");


    res.redirect("/listings");


};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", " listing you requested for does not exist");
         return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};



module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    let deletelisting = await Listing.findByIdAndDelete(id);
    // console.log(deletelisting);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

