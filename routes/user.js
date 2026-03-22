const express = require("express");
const router = express.Router();
const User = require("../Model/User.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");


 router.get("/signup" , ( req, res) =>{
     res.render("Users/Signup.ejs");
 });

 router.post("/signup" , wrapAsync(async(req, res) =>{
    try{
           let { username , email , password } = req.body;  // extract value req body through
    const newUser = new User({email, username}); // create new contractuer 
     const registeredUser =  await User.register(newUser , password);
     console.log(registeredUser);
     req.flash( "success" , "Welcome to Wanderlust");
      res.redirect("/listings"); 
    }
    catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
 }));


 router.get("/login" , (req, res) =>{
    res.render("Users/login.ejs");
 });


 router.post("/login" ,  passport.authenticate("local" ,{failureRedirect: "/login",failureFlash : true}), async(req, res) =>{
    req.flash("success" , " Welcome back to Wanderlust");
    res.redirect("/listings");

 });

 router.get("/logout" , ( req, res) =>{
   req.logout((err) =>{
      if(err){
         return  next(err);
         
      }
      req.flash("success" , " you are logged out !");
      res.redirect("/listings");
   })
 })


module.exports = router;