import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { getAuth } from "firebase/auth";

const HomepageScreen = ({ navigation, route }) => {
  //console.log("email: " + route.params.email);

  return (
    <View>
      <Text>Welcome to Odyssey!</Text>
      {/*<Text>{route.params.email}</Text>*/}
      <Button title="Explore"></Button>
      <Button title="Create"></Button>
      <Button title="Questionnaire"></Button>
      <Button title="Schedules"></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomepageScreen;
