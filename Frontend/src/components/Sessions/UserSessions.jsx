import React, { useEffect, useState } from 'react';
import useLoggedIn from '../../customHook/useLoggedIn/useLoggedIn';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import UserCancelSessionModal from './UserCancelSessionModal';


const UserSessions = () => {
    const [allSessions, setAllSessions] = useState([])
    const [token, setToken] = useState("")
    const [decode, setDecode] = useState("")
    const [patientId, setPatientId] = useState("")
    const [showCancelModal,setShowCancelModal] = useState(false)
    const [cancelSessionId,setcancelSessionId] = useState("")

    useEffect(() => {
        let storedToken = (localStorage.getItem("token"))
        setToken(storedToken)
    }, [])

    useEffect(() => {
        if (token) {
            let decodedData = jwtDecode(token)
            setDecode(decodedData)
            setPatientId(decodedData.id)
        } else {
            console.log("No token found")
        }
    }, [token])

    useEffect(() => {
        if (patientId) {
            const fetchSessionData = async () => {
                let sessions = await axios.get(`http://localhost:3000/patient/showSessions/${patientId}`)
                setAllSessions(sessions.data)
            }
            fetchSessionData()
        }
    }, [patientId])
    

   

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
                    {allSessions.map((session) => (
                        <tr id={session._id} key={session._id}>
                            <td className='text-center py-1'>Dr. {session.therapist.fullname}</td>
                            <td className='text-center py-1'>{new Date(session.appointmentDate).toLocaleDateString()} </td>
                            <td className='text-center py-1'>{session.meetingmode}</td>
                            <td className='text-center py-1'>{session.status}</td>
                            <td className='text-center py-1 flex gap-2 justify-center'>
                                {session.status === "Pending" ? <><button
                                    className='bg-green-700 px-4 py-1 text-white rounded-md text-sm hover:bg-green-600'>Pending</button>

                                </> : null}
                                {session.status === "Accepted" ? <><button
                                    className='bg-green-700 px-4 py-1 text-white rounded-md text-sm hover:bg-green-600'><a href={session.additionalInfo}>Join</a></button>
                                    <button
                                    onClick={(e)=>{setShowCancelModal(true)
                                        setcancelSessionId(session._id)
                                    }}
                                        className='bg-red-600 px-4 py-1 text-white rounded-md text-sm hover:bg-red-500'>Cancel</button>
                                </> : null}
                                {session.status === "Rejected" ? <>
                                    <button
                                    className='bg-black px-8 py-1 text-white rounded-md text-sm hover:bg-zinc-700'>Rejected</button>
                                    {/* <h3 className='font-semibold text-red-700'>Rejected</h3> */}
                                </> : null}
                                {session.status==="Cancelled"?<>
                                    <button
                                    className='bg-black px-7 py-1 text-white rounded-md text-sm hover:bg-zinc-700'>Cancelled</button>
                                    {/* <h3 className='font-semibold text-red-700'>Cancelled</h3> */}
                                </>:null}
                            </td>
                        </tr>
                    ))}
                    {showCancelModal && <UserCancelSessionModal setShowCancelModal={setShowCancelModal} cancelSessionId={cancelSessionId}/>}
                </tbody>
            </table>
        </div>
    );
};

export default UserSessions;