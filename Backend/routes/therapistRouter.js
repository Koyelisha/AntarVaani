const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const nodemailer = require("nodemailer")
const therapistModel = require("../models/therapist-model")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")
const { signupTherapist, verifyTherapistOTP,loginTherapist } = require("../controllers/authController")
const sessionModel = require("../models/session-model")


router.get("/", (req, res) => {
    res.send("Hey!therapist router working..")
})

router.post("/signup", upload.single("licenseDocument"), signupTherapist)

router.post("/verify-otp", verifyTherapistOTP)

router.post("/login", loginTherapist)

router.get("/request/:therapistId",async(req,res)=>{
    try{
        const request = await sessionModel.find({therapist:req.params.therapistId,status:"Pending"}).populate("patient","fullname email phone")
        res.status(200).json(request)
    }catch(err){
        res.status(500).json({message:"Error fetching request"})
    }
})

module.exports = router