import React, { createContext, useContext } from 'react'
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const navigation = useNavigation();
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

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
    if (response?.type === "success") {
      const { authentication } = response;
      // await AsyncStorage.setItem("accessTocken", "hihi");

      //navigation.navigate"Home");

      const { idToken, accessToken} = response;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(auth, credential)
    }
      return Promise.reject();
  };

  useEffect(() => {
    asyncAuthRequest();
  }, [response]);

  console.log('response', response)

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  
    
  );
};

export default GoogleLogin;