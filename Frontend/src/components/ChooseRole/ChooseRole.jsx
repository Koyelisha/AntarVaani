import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseRole = () => {
  const navigate = useNavigate()
    return (
        <div className='h-screen bg-[#e8f4e4] py-24 px-16 flex flex-col gap-10 justify-center items-center'>
          <h1 className='text-5xl'>Choose Your Role </h1> 
          <div className='flex gap-10'>
            <div className='bg-[#D2C2C2] rounded-md p-3 shadow-md'>
              <img src="/Roles/therapist.png" className='h-[280px] w-[270px]' alt="" />
              <button 
              className='w-full bg-[#211AD7] py-3 rounded-md text-white font-semibold shadow-md'
              onClick={()=>navigate("/therapist/signup")}
              >Therapist</button>
            </div>
            <div className='bg-[#D2C2C2] rounded-md p-3 shadow-md'>
              <img src="/Roles/patient.png" className='h-[260px] w-[270px] mt-3 mb-3' alt="" />
              <button 
              onClick={()=>navigate("/patient/signup")}
              className='w-full bg-[#211AD7] py-3 rounded-md text-white font-semibold shadow-md'>Patient</button>
            </div>
          </div>
        </div>
    );
};

export default ChooseRole;