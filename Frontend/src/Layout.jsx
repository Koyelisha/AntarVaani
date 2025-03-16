import React from 'react';
import Header from './components/Header/Header';
import TherapistHeader from './components/Header/TherapistHeader';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation()
    const hideHeaderFooterRoutes = ["/patient/signup","/patient/signup/otp","/role","/therapist/signup"]
    const diffHeader = ["/therapist/dashboard","/therapist/sessions"]

    const shouldHideHeaderFooter = hideHeaderFooterRoutes.some(route=>
        location.pathname.startsWith(route)
    )

    const differentHeader = diffHeader.some(route=>
        location.pathname.startsWith(route)
    )

    return (
        <div>
            {!shouldHideHeaderFooter && <Header/>}
            {differentHeader && <TherapistHeader/>}
            <Outlet/>
            {!shouldHideHeaderFooter &&  <Footer/>}
        </div>
    );
};

export default Layout;