const jwt = require("jsonwebtoken")

const generateToken = (patient)=>{
    return jwt.sign({email:patient.email,id:patient._id},process.env.JWT_KEY)
}

module.exports.generateToken = generateToken;