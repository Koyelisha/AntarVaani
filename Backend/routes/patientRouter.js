const express = require("express")
const patientModel = require("../models/patient-model")
const router = express.Router()
const { signupPatient,verifyOTP,loginPatient } = require("../controllers/authController")
const therapistModel = require("../models/therapist-model")


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

module.exports = router;