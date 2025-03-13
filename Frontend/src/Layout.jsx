import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation()
    const hideHeaderFooterRoutes = ["/patient/signup","/patient/signup/otp","/role"]

    const shouldHideHeaderFooter = hideHeaderFooterRoutes.some(route=>
        location.pathname.startsWith(route)
    )

    return (
        <div>
            {!shouldHideHeaderFooter && <Header/>}
            <Outlet/>
            {!shouldHideHeaderFooter &&  <Footer/>}
        </div>
    );
};

export default Layout;