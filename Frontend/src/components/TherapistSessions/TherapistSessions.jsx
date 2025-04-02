import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import AdditionalInfoModal from './AdditionalInfoModal';
import RejectionModal from './RejectionModal';

const TherapistSessions = () => {
    const [allSessions, setAllSessions] = useState([])
    const [therapistToken, setTherapistToken] = useState("")
    const [decoded, setDecoded] = useState("")
    const [therapistId, setTherapistId] = useState("")
    const [sessionAccepted, setSessionAccepted] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sessId, setSessId] = useState(false)
    const [rejectSessionId,setRejectSessionId] = useState("")
    

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
        try {
            let sessionId = e.target.parentElement.parentElement.id
            setLoading(true)
            let response = await axios.patch(`http://localhost:3000/session/accept/${sessionId}`)
            setLoading(false)
            alert("Session confirmed")
            setShowModal(true)
            setSessId(sessionId)
        } catch (err) {
            alert(err.message)
        }
    }

   

    return (
        <div className='h-screen bg-[#e8f4e4] py-24 px-16'>
            <h1 className='text-4xl font-bold text-[#1B0482] mb-4 text-center'>Upcoming Sessions</h1>
            {loading && <h3 className='text-center mb-3'>Loading....</h3>}
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
                    {allSessions.length === 0 ? <h3 className='px-3 py-2'>No session request</h3> : <>{allSessions.map((session) => (
                        <tr key={session._id} id={session._id}>
                            <td className='text-center py-1'>{session.name}</td>
                            <td className='text-center py-1'>{new Date(session.appointmentDate).toLocaleDateString()} </td>
                            <td className='text-center py-1'>{session.meetingmode}</td>
                            <td className='text-center py-1'>{session.status}</td>
                            <td className='text-center py-1 flex gap-2 justify-center'>
                                {session.status === "Pending" ? <><button
                                    onClick={acceptSession}
                                    className='bg-green-700 px-4 py-1 text-white rounded-md text-sm hover:bg-green-600'>Accept</button>
                                    <button
                                        onClick={(e)=>{setShowRejectModal(true)
                                            // console.log(e.target.parentElement.parentElement.id)
                                            setRejectSessionId(e.target.parentElement.parentElement.id)
                                        }}
                                        className='bg-red-600 px-4 py-1 text-white rounded-md text-sm hover:bg-red-500'>Reject</button>
                                </> : null}
                                {session.status === "Accepted" ? <><button
                                    className='bg-green-700 px-4 py-1 text-white rounded-md text-sm hover:bg-green-600'><a href={session.additionalInfo}>Join</a></button>
                                </> : null}
                                {session.status === "Rejected" ? <><button
                                    className='bg-black px-5 py-1 text-white rounded-md text-sm hover:bg-zinc-700'>Rejected</button>
                                </> : null}
                                {session.status === "Cancelled" ? <><button
                                    className='bg-black px-4 py-1 text-white rounded-md text-sm hover:bg-zinc-700'>Cancelled</button>
                                </> : null}
                            </td>
                        </tr>
                    ))}

                    </>}

                </tbody>
            </table>
            {showModal && <AdditionalInfoModal sessionId={sessId} setShowModal={setShowModal} />}
            {showRejectModal && <RejectionModal setShowRejectModal={setShowRejectModal} rejectSessionId={rejectSessionId} />}
        </div>
    );
};

export default TherapistSessions;