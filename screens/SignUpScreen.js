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
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.essage));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Create Account with Email</Text>
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setfullName(value)}
        value={fullName}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setConfirmPassword(value)}
        value={confirmPassword}
      />
      <TouchableOpacity onPress={() => signup()} style={styles.submit}>
        <Text>Sign Up</Text>
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
    fontSize: 24,
    marginBottom: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#D3D3D3",
    borderColor: "#D3D3D3",
    width: "66%",
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    marginBottom: 10,
  },
  submit: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#ACABD6",
    padding: 10,
  },
});

export default SignUpScreen;
