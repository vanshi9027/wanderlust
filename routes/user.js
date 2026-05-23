const express = require("express");
const router = express.Router();
const User = require("../Model/User.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/users.js");
router.route("/signup")
 .get(userControllers.renderSignupForm)
 .post(wrapAsync(userControllers.Signup));

router.route("/login")
.get(userControllers.renderloginForm)
.post(saveRedirectUrl,  passport.authenticate("local" ,{failureRedirect: "/login",failureFlash : true}), userControllers.Login);

 router.get("/logout" , userControllers.logout);


module.exports = router;