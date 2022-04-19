import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
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
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [formattedDate, setFormattedDate] = useState();
  const [startDate, setStartDate] = useState();
  const [tripStartDate, setTripStartDate] = useState();
  const [tripEndDate, setTripEndDate] = useState();
  const [events, setEvents] = useState([]); // array of event maps for currently selected date (should include date, time, and description)
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);

  // setup for getting current user's ID:
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  // Firestore document reference
  const userSchedDocRef = doc(db, "GenSchedules", "userid1"); // change "userid1" to uid
  const userSurveyDocRef = doc(db, "UserQuestionnaireAnswers", uid); // for getting questionnaire data

  const createUserDoc = () => {};

  // get all user's events from database (might run after each rerender?)
  useEffect(() => {
    getEventsFromDatabase();
    // probably create doc here
  }, []);

  // function to get events for date selected from database
  const getEventsFromDatabase = () => {
    // function should take date as parameter
    getDoc(userSchedDocRef).then((doc) => {
      console.log("Getting events...");
      setEvents(doc.get("events")); // gets the array of maps from database
      console.log(events);
    });
  };

  // function to get vacation start and end dates (to pass to calendar strip)
  const getTripStartEndDates = () => {
    getDoc(userSurveyDocRef).then((doc) => {
      console.log("Getting trip start and end dates...");
      setTripStartDate(doc.get("startDate"));
      setTripEndDate(doc.get("endDate"));
    });
  };

  const getEventsForDay = (formDate) => {
    // WONT WORK, GETS OLD selectedDate STATE, FIGURE OUT HOW TO GET MOST RECENT STATE
    const eventObjectsForDay = events.filter(
      (event) => event.date === formDate
    );
    console.log("selectedDate state: ", selectedDate);
    console.log("\nEvent Objects for selected day:\n", eventObjectsForDay);
    setSelectedEvents(eventObjectsForDay);
  };

  // function called when date is selected from calendar strip
  const onDateSelected = (date) => {
    console.log("\ndate variable: ", date);
    console.log("old selectedDate state: ", selectedDate);
    const formDate = date.format("MM/DD/YYYY");
    setSelectedDate(formDate);
    getEventsForDay(formDate);
    //console.log("new selectedDate state: ", selectedDate); this wont work because state is async, wont update immediately
  };

  // List Item component, renders each event in the agenda list
  const ListItem = ({ event }) => {
    // each event is one object from the events array
    console.log(event); // shows each event object

    return (
      <View>
        <TouchableOpacity style={styles.eventcontainer}>
          <Text>date: {event.item.date}</Text>
          <Text>time: {event.item.time}</Text>
          <Text>description: {event.item.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // main return
  return (
    <View style={styles.maincontainer}>
      <CalendarStrip
        scrollable={false}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "background",
          duration: 300,
          highlightColor: "#9265DC",
        }}
        style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: "black" }}
        calendarColor={"#FFD56D"}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        iconContainer={{ flex: 0.1 }}
        highlightDateNameStyle={{ color: "white" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateContainerStyle={{ backgroundColor: "black" }}
        markedDates={markedDates}
        selectedDate={selectedDate}
        onDateSelected={onDateSelected}
        useIsoWeekday={false}
        startingDate={startDate}
      />

      <Text style={{ fontSize: 24 }}>Selected Date: {selectedDate}</Text>

      <View>
        <FlatList
          data={selectedEvents}
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
