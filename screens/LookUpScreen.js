import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { HERE_API_KEY } from "@env";
import MapPic from "../assets/undraw_map_re_60yf.svg";
import Background from "../assets/blob-haikei.svg";

const LookUpScreen = ({ navigation }) => {
  const [text, onChangeText] = useState("");

  const lookUp = async () => {
    const response = await fetch(
      "https://geocode.search.hereapi.com/v1/geocode?q=" +
        encodeURIComponent(text) +
        "&apiKey=" +
        HERE_API_KEY
    );
    const jsonData = await response.json();
    console.log(jsonData.items[0].position.lat);
    console.log(jsonData.items[0].position.lng);
    navigation.navigate("Nearby Place Demo", {
      lat: jsonData.items[0].position.lat,
      lng: jsonData.items[0].position.lng,
    });
  };

  return (
    <View style={styles.container}>
      <Background style={{ position: "absolute" }} />
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
