/**
 * Description:
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, Image } from "react-native";

const PlacesFullDetailScreen = ({ navigation, route }) => {
  const [name, setName] = useState(route.params.name);
  const [description, setDescription] = useState(route.params.description);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>{name}</Text>
      <Image style={styles.img} source={require("../assets/logo.png")} />
      <Text style={styles.p}>{description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  img: {
    height: 250,
    width: 250,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 18,
  },
  p: {
    fontSize: 16,
  },
});

export default PlacesFullDetailScreen;
