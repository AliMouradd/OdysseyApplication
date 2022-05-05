import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
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

const ItineraryEventView = ({ route, navigation }) => {
  const [theEvent, setTheEvent] = useState({
    title: route.params?.title,
    datetime: route.params?.datetime,
    place: route.params?.place,
  });

  // setup for getting current user's ID:
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  // Firestore document reference
  const userSchedDocRef = doc(db, "GenSchedules", uid);

  console.log(route.params?.title);
  console.log(route.params?.datetime);
  console.log(route.params?.place);
  console.log(route.params?.userevents);

  const deleteEvent = () => {
    console.log("deleteEvent called!");
    const newEvents = route.params?.userevents.filter(
      (item) => item.id != route.params?.id
    );
    updateDoc(userSchedDocRef, { events: newEvents }, { merge: true })
      .then(() => {
        ToastAndroid.show("Event deleted", ToastAndroid.SHORT);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const editEvent = () => {
    console.log("editEvent called!");
  };

  return (
    <View>
      <Text>{route.params?.title}</Text>
      <Text>{route.params?.datetime.toString()}</Text>
      <Text>{route.params?.place}</Text>
      <Text>{route.params?.id}</Text>
      <View>
        <TouchableOpacity
          style={styles.deletebutton}
          onPress={() => [deleteEvent(), navigation.navigate("User Itinerary")]}
        >
          <Text>Delete Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deletebutton}
          onPress={() => editEvent()}
        >
          <Text>Edit Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deletebutton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD56D",
    height: 45,
    width: 100,
    borderRadius: 10,
  },
});

export default ItineraryEventView;
