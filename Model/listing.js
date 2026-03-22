const mongoose = require("mongoose");
const Schema = mongoose.Schema; // that defind  Schema variable 
 const Review = require("./reviews.js");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String, // schema of listing
    
    
    image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },

  },
    
    
    
    // only work in string formt data in image schmea

    // image: {
    //     type:  String,
    //     default: "https://unsplash.com/photos/the-sun-shines-through-the-trees-on-a-road-s7prv0eGDNg",
    //     set :(v) =>
    //      v === " "
    //      ? "https://unsplash.com/photos/the-sun-shines-through-the-trees-on-a-road-s7prv0eGDNg" 
    //      : v,

    // },
    price : Number,
    location : String,
    country : String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reviews",

      },
    ],
    owner:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});
listingSchema.post("findOneAndDelete" , async (listing) =>{
  if(listing){
   await Review.deleteMany({_id : {$in : listing.reviews}});
  }
  
});
const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;
