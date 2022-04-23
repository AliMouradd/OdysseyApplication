/**
 * Description:
 *
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import CheckBox from "expo-checkbox";

const NearbyPlaceComponentDemo = (props) => {
  const [title, setTitle] = useState(props.place.title);
  const [address, setAddress] = useState(props.place.address);
  const [picture, setPicture] = useState(props.place.picture);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const toggleBox = (newValue) => {
    if (newValue) {
      props.addPlace(props.place);
    } else {
      props.delPlace(props.place);
    }
    setToggleCheckBox(newValue);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: picture,
        }}
      />
      <View style={styles.content}>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
      <CheckBox
        style={{ alignSelf: "center" }}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={toggleBox}
      />
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
    width: "25%",
    height: 50,
    width: 50,
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

export default NearbyPlaceComponentDemo;
