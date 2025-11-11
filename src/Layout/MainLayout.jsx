import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
       <>
       <div className='flex flex-col min-h-screen'>

       <Navbar/>

       <div className='flex-1'>
        <ToastContainer></ToastContainer>
        <Outlet/>

       </div>

       <Footer/>
       </div>

       </>
    );
};

export default MainLayout;