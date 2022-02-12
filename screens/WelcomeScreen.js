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
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Odyssey</Text>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.p} onPress={() => navigation.navigate("Log In")}>
          Log In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Sign Up")}
      >
        <Text style={styles.p}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  h1: {
    color: "black",
    fontSize: 32,
    marginBottom: 10,
  },
  logo: {
    width: 250,
    height: 200,
  },
  btn: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFD56D",
    padding: 10,
    width: "50%",
  },
  p: {
    textAlign: "center",
  },
});

export default WelcomeScreen;
