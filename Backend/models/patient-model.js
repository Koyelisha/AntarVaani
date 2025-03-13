const mongoose = require("mongoose")

const patientSchema = mongoose.Schema({
    fullname:String,
    email:String,
    contact:String,
    password:String,
    age:Number,
    address:String,
    bio:String,
    sessions:{
        type:Array,
        default:[]
    },
    image:Buffer,
    otp:String,
    isVerified:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("patient",patientSchema)