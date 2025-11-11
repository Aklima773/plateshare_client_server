import React, { use } from 'react';
import Container from '../Container/Container';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
//signout function and user get from auth
  const {signoutUser,user} = use(AuthContext);

  //signout function handle
  const handleSignout =()=>{
    signoutUser()
    .then(res=>{
      console.log(res)
      toast.success('Sign out successfully! 🎉', {
              position: 'top-right',
              autoClose: 3000,})

    })
    .catch(err=>{
      console.log(err)
      toast.error(err.message || 'Sign out failed 😞', {
              position: 'top-right',
            } )
    })
  }
    return (
       <>

       {/* daisyUi navbar  */}

       <div className="navbar bg-base-100 shadow-sm">

        {/* fixed container add  */}
        <Container>
<div className='flex justify-around items-center'>
  <div className="navbar-start navbar">

    {/* responsive navbar desin start  */}

    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
        <li><NavLink to={"/"} className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
        <li>
        <a><NavLink to={"/allfoods"} className={({ isActive }) => (isActive ? "active" : "")}>Available Foods</NavLink></a>
      
        </li>

         {/* after looged in  */}

        {
          user &&
           <>
        <li>
        <details>
          <summary> <a><NavLink to={"/myprofile"} className={({ isActive }) => (isActive ? "active" : "")} >My Profile</NavLink></a></summary>
          <ul className="bg-base-100 rounded-t-none 
          w-[160px] p-4 ">
            <li className='mb-2 text-[12px]'><a><NavLink to={"/addfood"} className={({ isActive }) => (isActive ? "active" : "")}>Add food</NavLink></a></li>
            <li className='mb-2 text-[12px]'><a><NavLink to={"/managefood"} className={({ isActive }) => (isActive ? "active" : "")}>Manage My Food</NavLink></a></li>
            <li className='mb-2 text-[12px]'><a><NavLink to={"/myfoodrequest"} className={({ isActive }) => (isActive ? "active" : "")}>My food Requests</NavLink>
            </a></li>
          </ul>
        </details>
      </li>
          </>
        }
      
      </ul>
    </div>

    {/* responsive navbar desin end */}

    {/* in large display navbar start  */}
   
    {/* <a className="btn btn-ghost font-bold text-3xl bg-gradient-to-r from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent"><Link to={"/"}>
    PlateShare</Link></a> */}

<a className="tn btn-ghost text-2xl"><Link to={"/"}>
PlateShare</Link></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-[17px] hover:bg-transparent">
      <li><NavLink to={"/"} className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
      <li>
       <NavLink to={"/allfoods"} className={({ isActive }) => (isActive ? "active" : "")}>Available Foods</NavLink>
      </li>

      {/* after looged in  */}
      {
          user &&
           <>
        <li>
        <details>
          <summary> <a><NavLink to={"/myprofile"} className={({ isActive }) => (isActive ? "active" : "")} >My Profile</NavLink></a></summary>
          <ul className="w-[220px] bg-base-100 rounded-t-none p-4">
            <li className='mb-1 text-[18px]'><a><NavLink to={"/addfood"} className={({ isActive }) => (isActive ? "active" : "")}>Add food</NavLink></a></li>
            <li className='mb-1 text-[18px]'><a><NavLink to={"/managefood"} className={({ isActive }) => (isActive ? "active" : "")}>Manage My Food</NavLink></a></li>
            <li className='mb-1 text-[18px]'><a><NavLink to={"/myfoodrequest"} className={({ isActive }) => (isActive ? "active" : "")}>My food Requests</NavLink>
            </a></li>
          </ul>
        </details>
      </li>
          </>
        }
    </ul>
  </div>
  <div className="navbar-end">

    {/* signout button option set  */}
    {user?

    <div className='flex justify-center items-center gap-3'>
     <a className="btn bg-[#06a196] rounded-sm text-[white] text-[18px] font-bold" onClick={handleSignout}>Sign out</a> 

     <a><NavLink to={"/myprofile"}> {user?.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className={"w-15 h-15 rounded-full object-cover"}
                title={user?.displayName || "User"}
              />
            )}</NavLink></a>
     </div>
     :
      <Link className="btn bg-[#06a196] rounded-sm text-[white] text-[18px] font-bold" to = {"/login"}>Login</Link>
      
      
      }
    
  </div>

  </div>
</Container>
</div>
       </>
    );
};

export default Navbar;