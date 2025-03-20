const patientModel = require("../models/patient-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const { generateToken } = require("../utils/generateToken")
const therapistModel = require("../models/therapist-model")

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
        let existingPatient = await patientModel.findOne({ email });
        if (existingPatient) {

            return res.status(402).send("User already registered.Please login");

        } else {
            // Generating OTP
            const otp = crypto.randomInt(100000, 999999).toString();
            otpStore[email] = { otp, fullname, contact, password };

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
    // console.log(otpStore)
    try {
        const { email, otp } = req.body;

        if (!otpStore[email]) {
            return res.status(400).send("No OTP found for this email.")
        }

        if (otpStore[email].otp !== otp) {
            return res.status(400).send("Invalid OTP");
        }
        console.log(otpStore[email].password)

        bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(otpStore[email]?.password, salt, async (err, hash) => {
                let patient = await patientModel.create({
                    fullname: otpStore[email].fullname,
                    email,
                    contact: otpStore[email].contact,
                    password: hash,
                    otp:otp,
                    isVerified:true
                })
                const token = generateToken(patient)
                res.cookie("token",token, {
                    httpOnly: true,
                    sameSite: "Lax",
                    secure: false
                })
                delete otpStore[email]
                return res.status(200).json({message:"signup successful",token})
            })
        })


    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.loginPatient = async(req,res)=>{
    try{
        let {email,password} = req.body
        let patient =  await patientModel.findOne({email});
        // console.log(patient);
        if(!patient){
            return res.status(401).send("Email or Password Incorrect");
        }else{
            const isMatch = await bcrypt.compare(password,patient.password);
                if(isMatch){
                    let token = generateToken(patient);
                    res.cookie("token",token, {
                        httpOnly: true,
                        sameSite: "Lax",
                        secure: false
                    })
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
}

module.exports.signupTherapist = async (req, res) => {
    try {
        let { fullname, email, contact, licenseNumber, issuingAuthority, licenseExpiryDate, specialization, clinicName, availableDays, availableTime,password } = req.body
        let licenseDocument = req.file.buffer
        let existingTherapist = await therapistModel.findOne({ email, licenseNumber })
        if (existingTherapist) {
            return res.status(400).send("Already registered.Please login");
        } else {
            let otp = crypto.randomInt(100000, 999999).toString()
            otpStore[email] = { fullname, email, contact, licenseNumber, issuingAuthority, licenseExpiryDate, specialization, clinicName, availableDays, availableTime, otp, licenseDocument,password }

            const mailOptions = {
                from: "koyelisha7@gmail.com",
                to: email,
                subject: "Your OTP for signup",
                text: `Dear doctor, your otp for signup is ${otp}`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(err.message)
                } else {
                    return res.status(200).json({ message: "OTP sent to the email" })
                }
            })
        }
    } catch (err) {
        console.error("error: ", err)
    }
}

module.exports.verifyTherapistOTP = (req, res) => {
    try {
        const { email, otp } = req.body;
        if (otpStore[email].otp !== otp) {
            return res.status(400).json({ message: "OTP verification failed" })
        } else {
            bcrypt.genSalt(10,(err, salt) => {
                bcrypt.hash(otpStore[email].password, salt,async (err, hash) => {
                    const therapist = await therapistModel.create({
                        fullname:otpStore[email].fullname, 
                        email:email,
                        password:hash,
                        contact:otpStore[email].contact, 
                        licenseNumber:otpStore[email].licenseNumber, 
                        issuingAuthority:otpStore[email].issuingAuthority, 
                        licenseExpiryDate:otpStore[email].licenseExpiryDate, 
                        specialization:otpStore[email].specialization, 
                        clinicName:otpStore[email].clinicName, 
                        availableDays:otpStore[email].availableDays, 
                        availableTime:otpStore[email].availableTime,
                        licenseDocument:otpStore[email].licenseDocument,
                        otp:otp,
                        isVerified:true
                    })
                    let token = generateToken(therapist)
                    delete otpStore[email]
                    return res.status(200).json({message:"Therapist Account created successfully.",token})                    
                })
            })
        }
    } catch (err) {
        return res.send(err.message)
    }

}

module.exports.loginTherapist = async (req, res) => {
    try {
        let { licenseNumber, password } = req.body;
        console.log(licenseNumber, password)
        let therapist = await therapistModel.findOne({ licenseNumber })
        if (!therapist) {
            return res.status(400).json({ message: "License Number or password Incorrect" })
        } else {
            bcrypt.compare(password, therapist.password, (err, result) => {
                if (!result) {
                    return res.status(400).json({ message: "License Number or password Incorrect" })
                } else {
                    let token = generateToken(therapist)
                    return res.status(200).json({ message: "Login Successful", token })
                }
            })
        }
    } catch (err) {
        console.error(err.response?.data?.message || "Login unsuccessful")
        return res.send(err.message)
    }

}