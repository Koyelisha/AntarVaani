const express = require("express")
const patientModel = require("../models/patient-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const { generateToken } = require("../utils/generateToken")

const router = express.Router()
const { signupPatient,verifyOTP,loginPatient } = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send("Hey!patient router working..")
})

router.post("/signup", signupPatient);

router.post("/verify-otp",verifyOTP);

router.post("/login",loginPatient);

module.exports = router;