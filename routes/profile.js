const router = require("express").Router();

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect("/auth/login")
        // res.sendStatus(401);
    }
}


router.get("/",isLoggedIn,(req,res)=>{
    // res.send(`Welcome ${req.user.username}, you are sucessfully logged in.`)
    res.render('profile',{user:req.user})
})

module.exports = router;