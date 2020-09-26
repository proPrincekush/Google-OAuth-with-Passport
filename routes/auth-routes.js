const express = require("express")
const router = express.Router();
const passport = require('passport');

// auth login
router.get("/login",(req,res)=>{
    res.render("login")
})

// auth with google
router.get("/google",passport.authenticate('google',{
    scope:['profile']
}))

// google redirect route
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
    if(req.user){
        // res.send(`Welcome ${req.user}`);
        res.redirect("/profile")
    }else{
        res.send("there is no user loggeg in.")
    }
    
   
}) 



// logout
router.get("/logout",(req,res)=>{
    // handle with passport

    req.logout();
    console.log("user logged out");
    res.redirect("/")
})

module.exports = router;