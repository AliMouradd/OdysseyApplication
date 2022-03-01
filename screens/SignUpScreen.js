/**
 * Description:
 *
 * The SignUpScreen displays a screen for a user to create an account.
 * It takes input from an user, validates and submits information,
 * and navigates the user to another screen.
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";

import { app } from "../Config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

const auth = getAuth(app);
const db = getFirestore(app);

const SignUpScreen = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: fullName,
        email: email,
        likes: 0,
        followers: 0,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.img} source={require("../assets/logo.png")} />
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Let's get started!</Text>
        <Text style={styles.subtitle}>Create an account with your email</Text>
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setfullName(value)}
          value={fullName}
          placeholder="Full Name"
        />

        <TextInput
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder="Password"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setConfirmPassword(value)}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
      </View>

      <View style={styles.btns}>
        <TouchableOpacity onPress={() => signup()} style={styles.submit}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>
            Already have an account? Log In{" "}
            <Text style={styles.link}>Here!</Text>
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
    marginBottom: 15,
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
    alignSelf: "flex-end",
    marginRight: 65,
  },
});

export default SignUpScreen;
