const express = require("express")
const router = express.Router()
const sessionModel = require("../models/session-model")
const patientModel = require("../models/patient-model")
const therapistModel = require("../models/therapist-model")

router.post("/book-session",async (req, res) => {
    try{
        const { patientId, therapistId, name, phone, email, problemDescription, appointmentDate, meetingmode } = req.body;
        const newSession = await sessionModel.create({
            patientId,
            therapistId,
            name,
            phone,
            email,
            problemDescription,
            appointmentDate,
            meetingmode
        })
        return res.status(201).json({message:"Request sent to the therapist",newSession})
    }catch(err){
        return res.status(500).json({message:"Error booking session",err:err.message})
    }
})

router.patch("/:sessionId/accept",async(req,res)=>{
    try{
        const session = await sessionModel.findById(req.params.sessionId);
        if(!session){
            return res.status(404).status(404).json({message:"Session not found"});
        }
        session.status = "Accepted"
        await session.save();
        
        const patient = await patientModel.findById(session.patient);
        patient.sessions.push(session._id);
        await patient.save();

        const therapist = therapistModel.findById(session.therapist);
        therapist.sessions.push(session._id);
        await therapist.save();

        res.status(200).json({message:"Session accepted".session})
    }catch(error){
        res.status(500).json({message:"Error accepting session",error})
    }
})

router.patch("/:sessionId/reject",async(req,res)=>{
    try{
        const session = await sessionModel.findById(req.params.sessionId);
        if(!session){
            return res.status(404).json({message:"Session not found"})
        }

        session.status = "Rejected"
        await session.save()

        res.status(200).json({message:"Session rejected",session})
    }catch(err){
        res.status(500).json({message:"Error rejecting session",err})
    }
})

module.exports = router;