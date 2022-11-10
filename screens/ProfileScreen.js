import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { useTailwind } from "tailwind-rn";
import {
  AntDesign,
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import setImage from "../screens/ModalScreen";
import { db } from "../firebase";
import {
  uid,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../CarouselCardItem";
import data from "../data";
import data2 from "../data2";

const ProfileScreen = ({ profile }) => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const tailwind = useTailwind();
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  return (
    <View style={[tailwind("h-full"), { backgroundColor: "#0e0e10" }]}>
      <View
        style={[
          tailwind("rounded-b-full  pt-52 h-5/6 w-full"),
          styles.cardShadow,
          {
            shadowColor: "#ce53ff",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 5,
            shadowOpacity: 1,
          },
          { backgroundColor: "#000000", top: -160 },
        ]}
      >
        <View style={tailwind("flex flex-row justify-between")}>
          <Header
            style={tailwind("absolute left-5 top-3 pt-3")}
            title="Profile"
          />

          <TouchableOpacity style={tailwind("pt-6 pr-6 ")} onPress={logout}>
            <MaterialIcons name="logout" size={24} color="#ce53ff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tailwind("items-center")}
          onPress={() => navigation.navigate("Edit")}
        >
          <Image
            style={tailwind(
              "  justify-evenly items-center h-28 w-28 rounded-full"
            )}
            source={{ uri: user.photoURL }}
            onClick
          />
        </TouchableOpacity>
        <View
          style={tailwind("flex pt-20 flex-row justify-evenly items-center")}
        >
          <TouchableOpacity
            style={[
              tailwind("h-16 w-16 pt-3.5 items-center  rounded-full"),
              styles.cardShadow,
              {
                shadowColor: "#0e0e10",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 9,
              },
              { backgroundColor: "#000000" },
            ]}
            onPress={() => navigation.navigate("Edit")}
          >
            <Ionicons name="settings-sharp" size={34} color="#504f51" />
          </TouchableOpacity>
          <View style={tailwind("pt-6")}>
            <TouchableOpacity
              style={[
                tailwind("h-20 w-20 rounded-full items-center pl-1 pt-6"),
                styles.cardShadow,
                {
                  shadowColor: "#0e0e10",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1,
                },
                { backgroundColor: "#000000" },
              ]}
              onPress={() => navigation.navigate("Edit")}
            >
              <FontAwesome name="edit" size={36} color="#504f51" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              tailwind("h-16 w-16 rounded-full items-center pt-3.5"),
              styles.cardShadow,
              {
                shadowColor: "#0e0e10",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 1,
              },
              { backgroundColor: "#000000" },
            ]}
            onPress={() => navigation.navigate("Edit")}
          >
            <AntDesign name="Safety" size={35} color="#504f51" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[tailwind("pb-6 bg-transparent items-center"), { bottom: 170 }]}
      >
        <Carousel
          layout="default"
          layoutCardOffset={1}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
        />
        <View style={[tailwind("pb-6"), { bottom: 70 }]}>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            activeAnimationType="timing"
            loop={true}
            autoplay={true}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: "rgba(0, 0, 0, 0.92)",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            inactiveDotColor={"#ffffff"}
            tappableDots={true}
          />
        </View>
      </View>
      <View
        style={[
          tailwind(
            "flex absolute inset-x-0 bottom-0 pb-9 flex-row justify-evenly items-center"
          ),
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
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  logo: {
    position: "absolute", // If you want the position to be fixed at top
  },

  cardShadow: {
    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
