const mongoose = require("mongoose")

const sessionSchema = mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"
    },
    therapist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"therapist"
    },
    name:String,
    phone:Number,
    email:String,
    problemDescription:String,
    appointmentDate:Date,
    meetingmode:String,
    status:{
        type:String,
        enum:["Accepted","Rejected","Pending"],
        default:"Pending"
    },
    additionalInfo:String,
    rejectionReason:String
})

module.exports = mongoose.model("session",sessionSchema)