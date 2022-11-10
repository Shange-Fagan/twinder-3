import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../components/Header";
import ChatList from "../components/ChatList";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, TouchableOpacity, View } from "react-native";

const ChatScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "#0e0e10" }}>
      <Header title="Chat" />
      <ChatList />
      <View
        style={[
          tailwind(
            "flex absolute inset-x-0 bottom-0 pb-9 flex-row justify-evenly items-center"
          ),
          { bottom: 68 },
        ]}
      >
        <TouchableOpacity
          style={tailwind("pb-3")}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            style={tailwind("h-14 w-10")}
            source={require("../logo3.png")}
          />
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

export default ChatScreen;
