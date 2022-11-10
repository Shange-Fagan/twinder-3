import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
//import * as Google from 'expo-auth-session/providers/google';
// import * as Google from 'expo-auth-session/providers/google';
import { 
  onAuthStateChanged,
  
  signOut,
 } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

// const config = {
//     androidClientId: 
//     '236293699216-9a0nknjdq7ie79h40iubg0tddokgogfv.apps.googleusercontent.com',
//     iosClientId: 
//     '236293699216-6jdpm0rd6kn5d0qlbh1vgva5afgbqgib.apps.googleusercontent.com',
//     scopes: ["profile", "email"],
//     permissions: ["public_profile","email", "gender", "location"],
// }

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  
 console.log(children);
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }

      //setLoadingInitial(false);
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }


  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      logout,
    })
    [user, loading, error]
    );

//     const signInWithGoogle = async() => {
//         await Google.LogInAsync(config).then(async (logInResult) => {
//             if (logInResult.type === "success") {
//                  login
//            }
//         });
//     };}

return (
    <AuthContext.Provider 
      value={{
      user,
      loading,
      error,
      logout
      }}>
      {children}
    </AuthContext.Provider>
  )}

export default function useAuth() {
    return useContext(AuthContext);
}