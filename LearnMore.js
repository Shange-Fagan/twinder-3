import { View, Text } from "react-native";
import React from "react";

const LearnMore = () => {
  return (
    <View>
      <TouchableOpacity
        style={[
          tailwind(
            " border border-2 border-purple-600 bg-transparent p-3 rounded-full"
          ),
        ]}
        onPress={setInterests}
      >
        <Text style={[tailwind("font-bold text-center text-purple-600 ")]}>
          MrBeast
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LearnMore;
