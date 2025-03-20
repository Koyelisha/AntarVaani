import React, { useEffect, useState } from 'react';
import useLoggedIn from '../../customHook/useLoggedIn/useLoggedIn';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const UserSessions = () => {
    useLoggedIn()
    const [allSessions,setAllSessions] = useState([])
    const [token,setToken] = useState("")
        const [decode,setDecode] = useState("")
        const [patientId,setPatientId] = useState("")
    
        useEffect(()=>{
            let storedToken = (localStorage.getItem("token"))
            setToken(storedToken)
        },[])
        
        useEffect(()=>{
            if(token){
                let decodedData = jwtDecode(token)
                setDecode(decodedData)
                setPatientId(decodedData.id)
                console.log("decoded data: ",decodedData)
            }else{
                console.log("No token found")
            }
        },[token])

    useEffect(()=>{
        if(patientId){
            const fetchSessionData =async()=>{
                let sessions =  await axios.get(`http://localhost:3000/patient/showSessions/${patientId}`)
                setAllSessions(sessions.data)
                console.log(sessions)
             }
             fetchSessionData()
        }
    },[patientId])
    console.log(allSessions)

    return (
        <div className='h-screen bg-[#e8f4e4] py-24 px-16'>
            <h1 className='text-4xl font-bold text-[#1B0482] mb-4 text-center'>Upcoming Sessions</h1>
            <table className='w-full border-collapse shadow-md' border={1}>
                <thead className='bg-[#3311C7] text-white'>
                    <tr>
                        <th className='py-2'>Therapist</th>
                        <th>Date & Time</th>
                        <th>Session Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-[#D9D9D9]'>
                    {allSessions.map((session)=>(
                        <tr>
                        <td className='text-center py-1'>Dr. {session.therapist.fullname}</td>
                        <td className='text-center py-1'>{new Date(session.appointmentDate).toLocaleDateString()} </td>
                        <td className='text-center py-1'>{session.meetingmode}</td>
                        <td className='text-center py-1'>{session.status}</td>
                        <td className='text-center py-1'>Join/Cancel</td>
                    </tr>
                    ))}
                    
                    
                    {/* <tr>
                        <td className='text-center py-1'>Dr. Jane Doe</td>
                        <td className='text-center py-1'>12 Mar 2025, 5:00 PM </td>
                        <td className='text-center py-1'>Online (Zoom)</td>
                        <td className='text-center py-1'>Confirmed</td>
                        <td className='text-center py-1'>Join/Cancel</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default UserSessions;