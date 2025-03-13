import { useState } from "react";

const TherapistsSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  return ( 
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[450px] bg-[#BFA9A9] shadow-lg p-6">
        
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
            <div>
              <p className="font-medium">Fullname</p>
              <input type="text" className="w-full px-5 border rounded bg-[#D9D9D9]" />
              
              <p className="font-medium py-1">Email Address</p>
              <input type="email" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">Phone No</p>
              <input type="text" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">License Number</p>
              <input type="text" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">Issuing Authority</p>
              <input type="text" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">License Expiry Date</p>
              <input type="date" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">Specialization</p>
              <input type="text" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">Clinic Name</p>
              <input type="text" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">Available Days</p>
              <input type="text" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">Available Time</p>
              <input type="text" className="w-full px-5 border rounded bg-[#D9D9D9]" />

              <p className="font-medium py-1">Upload License Document</p>
              <input 
                type="file" 
                id="fileUpload" 
                className="hidden" 
                onChange={handleFileChange} 
             />
              <label 
                htmlFor="fileUpload" 
                className="bg-gray-200 text-black border rounded-md p-2 cursor-pointer inline-block"
              >Choose a file</label>
              {fileName && <p className="text-sm text-gray-600">{fileName}</p>}

              <div className="flex justify-center">
                <button className="py-2 px-6 font-bold text-white bg-[#211AD7] rounded-lg mt-5">
                  Send OTP
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <input type="license" placeholder="Enter License" className="w-full p-2 border rounded-md bg-[#D9D9D9]" />
              <input type="password" placeholder="Enter Password" className="w-full p-2 border rounded-md bg-[#D9D9D9]" />
              <div className="flex justify-center">
                <button className="py-2 px-6 font-bold text-white bg-[#211AD7] rounded-lg">
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
