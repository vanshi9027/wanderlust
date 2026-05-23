const User = require("../Model/User.js");



module.exports.renderSignupForm =  ( req, res) =>{
     res.render("Users/Signup.ejs");
 };

 module.exports.Signup = async(req, res) =>{
     try{
            let { username , email , password } = req.body;  // extract value req body through
     const newUser = new User({email, username}); // create new contractuer 
      const registeredUser =  await User.register(newUser , password);
      console.log(registeredUser);
      req.login(registeredUser , (err) =>{
       if(err) {
          return next(err);
       }
         req.flash( "success" , "Welcome to Wanderlust");
       res.redirect("/listings"); 
      })
     
     }
     catch(e){
         req.flash("error" , e.message);
         res.redirect("/signup");
     }
  };
 
 
module.exports.renderloginForm = (req, res) =>{
     res.render("Users/login.ejs");
  };

  module.exports.Login = async(req, res) =>{
    req.flash("success" , " Welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings"
      res.redirect(redirectUrl);
      console.log("After login:", req.user);

 };

 module.exports.logout = ( req, res) =>{
   req.logout((err) =>{
      if(err){
         return  next(err);
         
      }
      req.flash("success" , " you are logged out !");
      res.redirect("/listings");
   })
 };
