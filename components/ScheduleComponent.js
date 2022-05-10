/**
 * Description:
 *
 * The Schedule Component displays a card that
 * shows a picture, name, and a short description
 * of a user-generated schedule in the Schedules screen.
 *
 * Built by: Quacky Coders
 */

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const ScheduleComponent = (props) => {
  /**
   * Renders a Schedule Component.
   */
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("PlacesScreen", {
          schedule: props.schedule,
          owned: true,
        })
      }
    >
      <ImageBackground
        source={{ uri: props.schedule.places[0].picture }}
        resizeMode="cover"
        style={styles.img}
      >
        <View>
          <Text style={styles.h2}>{props.schedule.scheduleName}</Text>
          <Text style={styles.p}>{props.schedule.description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginRight: 25,
  },
  img: {
    height: 200,
    width: 200,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  h2: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  p: {
    color: "white",
    marginBottom: 5,
  },
});

export default ScheduleComponent;
