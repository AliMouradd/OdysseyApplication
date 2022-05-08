import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import { getAuth } from "firebase/auth";

const HomepageScreen = ({ navigation, route }) => {
  //console.log("email: " + route.params.email);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.img} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", { id: route.params.id })
          }
        >
          <Image source={require("../assets/icon.png")} style={styles.img} />
        </TouchableOpacity>
      </View>

      <Text style={styles.h1}>Welcome!</Text>

      <Image
        style={styles.image}
        source={require("../assets/Flyingkite_Flatline.png")}
      />

      {/*<Text>{route.params.email}</Text>*/}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Itinerary", { id: uid })}
        >
          <Text>Itinerary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Add Places", { id: uid })}
        >
          <Text>Add Places</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Travel Questionnaire")}
        >
          <Text>Questionnaire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Schedules</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Goal Screen", { id: uid })}
        >
          <Text>To-Dos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Generate Route")}
        >
          <Text>Routes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Personal Schedule")}
        >
          <Text>Personal Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginTop: 15,
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 5,
    marginRight: 85,
    marginLeft: 85,
  },
  h1: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  btn: {
    borderRadius: 10,
    width: "30%",
    margin: 5,
    backgroundColor: "#FFD56D",
    padding: 10,
    textAlign: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: 50,
  },
});

export default HomepageScreen;
