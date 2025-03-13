const mongoose = require("mongoose")

const therapistSchema = mongoose.Schema({
    fullname:String,
    email:String,
    contact:String,
    licenseNumber:String,
    issuingAuthority:String,
    licenseExpiryDate:Date,
    specialization:String,
    clinicName:String,
    availableDays:{
        type:Array,
        default:[]
    },
    availableTime:{
        type:Array,
        default:[]
    },
    image:Buffer,
    licenseDocument:Buffer,
    sessions:{
        type:Array,
        default:[]
    },
    otp:String,
    isVerified:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.Schema("therapist",therapistSchema)