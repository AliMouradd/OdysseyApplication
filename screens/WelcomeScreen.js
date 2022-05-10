/**
 * Description:
 *
 * The WelcomeScreen displays a screen to give users some information
 * about the mobile application. It also gives an user the option to
 * sign up for an account or log in to an existing account.
 *
 * Built by: Quacky Coders
 */

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import CarouselComponent from "../components/CarouselComponent";

import Background from "../assets/blob-haikei2.svg";
import BackgroundTwo from "../assets/blob-haikei3.svg";

const WelcomeScreen = ({ navigation }) => {
  /**
   * Renders the welcome screen.
   */
  return (
    <SafeAreaView style={styles.container}>
      <Background style={{ position: "absolute" }} />
      <BackgroundTwo style={{ position: "absolute" }} />
      <Text style={styles.h1}>Odyssey</Text>
      <CarouselComponent />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.btn, styles.btnBigger]}
          onPress={() => navigation.navigate("Log In")}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  h1: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  buttons: {
    alignItems: "center",
  },
  btn: {
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#FFD56D",
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  btnBigger: {
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default WelcomeScreen;
