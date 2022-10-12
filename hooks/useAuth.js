import React, { createContext, useContext } from 'react'
//import * as Google from 'expo-auth-session/providers/google';
import * as Google from 'expo-auth-session/providers/google';

const AuthContext = createContext({});

const config = {
    androidClientId: 
    '236293699216-9a0nknjdq7ie79h40iubg0tddokgogfv.apps.googleusercontent.com',
    iosClientId: 
    '236293699216-6jdpm0rd6kn5d0qlbh1vgva5afgbqgib.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile","email", "gender", "location"],
}

export const AuthProvider = ({ children}) => {
    const signInWithGoogle = async() => {
        await Google.LogInAsync(config).then(async (logInResult) => {
            if (logInResult.type === "success") {
                 login
           }
        });
    };}

//return (
    //<AuthContext.Provider
      //value={{
        //user: null,
       //signInWithGoogle
    //}}
    //>
      //{children}
    //</AuthContext.Provider>
 
  //)}

export default function useAuth() {
    return useContext(AuthContext);
}