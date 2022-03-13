/**
 * Description:
 *
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const PlacesComponent = (props) => {
  const [name, setName] = useState(props.place.name);
  const [description, setDescription] = useState(props.place.description);
  const [number, setNumber] = useState(props.place.number);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("PlacesFullDetailScreen", {
          name: name,
          description: description,
        })
      }
    >
      <Image style={styles.img} source={require("../assets/logo.png")} />
      <View style={styles.content}>
        <Text>{name}</Text>
        <Text>
          {description.length < 40
            ? description
            : description.substring(0, 95) + "..."}
        </Text>
      </View>
      <View style={styles.order}>
        <Text style={styles.num}>{number}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "grey",
    marginBottom: 2,
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  img: {
    width: "40%",
    height: 100,
    width: 100,
    marginRight: 10,
  },
  content: {
    width: "50%",
  },
  order: {
    width: "10%",
    justifyContent: "center",
  },
  num: {
    backgroundColor: "#FFD56D",
    borderWidth: 10,
    borderColor: "#FFD56D",
    borderRadius: 20,
    textAlign: "center",
    paddingTop: 10,
  },
});

export default PlacesComponent;
