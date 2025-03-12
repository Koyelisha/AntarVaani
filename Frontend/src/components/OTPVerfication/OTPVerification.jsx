import React from 'react'

const OTPVerification = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-[#E8F0E8]'>
        <div className='w-[350px] p-6 bg-[#BFA9A9] shadow-lg text-center rounded-lg'>
            <input type="text" placeholder='Enter OTP' className='px-13 mb-4 py-2  rounded-md bg-[#D9D9D9] text-center'/>
            <button className='px-12 mb-4 py-2 font-bold text-white bg-[#0000FF] rounded-lg'>Verify OTP</button>
            <p className='mt-2 text-sm text-gray-700'>Enter the OTP sent to your email.</p>
        </div>
    </div>
  );
};

export default OTPVerification
