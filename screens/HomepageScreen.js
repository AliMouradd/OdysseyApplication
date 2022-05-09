/**
 * Description:
 *
 * The HomepageScreen displays a screen for a user to see what
 * they can do on the application. The buttons on the screen
 * will allow users to access the different functionalities
 * of the application.
 *
 * Built by: Quacky Coders
 */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { getAuth } from "firebase/auth";
import { app } from "../Config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Import the Lato Fonts
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

import AppLoading from "expo-app-loading";

import Background from "../assets/blob-haikei4.svg";
import BackgroundTwo from "../assets/wave-haikei.svg";

import Icon from "react-native-vector-icons/MaterialIcons";

const db = getFirestore(app);
const HomepageScreen = ({ navigation, route }) => {
  //The name of the user
  const [name, setName] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  /**
   * After rendering, get the name of the user through the database.
   */
  useEffect(async () => {
    const infoRef = doc(db, "users", uid);
    const info = await getDoc(infoRef);
    if (info.exists()) {
      setName(info.data().name);
    }
  }, []);

  let [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  /**
   * Renders the home page screen.
   */
  return (
    <SafeAreaView style={styles.container}>
      <Background style={{ position: "absolute" }} />
      <BackgroundTwo style={{ position: "absolute" }} />
      <View>
        <View style={styles.header}>
          <Icon
            style={{ textAlign: "right", padding: 10 }}
            name="menu"
            size={35}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", { id: route.params.id })
            }
          >
            <Image source={require("../assets/icon.png")} style={styles.img} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignSelf: "flex-start",
            marginTop: 15,
            marginLeft: 25,
          }}
        >
          <Text style={styles.h1}>Hi {name}!</Text>
          <Text style={[styles.p, styles.bot]}>
            Welcome to Odyssey. How can we help you today?
          </Text>
          <Text style={styles.h1}>Menu</Text>
        </View>
      </View>

      <View>
        <TextInput style={styles.input} placeholder="What's on your mind?" />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Itinerary", { id: uid })}
        >
          <Image
            style={{ height: 55, width: 55, borderRadius: 15, marginBottom: 5 }}
            source={require("../assets/undraw_Searching_re_3ra9.png")}
          />
          <Text style={styles.p}>Schedules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Add Places", { id: uid })}
        >
          <Image
            style={{ height: 55, width: 55, borderRadius: 15, marginBottom: 5 }}
            source={require("../assets/undraw_Schedule_re_2vro.png")}
          />
          <Text style={styles.p}>Create</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Questionnaire Welcome")}
        >
          <Image
            style={{ height: 55, width: 55, borderRadius: 15, marginBottom: 5 }}
            source={require("../assets/undraw_Questions_re_1fy7.png")}
          />
          <Text style={styles.p}>Questionnaire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Budget Planner")}
        >
          <Image
            style={{ height: 55, width: 55, borderRadius: 15, marginBottom: 5 }}
            source={require("../assets/undraw_Receipt_re_fre3.png")}
          />
          <Text style={styles.p}>Budget Planner</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Goal Screen", { id: uid })}
        >
          <Image
            style={{ height: 55, width: 55, borderRadius: 15, marginBottom: 5 }}
            source={require("../assets/undraw_To_do_list_re_9nt7.png")}
          />
          <Text style={styles.p}>To-Dos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Generate Route")}
        >
          <Image
            style={{ height: 55, width: 55, borderRadius: 15, marginBottom: 5 }}
            source={require("../assets/undraw_right_direction_tge8.png")}
          />
          <Text style={styles.p}>Routes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 5,
    marginRight: 8,
  },
  input: {
    alignSelf: "center",
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: "85%",
  },
  h1: {
    fontSize: 25,
    fontFamily: "Lato_700Bold",
    marginBottom: 5,
    marginLeft: 10,
  },
  p: { fontFamily: "Lato_400Regular" },
  bot: {
    marginLeft: 10,
    marginBottom: 15,
  },
  btn: {
    borderRadius: 10,
    width: "37%",
    margin: 15,
    backgroundColor: "#FFD56D",
    padding: 15,
    textAlign: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: 50,
  },
});

export default HomepageScreen;
