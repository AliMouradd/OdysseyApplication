import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image
} from "react-native";
import { getAuth } from "firebase/auth";

const HomepageScreen = ({ navigation, route }) => {
  //console.log("email: " + route.params.email);

  return (
    <View style = {styles.container}>

    <Image 
      style = {styles.image}
      source = {require("../assets/Flyingkite_Flatline.png")}
      
      />
    
      {/*<Text>{route.params.email}</Text>*/}
      <View style = {styles.buttonsContainer}>
      <TouchableOpacity style={styles.btn}>
        <Text>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text>Create</Text>
      </TouchableOpacity>
      </View>

      <View style = {styles.buttonsContainer}>
      <TouchableOpacity style={styles.btn}>
        <Text>Questionaire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text>Schedules</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    textAlign:"center",
    marginTop: 75,
    flex: 1
  },
  btn: {
    borderRadius: 10,
    width: "30%",
    margin: 5,
    backgroundColor: "#FFD56D",
    padding: 10,
    textAlign: "center",
    alignItems: "center"
  },
  buttonsContainer:{
    flexDirection: "row"
   
  },

  image:{
    height: 250,
    width: 250,
    marginBottom: 50
  }
});

export default HomepageScreen;
