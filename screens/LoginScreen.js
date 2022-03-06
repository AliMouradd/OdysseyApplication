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
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Goal Screen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Odyssey</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setUserName(value)}
        value={username}
        placeholder="Username"
      />
      <TouchableOpacity style={styles.btn}>
        <Text>Forgot Your Username?</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.btn}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => login()} style={styles.submit}>
        <Text>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text>New to Odyssey? Sign Up Here!</Text>
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

export default LoginScreen;
