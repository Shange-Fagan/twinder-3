import { View, Text, Image, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { StyleSheet } from "react-native";

const Interests = () => {
  const tailwind = useTailwind();

  const { user } = useAuth();
  const navigation = useNavigation();
  const [interests, setInterests] = useState("");
  const [state, setState] = useState(null);

  interests;

  const incompleteForm = !interests;

  const userInterests = () => {
    setDoc(doc(db, "users", user.uid, "interests", `${interests.toString}`), {
      id: user.uid,
      displayName: user.displayName,
      interests: `${interests}`,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });

    {
      /*https://cdn.glitch.global/0f2dd307-0d28-4fe9-9ef9-db84277033dd/best-dating-profile-photos-women-6.jpeg?v=1666119387234*/
    }
  };

  return (
    <View
      style={[
        tailwind("flex-1 text-center items-center pt-1"),
        { backgroundColor: "#0e0e10" },
      ]}
    >
      <Image
        style={[
          tailwind("h-20 w-3/5"),
          {
            alignSelf: "center",
          },
        ]}
        resizeMode="contain"
        source={{
          uri: "https://cdn.glitch.global/0f2dd307-0d28-4fe9-9ef9-db84277033dd/twinder-logo(12)(1).png?v=1665830187440",
        }}
      />
      <Text style={tailwind("text-center text-xl text-gray-500 p-2 font-bold")}>
        Interests
      </Text>
      <Text
        style={[
          tailwind("text-center text-white text-xl pb-2 text-gray-500"),
          { color: "#ce53ff" },
        ]}
      >
        Please select 5 interests
      </Text>
      <Text
        style={[
          tailwind("px-1 text-center text-white text-base pb-2 text-gray-500"),
        ]}
      >
        help us to improve your matching algorithm, inputs are case sensitive so
        be sure to enter streamers' names as they appear
      </Text>

      <View style={[tailwind(" flex flex-row justify-evenly ")]}>
        <TouchableOpacity
          style={[
            tailwind(
              " border border-purple-600 border-2 bg-transparent p-3 rounded-full"
            ),
          ]}
          value={interests}
          onPress={setInterests}
        >
          <Text
            style={[
              tailwind("font-bold text-center text-white text-purple-600"),
            ]}
          >
            xQcOw
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tailwind(
              " border border-2 border-purple-600 bg-transparent p-3 rounded-full"
            ),
          ]}
          value={interests}
          onPress={setInterests}
        >
          <Text style={[tailwind("font-bold text-center text-purple-600 ")]}>
            MrBeast
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tailwind(
              " border border-2 border-purple-600 bg-transparent p-3 rounded-full"
            ),
          ]}
          value={interests}
          onPress={setInterests}
        >
          <Text style={[tailwind("font-bold text-center text-purple-600")]}>
            SypherPK
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[tailwind(" flex flex-row justify-evenly pt-4 ")]}>
        <TouchableOpacity
          style={[
            tailwind(
              " border border-purple-600 border-2 bg-transparent p-3 rounded-full"
            ),
          ]}
          value={interests}
          onPress={setInterests}
        >
          <Text
            style={[
              tailwind("font-bold text-center text-white text-purple-600"),
            ]}
          >
            loltyler1
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tailwind(
              " border border-2 border-purple-600 bg-transparent p-3 rounded-full"
            ),
          ]}
          value={interests}
          onPress={setInterests}
        >
          <Text style={[tailwind("font-bold text-center text-purple-600 ")]}>
            NICKMERCS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tailwind(
              " border border-2 border-purple-600 bg-transparent p-3 rounded-full"
            ),
          ]}
          value={interests}
          onPress={setInterests}
        >
          <Text style={[tailwind("font-bold text-center text-purple-600")]}>
            Rubius
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tailwind(
              " border border-2 border-purple-600 bg-transparent p-3 rounded-full"
            ),
          ]}
          value={interests}
          onPress={setInterests}
        >
          <Text style={[tailwind("font-bold text-center text-purple-600")]}>
            DrLupo
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={interests}
        onChangeText={setInterests}
        style={[
          tailwind("text-center text-white text-xl pb-2 absolute bottom-40"),
        ]}
        placeholder="Enter your interests"
        placeholderTextColor={"#6b7280"}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={[
          tailwind("w-64 p-3 rounded-xl absolute bottom-10"),
          incompleteForm ? tailwind("bg-gray-400") : tailwind("bg-purple-600"),
        ]}
        onPress={userInterests}
      >
        <Text style={tailwind("text-center text-white text-xl")}>
          Continue{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Interests;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
