import React from 'react';
;
import errImg from '../Errorpage/error-404.png';
import { useNavigate } from 'react-router';
import Container from '../../Component/Container/Container';

const Errorpage = () => {

    const navigate = useNavigate();


    const handleGoBack = () =>{
        navigate(-1);
    }
    return (

        <>
        <Container>


        <div className=' bg-base-200 h-screen'>
            <Container>
                <div className="error-page-container flex flex-col justify-center items-center pt-40">
                    
                    <img src={errImg} alt="" />
                    <h1 className='text-[48px] font-bold mt-4 mb-2'>Oops, page not found!</h1>
                    <p className='text-[20px] text-[#627382]'>The page you are looking for is not available.</p>

{/* go back button  */}
                    <button className="btn bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-[18px] text-white w-[145px] mt-4" onClick = {handleGoBack}>Go Back!</button>
                </div>
            </Container>
        </div>

        </Container>
        

        </>
    );
};

export default Errorpage;