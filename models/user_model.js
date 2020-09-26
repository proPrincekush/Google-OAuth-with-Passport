const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    googleId:{type:Number,required:true},
    thumbnail:String
})

const user = new mongoose.model("user",UserSchema)
module.exports = user;
