import React from 'react';
import Container from '../Container/Container';
import about from './about.png'
import { Link } from 'react-router';

const Aboutus = () => {
    return (
     <>
     
     <Container>
     <div className="card card-side bg-base-100 shadow-sm  flex justify-around items-center mt-15"> 


        
 <figure>
  <img className='w-80 object-center object-fill p-4' src={about} alt="" />
  

  </figure>



  <div>


  <div className="card-body mr-15">
    <h2 className="card-title text-4xl text-purple-600">Plate Share!</h2>
    <p><span text-purple-600>PlateShare</span> allows
users to share their surplus food with the community to reduce waste. Users can post
food items they want to donate, and other users can browse and request these food
items.</p>
    <div className="card-actions justify-end">
     <Link to={'/allfoods'}> <button className="btn bg-purple-600 text-white">Let's Explore</button></Link>
    </div>
    </div>
  </div>
                </div>
</Container>
     </>
    );
};

export default Aboutus;