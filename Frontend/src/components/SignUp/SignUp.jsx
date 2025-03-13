import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from 'axios';


const SignUp = () => {
  const [patientData,setPatientData] = useState({fullname:"",email:"",contact:"",password:"",otp:""});
  const [loginData,setLoginData] = useState({email:"",password:""});
  const [isSignUp, setIsSignUp] = useState(true);
  const [sendOTP, setSendOTP] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
      let patientObj = {...patientData}
      patientObj[e.target.name] = e.target.value;
      setPatientData(patientObj);
  }

  const handleLoginData = (e)=>{
    let loginObj = {...loginData};
    loginObj[e.target.name] = e.target.value;
    setLoginData(loginObj);
  }

  const sendOTPToBackend = async()=>{
    try{
        await axios.post("http://localhost:3000/patient/signup",{
          fullname:patientData.fullname,
          email:patientData.email,
          contact:patientData.contact,
          password:patientData.password
        })

        setSendOTP(true)
    }catch(err){
        alert(err.response?.data || "Error sending OTP")
    }
  }

  const verifyOTP = async()=>{
      try{
        const response = await axios.post("http://localhost:3000/patient/verify-otp",{
          email:patientData.email,
          otp:patientData.otp
        })
        alert("Signup Successful!");
        localStorage.setItem("token",response.data.token)
        navigate("/")
      }catch(err){
        alert(err.response?.data || "OTP verification failed");
      }
  }

  const loginPatient = async ()=>{
    console.log(loginData)
    try{
      const response = await axios.post("http://localhost:3000/patient/login",{
          email:loginData.email,
          password:loginData.password
      })
      alert("Login successful");
      localStorage.setItem("token",response.data.token)
      navigate("/");
    }catch(err){
      alert(err.message)
    }
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-[#E8F0E8]">
      <div className="w-[500px] p-6 bg-[#BFA9A9] shadow-lg relative space-y-4 ">
        <div className="flex bg-gray-300 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 font-bold rounded-tl-sm ${isSignUp ? 'bg-[#0000FF] text-white ' : 'bg-transparent text-black'}`}
            onClick={() => setIsSignUp(true)}
          >Sign Up</button>
          <button
            className={`flex-1 py-3 font-bold rounded-tl-sm ${!isSignUp ? 'bg-[#0000FF] text-white' : 'bg-transparent text-black'}`}
            onClick={() => {
              setIsSignUp(false)
            }}
          >
            Login
          </button>
        </div>
        <div className="space-y-4">
          {isSignUp ? (
            sendOTP ? (
              <div className='flex items-center justify-center'>
                <div className='w-[350px] p-6 bg-[#BFA9A9] text-center rounded-lg'>
                  <input type="text" placeholder='Enter OTP' className='px-13 mb-4 py-2  rounded-md bg-[#D9D9D9] text-center' name="otp" onChange={handleChange} />
                  <button 
                  className='px-12 mb-4 py-2 font-bold text-white bg-[#0000FF] rounded-lg'
                  onClick={verifyOTP}
                  >Verify OTP</button>
                  <p className='mt-2 text-sm text-gray-700'>Enter the OTP sent to your email.</p>
                </div>
              </div>
            ) : (
              <div>
                <input type="text" placeholder="Enter Your Name" className="w-full p-2 mb-2 border rounded-md bg-[#D9D9D9]" name="fullname" onChange={handleChange}/>
                <input type="email" placeholder="Enter Your Email" className="w-full p-2 mb-2 border rounded-md bg-[#D9D9D9]" name="email" onChange={handleChange}/>
                <input type="text" placeholder="Enter Your Contact No" className="w-full p-2 mb-2 border rounded-md bg-[#D9D9D9]" name="contact" onChange={handleChange}/>
                <input type="password" placeholder="Enter Password" className="w-full p-2 mb-4 border rounded-md bg-[#D9D9D9]" name="password" onChange={handleChange}/>
                <div className="flex justify-center">
                  <button
                    onClick={sendOTPToBackend}
                    className="py-2 px-6 font-bold text-white bg-[#0000FF] rounded-lg">Send OTP</button>
                </div>
              </div>
            )

          ) : (
            <div>
              <input type="email" placeholder="Enter Your Email" className="w-full p-2 mb-2 border rounded-md bg-[#D9D9D9]" name="email" onChange={handleLoginData} />
              <input type="password" placeholder="Enter Password" className="w-full p-2 mb-4 border rounded-md bg-[#D9D9D9]" name="password" onChange={handleLoginData}/>
              <div className="flex justify-center">
                <button 
                onClick={loginPatient}
                className="py-2 px-6 font-bold text-white bg-[#0000FF] rounded-lg">Login</button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>

  );
};

export default SignUp;
