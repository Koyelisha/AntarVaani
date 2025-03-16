const mongoose = require("mongoose")

const therapistSchema = mongoose.Schema({
    fullname:String,
    email:String,
    contact:String,
    password:String,
    licenseNumber:String,
    issuingAuthority:String,
    licenseExpiryDate:Date,
    specialization:String,
    clinicName:String,
    availableDays:String,
    availableTime:String,
    image:Buffer,
    licenseDocument:Buffer,
    sessions:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"session"
        },
    otp:String,
    isVerified:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("therapist",therapistSchema)