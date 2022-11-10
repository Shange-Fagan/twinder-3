import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingViewComponent,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import Header from "../components/Header";
import RecieverMessage from "../components/RecieverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const MessageScreen = () => {
  const tw = useTailwind();

  const navigation = useNavigation();
  const route = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  const { matchDetails } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };

  return (
    <SafeAreaView
      style={[
        tw("flex flex-1 dark:bg-slate-800 flex-col justify-evenly space-y-4 "),
        {
          backgroundColor: "#1f1f23",
          justifyContent: "space-around",
          flexDirection: "column",
        },
      ]}
    >
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        callEnabled={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            onScrollBeginDrag={Keyboard.dismiss}
            data={messages}
            style={tw("pl-4")}
            inverted={-1}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <RecieverMessage key={message.id} message={message} />
              )
            }
          />

          {/* <RecieverMessage message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum " />
            <SenderMessage />
            <SenderMessage />
            <RecieverMessage message="This is a test" />
            <SenderMessage />
            <RecieverMessage message="James Bond... the names BOND" />
            <RecieverMessage message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum " />
            <SenderMessage />
            <SenderMessage />
            <RecieverMessage message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum " /> */}
        </TouchableWithoutFeedback>
        <View style={[tw("px-5 pb-20"), { paddingBottom: 80 }]}>
          <View
            style={[
              tw(
                "flex-row justify-between items-center  border  rounded-full px-1"
              ),
              { borderColor: "#50515b" },
            ]}
          >
            <View style={tw("pl-2")}>
              <TextInput
                style={[
                  tw(" text-lg pb-1 pr-1"),
                  {
                    color: "#FFFFFF",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
                placeholder="Send Message..."
                placeholderTextColor={"#50515b"}
                size={10}
                onChangeText={setInput}
                textColor={"#FFFFFF"}
                onSubmitEditing={sendMessage}
                value={input}
              />
            </View>

            <Button onPress={sendMessage} title="Send" color="#ce53ff" />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View
        style={[
          tw(
            "flex absolute inset-x-0 bottom-0 pb-9 flex-row justify-evenly items-center"
          ),
        ]}
      >
        <TouchableOpacity
          style={tw("pb-3")}
          onPress={() => navigation.navigate("Home")}
        >
          <Image style={tw("h-14 w-10")} source={require("../logo3.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Ionicons name="grid-outline" size={34} color="#ce53ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Interests")}>
          <Ionicons name="game-controller" size={40} color="#ce53ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={36} color="#ce53ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <FontAwesome name="user-circle-o" size={34} color="#ce53ff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
