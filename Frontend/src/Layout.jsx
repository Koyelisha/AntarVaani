import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation()
    const hideHeaderFooterRoutes = [""]
    return (
        <div>
            {!hideHeaderFooterRoutes.includes(location.pathname) && <Header/>}
            <Outlet/>
            {!hideHeaderFooterRoutes.includes(location.pathname) &&  <Footer/>}
        </div>
    );
};

export default Layout;