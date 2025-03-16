const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const nodemailer = require("nodemailer")
const therapistModel = require("../models/therapist-model")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")
const { signupTherapist, verifyTherapistOTP,loginTherapist } = require("../controllers/authController")

router.get("/", (req, res) => {
    res.send("Hey!therapist router working..")
})

router.post("/signup", upload.single("licenseDocument"), signupTherapist)

router.post("/verify-otp", verifyTherapistOTP)

router.post("/login", loginTherapist)

module.exports = router