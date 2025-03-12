import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';




const Footer = () => {
    return (
        <div className='bg-[#1B0482]  flex flex-col gap-4'>
            <div className='flex text-white justify-between px-56 pt-14'>
                <div className='flex flex-col gap-6'>
                    <div className='text-white'>
                        <h1 className='text-5xl font-bold font-serif'>AntarVaani</h1>
                        <h3>Let your inner voice be heard</h3>
                    </div>
                    <div>
                        <ul className='text-white flex flex-col gap-4'>
                            <li className='flex gap-5 items-center'>
                                <FontAwesomeIcon icon={faLocationDot} className='text-white text-xl' />
                                <h4>EN Block,Sector V, Bidhannagar<br />West Bengal 700091</h4>
                            </li>
                            <li className='flex gap-5 items-center'>
                                <FontAwesomeIcon icon={faEnvelope} className='text-white text-xl' />
                                <h4>antarvaani2025@gmail.com</h4>
                            </li>
                            <li className='flex gap-5 items-center'>
                                <FontAwesomeIcon icon={faPhone} className='text-white text-xl' />
                                <h4>+91 8585093623</h4>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <h3 className='font-semibold text-2xl'>Quick Links</h3>
                    <ul className='flex flex-col gap-3'>
                        <li className='cursor-pointer hover:text-[#E07A5F]'>For corporates</li>
                        <li className='cursor-pointer hover:text-[#E07A5F]'>For Therapists</li>
                        <li className='cursor-pointer hover:text-[#E07A5F]'>Contact</li>
                        <li className='cursor-pointer hover:text-[#E07A5F]'>About Us</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-8'>
                    <h3 className='font-semibold text-2xl'>Legal Stuff</h3>
                    <ul className='flex flex-col gap-3'>
                        <li className='cursor-pointer hover:text-[#E07A5F]'>Disclaimer</li>
                        <li className='cursor-pointer hover:text-[#E07A5F]'>Privacy Policy</li>
                        <li className='cursor-pointer hover:text-[#E07A5F]'>Terms Of Service</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>We are here to make<br />sure that you are always<br />happy</h2>
                    <div className='flex flex-col gap-3 items-start'>
                        <input
                            type="text"
                            placeholder='Enter your phone number'
                            className='px-7 py-2 rounded-md text-black'
                        />
                        <button
                            type='submit'
                            className='bg-[#E07A5F] px-4 py-2 inline-block rounded-md'
                        >
                            Request Callback
                        </button>
                    </div>
                </div>
            </div>

            <div className='text-white text-center text-sm py-3 border-t-[0.25px] w-full border-gray-600'>
                <p>If you are in a life-threatening situation - DO NOT use this site. <span className='text-[#E07A5F]'>Request a callback</span> to get immediate help.</p>
                <p>©MindEase. All rights reserved</p>
            </div>
        </div>
    );
};

export default Footer;