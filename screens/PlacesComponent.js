/**
 * Description:
 *
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlacesComponent = (props) => {
  const [name, setName] = useState(props.place.name);
  const [description, setDescription] = useState(props.place.description);
  const [number, setNumber] = useState(props.place.number);

  return (
    <View
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("PlacesFullDetailScreen", {
          name: name,
          description: description,
        })
      }
    >
      <TouchableOpacity
        style={styles.delBtn}
        onPress={() => props.delFunction(props.place.number)}
      >
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity>
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
    </View>
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
  delBtn: {
    width: "10%",
    justifyContent: "center",
  },
  img: {
    width: "35%",
    height: 100,
    width: 100,
    marginRight: 10,
  },
  content: {
    width: "45%",
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
