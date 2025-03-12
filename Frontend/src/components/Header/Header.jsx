import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className='bg-[#BFA9A9] px-10 py-4 flex justify-between items-center fixed w-screen z-20'>
            <div>
                Logo
            </div>
            <ul className='flex gap-16 font-semibold text-lg items-center'> 
                <li>
                    {/* <NavLink to="/" className={({isActive})=>
                        `${isActive?"text-red-500":null} hover:text-red-500 cursor-pointer`
                    }> */}
                        Home
                    {/* </NavLink> */}
                </li>
                <li>
                    {/* <NavLink to="/quiz" className={({isActive})=>
                        `${isActive?"text-red-500":null} hover:text-red-500 cursor-pointer`
                    }> */}
                        AI assistance
                    {/* </NavLink> */}
                </li>
                <li>
                    {/* <NavLink to="/contact" className={({isActive})=>
                        `${isActive?"text-red-500":null} hover:text-red-500 cursor-pointer`
                    }> */}
                        Contact
                    {/* </NavLink> */}
                </li>
                <li>
                    {/* <NavLink to="/profile" className={({isActive})=>
                        `${isActive?"text-red-500":null} hover:text-red-500 cursor-pointer`
                    }> */}
                        Profile
                    {/* </NavLink> */}
                </li>
            </ul>
            <ul className='flex gap-3 items-center'>
                <li className='bg-white px-5 py-1 rounded-xl font-semibold text-[#E07A5F] shadow-lg cursor-pointer hover:bg-zinc-200'>Login</li>
                <li className='bg-[#E07A5F] px-5 py-1 rounded-xl font-semibold text-white shadow-lg cursor-pointer hover:bg-[#c06951]'>SignUp</li>
            </ul>
        </div>
    );
};

export default Header;