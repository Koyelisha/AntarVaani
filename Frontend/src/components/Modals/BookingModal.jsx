import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const BookingModal = ({setShowModal}) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col gap-5 text-black'>
                <div className='bg-[#cac6c6] max-w-sm rounded-md px-5 py-5 flex flex-col gap-5 items-center mx-4 text-center'>
                    <h3 className='text-lg'>Great! Your session request is on its way.<br/> We'll notify you once the therapist confirms your booking!</h3>
                    {/* Until the session data gets stored in the db..show a loading button */}
                    <button 
                    onClick={()=>{setShowModal(false) 
                        window.location.reload()}}
                    className='bg-[#3311C7] px-5 py-3 text-white rounded-md w-full'>Close</button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;