import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import Container from '../Container/Container';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import her2 from './hero2.jpg'

const MyFoodRequest = () => {


    // user calling 
    const {user} = use(AuthContext);

    // all my added foods
    const [myFoods, setMyFoods] = useState([]);

    //selected food for update 
    const [selectedFood, setSelectedFood] = useState(null);


    // axios secure call 
    const axiosSecure = useAxiosSecure();

    //to show modal
    const myfoodsModalRef = useRef();



    useEffect(()=>{

        axiosSecure.get(`/myreqfoods?email=${user?.email}`)
       
        .then(data=>{
            console.log('My Food list', data)
            console.log(user.email)
            setMyFoods(data.data);
        })

    }, [user, axiosSecure])

    //handle modal
    const myfoodsModalOpen = (food)=>{
        setSelectedFood(food);      
    myfoodsModalRef.current.showModal();
    }

    //handleDeletemyfoods
    const handleDeleteBid = (_id) => {
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

                axiosSecure.delete(`/myfoods/${_id}`)
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

    //update my foods
    const handleMyFoodUpdate = (e) =>{
        e.preventDefault();

        if(!selectedFood) return;

        const updateFood ={
            name: e.target.fname.value,
            quantity: e.target.fquantity.value
        };
        

      axiosSecure.patch(`/myfoods/${selectedFood._id}`, updateFood)
        .then(res => {
            const result = res.data;
            if (result.modifiedCount > 0) {
                toast.success("Food updated successfully!");

                // update myFoods state locally
                const updatedFoods = myFoods.map(food =>
                    food._id === selectedFood._id
                        ? { ...food, ...updateFood } // merge new values
                        : food
                );
                setMyFoods(updatedFoods);

                // close modal
                myfoodsModalRef.current.close();
            } else {
                toast.error("No changes were made!");
            }
        })
        .catch(err => {
            console.error(err);
            toast.error("Failed to update food!");
        });
};
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
      onClick={() => handleDeleteBid(food._id)}
      className="btn btn-outline btn-xs"
    >
      Remove
    </button>
    <button
      onClick={() => myfoodsModalOpen(food)}
      className="btn btn-outline btn-xs"
    >
      Update
    </button>
  </li>
))}

 
  
</ul>
            

            {/* //modal for data update  */}

            <dialog ref={myfoodsModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Your Donated Food!</h3>
                            <form onSubmit={handleMyFoodUpdate}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" name='name' className="input"
                                        readOnly
                                        defaultValue={user?.displayName} />
                                    {/* email */}
                                    <label className="label">Email</label>
                                    <input type="email" className="input" name='email' readOnly defaultValue={user?.email} />
                                    {/* bid amount */}
                                    <label className="label">Food Title</label>
                                    <input type="text" name='fname' defaultValue={selectedFood?.name} className="input"
                                        placeholder='Your food'
                                    />

<label className="label">Food Title</label>
                                    <input type="text" name='fquantity' defaultValue={selectedFood?.quantity} className="input"
                                        placeholder='quantity'
                                    />
                                    <button className="btn btn-neutral mt-4">Update Your Food</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    
            </Container>
        </div>
    );
};

export default MyFoodRequest;