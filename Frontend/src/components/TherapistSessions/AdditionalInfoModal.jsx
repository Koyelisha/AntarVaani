import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AdditionalInfoModal = ({sessionId,setShowModal}) => {
    const [meetingLink,setMeetingLink] = useState("")
    
    const addMeetingLink = async()=>{
        let response = await axios.post(`http://localhost:3000/session/addLink/${sessionId}`,{meetingLink})
        setShowModal(false)
        window.location.reload()
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col gap-5 text-black'>
                <div className='bg-[#cac6c6] max-w-sm rounded-md px-5 py-5 flex flex-col gap-5 items-center mx-4 text-center'>
                    <h3 className='text-lg'>Provide a Google meet or Zoom Link</h3>
                    <input className='w-full py-2 rounded-md' type="text" value={meetingLink} onChange={(e)=>{setMeetingLink(e.target.value)}}/>
                    <button
                    onClick={addMeetingLink} 
                    className='bg-[#3311C7] px-5 py-3 text-white rounded-md w-full'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfoModal;