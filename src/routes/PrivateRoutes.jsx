import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const PrivateRoutes = ({children}) => {

    const {user,loading} = use(AuthContext);

    if(loading){
        return <span className="loading loading-spinner text-success">Loading.....</span>
    }

    if(user){
        return children;
    }
    
    return (
        <Navigate state={location?.pathname} to={"/login"}></Navigate>
    );
};

export default PrivateRoutes;