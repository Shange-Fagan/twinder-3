import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/core"
import React from 'react'
import { useTailwind } from "tailwind-rn"

const MatchedScreen = () => {
  const tailwind = useTailwind();

    const navigation = useNavigation();
    const { params } = useRoute();

    const  { loggedInProfile, userSwiped } = params;


  return (
    <View style={[tailwind("h-full bg-purple-600 pt-20"), {backgroundColor: "#ce53ff"},{opacity: 0.95 }]}>
      <View style={tailwind("justify-center px-10 pt-20")}>
        <Image style={tailwind("h-20 w-full")}
        source={{ 
            uri: "https://links.papareact.com/mg9",
        }}/>
      </View>

      <Text style={tailwind("text-white text-center mt-5")}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View style={tailwind("flex-row justify-evenly mt-5")}>
        <Image 
        style={tailwind("h-32 w-32 rounded-full")}
        source={{
            uri: loggedInProfile.photoURL,
        }}
        />
        <Image 
        style={tailwind("h-32 w-32 rounded-full")}
        source={{
            uri: userSwiped.photoURL,
        }}
        />
      </View>
      <TouchableOpacity 
      style={tailwind("bg-white m-5 px-10 py-8 rounded-full mt-20")}
      onPress={() => {

        navigation.goBack();
        navigation.navigate("Chat");
      }}
    >
       <Text style={tailwind("text-center")}> Send a Message</Text> 
    </TouchableOpacity>
      
    </View>
  )
}

export default MatchedScreen;