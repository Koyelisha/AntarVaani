const express = require("express")
const patientModel = require("../models/patient-model")
const router = express.Router()
const { signupPatient,verifyOTP,loginPatient } = require("../controllers/authController")
const therapistModel = require("../models/therapist-model")
const sessionModel = require("../models/session-model")
const nodemailer = require("nodemailer")

router.get("/", (req, res) => {
    res.send("Hey!patient router working..")
})

router.post("/signup", signupPatient);

router.post("/verify-otp",verifyOTP);

router.post("/login",loginPatient);

router.get("/showTherapists",async(req,res)=>{
    try{
        let therapists = await therapistModel.find();
        return res.send(therapists)
    }catch(err){
        return res.send(err.message)
    }
    
})

router.get("/profile/:patientId",async(req,res)=>{
    try{
        const patient = await patientModel.findOne({_id:req.params.patientId})
        res.status(200).send(patient)
    }catch(err){
        res.status(500).send(err.message)
    }
    
})


router.get("/api",(req,res)=>{
  let token = req.cookies;
  res.send(token)
})

router.get("/showSessions/:userId",async(req,res)=>{
    try{
        let allSessions = await sessionModel.find({patient:req.params.userId}).populate("therapist")
        res.send(allSessions)
    }catch(err){
        res.send(err.message)
    }
})


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"koyelisha7@gmail.com",
        pass: "unrz zjsu sheo zuxv"
    }
})

router.patch("/reject/:sessionId",async(req,res)=>{
    try{
        console.log(req.params.sessionId)
        let session = await sessionModel.findOne({_id:req.params.sessionId})
        .populate("patient")
        .populate("therapist")
        let {reason} = req.body;
        session.status = "Cancelled"
        session.rejectionReason = reason;
        await session.save();

        const mailOptions = {
            from:"koyelisha7@gmail.com",
            to:session.therapist.email,
            subject:"Therapy Session Cancellation Notification",
            text:`Dear Dr. ${session.therapist.fullname},

This is an automated notification to inform you that ${session.name} has canceled their scheduled therapy session on ${new Date(session.appointmentDate).toLocaleDateString()} due to ${session.rejectionReason}.

If you wish to follow up with the patient regarding rescheduling, you may contact them directly or through the platform.
Email and phone number of the patient are ${session.patient.email} and ${session.phone} respectively.

For any concerns, feel free to reach out to the admin.

Best regards,
Team AntarVaani
This is an automated email. Please do not reply directly.

`
        }

        await transporter.sendMail(mailOptions)
        return res.status(200).send("Session Cancelled Successfully")
    }catch(err){
        return res.status(500).send(err.message);
    }
})

router.put("/update/:patientId",async(req,res)=>{
    try{
        const id = req.params.patientId;
        console.log(req.body)
        let {fullname,email,contact,age,address,bio} = req.body;
        const updatedPatient = await patientModel.findByIdAndUpdate({_id:id},{
            fullname,
            email,
            contact,
            age,
            address,
            bio
        })
        // console.log(updatedPatient)
        res.send(updatedPatient)
    }catch(err){
        res.send(err.message)
    }
})

module.exports = router;