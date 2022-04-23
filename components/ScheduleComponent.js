import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const ScheduleComponent = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/logo.png")}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}
        style={styles.img}
      >
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            props.navigation.navigate("PlacesScreen", {
              schedule: props.schedule,
            })
          }
        >
          <Text style={styles.h2}>{props.schedule.scheduleName}</Text>
          {/* <Text>Lorem ipsum dolor sit amet...</Text> */}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    justifyContent: "center",
    height: 150,
    width: 100,
  },
  h2: {
    fontWeight: "bold",
  },
});

export default ScheduleComponent;
