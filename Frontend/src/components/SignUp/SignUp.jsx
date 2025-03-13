import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [sendOTP, setSendOTP] = useState(false);
  const navigate = useNavigate();

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
              <Outlet />
            ) : (
              <div>
                <input type="text" placeholder="Enter Your Name" className="w-full p-2 mb-2 border rounded-md bg-[#D9D9D9]" />
                <input type="email" placeholder="Enter Your Email" className="w-full p-2 mb-2 border rounded-md bg-[#D9D9D9]" />
                <input type="text" placeholder="Enter Your Contact No" className="w-full p-2 mb-2 border rounded-md bg-[#D9D9D9]" />
                <input type="password" placeholder="Enter Password" className="w-full p-2 mb-4 border rounded-md bg-[#D9D9D9]" />
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setSendOTP(true)
                      navigate("/patient/signup/otp")
                    }}
                    className="py-2 px-6 font-bold text-white bg-[#0000FF] rounded-lg">Send OTP</button>
                </div>
              </div>
            )

          ) : (
            <div>
              <input type="email" placeholder="Enter Your Email" className="w-full p-2 mb-2 border rounded-md bg-[#D9D9D9]" />
              <input type="password" placeholder="Enter Password" className="w-full p-2 mb-4 border rounded-md bg-[#D9D9D9]" />
              <div className="flex justify-center">
                <button className="py-2 px-6 font-bold text-white bg-[#0000FF] rounded-lg">Login</button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>

  );
};

export default SignUp;
