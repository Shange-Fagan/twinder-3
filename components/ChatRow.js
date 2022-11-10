import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { useTailwind } from "tailwind-rn";
import { db } from '../firebase';
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';


const ChatRow = ({matchDetails}) => {
  const tw = useTailwind();

    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState([]);
  
    useEffect(() => {
      setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user]);
  
    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "matches", matchDetails.id, "messages"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
        ),
      [matchDetails, db]
    );
    return (
   
      <TouchableOpacity
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
      style={[
        tw("flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"),
        {backgroundColor: "#2d2d37"}, styles.cardShadow,
      ]}
    >
      {/* Avatar */}
      <Image
        style={tw("rounded-full h-16 w-16 mr-4")}
        source={{
          uri: matchedUserInfo?.photoURL,
        }}
      />

      <View>
        <Text style={tw("text-white text-lg font-semibold")}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text style={tw("text-white")}>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
    
  )
}

export default ChatRow

const styles = StyleSheet.create({
    cardShadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
  
      elevation: 2,
    },
});