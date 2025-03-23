const express = require("express")
const router = express.Router()
const sessionModel = require("../models/session-model")
const patientModel = require("../models/patient-model")
const therapistModel = require("../models/therapist-model")
const nodemailer = require("nodemailer")

router.get("/",(req,res)=>{
    res.send("Session route working..")
})

router.post("/book-session", async (req, res) => {
    try {
        const { patientId, therapistId, name, phone, email, problemDescription, appointmentDate, meetingmode } = req.body;
        const newSession = await sessionModel.create({
            patient: patientId,
            therapist: therapistId,
            name,
            phone,
            email,
            problemDescription,
            appointmentDate,
            meetingmode
        })
        return res.status(201).json({ message: "Request sent to the therapist", newSession })
    } catch (err) {
        return res.status(500).json({ message: "Error booking session", err: err.message })
    }
})

router.get("/getSessionData/:therapistId", async (req, res) => {
    try {
        let therapistSession = await sessionModel.find({ therapist: req.params.therapistId }).populate("therapist")
        res.send(therapistSession)
    } catch (err) {
        res.send(err.message)
    }

})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "koyelisha7@gmail.com",
        pass: "unrz zjsu sheo zuxv"
    }
})

router.patch("/accept/:sessionId", async (req, res) => {
    try {
        const session = await sessionModel.findOne({ _id: req.params.sessionId })
            .populate("patient")
            .populate("therapist")

        if (!session) {
            return res.status(404).send("Session not found")
        } else {
            session.status = "Accepted"
            await session.save()

            const patient = await patientModel.findOne({ _id: session.patient })
            // res.send(patient.sessions)
            patient.sessions.push(session._id)
            await patient.save()
            

            const therapist = await therapistModel.findOne({ _id: session.therapist })
            therapist.sessions.push(session._id)
            await therapist.save()
            let sessionNo = therapist.sessions.indexOf(session._id)

            const mailOptions = {
                from: "koyelisha7@gmail.com",
                to: session.patient.email,
                subject:"Confirmation Mail",
                text: `Dear ${session.patient.fullname},

We’re pleased to inform you that your therapy session has been successfully confirmed! Here are the details of your appointment:

📅 Date: ${new Date(session.appointmentDate).toLocaleDateString()}
⏰ Session No: ${sessionNo}
👨‍⚕️ Therapist: ${session.therapist.fullname}
📍 Meeting Mode: ${session.meetingmode} 

Please ensure you are available at the scheduled time. If you need to reschedule or cancel, kindly contact us at least 10 hours in advance.${session.meetingmode==="Video Call"?"The Google meet link will be provided in the website":""}${session.meetingmode==="Phone Call"?"A time will be informed":""}

If you have any questions, feel free to reach out. We look forward to supporting you on your journey to wellness.

Best Regards,
Team AntarVaani
8585093623`
            }

            await transporter.sendMail(mailOptions);
            return res.status(200).send("Session Accepted")
        }
    } catch (err) {
        res.status(500).send("Error accepting Session")
    }

})



router.patch("/reject/:sessionId", async (req, res) => {
    try {
        const session = await sessionModel.findOne({ _id: req.params.sessionId })
        if (!session) {
            return res.status(404).send("Session not found")
        } else {
            session.status = "Rejected"
            await session.save()
            return res.status(200).send("Session rejected")
        }
    } catch (err) {
        res.status(500).send("Error rejecting session")
    }
})


router.post("/addLink/:sessionId",async(req,res)=>{
    try{
        let {meetingLink} = req.body;
        let sessions = await sessionModel.findOne({_id:req.params.sessionId})
        sessions.additionalInfo = meetingLink;
        await sessions.save()
        return res.status(200).send("Link Addded successfully")
    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports = router;