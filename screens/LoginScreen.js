import { Image, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import GoogleLogin from "../components/GoogleLogin"
import { useState } from "react"
import { useNavigation } from '@react-navigation/native'
import { useTailwind } from "tailwind-rn"


const LoginScreen = () => {
  const tailwind = useTailwind();

    const [loading, setLoading] = useState(false);

  
    const navigation = useNavigation();
    

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
       });
      }, []);
    //const { signInWithGoogle, request, GoogleLogin } = Auth();
  
  return (
    <View style={[tailwind("flex-1"), {backgroundColor:"#ce53ff",
    justifyContent: 'center',
    alignItems: 'center',}]}>
      <Image 
      
      style={{width: 200,
              height: 230,
            resizeMode: "contain",
          justifyContent: "center",
           alignItems: "center"}}
      source={{ uri: 'https://cdn.glitch.global/0f2dd307-0d28-4fe9-9ef9-db84277033dd/logo.png?v=1666377001420'}}
      >

      </Image>
      {/*<ImageBackground
      resizeMode="cover"
      style={tailwind("flex-1")}
      source={{ uri: 'https://cdn.glitch.global/0f2dd307-0d28-4fe9-9ef9-db84277033dd/twinder-logo(15)(5).jpg?v=1665749816105'}}
      >

        <GoogleLogin />
  </ImageBackground>*/}
  <GoogleLogin />
    </View>
  )
};


export default LoginScreen