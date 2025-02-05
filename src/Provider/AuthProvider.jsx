
import { createUserWithEmailAndPassword,GoogleAuthProvider,onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect } from 'react';
import { useState } from "react";
import auth from '../Firebase/Firebase.config';


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
      const [user,setUser] = useState(null)
      const [loading,setLoading] =useState(true)


      const createUser = (email,password) =>{
            setLoading(true);
            return createUserWithEmailAndPassword(auth,email,password)
      }

      const signInUser =(email,password) =>{
            setLoading(true)
           return signInWithEmailAndPassword(auth,email,password)
      } 


      const signInWithGoogle = () =>{
           setLoading(true);
           return signInWithPopup(auth,googleProvider)
      }

      const logOut = () =>{
            setLoading(true);
            return signOut(auth);

      }

      useEffect(()=>{
            const unsubscribe = onAuthStateChanged(auth,currentUser =>{
                  console.log('current value of the current user',currentUser);
                  setUser(currentUser);
                  setLoading(false);
            })
            return() =>{
                  unsubscribe();
            }
      },[])


      const authInfo = {
            user,
            loading,
            signInUser,
            createUser,
            signInWithGoogle,
            logOut
      }

     
      return (
            <AuthContext.Provider value={authInfo}>
                {children}  
            </AuthContext.Provider>
      );
};

export default AuthProvider;

AuthContext.propTypes ={
      children: PropTypes.node 
}