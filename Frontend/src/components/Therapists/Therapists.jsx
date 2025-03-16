import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useLoggedIn from '../../customHook/useLoggedIn/useLoggedIn';

const therapistsData = [
    {
        image:"/Therapist_Images/therapist1.webp",
        name:"Dr. Sarah Lee",
        specialization:"PTSD",
        contactNo:"+91 8230030061",
        email:"sarah@mindeaseclinic.com",
        clinic:"MindEase Clinic",
        availableDays:[
            "Monday", "Wednesday", "Friday"
        ],
        availableTime:"10:00 AM - 3:00 PM"
    },
    {
        image:"/Therapist_Images/therapist2.webp",
        name:"Dr. John Smith",
        specialization:"PTSD",
        contactNo:"	+91 7262207270",
        email:"john@revivementalhealth.com",
        clinic:"Revive Mental Health",
        availableDays:[
            "Monday", "Tuesday","Thursday"
        ],
        availableTime:"11:00 AM - 4:00 PM"
    },
    {
        image:"/Therapist_Images/therapist3.jpeg",
        name:"Dr. Emily Brown",
        specialization:"Self-esteem Counseling",
        contactNo:"+91 9903450299",
        email:"emily@mindeaseclinic.com",
        clinic:"MindEase Clinic",
        availableDays:[
            "Tuesday", "Thuesday", "Saturday"
        ],
        availableTime:"9:00 AM - 12:00 PM"
    }
]

const Therapists = () => {
    useLoggedIn()
    return (
        <div className='h-screenbg-[#F1FAEE] py-24 px-16'>
            <div className='flex flex-col gap-3'>
                {therapistsData.map((therapist)=>(
                    <div className='w-[100%] bg-[#d6d1d1] flex px-4 py-4 rounded-md gap-6 relative shadow-sm'>
                    <div>
                        <img src={therapist.image} className='h-64 w-64 object-cover rounded-md' alt="" />
                    </div>
                    <div className='flex flex-col gap-1 justify-center'>
                        <h1 className='text-4xl font-semibold'>{therapist.name}</h1>
                        <p className='text-xl text-zinc-500 font-semibold'>Specialized in {therapist.specialization}</p>
                        <p className='text-xl '>{therapist.contactNo}</p>
                        <p className='text-xl '>{therapist.email}</p>
                        <p className='text-xl '>Clinic: {therapist.clinic}</p>
                        <p className='text-xl '>Available days: {therapist.availableDays.map((day)=>`${day}, `)}</p>
                        <p className='text-xl '>Available time: {therapist.availableTime}</p>
                    </div>
                    <button className='shadow-md px-5 py-2 bg-[#3311C7] absolute right-5 bottom-4 text-white font-semibold rounded-md'>Book Session</button>
                </div>
                ))}
                
            </div>
        </div>
    );
};

export default Therapists;