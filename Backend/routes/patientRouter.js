const express = require("express")
const patientModel = require("../models/patient-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const { generateToken } = require("../utils/generateToken")

const router = express.Router()
const { signupPatient,verifyOTP } = require("../controllers/authController");
// import patientModel from "../models/patient-model";

router.get("/", (req, res) => {
    res.send("Hey!patient router working..")
})

router.post("/signup", signupPatient)

router.post("/verify-otp",verifyOTP)

router.post("/login",async(req,res)=>{
    try{
        let {email,password} = req.body
        let patient =  await patientModel.findOne({email});
        console.log(patient);
        if(!patient){
            return res.status(401).send("Email or Password Incorrect");
        }else{
            const isMatch = await bcrypt.compare(password,patient.password);
                if(isMatch){
                    let token = generateToken(patient);
                    return res.status(200).json({message:"Login Successful",token});
                }else{
                    return res.status(401).send("Email or Password Incorrect");
                }
            }
    }catch(err){
        // return res.send(err.message)
        console.error("Login Error:", err.response?.data || err.message); // Debugging
        alert(err.response?.data || "An error occurred");
    }   
})

module.exports = router;