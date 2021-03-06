/**
 * Description:
 * The Places Component displays a small card that
 * displays picture, name, and a short description
 * of a place in a list of places
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlacesComponent = (props) => {
  // The name of the place
  const [title, setTitle] = useState(props.place.title);
  // The address of the place
  const [address, setAddress] = useState(props.place.address);
  // A picture of the place
  const [picture, setPicture] = useState(props.place.picture);
  // Order of the place
  const [number, setNumber] = useState(props.index);

  /**
   * Renders the Places component
   */
  return (
    <View
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("PlacesFullDetailScreen", {
          title: title,
          address: address,
        })
      }
    >
      {props.ui && <Icon name="drag-handle" size={25} color="black" />}

      <Image style={styles.img} source={{ uri: picture }} />
      <View style={styles.content}>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
      <View>
        <View style={{ marginTop: 5, marginBottom: 10 }}>
          <Text style={styles.num}>{number}</Text>
        </View>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => props.delFunction(props.place.number)}
        >
          {props.ui && <Icon name="delete" size={20} color="black" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "grey",
    marginBottom: 2,
    justifyContent: "space-evenly",
    backgroundColor: "white",
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
  num: {
    marginTop: 5,
    backgroundColor: "#FFD56D",
    borderWidth: 10,
    borderColor: "#FFD56D",
    borderRadius: 15,
    paddingTop: 15,
    textAlign: "center",
  },
});

export default PlacesComponent;
