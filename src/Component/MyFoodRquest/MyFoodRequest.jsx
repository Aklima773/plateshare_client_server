import React, { use, useEffect,useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import Container from '../Container/Container';
import Swal from 'sweetalert2';

import her2 from './hero2.jpg'

const MyFoodRequest = () => {


    // user calling 
    const {user} = use(AuthContext);

    // all my added foods
    const [myFoods, setMyFoods] = useState([]);

   


    // axios secure call 
    const axiosSecure = useAxiosSecure();

 



    useEffect(()=>{

        axiosSecure.get(`/myreqfoods?email=${user?.email}`)
       
        .then(data=>{
            console.log('My Food list', data)
            console.log(user.email)
            setMyFoods(data.data);
        })

    }, [user, axiosSecure])

  
    //handleDeletemyfoods
    const handleDeletefood = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/myreqfoods/${_id}`)
                    .then(res => {
                        const deleteResult = res.data;
                        if (deleteResult.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Foods has been deleted.",
                                icon: "success"
                            });
                            // 
                            const remainingBids = myFoods.filter(food => food._id !== _id);
                            setMyFoods(remainingBids)
                        }
                    })


            }
        });
    }


    return (
        <div>
            <Container>
        

            <div
  className="hero h-60 mb-10"
  style={{ backgroundImage: `url(${her2})` }}
>
  <h1 className="text-4xl text-white font-bold ">
    My All Requested Food
  </h1>
</div>


            <ul className="list bg-base-100 rounded-box md:w-1/2 shadow-md mb-15 mx-auto">
  
  <li className="p-4 pb-2  opacity-60 tracking-wide text-xl text-purple-600">Total Rquested Food: ({myFoods.length})</li>
  

  {myFoods.map((food, index) => (
  <li className="list-row" key={food._id}>
    <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
    <div>
      <img
        className="size-10 rounded-box"
        src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        alt={food.name}
      />
    </div>
    <div className="list-col-grow">
      <div>{food.name}</div>
      <div className="text-xs font-semibold opacity-60">
        for {food.quantity} People
      </div>
    </div>
    <button
      onClick={() => handleDeletefood(food._id)}
      className="btn btn-outline btn-xs"
    >
      Remove
    </button>

  </li>
))}

 
  
</ul>
            

                    
            </Container>
        </div>
    );
};

export default MyFoodRequest;