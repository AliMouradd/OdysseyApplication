import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  TextInput,
  ToastAndroid,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import Icon from "react-native-vector-icons/MaterialIcons";
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
import moment from "moment";
import { set } from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";

const ItineraryScreen = ({ navigation }) => {
  // states used by the itinerary
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [formattedDate, setFormattedDate] = useState();
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("MM/DD/YYYY")
  ); // change this to make the calendar strip start at correct date
  const [tripStartDate, setTripStartDate] = useState(undefined);
  const [tripEndDate, setTripEndDate] = useState(undefined);
  const [events, setEvents] = useState([]); // array of event objects for all dates (should include date, time, and description)
  const [selectedEvents, setSelectedEvents] = useState([]); // array of event objects for selected date
  const [markedDates, setMarkedDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // states for adding new events
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [pickerdate, setPickerDate] = useState(new Date());

  // state for places list
  const [places, setPlaces] = useState([]);

  // setup for getting current user's ID:
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  // Firestore document reference
  const userSchedDocRef = doc(db, "GenSchedules", uid);
  const userSurveyDocRef = doc(db, "UserQuestionnaireAnswers", uid); // for getting questionnaire data
  const placesListDocRef = doc(db, "UserSchedules", "123");

  // get all user's events from database (might run after each rerender?)
  // maybe get all data from a previous screen and pass it into this screen to avoid rendering issue
  useEffect(() => {
    getTripStartEndDates(); // get trip start/end dates from survey (try getting these before calendar strip renders somehow)
    createSchedDoc(); // create user's doc if not already created
    getEventsFromDatabase(); // get events from database (from user's doc)
    getFromPlacesList();
  }, []);

  // function to get vacation start and end dates (to pass to calendar strip)
  const getTripStartEndDates = () => {
    console.log("getTripStartEndDates called!");
    getDoc(userSurveyDocRef).then((doc) => {
      console.log("Getting trip start and end dates...");
      setTripStartDate(moment(doc.get("startDate")).format("MM/DD/YYYY"));
      setTripEndDate(moment(doc.get("endDate")).format("MM/DD/YYYY"));
      setStartDate(moment(doc.get("startDate")).format("MM/DD/YYYY"));

      // for testing, show uid and start/end dates
      // console.log(uid);
      // console.log(doc.get("startDate"));
      // console.log(doc.get("endDate"));
    });
  };

  const createSchedDoc = () => {
    console.log("createSchedDoc called!");
    setDoc(userSchedDocRef, {}, { merge: true })
      .then(() => {
        //alert("Document Created/Updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // function to get events for date selected from database
  const getEventsFromDatabase = () => {
    console.log("getEventsFromDatabase called!");
    // function should take date as parameter
    getDoc(userSchedDocRef).then((doc) => {
      console.log("Getting events...");
      setEvents(doc.get("events")); // gets the array of event objects from database
      //console.log(events);
    });
  };

  // function to add events to database
  const addEventToDatabase = () => {
    console.log("addEventToDatabase called!");
    const data = {
      title: newTitle,
      time: newTime,
      date: moment(newDate).format("MM/DD/YYYY"),
      place: selectedPlace,
      id: Math.random(),
    };
    const newEventsArray = [...events, data];
    updateDoc(userSchedDocRef, { events: newEventsArray }, { merge: true })
      .then(() => {
        ToastAndroid.show("Event added", ToastAndroid.SHORT);
      })
      .catch((error) => {
        alert(error.message);
      });
    // clear inputs after adding an event
    setNewTitle("");
    setNewDate(undefined);
    setNewTime(undefined);
  };

  const getFromPlacesList = () => {
    console.log("getFromPlacesList called!");
    getDoc(placesListDocRef).then((doc) => {
      setPlaces(doc.get("places"));
    });
    //console.log(places);
  };

  // datetimepicker functions
  const onChange = (pickerevent, pickerSelectedDate) => {
    const currentDate = pickerSelectedDate;
    setPickerDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePicker.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  // function called when date is selected from calendar strip
  const onDateSelected = (date) => {
    console.log("onDateSelected called!");
    //console.log("\ndate variable: ", date);
    //console.log("old selectedDate state: ", selectedDate);
    const formDate = date.format("MM/DD/YYYY");
    setSelectedDate(formDate);
    getEventsForDay(formDate);
  };

  const getEventsForDay = (formDate) => {
    console.log("getEventsForDay called!");
    if (events == undefined) {
      alert("No events created at all!"); // user hasn't added any events yet
    } else {
      const eventObjectsForDay = events.filter(
        (event) => event.date === formDate
      );
      //console.log("selectedDate state: ", selectedDate);
      //console.log("\nEvent Objects for selected day:\n", eventObjectsForDay);
      setSelectedEvents(eventObjectsForDay);
    }
  };

  // List Item component, renders each event in the agenda list
  const ListItem = ({ event }) => {
    // each event is one object from the events array
    //console.log(event); // shows each event object

    return (
      <View>
        <TouchableOpacity style={styles.eventcontainer}>
          <Text>title: {event.item.title}</Text>
          <Text>date: {event.item.date}</Text>
          <Text>time: {event.item.time}</Text>
          <Text>place: {event.item.place}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const PlacesListItem = ({ place }) => {
    return (
      <View>
        <TouchableOpacity
          style={
            place.item.name == selectedPlace
              ? styles.selectedplacecontainer
              : styles.unselectedplacecontainer
          }
          onPress={() => setSelectedPlace(place.item.name)}
        >
          <Text>{place.item.name}</Text>
          <Text>{place.item.type}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // main return
  if (tripStartDate == undefined) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.maincontainer}>
        <CalendarStrip
          scrollable
          calendarAnimation={{ type: "parallel", duration: 600 }}
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
          startingDate={tripStartDate}
          minDate={tripStartDate}
          maxDate={tripEndDate}
        />

        <Text style={{ fontSize: 24 }}>Selected Date: {selectedDate}</Text>

        <View>
          <FlatList
            data={selectedEvents}
            renderItem={(item) => <ListItem event={item} />}
          />
        </View>

        <TouchableOpacity
          style={styles.addeventbutton}
          onPress={() => [setModalVisible(true), setSelectedPlace("")]}
        >
          <Icon name="add" size={33} color="black" />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                Enter new event details:
              </Text>
              <TextInput
                style={styles.textbox}
                onChangeText={setNewTitle}
                value={newTitle}
                placeholder="Enter title..."
              />
              <TextInput
                style={styles.textbox}
                onChangeText={setNewDate}
                value={newDate}
                placeholder="Enter date (MM/DD/YYYY)"
              />
              <TextInput
                style={styles.textbox}
                onChangeText={setNewTime}
                value={newTime}
                placeholder="Enter time (HH:MM:SS AM/PM)"
              />
              <View style={{ height: "55%", margin: 10 }}>
                <Text>Choose a place from your list:</Text>
                <Text>Selected place: {selectedPlace}</Text>
                <FlatList
                  data={places}
                  renderItem={(item) => <PlacesListItem place={item} />}
                />
              </View>
              <View style={styles.modalbuttonsview}>
                <TouchableOpacity
                  style={styles.modalbutton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalbutton}
                  onPress={() => [
                    addEventToDatabase(),
                    getEventsFromDatabase(),
                    setModalVisible(false),
                  ]}
                >
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
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
  addeventbutton: {
    backgroundColor: "#6D97FF",
    borderRadius: 25,
    height: 70,
    width: 70,
    position: "absolute",
    top: "87%",
    left: "77%",
    paddingTop: 18,
    paddingLeft: 18,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 56,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: "88%",
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalbuttonsview: {
    flexDirection: "row",
    //backgroundColor: "red",
  },
  modalbutton: {
    backgroundColor: "#FFD56D",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textbox: {
    borderColor: "gainsboro",
    borderWidth: 2,
    height: 40,
    width: "90%",
    padding: 10,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 5,
  },
  selectedplacecontainer: {
    backgroundColor: "#FFD56D",
    width: 250,
    margin: 2,
    padding: 3,
    paddingLeft: 5,
    borderRadius: 5,
  },
  unselectedplacecontainer: {
    backgroundColor: "gainsboro",
    width: 250,
    margin: 2,
    padding: 3,
    paddingLeft: 5,
    borderRadius: 5,
  },
});

export default ItineraryScreen;
