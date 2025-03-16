import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from '../Modals/BookingModal';
import axios from 'axios'
import { useAuth } from "../../Context/AuthContext"

const Booking = () => {
    const [showModal,setShowModal] = useState(false)
    const {therapistId} = useParams()
    const { user } = useAuth();
    console.log(user)

    // const patientId = user?.patientId;
    // console.log(patientId)

    const [formData,setformData] = useState({
            patientId:"",
            therapistId:therapistId,
            name:"",
            phone:"",
            email:"",
            problemDescription:"",
            appointmentDate:"",
            meetingmode:""
    })
    
    const handleFormData = (e)=>{
        let formObj = {...formData}
        formObj[e.target.name] = e.target.value
        setformData(formObj)
    }

    return (
        <div className='h-screen bg-[#e8f4e4] flex justify-center items-center py-24 px-16'>
            <div className='max-w-3xl w-full bg-[#cac6c6] absolute p-6 rounded-md shadow-sm'>
                <div className='flex flex-col items-start relative'>
                    <label htmlFor='' className='font-semibold'>Enter your name</label>
                    <input type="text" className='p-1 rounded-sm mb-2 w-full' name='name' onChange={handleFormData}/>
                    <label htmlFor='' className='font-semibold'>Enter your Phone no</label>
                    <input type="text" className='p-1 rounded-sm mb-2 w-full' name='phone' onChange={handleFormData}/>
                    <label htmlFor='' className='font-semibold'>Enter your email</label>
                    <input type="text" className='p-1 rounded-sm mb-2 w-full' name='email' onChange={handleFormData}/>
                    <label htmlFor='' className='font-semibold'>Problem Description</label>
                    <input type="text" className='p-1 rounded-sm mb-2 w-full' name='problemDescription' onChange={handleFormData}/>
                    <label htmlFor="" className='font-semibold'>Choose a date</label>
                    <input type="date" className='mb-2 px-3 rounded-sm' name='appointmentDate' onChange={handleFormData}/>
                    <label className='font-semibold'>Preferred meeting mode</label>
                    <select className='pl-1 pr-14 py-1 rounded-sm' name='meetingmode' onChange={handleFormData}>
                        <option value="">Phone Call</option>
                        <option value="">Video Call</option>
                        <option value="">In person visit</option>
                    </select>
                    <button 
                    onClick={()=>setShowModal(true)}
                    className='absolute bg-[#3311C7] px-5 py-3 text-white rounded-md bottom-0 right-0'>Book Appointment</button>
                    {showModal && <BookingModal setShowModal={setShowModal}/>}
                </div>

            </div>
        </div>
    );
};

export default Booking;