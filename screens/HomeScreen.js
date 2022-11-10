import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { useTailwind } from "tailwind-rn";
import { StyleSheet } from "react-native";
import {
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
import { db } from "../firebase";
import generateId from "../lib/generateId";
import interests from "../screens/Interests.js";

{
  /*const DUMMY_DATA = [
  {
    firstName: "Sonny",
    lastName: "Sangha",
    job: "Software Developer",
    photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
    age: 27,
    id: 123,
  },
  {
    firstName: "Elon",
    lastName: "Musk",
    job: "Software Developer",
    photoURL:
      "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg",
    age: 40,
    id: 456,
  },
  {
    firstName: "Sonny",
    lastName: "Sangha",
    job: "Software Developer",
    photoURL:
      "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg",
    age: 21,
    id: 789,
  },
];
*/
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfile] = useState([]);
  const swipeRef = useRef(null);
  const tailwind = useTailwind();

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        console.log(snapshot);
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const superSwipes = await getDocs(
        collection(db, "users", user.uid, "superSwipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];
      const superSwipedUserIds =
        superSwipes.length > 0 ? superSwipes : ["test"];
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [
            ...passedUserIds,
            ...swipedUserIds,
            ...superSwipedUserIds,
          ])
        ),
        (snapshot) => {
          setProfile(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log(`Hooray, You MATCHED with ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log(
            `You swiped on ${userSwiped.displayName} (${userSwiped.job}(${userSwiped.interests}))`
          );
        }
      }
    );

    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);

    const swipeTop = async (cardIndex) => {
      if (!profiles[cardIndex]) return;

      const userSwiped = profiles[cardIndex];

      const loggedInProfile = (await getDoc(doc(db, "users", user.uid))).data();

      getDoc(doc(db, "users", userSwiped.id, "superSwipes", user.uid)).then(
        (documentSnapshot) => {
          if (documentSnapshot.exists()) {
            console.log(
              `Hooray, You SUPER MATCHED with ${userSwiped.displayName}`
            );
            setDoc(
              doc(db, "users", user.uid, "superSwipes", userSwiped.id),
              userSwiped
            );

            setDoc(
              doc(db, "superMatches", generateId(user.uid, userSwiped.id)),
              {
                users: {
                  [user.uid]: loggedInProfile,
                  [userSwiped.id]: userSwiped,
                },
                usersMatched: [user.uid, userSwiped.id],
                timestamp: serverTimestamp(),
              }
            );

            navigation.navigate("Match", {
              loggedInProfile,
              userSwiped,
            });
          } else {
            console.log(
              `You super swiped on ${userSwiped.displayName} (${userSwiped.job})`
            );
          }
        }
      );
    };
  };
  return (
    <SafeAreaView
      style={[tailwind("flex-1 relative"), { backgroundColor: "#1f1f23" }]}
    >
      {/* Header */}
      <View style={tailwind("  flex-row justify-center items-center")}>
        <TouchableOpacity
          style={[tailwind("pt-5"), { alignSelf: "flex-start" }]}
          onPress={() => navigation.navigate("Modal")}
        >
          <Image
            style={[tailwind("h-12 w-48 pt-5 ")]}
            resizeMode="contain"
            source={{
              uri: "https://cdn.glitch.global/0f2dd307-0d28-4fe9-9ef9-db84277033dd/twinder-logo(12)(1)(5).png?v=1666610895230",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind("absolute right-5 pt-8 ")}
          onPress={() => navigation.navigate("Edit")}
        >
          <FontAwesome5 name="sliders-h" size={24} color="#ce53ff" />
        </TouchableOpacity>
      </View>

      {/* End of Header */}

      {/* Cards */}
      <View style={tailwind(" flex-1 -mt-8")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          onSwipedTop={(cardIndex) => {
            console.log("Swipe SUPER MATCH");

            swipeTop(cardIndex);
          }}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe PASS");

            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH");
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                borderColor: "#50515b",
                label: {
                  color: "#4DED30",
                  borderStyle: "solid",
                  borderColor: "#50515b",
                },
              },
            },
            top: {
              title: "SUPER MATCH",
              style: [
                {
                  label: {
                    textAlign: "top",
                    color: "blue",
                  },
                },
              ],
            },
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={[tailwind("relative h-3/4 rounded-xl bg-transparent")]}
              >
                <Text>{card.firstName}</Text>
                <Image
                  style={tailwind("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={[
                    tailwind(
                      " absolute bottom-16 bg-transparent w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        tailwind("text-xl font-bold"),
                        { color: "white" },
                      ]}
                    >
                      {card.displayName}
                    </Text>
                    <Text style={[tailwind("text-white"), { color: "white" }]}>
                      {card.job}
                    </Text>
                    <Text style={[tailwind("text-white"), { color: "white" }]}>
                      You both watch
                    </Text>
                  </View>
                  <Text
                    style={[tailwind("text-2xl font-bold"), { color: "white" }]}
                  >
                    {card.age}
                  </Text>
                </View>
                <View
                  style={[
                    tailwind(
                      "flex absolute inset-x-0 bottom-0 pb-2 flex-row justify-evenly items-center"
                    ),
                    styles.cardShadow,
                    {
                      shadowColor: "#000000",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1.2,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={[
                      tailwind(
                        "items-center justify-center border border-yellow-500 rounded-full w-12 h-12 bg-transparent"
                      ),
                      { borderStyle: "solid" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="restart"
                      size={28}
                      color="orange"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tailwind(
                      "items-center justify-center rounded-full w-14 h-14 border border-red-500 bg-transparent"
                    )}
                  >
                    <Entypo name="cross" size={44} color="red" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tailwind(
                      "items-center justify-center border border-blue-500 rounded-full w-12 h-12 bg-transparent"
                    )}
                  >
                    <FontAwesome name="star" size={24} color="#37c2f6" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tailwind(
                      "items-center pt-1 justify-center border border-green-500 rounded-full w-14 h-14 bg-transparent"
                    )}
                  >
                    <AntDesign name="heart" size={30} color="#20eab9" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tailwind(
                      "items-center justify-center border border-purple-500 rounded-full w-12 h-12 bg-transparent"
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lightning-bolt"
                      size={35}
                      color="#9333ea"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tailwind(
                    "relative bg-black h-3/4 rounded-xl justify-center items-center"
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tailwind("font-bold pb-5 text-white")}>
                  No more profiles
                </Text>

                <Image
                  style={tailwind("h-20 w-full")}
                  height={100}
                  width={100}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
                <View
                  style={[
                    tailwind(
                      "flex absolute inset-x-0 bottom-0 pb-2 flex-row justify-evenly items-center"
                    ),
                    styles.cardShadow,
                    {
                      shadowColor: "#000000",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1.2,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={[
                      tailwind(
                        "items-center justify-center border border-yellow-500 rounded-full w-12 h-12 bg-transparent"
                      ),
                      { borderStyle: "solid" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="restart"
                      size={28}
                      color="orange"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tailwind(
                      "items-center justify-center rounded-full w-14 h-14 border border-red-500 bg-transparent"
                    )}
                  >
                    <Entypo name="cross" size={44} color="red" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tailwind(
                      "items-center justify-center border border-blue-500 rounded-full w-12 h-12 bg-transparent"
                    )}
                  >
                    <FontAwesome name="star" size={24} color="#37c2f6" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tailwind(
                      "items-center pt-1 justify-center border border-green-500 rounded-full w-14 h-14 bg-transparent"
                    )}
                  >
                    <AntDesign name="heart" size={30} color="#20eab9" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tailwind(
                      "items-center justify-center border border-purple-500 rounded-full w-12 h-12 bg-transparent"
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lightning-bolt"
                      size={35}
                      color="#9333ea"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        />
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
            style={tailwind(" h-14 w-10")}
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

      {/*<Text>I am the HomeScreen</Text>
      <Button title="Go to Chat Screen"
  onPress={() => navigation.navigate('Chat')} />

  <Button title="Logout" onPress={logout}/>*/}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    position: "absolute", // If you want the position to be fixed at top
  },

  cardShadow: {
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
