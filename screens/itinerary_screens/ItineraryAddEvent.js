import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ItineraryAddEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  addToDatabase = () => {};

  // main return
  return (
    <View style={styles.maincontainer}>
      <Text>Add a new event to your schedule:</Text>
      <TextInput
        style={styles.textbox}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter title..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {},
  textbox: {},
});

export default ItineraryAddEvent;
