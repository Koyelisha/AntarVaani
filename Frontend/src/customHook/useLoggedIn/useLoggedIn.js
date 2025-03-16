import { useNavigate } from 'react-router-dom'
import React from 'react';
import { useEffect } from 'react';

const useLoggedIn = () => {
    const navigate = useNavigate()
            useEffect(()=>{
                let token = localStorage.getItem("token");
            if(!token){
                navigate("/role");
        }
         },[])
};

export default useLoggedIn;