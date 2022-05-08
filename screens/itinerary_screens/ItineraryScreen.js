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
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./../../Config";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

/**
 * Description:
 *
 * The Itinerary screen shows the user their own user-created itinerary,
 * where they can add events to the different days of their vacation
 * and specify where the event will take place based on the user's list
 * of saved places.
 *
 * Built by: Quacky Coders
 */
const UserItineraryScreen = ({ navigation }) => {
  /*
   * States used by the Itinerary
   */
  const [selectedDate, setSelectedDate] = useState(undefined); // holds the date that the user selects
  const [tripStartDate, setTripStartDate] = useState(undefined); // holds trip start date, will be set to a moment
  const [tripEndDate, setTripEndDate] = useState(undefined); // holds trip end date, will be set to a moment
  const [events, setEvents] = useState([]); // array of event objects for all dates
  const [selectedEventsArray, setSelectedEventsArray] = useState([]); // array of event objects for selected date
  const [eventModalVisible, setEventModalVisible] = useState(false); // visibility toggle for event view modal
  const [selectedEvent, setSelectedEvent] = useState({}); // holds event object of the selected event

  /*
   * States for adding new events
   */
  const [addModalVisible, setAddModalVisible] = useState(false); // visibility toggle for add event modal
  const [newTitle, setNewTitle] = useState(""); // holds the event's new title
  const [places, setPlaces] = useState([]); // array of places from the user's list of places
  const [selectedPlace, setSelectedPlace] = useState(""); // holds the selected place from user's list of places
  const [pickerdate, setPickerDate] = useState(new Date()); // holds datetime from the date/time picker
  const [pickermode, setPickerMode] = useState("date"); // holds date/time picker mode setting
  const [pickershow, setPickerShow] = useState(false); // show date/time picker toggle

  /*
   * States for editing events (unused)
   */
  const [editModalVisible, setEditModalVisible] = useState(false); // visibility toggle for edit view modal (unused)
  const [editTitle, setEditTitle] = useState(selectedEvent.item?.title);
  const [editpickerdate, seteditpickerdate] = useState(new Date());

  // setup for getting current user's ID:
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  // Firestore document references
  const userSchedDocRef = doc(db, "GenSchedules", uid); // where Itinerary info is stored
  const userSurveyDocRef = doc(db, "UserQuestionnaireAnswers", uid); // for getting questionnaire data
  const placesListDocRef = doc(db, "UserSchedules", "1236"); // for getting user's places list

  /*
   * useEffect functions are called when the screen first renders
   */
  useEffect(() => {
    getTripStartEndDates(); // get trip start/end dates from questionnaire
    createSchedDoc(); // create user's Itinerary document if not already created
    getEventsFromDatabase(); // retrieve user's Itinerary events from database
    getFromPlacesList(); // retrieve user's list of places
  }, []);

  /**
   * Function to get vacation start and end dates from database (to pass to calendar strip)
   */
  const getTripStartEndDates = () => {
    //console.log("getTripStartEndDates called!");

    getDoc(userSurveyDocRef).then((doc) => {
      //console.log("Getting trip start and end dates...");
      setTripStartDate(moment(doc.get("startDate")));
      setTripEndDate(moment(doc.get("endDate")));
      setStartDate(moment(doc.get("startDate")));

      // for testing, show uid and start/end dates
      // console.log(uid);
      // console.log(doc.get("startDate"));
      // console.log(doc.get("endDate"));
    });
  };

  /**
   * Function to create user's Itinerary document in database.
   * If user already has document, this will do nothing.
   */
  const createSchedDoc = () => {
    //console.log("createSchedDoc called!");

    setDoc(userSchedDocRef, {}, { merge: true })
      .then(() => {
        //alert("Document Created/Updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  /**
   * Function to retrieve all Itinerary events from database
   */
  const getEventsFromDatabase = () => {
    //console.log("getEventsFromDatabase called!");

    getDoc(userSchedDocRef).then((doc) => {
      //console.log("Getting events...");
      setEvents(doc.get("events")); // gets the array of event objects from database and saves to events state
      //console.log(events);
    });
  };

  /**
   * Function to retrieve user's places list from database
   */
  const getFromPlacesList = () => {
    //console.log("getFromPlacesList called!");

    getDoc(placesListDocRef).then((doc) => {
      setPlaces(doc.get("places")); // gets array of places and saves to places state
    });
    //console.log(places);
  };

  /**
   * Function to add an event to database.
   * TODO: Add a way to refresh events list after adding an event.
   */
  const addEventToDatabase = () => {
    //console.log("addEventToDatabase called!");

    // create data object with all new event info
    const data = {
      title: newTitle,
      datetime: pickerdate,
      place: selectedPlace,
      id: Math.random(),
    };
    const newEventsArray = [...events, data]; // add new data object to locally saved array of events

    // updates user's Itinerary database with newEventsArray
    updateDoc(userSchedDocRef, { events: newEventsArray }, { merge: true })
      .then(() => {
        ToastAndroid.show("Event added", ToastAndroid.SHORT);
      })
      .catch((error) => {
        alert(error.message);
      });

    // clear title input box after adding an event
    setNewTitle("");
  };

  /**
   * Function to delete an event from the database.
   * TODO: Add a way to refresh events list after deleting an event.
   */
  const deleteEvent = () => {
    //console.log("deleteEvent called!");

    // creates new array of events containing all events except the one that will be deleted
    const newEvents = events.filter(
      (item) => item.id != selectedEvent.item?.id // filter list where event id != deleted event id
    );
    setEvents(newEvents); // set locally saved events array to new events array without deleted event
    getEventsForDay(moment(selectedEvent.item?.datetime)); // ISSUE: passes in null for some reason.

    // update database:
    updateDoc(userSchedDocRef, { events: newEvents }, { merge: true })
      .then(() => {
        ToastAndroid.show("Event deleted", ToastAndroid.SHORT);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  /**
   * Function to edit an event (unused, not working)
   */
  const editEvent = () => {
    console.log("editEvent called!");
    // delete event
    // add event
    // uses editTitle, pickerdate, selectedPlace
    deleteEvent(); // first delete old event
    const data = {
      title: selectedEvent.item?.title,
      datetime: pickerdate,
      place: selectedPlace,
      id: Math.random(),
    };
    const newEventsArray = [...events, data];
    console.log(newEventsArray);
    updateDoc(userSchedDocRef, { events: newEventsArray }, { merge: true })
      .then(() => {
        ToastAndroid.show("Event edited", ToastAndroid.SHORT);
      })
      .catch((error) => {
        alert(error.message);
      });
    //setEditTitle("");
  };

  /**
   * Function used by datetimepicker.
   * onChange changes date/time states when user presses "ok" on datetimepicker.
   */
  const onChange = (pickerevent, pickerSelectedDate) => {
    const currentDate = pickerSelectedDate;
    setPickerShow(false);
    setPickerDate(currentDate);
  };

  /**
   * Function used by datetimepicker.
   * showMode toggles picker visibility and modes.
   */
  const showMode = (currentMode) => {
    setPickerShow(true);
    setPickerMode(currentMode);
  };

  /**
   * Function used by datetimepicker.
   * showDatePicker changes show mode to "date".
   */
  const showDatePicker = () => {
    showMode("date");
  };

  /**
   * Function used by datetimepicker.
   * showTimePicker changes show mode to "time".
   */
  const showTimePicker = () => {
    showMode("time");
  };

  /**
   * Function that is called when a date is selected from the calendar strip.
   */
  const onDateSelected = (date) => {
    //console.log("onDateSelected called!");
    //console.log("\ndate variable: ", date);

    const formDate = date.format("MM/DD/YYYY");
    setSelectedDate(formDate); // sets selected date state
    getEventsForDay(date); // gets events occuring on selected date
  };

  /**
   * Function that filters all Itinerary events into a new array that only contains
   * the events that occur on the date selected by the user.
   */
  const getEventsForDay = (date) => {
    //console.log("getEventsForDay called!");
    //console.log(date);

    const formSelectedDate = date.format("MM/DD/YYYY");

    if (events == undefined) {
      alert("No events created at all!"); // user hasn't added any events yet
    } else {
      const eventObjectsForDay = events.filter(
        (event) =>
          moment(event.datetime.toDate()).format("MM/DD/YYYY") ===
          formSelectedDate
      );
      setSelectedEventsArray(eventObjectsForDay);
    }
  };

  /**
   * List Item component, renders each event in the agenda FlatList.
   */
  const ListItem = ({ event }) => {
    // each event is one object from the events array
    //console.log(event); // shows each event object

    return (
      <View>
        <TouchableOpacity
          style={styles.eventcontainer}
          onPress={() => [setEventModalVisible(true), setSelectedEvent(event)]}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {event.item.title}
          </Text>
          <Text style={{ fontSize: 15 }}>
            {moment(event.item.datetime.toDate()).format("MM/DD/YYYY")}
          </Text>
          <Text style={{ fontSize: 15 }}>
            {moment(event.item.datetime.toDate()).format("hh:mm A")}
          </Text>
          <Text style={{ fontSize: 15 }}>Place: {event.item.place}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Places List Item component, renders each event in the agenda FlatList.
   */
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
          <Text
            style={{
              fontSize: 16,
              marginHorizontal: 3,
              marginVertical: 5,
              flexWrap: "nowrap",
            }}
          >
            {place.item.name}
          </Text>
          {/* <Text style={{ fontSize: 12 }}>{place.item.type}</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  // Main return branches:
  if (tripStartDate == undefined) {
    // return loading view if trip start date has not been retrieved from database yet
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    // return Itinerary view if trip start date has been retrieved
    return (
      <View style={styles.maincontainer}>
        {/* Calendar Strip component, renders top row of selectable calendar dates. */}
        <CalendarStrip
          scrollable
          calendarAnimation={{ type: "parallel", duration: 600 }}
          daySelectionAnimation={{
            type: "background",
            duration: 300,
            highlightColor: "#9265DC",
          }}
          style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: "black", fontSize: 15 }}
          calendarColor={"#FFD56D"}
          dateNumberStyle={{ color: "black", fontSize: 14 }}
          dateNameStyle={{ color: "black", fontSize: 12 }}
          iconContainer={{ flex: 0.1 }}
          highlightDateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "white" }}
          highlightDateContainerStyle={{ backgroundColor: "black" }}
          selectedDate={selectedDate}
          onDateSelected={onDateSelected}
          useIsoWeekday={false}
          startingDate={tripStartDate}
          minDate={tripStartDate}
          maxDate={tripEndDate}
        />

        {/* <Text style={{ fontSize: 24 }}>Selected Date: {selectedDate}</Text> */}

        {/* Agenda list view: Renders agenda list of events for a specific day*/}
        <View style={styles.eventslistcontainer}>
          <FlatList
            data={selectedEventsArray.sort((a, b) =>
              moment(a.datetime.toDate()).diff(moment(b.datetime.toDate()))
            )}
            renderItem={(item) => <ListItem event={item} />}
          />
        </View>

        {/* Renders Add Event button. */}
        <TouchableOpacity
          style={styles.addeventbutton}
          onPress={() => [setAddModalVisible(true), setSelectedPlace("")]}
        >
          <Icon name="add" size={33} color="black" />
        </TouchableOpacity>

        {/* Add Event Modal: */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => {
            setAddModalVisible(!addModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.addModalView}>
              <Text
                style={{ fontSize: 21, fontWeight: "bold", marginBottom: 10 }}
              >
                Enter new event details:
              </Text>
              <TextInput
                style={styles.textbox}
                onChangeText={setNewTitle}
                value={newTitle}
                placeholder="Enter title..."
              />
              <Text
                style={{ fontSize: 18, fontWeight: "bold" }}
                onPress={() => showDatePicker()}
              >
                {moment(pickerdate).format("MM/DD/YYYY")}
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold" }}
                onPress={() => showTimePicker()}
              >
                {moment(pickerdate).format("hh:mm A")}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 15 }}>
                Choose a place from your list:
              </Text>
              <View style={{ height: "44%", marginBottom: 10 }}>
                <FlatList
                  data={places}
                  renderItem={(item) => <PlacesListItem place={item} />}
                />
                <Text>Selected place: {selectedPlace}</Text>
              </View>
              <View style={styles.modalbuttonsview}>
                <TouchableOpacity
                  style={styles.modalbutton}
                  onPress={() => setAddModalVisible(false)}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalbutton}
                  onPress={() => [
                    addEventToDatabase(),
                    getEventsFromDatabase(),
                    setAddModalVisible(false),
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

        {/* Event View Modal: */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={eventModalVisible}
          onRequestClose={() => {
            setEventModalVisible(!eventModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.eventModalView}>
              <Text
                style={{ fontWeight: "bold", fontSize: 19, marginBottom: 20 }}
              >
                Event
              </Text>
              <View style={{ width: "100%", marginBottom: 20 }}>
                <Text style={{ fontSize: 16 }}>
                  Event Title: {selectedEvent.item?.title}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Event Date:{" "}
                  {moment(selectedEvent.item?.datetime.toDate()).format(
                    "MM/DD/YYYY"
                  )}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Event Time:{" "}
                  {moment(selectedEvent.item?.datetime.toDate()).format(
                    "hh:mm A"
                  )}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Event Place: {selectedEvent.item?.place}
                </Text>
              </View>
              <View style={styles.modalbuttonsview}>
                <TouchableOpacity
                  style={styles.modalbutton}
                  onPress={() => [setEventModalVisible(false)]}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalbutton}
                  onPress={() => [setEventModalVisible(false), deleteEvent()]}
                >
                  <Text>Delete Event</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.modalbutton}
                  onPress={() => [
                    setEventModalVisible(false),
                    setEditModalVisible(true),
                  ]}
                >
                  <Text>Edit Event</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </Modal>

        {/* Edit Event Modal: (not used)*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
            setAddModalVisible(!editModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                Edit event details:
              </Text>
              <TextInput
                style={styles.textbox}
                onChangeText={setEditTitle}
                value={editTitle}
                defaultValue={selectedEvent.item?.title}
                placeholder="Enter title..."
              />
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Old date and time:{"\n"}
                {moment(selectedEvent.item?.datetime.toDate()).format(
                  "MM/DD/YYYY, hh:mm A"
                )}
              </Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold" }}
                onPress={() => showDatePicker()}
              >
                New date: {moment(pickerdate).format("MM/DD/YYYY")}
              </Text>
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
                  onPress={() => [setEditModalVisible(false)]}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalbutton}
                  onPress={() => [
                    editEvent(),
                    getEventsFromDatabase(),
                    setAddModalVisible(false),
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

/**
 * StyleSheet for components:
 */
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  eventslistcontainer: {
    flex: 1,
    marginTop: 7,
  },
  eventcontainer: {
    backgroundColor: "#FFD56D",
    borderRadius: 7,
    paddingVertical: 15,
    paddingHorizontal: 20,
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
  addModalView: {
    height: "90%",
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
  eventModalView: {
    height: "40%",
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
    height: 45,
    width: 120,
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
