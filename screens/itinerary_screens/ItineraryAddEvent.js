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
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  addDoc,
  Firestore,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./../../Config";

const ItineraryAddEvent = ({ navigation, events }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // setup for getting current user's ID:
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  const userSchedDocRef = doc(db, "GenSchedules", uid); // doc ref
  const allevents = events.params;
  console.log(events);

  const addToDatabase = () => {
    const data = {
      title: title,
      time: time,
      date: date,
    };
    const newEventsArray = [...events, data];
    updateDoc(userSchedDocRef, { events: newEventsArray }, { merge: true })
      .then(() => {
        alert("Event added");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
      <TextInput
        style={styles.textbox}
        onChangeText={setDate}
        value={date}
        placeholder="Enter date (MM/DD/YYYY)"
      />
      <TextInput
        style={styles.textbox}
        onChangeText={setTime}
        value={time}
        placeholder="Enter time (HH:MM:SS AM/PM)"
      />
      <TouchableOpacity
        style={styles.savebutton}
        onPress={() => addToDatabase()}
      >
        <Text style={{ fontSize: 16 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    alignItems: "center",
  },
  textbox: {
    backgroundColor: "gainsboro",
    height: 40,
    width: "90%",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  savebutton: {
    color: "#FFD56D",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    padding: 15,
    margin: 10,
    width: 250,
    height: 50,
    borderRadius: 10,
  },
});

export default ItineraryAddEvent;
