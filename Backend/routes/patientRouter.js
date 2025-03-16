const express = require("express")
const patientModel = require("../models/patient-model")
const router = express.Router()
const { signupPatient,verifyOTP,loginPatient } = require("../controllers/authController")
const therapistModel = require("../models/therapist-model")


router.get("/", (req, res) => {
    res.send("Hey!patient router working..")
})

router.post("/signup", signupPatient);

router.post("/verify-otp",verifyOTP);

router.post("/login",loginPatient);

router.get("/showTherapists",async(req,res)=>{
    try{
        let therapists = await therapistModel.find();
        return res.send(therapists)
    }catch(err){
        return res.send(err.message)
    }
    
})

// Middleware: Check Auth
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      console.log("Decoded Token:", decoded); 
      req.userId = decoded.id;
      next();
    });
  };
  
  // Get Authenticated User
  router.get("/api/auth/me", authenticateUser, async (req, res) => {
    // const user = await patientModel.findById(req.userId).select("-password");
    console.log("hello")
    const user = await patientModel.findOne({email:req.userId}).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  });

module.exports = router;