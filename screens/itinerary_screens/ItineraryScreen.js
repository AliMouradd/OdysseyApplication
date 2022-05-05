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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";

const UserItineraryScreen = ({ navigation }) => {
  // states used by the itinerary
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [formattedDate, setFormattedDate] = useState();
  const [startDate, setStartDate] = useState(moment(new Date())); // change this to make the calendar strip start at correct date
  const [tripStartDate, setTripStartDate] = useState(undefined); // will be set to a moment
  const [tripEndDate, setTripEndDate] = useState(undefined); // will be set to a moment
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
  const [pickermode, setPickerMode] = useState("date");
  const [pickershow, setPickerShow] = useState(false);

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

  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    getTripStartEndDates(); // get trip start/end dates from survey (try getting these before calendar strip renders somehow)
    createSchedDoc(); // create user's doc if not already created
    getEventsFromDatabase(); // get events from database (from user's doc)
    getFromPlacesList();
    getEventsForDay(moment(selectedDate, "MM/DD/YYYY"));
  }, [isFocused]);

  // function to get vacation start and end dates (to pass to calendar strip)
  const getTripStartEndDates = () => {
    console.log("getTripStartEndDates called!");
    getDoc(userSurveyDocRef).then((doc) => {
      console.log("Getting trip start and end dates...");
      setTripStartDate(moment(doc.get("startDate")));
      setTripEndDate(moment(doc.get("endDate")));
      setStartDate(moment(doc.get("startDate")));

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
      datetime: pickerdate,
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
    setPickerShow(false);
    setPickerDate(currentDate);
  };

  const showMode = (currentMode) => {
    setPickerShow(true);
    setPickerMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  // function called when date is selected from calendar strip
  const onDateSelected = (date) => {
    console.log("onDateSelected called!");
    //console.log("\ndate variable: ", date);
    //console.log("old selectedDate state: ", selectedDate);
    const formDate = date.format("MM/DD/YYYY");
    setSelectedDate(formDate);
    getEventsForDay(date);
  };

  const getEventsForDay = (date) => {
    console.log("getEventsForDay called!");
    const formSelectedDate = date.format("MM/DD/YYYY");
    if (events == undefined) {
      alert("No events created at all!"); // user hasn't added any events yet
    } else {
      const eventObjectsForDay = events.filter(
        (event) =>
          moment(event.datetime.toDate()).format("MM/DD/YYYY") ===
          formSelectedDate
      );
      const sortedEventObjectsForDay = eventObjectsForDay.sort((a, b) =>
        moment(a.datetime).diff(moment(b.datetime))
      );
      setSelectedEvents(eventObjectsForDay);
    }
  };

  // List Item component, renders each event in the agenda list
  const ListItem = ({ event }) => {
    // each event is one object from the events array
    //console.log(event); // shows each event object

    return (
      <View>
        <TouchableOpacity
          style={styles.eventcontainer}
          onPress={() =>
            navigation.navigate("Itinerary Event View", {
              userevents: events,
              title: event.item.title,
              datetime: event.item.datetime,
              place: event.item.place,
              id: event.item.id,
            })
          }
        >
          <Text>title: {event.item.title}</Text>
          <Text>
            date: {moment(event.item.datetime.toDate()).format("MM/DD/YYYY")}
          </Text>
          <Text>
            time: {moment(event.item.datetime.toDate()).format("hh:mm A")}
          </Text>
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

        <View style={styles.eventslistcontainer}>
          <FlatList
            data={selectedEvents.sort((a, b) =>
              moment(a.datetime.toDate()).diff(moment(b.datetime.toDate()))
            )}
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
              {/* <TextInput
                style={styles.textbox}
                onChangeText={setNewDate}
                value={newDate}
                placeholder="Enter date (MM/DD/YYYY)"
              /> */}
              <Text
                style={{ fontSize: 17, fontWeight: "bold" }}
                onPress={() => showDatePicker()}
              >
                {moment(pickerdate).format("MM/DD/YYYY")}
              </Text>
              {/* <TextInput
                style={styles.textbox}
                onChangeText={setNewTime}
                value={newTime}
                placeholder="Enter time (HH:MM:SS AM/PM)"
              /> */}
              <Text
                style={{ fontSize: 17, fontWeight: "bold" }}
                onPress={() => showTimePicker()}
              >
                {moment(pickerdate).format("hh:mm A")}
              </Text>
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
                {pickershow && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={pickerdate}
                    mode={pickermode}
                    is24Hour={false}
                    onChange={onChange}
                    minimumDate={tripStartDate.toDate()}
                    maximumDate={tripEndDate.toDate()}
                  />
                )}
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
  eventslistcontainer: {
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

export default UserItineraryScreen;
