import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

const TherapistSessions = () => {
    const [allSessions, setAllSessions] = useState([])
    const [therapistToken, setTherapistToken] = useState("")
    const [decoded, setDecoded] = useState("")
    const [therapistId, setTherapistId] = useState("")
    const [sessionAccepted,setSessionAccepted] = useState(false)


    useEffect(() => {
        let storedToken = localStorage.getItem("therapistToken")
        setTherapistToken(storedToken)
    }, [])

    useEffect(() => {
        if (therapistToken) {
            let dec = jwtDecode(therapistToken)
            setDecoded(dec)
            setTherapistId(dec.id)
        } else {
            console.log("Invalid token")
        }
    }, [therapistToken])


    useEffect(() => {
        if (therapistId) {
            const fetchSessionData = async () => {
                let response = await axios.get(`http://localhost:3000/session/getSessionData/${therapistId}`)
                setAllSessions(response.data)
            }
            fetchSessionData()
        }
    }, [therapistId])

    const acceptSession = async (e) => {
        try{
            let sessionId = e.target.parentElement.parentElement.id
            // console.log(sessionId)
            let response = await axios.patch(`http://localhost:3000/session/accept/${sessionId}`)
            alert("Session confirmed");
        }catch(err){
            alert(err.message)
        }
    }

    const rejectSession = async (e)=>{
        try{
            let sessionId = e.target.parentElement.parentElement.id
            let response = await axios.patch(`http://localhost:3000/session/reject/${sessionId}`)
            alert("Session rejected")
        }catch(err){
            alert(err.message)
        }
    }

    return (
        <div className='h-screen bg-[#e8f4e4] py-24 px-16'>
            <h1 className='text-4xl font-bold text-[#1B0482] mb-4 text-center'>Upcoming Sessions</h1>
            <table className='w-full border-collapse shadow-md' border={1}>
                <thead className='bg-[#3311C7] text-white'>
                    <tr>
                        <th className='py-2'>Patient</th>
                        <th>Date</th>
                        <th>Session Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-[#D9D9D9]'>
                    {allSessions.map((session) => (
                        <tr key={session._id} id={session._id}>
                            <td className='text-center py-1'>{session.name}</td>
                            <td className='text-center py-1'>{new Date(session.appointmentDate).toLocaleDateString()} </td>
                            <td className='text-center py-1'>{session.meetingmode}</td>
                            <td className='text-center py-1'>{session.status}</td>
                            <td className='text-center py-1 flex gap-2 justify-center'>
                                {session.status==="Pending"?<><button
                                    onClick={acceptSession}
                                    className='bg-green-700 px-4 py-1 text-white rounded-md text-sm hover:bg-green-600'>Accept</button>
                                <button 
                                onClick={rejectSession}
                                className='bg-red-600 px-4 py-1 text-white rounded-md text-sm hover:bg-red-500'>Reject</button>
                                </>:null}
                                {session.status==="Accepted"?<><button
                                    className='bg-green-700 px-4 py-1 text-white rounded-md text-sm hover:bg-green-600'>Accepted</button>
                                </>:null}
                                {session.status==="Rejected"?<><button
                                    className='bg-red-600 px-4 py-1 text-white rounded-md text-sm hover:bg-green-600'>Rejected</button>
                                </>:null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TherapistSessions;