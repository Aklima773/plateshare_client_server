import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../../firebase/firebase';


const AuthProvider = ({children}) => {

    const [user, setUser] =useState(null);
    
    const [loading, setLoading] = useState(true);

    const [err, setErr] = useState(' ');

    const [success, setSuccess] = useState(false);

//for google login provider

const provider = new GoogleAuthProvider();
    //create new user

    const createUser = (email, password) =>{
        setLoading(true);
        setErr(' ');

        return createUserWithEmailAndPassword (auth,email,password);
    }

    // getfetchemail 

    const fetchSignEMail =(email)=>{
        return fetchSignInMethodsForEmail(auth,email)
    }

    //login
    const signInUser = (email, password)=>{

        setLoading(true);
        setErr(' ');

        return signInWithEmailAndPassword(auth,email,password);
    }

    //login with google
    // sign in with google 
const signInWithGoogle = ()=>{
    setLoading(true);
    setErr(' ');
    return signInWithPopup(auth, provider);
}

//observer set  TO GET user update mount unmount

useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{

        console.log('current user', currentUser);

        setUser(currentUser);
        setLoading(false);
          //as we got user so loading stop 

    })

    // unmount observer 

    return () =>{
        unsubscribe();
    }
})

// singout user 

const signoutUser = ()=>{
    setLoading(true);
    setErr(' ');
    return signOut(auth);
}
    const authInfo ={

        user,
        setUser,
        loading,
        setLoading,
        err,
        setErr,
        success,
        setSuccess,
        createUser,
        fetchSignEMail,
        signInUser,
        signInWithGoogle,
        signoutUser

    }
    return (
        <>
        
<AuthContext.Provider value={authInfo}>

{children}

</AuthContext.Provider>
        
        </>
    );
};

export default AuthProvider;