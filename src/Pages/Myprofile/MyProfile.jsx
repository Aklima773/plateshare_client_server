import React from 'react';
import useAuth from '../../CustomHook/useAuth';
import { Link } from 'react-router';



const MyProfile = () => {

    const {user} = useAuth();

    
    return (
        <>
        
        <div className="card card-sm bg-base-200 max-w-100 mt-20 shadow mx-auto">
  <figure className="hover-gallery h-70">
    <img src={user?.photoURL} />


    <img src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
    <img src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
   
  </figure>
  <div className="card-body">
    <h2 className="card-title flex justify-between">
        Hello! 
     <p className='text-xl uppercase text-purple-600'>{user?.displayName}</p>
  
    </h2>

    <div className='flex justify-around items-center'>
    <Link to={'/addfood'}><button className="btn bg-purple-600 text-white text-sm p-6">Add Foods</button></Link>
    <Link to={'/managefood'}><button className="btn bg-purple-600 text-white p-6">Donated Foods</button></Link>
    <Link to={'/myfoodrequest'}><button className="btn bg-purple-600 text-white p-6">Requested Foods</button></Link>

    </div>
  </div>
</div>

        </>
    );
};

export default MyProfile;