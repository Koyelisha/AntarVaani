import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserCancelSessionModal = ({ setShowCancelModal, cancelSessionId }) => {
    const [reason, setReason] = useState("");
    const [loader,setLoader] = useState(false);

    const cancelSession = async()=>{
        try{
            setLoader(true)
            let response = await axios.patch(`http://localhost:3000/patient/reject/${cancelSessionId}`,{reason})
            setLoader(false)
            alert("Session Cancelled Succeessfully");
            setShowCancelModal(false)
            window.location.reload()
        }catch(err){
            alert(err.message)
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
            <div className='mt-10 flex flex-col gap-5 text-black'>
                <div className='bg-[#cac6c6] max-w-2xl w-full rounded-md px-5 py-5 flex flex-col gap-5 items-center mx-4 text-center'>
                    <h3 className='text-lg'>Enter the reason for cancellation</h3>
                    <input className='w-full py-2 rounded-md px-2' type="text" value={reason} onChange={(e) => { setReason(e.target.value) }} 
                    placeholder='e.g. other tasks assigned (therapist)'/>
                    <button
                        onClick={cancelSession}
                        className='bg-[#3311C7] px-5 py-3 text-white rounded-md w-full'>
                            {loader===true?"Loading...":"Submit"}
                            </button>
                </div>
            </div>
        </div>
    );
};

export default UserCancelSessionModal;