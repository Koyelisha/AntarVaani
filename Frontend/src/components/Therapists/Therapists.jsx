import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useLoggedIn from '../../customHook/useLoggedIn/useLoggedIn';
import axios from 'axios'


const Therapists = () => {
    useLoggedIn()
    const [therapistData, setTherapistData] = useState([]);

    useEffect(() => {
        const fetchTherapistData = async () => {
            try {
                let response = await axios.get("http://localhost:3000/patient/showTherapists")
                setTherapistData(response.data)
            } catch (err) {
                alert(err.message)
            }
        }
        fetchTherapistData()
    }, [])
    const navigate = useNavigate()
    return (
        <div className='h-screen bg-[#F1FAEE] py-24 px-16'>
            <div className='flex flex-col gap-3'>
                {therapistData.map((therapist) => (
                    <div key={therapist._id} className='w-[100%] bg-[#d6d1d1] flex px-4 py-4 rounded-md gap-6 relative shadow-sm'>
                        <div>
                            <img src={therapist.image} className='h-64 w-64 object-cover rounded-md' alt="" />
                        </div>
                        <div className='flex flex-col gap-1 justify-center'>
                            <h1 className='text-4xl font-semibold'>{therapist.fullname}</h1>
                            <p className='text-xl text-zinc-500 font-semibold'>Specialized in {therapist.specialization}</p>
                            <p className='text-xl '>{therapist.contact}</p>
                            <p className='text-xl '>{therapist.email}</p>
                            <p className='text-xl '>Clinic: {therapist.clinicName}</p>
                            <p className='text-xl '>Available days: {therapist.availableDays}</p>
                            <p className='text-xl '>Available time: {therapist.availableTime}</p>
                        </div>
                        <button
                        onClick={()=>{navigate(`/patient/booking/${therapist._id}`)}} 
                        className='shadow-md px-5 py-2 bg-[#3311C7] absolute right-5 bottom-4 text-white font-semibold rounded-md'
                        >Book Session</button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Therapists;