const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please enter username"]
    },
    email : {
        type : String,
        required : [true,"Please enter email"]
    },
    password : {
        type : String,
        required : [true,"Please enter Password"]
    }
})

module.exports = mongoose.model("Users",userSchema);