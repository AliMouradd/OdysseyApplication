import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Button,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
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

const ItineraryScreen = () => {
  // states that will be used for the itinerary
  const [selectedDate, setSelectedDate] = useState(); //
  const [formattedDate, setFormattedDate] = useState();
  const [startDate, setStartDate] = useState();
  const [events, setEvents] = useState([]); // array of event maps for currently selected date (should include date, time, and description)
  // maybe call it eventMapsArray or something

  // setup for getting current user's ID:
  //const auth = getAuth();
  //const user = auth.currentUser;
  //const uid = user.uid;

  // Firestore document reference
  const userSchedDocRef = doc(db, "UserSchedules", "userid1"); // change "userid1" to uid

  const createUserDoc = () => {};

  // function to get events for date selected from database
  const getEventsFromDatabase = () => {
    // function should take date as parameter
    getDoc(userSchedDocRef).then((doc) => {
      console.log("Getting events...");
      setEvents(doc.get("events")); // gets the array of maps from database
      console.log(events);
    });
  };

  const printEventInfo = () => {
    console.log(events[0].date);
  };

  // function called when date is selected from calendar strip
  const onDateSelected = () => {};

  // List Item component, renders each event in the agenda list
  const ListItem = ({ event }) => {
    // each event is one map element from the events array
    return (
      <View>
        <TouchableOpacity style={styles.eventcontainer}>
          <Text>date: {event.date}</Text>
          <Text>time: {event.time}</Text>
          <Text>description: {event?.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // main return
  return (
    <View style={styles.maincontainer}>
      <Button onPress={getEventsFromDatabase} title={"get events"} />
      <Button onPress={printEventInfo} title={"print event info"} />
      <View>
        <FlatList
          data={events}
          renderItem={(item) => <ListItem event={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  eventcontainer: {
    backgroundColor: "#FFD56D",
    borderRadius: 7,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default ItineraryScreen;
