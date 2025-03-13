const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const db = require("./config/mongoose-connection")

const patientRouter = require("./routes/patientRouter")
const therapistRouter = require("./routes/therapistRouter")

app.use("/patient",patientRouter)
app.use("/therapist",therapistRouter)

app.get("/",(req,res)=>{
    res.send("hey it's working..")
})

app.listen(3000)