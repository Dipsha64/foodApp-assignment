const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productId : {
        type : String,
        required : [true,"Please enter product Id"]
    },
    userId : {
        type : String,
        required : [true,"Please enter user Id"]
    },
    productDetail : {
        type : Object
    }
},{
    timestamps : true
})

module.exports = mongoose.model("product",productSchema);