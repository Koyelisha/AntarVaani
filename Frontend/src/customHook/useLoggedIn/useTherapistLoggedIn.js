import { useNavigate } from 'react-router-dom'
import React from 'react';
import { useEffect } from 'react';

const useTherapistLoggedIn = () => {
    const navigate = useNavigate()
            useEffect(()=>{
                let token = localStorage.getItem("therapistToken");
            if(!token){
                navigate("/role");
        }
         },[])
};

export default useTherapistLoggedIn;