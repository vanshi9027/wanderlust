const mongoose = require("mongoose");
const Schema = mongoose.Schema; //


const passportLocalMongoose = require("passport-local-mongoose").default;



const userSchema = new Schema({
    
    email :{
        type:  String,
        required : true,
    }, 
  

});

userSchema.plugin(passportLocalMongoose);// <=
// that line is why i add esliya that automatically add username hash and salt and password hash salt add 

module.exports = mongoose.model("User" , userSchema);