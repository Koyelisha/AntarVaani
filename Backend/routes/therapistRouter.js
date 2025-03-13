const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("Hey!therapist router working..")
})

module.exports = router