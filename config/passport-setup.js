
const passport = require("passport")
const googleStrategy = require("passport-google-oauth20");
const User = require("../models/user_model")

//  for serializing user
passport.serializeUser((user,done)=>{
    console.log("serialize");
    done(null,user.id)
})

//  for deserializing user
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if (err) {
            console.log(err);
        }
       else{
        console.log("deserialize");
        done(null,user) 
       }
    })
});

//  for google strategy
passport.use(
    new googleStrategy({
        clientID: process.env.C_ID,
        clientSecret: process.env.C_SRT ,
        callbackURL:"http://localhost:3000/auth/google/redirect",
        // passReqToCallback   : true
},(accessToken, refreshToken, profile, done)=>{
// passport callback
// console.log(profile);
User.findOne({googleId:profile.id},(err,user)=>{
    if (user) {
        // fetch registered user
        console.log("user already exist",user);
        done(null,user);// passing the current user to next step serialize 
    } else {
        // register the user
        User.create({
            username:profile.displayName,
            googleId:profile.id
        }).then(newUser=>{
            console.log(newUser);  // print the new user
            done(null,newUser); // passing the new user to next step serialize 
        }).catch(err=> console.log(err))
    }
})


// return done(error,user)
})
)