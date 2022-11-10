import React from "react";
import { View, Text, Image } from "react-native";
import { useTailwind } from "tailwind-rn";

const SenderMessage = ({ message }) => {
  const tw = useTailwind();

  return (
    <View
      style={[
        tw("rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2"),
        { alignSelf: "flex-start", marginLeft: "auto", backgroundColor: "#ce53ff" },
      ]}
    >
      <Text style={tw("text-white")}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;