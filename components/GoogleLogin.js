import React, { createContext, useContext, useMemo } from 'react'
import * as WebBrowser from "expo-web-browser";
import { Button, Text, TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { getAuth, signInWithCredential, GoogleAuthProvider } from '@firebase/auth';
import { useTailwind } from 'tailwind-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';


WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const tailwind = useTailwind();

  const navigation = useNavigation();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "236293699216-bst43767un873mcddmmrpgf4v2h088jd.apps.googleusercontent.com",
    iosClientId:
      "236293699216-6jdpm0rd6kn5d0qlbh1vgva5afgbqgib.apps.googleusercontent.com",
    webClientId:
      "236293699216-9a0nknjdq7ie79h40iubg0tddokgogfv.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    permissions: ["public_profile","email", "gender", "location"],
  });
  
    const asyncAuthRequest = async () => {
      setLoading(true);
    if (response?.type === "success") {

      const { authentication } = response;

      const { idToken, accessToken } = authentication;

      const credential = GoogleAuthProvider.credential(null, accessToken);
      await signInWithCredential(auth, credential)
    }
      setLoading(false)
      return Promise.reject();
      

};

  useEffect(() => {
    asyncAuthRequest();
  }, [response]);

  const memoedValue = useMemo(
    () => ({
      loading,
    })
    [loading]
    );

  return (
    <TouchableOpacity style={[tailwind("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
         { marginHorizontal: "25%"},
      ]}
      onPress={() => {
        promptAsync();
      }}>
          <Text style={tailwind("font-semibold text-center")} >Sign in & get swiping</Text>

    </TouchableOpacity>
    
  
    
  );
};

export default GoogleLogin;