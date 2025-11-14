import React, { useEffect, useRef } from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import useAuth from '../../CustomHook/useAuth';
import { toast } from 'react-toastify';

const DetailsFood = ({selectedFood, onClose}) => {

    const {user} = useAuth();

    // modal open 
    const dialogRef = useRef();
    const axiosSecure = useAxiosSecure();


    // modal effect 
    useEffect(() => {
        if (dialogRef.current) {
          dialogRef.current.showModal(); 
        }
      }, []);

    //step 4
// handleRequest

const handleRequest = async ()=>{

    if (selectedFood.email === user?.email) {
      toast.error("You cannot request your own food!");
      return;
    }
    const requestData = {
      foodId: selectedFood._id,
      foodName: selectedFood.name,
      contributor_email: selectedFood.contributor_email,
      contrinutor_name: selectedFood.contrinutor_name,
      requestor_email: user?.email,
      requestor_name: user?.displayName,
      requestDate: new Date().toISOString(),
    };
  
    console.log("Sending request → ", requestData);
  
    try {
      const res = await axiosSecure.post("/requestFood", requestData);
      
  
      if (res.data.insertedId) {
        toast.success("Request Sent Successfully!");
      }
  
      
    } catch (err) {
      console.log("Request error → ", err);
  
      // server error message
      const msg = err?.response?.data?.message;
  
      if (msg) {
        toast.error(msg);
      } else {
        toast.error("Something went wrong!");
      }
    }
  
  }
    return (
       <>
            {/* //modal for details and req  */}

     <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Your Donated Food!</h3>
                            <figure>
            <img
              src={selectedFood.photourl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
              alt={selectedFood.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl">
              {selectedFood.name}
              <div className="badge bg-purple-600 text-white">{selectedFood.status}</div>
            </h2>

            <div>
              <h1 className='text-purple-600 text-xl font-bold'>Details:</h1>
              <p className='text-sm'>{selectedFood.description}</p>
            </div>
            <p className='mt-4 text-purple-600'>Quantity: {selectedFood.quantity} people</p>
            <div className=' flex justify-between items-center mt-10'>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Expire at: {selectedFood.expire}</div>
            </div>
            <div className="card-actions justify-end">
              <button onClick={()=>handleRequest(selectedFood,user)} className="badge badge-outline hover:bg-purple-600 hover:text-white cursor-pointer">Request Food</button>
            </div>
            </div>
          </div>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={() => dialogRef.current.close() || onClose()} className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
       </>
    );
};

export default DetailsFood;