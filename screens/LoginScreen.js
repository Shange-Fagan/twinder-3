import { Button, Text, View } from 'react-native';
import React, { createContext, useContext } from 'react'
import useAuth from "../hooks/useAuth";
import GoogleLogin from "../hooks/Auth";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";



const LoginScreen = () => {
    //const { signInWithGoogle } = useAuth();

    //const { request, GoogleLogin } = Auth();
  
  return (
    <View>
      <Text>Login to the app</Text>
      
       <GoogleLogin />
      
    </View>
  )
};


export default LoginScreen