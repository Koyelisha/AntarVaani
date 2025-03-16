import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'

const TherapistHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem("token")
        setIsLoggedIn(!!token);
    }, [])

    const logoutUser = ()=>{
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate("/")
    }

    return (
        <div className='bg-[#BFA9A9] px-10 py-4 flex justify-between items-center fixed w-screen z-20'>
            <div>
                <NavLink to='/'>
                    Logo
                </NavLink>
            </div>
            <ul className='flex gap-16 font-semibold text-lg items-center'>
                <li>
                    <NavLink to="/therapist/sessions" className={({ isActive }) =>
                        `${isActive ? "text-red-500" : null} hover:text-red-500 cursor-pointer`
                    }>
                        Sessions
                    </NavLink>
                </li>
                
                
                <li>
                    <NavLink to="/therapist/dashboard" className={({ isActive }) =>
                        `${isActive ? "text-red-500" : null} hover:text-red-500 cursor-pointer`
                    }>
                        Profile
                    </NavLink>
                </li>
                
            </ul>
            <ul className='flex gap-3 items-center'>
                {isLoggedIn ? (<li className='bg-white px-5 py-1 rounded-xl font-semibold text-[#E07A5F] shadow-lg cursor-pointer hover:bg-zinc-200'>
                    <NavLink onClick={logoutUser} to='/'>
                        Logout
                    </NavLink>
                </li>) : (
                    <>
                        <li className='bg-white px-5 py-1 rounded-xl font-semibold text-[#E07A5F] shadow-lg cursor-pointer hover:bg-zinc-200'>
                            <NavLink to='/role'>
                                Login
                            </NavLink>
                        </li>
                        <li className='bg-[#E07A5F] px-5 py-1 rounded-xl font-semibold text-white shadow-lg cursor-pointer hover:bg-[#c06951]'>
                            <NavLink to="/role">
                                SignUp
                            </NavLink>
                        </li>
                    </>
                )
                }

            </ul>
        </div>
    );
};

export default TherapistHeader;