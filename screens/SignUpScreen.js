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

const SignUpScreen = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = () => {
    //todo
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Create Account with Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setfullName(value)}
        value={fullName}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
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
    width: "100%",
    alignItems: "center",
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
