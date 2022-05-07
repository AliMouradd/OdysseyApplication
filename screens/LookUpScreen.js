/**
 * Description:
 *
 * The LookUpScreen displays a screen for a user to
 * input a location.
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import MapPic from "../assets/undraw_map_re_60yf.svg";
import Background from "../assets/blob-haikei.svg";
import Icon from "react-native-vector-icons/MaterialIcons";

const LookUpScreen = ({ navigation }) => {
  const [text, onChangeText] = useState("");

  /**
   * Navigate to the next screen with the user's input
   */
  const lookUp = async () => {
    navigation.navigate("Nearby Place Demo", {
      text: text,
    });
  };

  /**
   * Renders the Look Up Screen.
   */
  return (
    <View style={styles.container}>
      <Background style={{ position: "absolute" }} />
      <TouchableOpacity
        style={{ alignSelf: "flex-start", marginLeft: 15 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <MapPic width="275" height="200" />
      <Text style={styles.h2}>Where do you want to go?</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TouchableOpacity style={styles.btn} onPress={lookUp}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 40,
  },
  img: {
    height: 75,
    width: 75,
  },
  h2: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    height: 35,
    width: "70%",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
  btn: {
    borderRadius: 10,
    backgroundColor: "#FFD56D",
    padding: 10,
  },
});

export default LookUpScreen;
