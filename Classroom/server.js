const express = require("express");
const app = express() ;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const sessionOptions = {
  secret : "mysupersecretstring",
  resave: false,
  saveUninitialized : true,
}




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionOptions));
app.use(flash());
app.get("/register" , (req, res) =>{
  
  let { name = " anyomosa"} =  req.query;
  req.session.name = name;
  req.flash("success", "user registered successfully");

  res.redirect("/hello");

});


app.get("/hello" , (req , res) =>{
  
  res.render("page.ejs" , {name: req.session.name , msg : req.flash('success')});
});



app.get("/test" , (req, res) =>{
  res.send("test successful")
});













// app.use(cookieParser("secretcode"));
//  // send a cookie for brower
// app.get("/getcookies", (req ,res) =>{
//   res.cookie("greet" , "namaste");
//   res.send("we sent you a cookie");
// });


// // send signed cookie
//  app.get("/getsignedcookie" , (req, res) =>{
//   res.cookie("color" , "red" , {signed : true});
//   res.send("done!");
//  });


//  app.get("/verify" , (req, res) =>{
//   console.log(req.cookies);
//   console.log(req.signedCookies);
//   res.send("verified");
//  })

// // access cookie
//  app.get("/" , (req ,res) =>{
//     console.dir(req.cookies);
    
//     res.send("Hi I am root")
//  });

app.listen(3000 , () =>{
    console.log("server is listing to 3000");

})