const express = require("express")
const router = express.Router()
const patientModel = require("../models/patient-model")
const moment = require("moment")

const challenges = [
    { type: "breathing", description: "Complete 5-minute deep breathing", xp: 10 },
    { type: "journaling", description: "Write 3 things you're grateful for", xp: 15 },
    { type: "mindful_walking", description: "Take a 10-minute mindful walk", xp: 20 },
    { type: "meditation", description: "Do a 5-minute guided meditation", xp: 25 }
];

router.get("/daily-challenge",(req,res)=>{
    try{
        const challenge = challenges[Math.floor(Math.random()*challenges.length)]
        res.send(challenge)
    }catch(err){
        res.send(err.message)
    }
})

router.post("/challenge-complete",async(req,res)=>{
    const {patientId,challengeType} = req.body;
    const patient = await patientModel.findOne({_id:patientId})
    if(!patient){
        return res.json({message:"Patient Not found"})
    }
    const today = moment().format("YYYY-MM-DD")
    // console.log(today)
    let lastplayed;
    if(patient.lastPlayed){
        lastplayed = moment(patient.lastPlayed).format("YYYY-MM-DD")
    }else{
        lastplayed = ""
    }

    if(today===lastplayed){
        return res.json({message:"You have already completed the daily challenge"})
    }

    const challenge = challenges.find(c=>c.type===challengeType)
    if(!challenge){
        return res.json({message:"Invalid Challenge type"})
    }
    patient.xp+=challenge.xp
    patient.completedChallenges.push({
        date:new Date(),
        challenge:challengeType
    })
    if(moment(lastplayed).add(1,"day").format("YYYY-MM-DD") === today){
        patient.streak+=1
    }else{
        patient.streak = 1
    }
    patient.lastPlayed = new Date()
    if(patient.streak===7){
        patient.badges.push("7-Day Streak Master")
    }
    if(patient.xp>=100){
        patient.badges.push("Mindfulness Warrior")
    }

    await patient.save()
    res.json({message:"Challenge completed!!",xp:patient.xp,streak:patient.streak,badges:patient.badges})
})

router.get("/",(req,res)=>{
    res.json("Hey game router working..")
})

module.exports = router