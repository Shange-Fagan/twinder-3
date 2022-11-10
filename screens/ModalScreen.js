import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useTailwind } from 'tailwind-rn'
import useAuth from '../hooks/useAuth';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ModalScreen = () => {
    const {user} = useAuth();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const tailwind = useTailwind();


    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
setDoc(doc(db, 'users', user.uid),{
  id: user.uid,
  displayName: user.displayName,
  photoURL: image,
  job: job,
  age: age,
  timestamp: serverTimestamp(),
}).then (() => {
  navigation.navigate('Home');
})
.catch((error) => {
  alert(error.message);
})
    }

  return (
    
    <View style={[tailwind("flex-1 items-center pt-1"
    ),
    { backgroundColor: '#1f1f23',
    
    }]}>
      < Image
      style={[tailwind("h-20 w-3/5"),
    { 
alignSelf: 'center'
}]}
      resizeMode="contain"
      source={{ uri: "https://cdn.glitch.global/0f2dd307-0d28-4fe9-9ef9-db84277033dd/twinder-logo(12)(1)(5).png?v=1666610895230"}}
      />
      <Text style={tailwind("text-center text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
        </Text>
      <Text style={[tailwind("text-center p-4 font-bold"),
    {color: "#ce53ff"}
    ]}>
Step 1: The Profile Pic
        </Text>
        <TextInput
        value={image}
        onChangeText={setImage}
        style={[tailwind("text-center text-white text-xl pb-2")]}
         placeholder="Enter a Profile Pic URL"
         placeholderTextColor={"#6b7280"}/>

<Text style={[tailwind("text-center p-4 font-bold"),
    {color: "#ce53ff"}
    ]}>
Step 2: The Job
        </Text>
        <TextInput
        value={job}
        onChangeText={setJob}
        style={[tailwind("text-center text-white text-xl pb-2")]}
         placeholder="Enter your occupation"
          placeholderTextColor={"#6b7280"}/>


<Text style={[tailwind("text-center p-4 font-bold"),
    {color: "#ce53ff"}
    ]}>
Step 3: The Age
        </Text>
        <TextInput
        value={age}
        onChangeText={setAge}
        style={[tailwind("text-center text-white text-xl pb-2")]}
         placeholder="Enter your Age"
         placeholderTextColor={"#6b7280"}
         keyboardType="numeric"
          maxLength={2}
         />

<TouchableOpacity
disabled={incompleteForm}
style={[tailwind("w-64 p-3 rounded-xl absolute bottom-10"),
incompleteForm ? {backgroundColor:"#9ca3af"} : {backgroundColor: "#ce53ff"},
]}
  onPress={updateUserProfile}
  >
<Text style={tailwind("text-center text-white text-xl")}>Update Profile </Text>
</TouchableOpacity>
    </View>
  );
};

export default ModalScreen