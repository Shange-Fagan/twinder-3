import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn';
import { Foundation } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/core"

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  return (
    <View style={tailwind("p-2 flex-row text-center justify-between")}>
      <View style={tailwind("flex flex-row items-center")}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tailwind("p-2")}>
          <Ionicons name="chevron-back-outline" size={34} color="#ce53ff" />
        </TouchableOpacity>
        <Text style={tailwind("text-white text-2xl font-bold pl-2")}>{title}</Text>
     </View>
    </View>
  );
};

export default Header;