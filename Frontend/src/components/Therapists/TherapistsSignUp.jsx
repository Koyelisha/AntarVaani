import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const TherapistsSignUp = () => {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(true)
  const [SendOTP,setSendOTP] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password:"",
    contact: "",
    licenseNumber: "",
    issuingAuthority: "",
    licenseExpiryDate: "",
    specialization: "",
    clinicName: "",
    availableDays: [],
    availableTime: "",
    licenseDocument: null,
    otp: ""
  })
  const [loginData,setLoginData] = useState({
      licenseNumber:"",
      password:""
  })

  const handleChange = (e) => {
    let formObj = { ...formData }
    formObj[e.target.name] = e.target.value;
    setFormData(formObj);
  }

  const handleFileChange = (e) => {
    let formObj = { ...formData }
    formObj["licenseDocument"] = e.target.files[0]
    setFormData(formObj)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if(key==="licenseDocument" || formData[key] instanceof File){
        formDataToSend.append(key, formData[key]);
      }else{
        formDataToSend.append(key,formData[key].toString())
      }
    });

    try{
      let response = await axios.post("http://localhost:3000/therapist/signup",
        formDataToSend,
        {headers:{"Content-Type":"multipart/form-data"}}
      );
      console.log(response)
      setSendOTP(true)
      alert("OTP sent to the email");
    }catch(err){
        alert(err.message)
    }
  }

  const verifyOTP =async()=>{
    try{
      let response = await axios.post("http://localhost:3000/therapist/verify-otp",
        {
          email:formData["email"],
          otp:formData["otp"]
        }
      )
      alert("Therapist Account created successfully.")
      localStorage.setItem("token",response.data.token)
      navigate("/therapist/dashboard")
    }catch(err){
      alert(err.message)
    }
      
  }

  const handleLoginData = (e)=>{
    let loginObj = {...loginData}
    loginObj[e.target.name] = e.target.value
    setLoginData(loginObj)
  }

  const loginTherapist = async ()=>{
    try{
      let response = await axios.post("http://localhost:3000/therapist/login",{
        licenseNumber:loginData.licenseNumber,
        password:loginData.password
      })
      alert(response.data.message)
      localStorage.setItem("token",response.data.token)
      navigate("/therapist/dashboard")
    }catch(err){
        console.log(err.message)
        alert("Login unsuccessful")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E8F0E8] py-24">
      <div className="bg-[#BFA9A9] shadow-lg p-6 max-w-3xl w-full rounded-md">

        <div className="flex bg-gray-300 rounded-full overflow-hidden mb-4">
          <button
            className={`flex-1 py-3 font-bold rounded-l ${isSignUp ? 'bg-[#211AD7] text-white' : 'bg-[#D9D9D9] text-black'}`}
            onClick={() => setIsSignUp(true)}>Sign Up</button>
          <button
            className={`flex-1 py-3 font-bold ${!isSignUp ? 'bg-[#211AD7] text-white' : 'bg-[#D9D9D9] text-black'}`}
            onClick={() => setIsSignUp(false)}>Login</button>
        </div>

        <div className="space-y-4">
          {isSignUp ? (
            SendOTP?(
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
            ):(
              <div>
              <form encType="multipart/form-data" className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div>
                  <p className="font-medium">Fullname</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="fullname"
                    placeholder="e.g. John Ray"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Email Address</p>
                  <input type="email" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="email"
                    placeholder="e.g. johnray456@gmail.com"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Phone No</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="contact"
                    placeholder="e.g. 1234567890"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">License Number</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="licenseNumber"
                    placeholder="e.g. MED12345678"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Issuing Authority</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="issuingAuthority"
                    placeholder="e.g. National Medical Council"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">License Expiry Date</p>
                  <input type="date" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="licenseExpiryDate"
                    placeholder="e.g. 2028-06-15"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Specialization</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="specialization"
                    placeholder="e.g. Cardiology"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Clinic Name</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="clinicName"
                    placeholder="e.g. Thompson Heart Care"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Available Days</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="availableDays"
                    placeholder="e.g. Monday, Wednesday, Friday"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Available Time</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="availableTime"
                    placeholder="e.g. 10:00 AM - 4:00 PM"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Password</p>
                  <input type="text" className="w-full px-2 py-1 border rounded bg-[#D9D9D9]" name="password"
                    placeholder="e.g. sbfu6r7y24hefug"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p className="font-medium py-1">Upload License Document</p>
                  <input
                    type="file"
                    id="fileUpload"
                    className="cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex justify-center">
                  <button className="py-2 px-6 font-bold text-white bg-[#211AD7] rounded-lg mt-5">
                    Send OTP
                  </button>
                </div>
              </form>
            </div>
            )
          ) : (
            <div className="space-y-3">
              {/* email  login*/}
              <input type="text" onChange={handleLoginData} placeholder="Enter License" name="licenseNumber" className="w-full p-2 border rounded-md bg-[#D9D9D9]" />
              <input type="password" onChange={handleLoginData} placeholder="Enter Password" name="password" className="w-full p-2 border rounded-md bg-[#D9D9D9]" />
              <div className="flex justify-center">
                <button 
                onClick={loginTherapist}
                className="py-2 px-6 font-bold text-white bg-[#211AD7] rounded-lg">
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistsSignUp;
