const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()
const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const db = require("./config/mongoose-connection")

const patientRouter = require("./routes/patientRouter")
const therapistRouter = require("./routes/therapistRouter")
const sessionRouter = require("./routes/sessionRouter")

app.use("/patient",patientRouter)
app.use("/therapist",therapistRouter)
app.use("/session",sessionRouter)

app.get("/",(req,res)=>{
    res.send("hey it's working..")
})

app.listen(3000)