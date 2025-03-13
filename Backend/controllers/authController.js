const patientModel = require("../models/patient-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const { generateToken } = require("../utils/generateToken")


const otpStore = {};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "koyelisha7@gmail.com",
        pass: "unrz zjsu sheo zuxv"
    }
})

module.exports.signupPatient = async (req, res) => {
    try {
        let { fullname, email, contact, password } = req.body;
        console.log(email)
        let existingPatient = await patientModel.findOne({ email });
        if (existingPatient) {

            return res.status(402).send("User already registered.Please login");

        } else {
            // Generating OTP
            const otp = crypto.randomInt(100000, 999999).toString();
            otpStore[email] = { otp, fullname, contact, password };
            console.log(otpStore)

            //sending OTP via email
            const mailOptions = {
                from: "koyelisha7@gmail.com",
                to: email,
                subject: "Your OTP for signup",
                text: `Your OTP is ${otp}.It will expire in 5 minutes.`
            }

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "OTP sent to email." });
        }
    } catch (err) {
        console.log("Error: ", err)
        res.send(err.message)
    }
}

module.exports.verifyOTP =  (req, res) => {
    console.log(otpStore)
    try {
        const { email, otp } = req.body;

        if (!otpStore[email]) {
            return res.status(400).send("No OTP found for this email.")
        }

        if (otpStore[email].otp !== otp) {
            return res.status(400).send("Invalid OTP");
        }

        bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(otpStore[email].password, salt, async (err, hash) => {
                let patient = await patientModel.create({
                    fullname: otpStore[email].fullname,
                    email,
                    contact: otpStore[email].contact,
                    password: hash,
                    otp:otp,
                    isVerified:true
                })
                const token = generateToken(patient)
                res.cookie("token",token)
                res.status(200).json({message:"signup successful",token})
            })
        })

        // delete otpStore[email];

    } catch (err) {
        res.status(500).send(err.message);
    }
}