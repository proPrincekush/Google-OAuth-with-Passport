require('dotenv').config()
const express =  require("express");
const authRoutes = require("./routes/auth-routes")
const passportSetup = require("./config/passport-setup")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session");
const passport = require('passport');
// const session = require("express-session");
const user = require('./models/user_model');


const app = express();
// console.log(process.env.cookie_key);
// setting the view engine
app.set("view engine","ejs");

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// cookie session middleware
app.use(cookieSession({
    name:"myCoookie",
    maxAge:24*60*60*1000, // time for cookie
    keys:[process.env.cookie_key]  // encryption for cookie
}))

// app.use(session({
//     secret: 'keyboard cat', 
//     resave: false,
//     // store:user,
//     saveUninitialized: true,
//     cookie: { maxAge:24*60*60*1000,secure: true }
// }))


// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// app.use(require("cookie-parser")({secret:process.env.cookie_key}));

//  for initializing the passport in application
app.use(passport.initialize()) 
// for starting session
app.use(passport.session())


//connect to mongo db
mongoose.connect(process.env.URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connected"))


app.use(express.static("public"))
//  set up routes
app.use("/auth",authRoutes);




// create home route
app.get("/",(req,res)=>{
    res.render("Home")
})



const port = 3000;
app.listen(port,()=>{
    console.log(`server is running at port ${port}.`);
})