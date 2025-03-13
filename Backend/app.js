const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hey it's working..")
})

app.listen(3000)