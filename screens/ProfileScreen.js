import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}></View>
      <View style={styles.profile}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/logo.png")} style={styles.img} />
        </View>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>Name Here</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={styles.btn}>
            <Text>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>Follow</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>0</Text>
          <Text>0</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Likes</Text>
          <Text>Followers</Text>
        </View>
      </View>
      <View>
        <Text>Schedules</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  background: {
    backgroundColor: "#FFD56D",
    width: "100%",
    height: 125,
  },
  profile: {
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 5,
    marginTop: -50,
  },
  btn: {
    borderRadius: 10,
    backgroundColor: "#FFD56D",
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    margin: 5,
  },
});

export default ProfileScreen;
