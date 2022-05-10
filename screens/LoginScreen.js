/**
 * Description:
 *
 * The LoginScreen displays a screen for a user to log in.
 * It takes input from an user, validates information,
 * and navigates the user to another screen.
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, app } from "../Config";

import Background from "../assets/blob-haikei.svg";

const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  // The username of the user
  const [username, setUserName] = useState("");
  // The password of the user
  const [password, setPassword] = useState("");

  /**
   * Login function.
   * Log in an user using their inputted credentials.
   * Alerts the user if the information is invalid.
   */
  const login = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(async (userCredential) => {
        // Check if the user has already completed the questionnaire.
        // If they have not, navigate them to the questionnaire screen.
        // Otherwise, navigate the user to the Home screen.
        const userAnswersDocRef = doc(
          db,
          "UserQuestionnaireAnswers",
          auth.currentUser.uid
        );
        const userAnswersDocSnap = await getDoc(userAnswersDocRef);
        if (userAnswersDocSnap.exists()) {
          navigation.navigate("Home", { id: auth.currentUser.uid });
        } else {
          navigation.navigate("Travel Questionnaire");
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("User not found. Please Try again.");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong Password. Please try again.");
        } else {
          alert(error.message);
        }
      });
  };

  /**
   * Login as Guest function.
   * Logs an user in as a Guest.
   */
  const loginAnon = () => {
    signInAnonymously(auth).then(() => {
      navigation.navigate("Home", { id: 0 });
    });
  };

  /**
   * Renders the Login Screen.
   */
  return (
    <SafeAreaView style={styles.container}>
      <Background style={{ position: "absolute" }} />
      <View style={styles.logo}>
        <Image style={styles.img} source={require("../assets/logo.png")} />
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue.</Text>
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setUserName(value)}
          value={username}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => login()} style={styles.submit}>
          <Text>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Sign Up")}
          style={{ marginBottom: 5 }}
        >
          <Text>
            New to Odyssey? <Text style={styles.link}>Sign Up Here!</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => loginAnon()}>
          <Text>
            Log in as <Text style={styles.link}>guest.</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  logo: {
    marginTop: 30,
    alignItems: "center",
  },
  img: {
    height: 195,
    width: 195,
  },
  titleWrapper: {
    marginTop: -15,
    paddingLeft: 70,
  },
  title: {
    fontSize: 32,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subtitle: {
    opacity: 0.65,
    marginBottom: 5,
  },
  inputs: {
    alignItems: "center",
  },
  input: {
    width: "66%",
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  btns: {
    alignItems: "center",
  },
  btn: {
    marginBottom: 20,
    paddingTop: 10,
    paddingLeft: 150,
  },
  link: {
    color: "#0000EE",
    textDecorationLine: "underline",
  },
  submit: {
    borderRadius: 10,
    marginBottom: 25,
    backgroundColor: "#FFD56D",
    padding: 10,
    paddingLeft: 55,
    paddingRight: 55,
  },
});

export default LoginScreen;
