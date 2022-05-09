/**
 * Description:
 *
 * The Places List Screen displays a list
 * of places that the user has decided they might want
 * to go. The user can sort the order of the places,
 * as well as delete places they might not want to go anymore.
 *
 * Library used for the draggable flatlist:
 * https://github.com/computerjazz/react-native-draggable-flatlist
 *
 * Built by: Quacky Coders
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
} from "react-native";
import PlacesComponent from "./PlacesComponent";
import Icon from "react-native-vector-icons/MaterialIcons";

import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ScheduleNameInputModal from "../modals/ScheduleNameInputModal";
import ScheduleDescriptionInputModal from "../modals/ScheduleDescriptionInputModal";
import ListSortModal from "../modals/ListSortModal";
import ListFilterModal from "../modals/ListFilterModal";

import { db } from "../Config";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const PlacesListScreen = ({ navigation, route }) => {
  // The name of the schedule
  const [scheduleName, setScheduleName] = useState("Name of the Schedule");
  // A short description of the schedule
  const [description, setDescription] = useState(
    "Short Description of the Trip"
  );
  // The places the user will visit in the schedule
  const [places, setPlaces] = useState([]);
  // Whether the sort modal is visible on the screen
  const [sortModalVisible, setSortModalVisible] = useState(false);
  // Whether the filter modal is visible on the screen
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  // Whether the name input modal is visible on the screen
  const [nameInputModalVisible, setNameInputModalVisible] = useState(false);
  // Whether the description input modal is visible on the screen
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  // The possible categories of the places
  const [newAliasList, setNewAliasList] = useState([]);
  // Temporary array of all the places
  const [tempPlaces, setTempPlaces] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, "UserSchedules", uid);

  /**
   * After rendering, call a function
   * to get the list of places the user
   * decided they might want to visit.
   */
  useEffect(() => {
    getPlacesTest();
  }, []);

  /**
   * Toggle function for the Name Input modal
   * Set true for the boolean if it's false.
   * Set false for the boolean if it's true.
   * Displays the modal if true.
   */
  const toggleNameInputModalVisible = () => {
    setNameInputModalVisible(!nameInputModalVisible);
  };

  /**
   * Toggle function for the Description Input modal
   */
  const toggleDescriptionInputModalVisible = () => {
    setDescriptionModalVisible(!descriptionModalVisible);
  };

  /**
   * Toggle function for the Sort modal
   */
  const toggleSortModalVisible = () => {
    setSortModalVisible(!sortModalVisible);
  };

  /**
   * Toggle function for the Filter modal
   */
  const toggleFilterModalVisible = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  /**
   * A function that sorts the list of places in ascending order.
   */
  const sortPlacesAsc = () => {
    const sortedPlaces = [...places].sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    setPlaces(sortedPlaces);
  };

  /**
   * A function that sorts the list of places in descending order.
   */
  const sortPlacesDes = () => {
    const sortedPlaces = [...places].sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    setPlaces(sortedPlaces);
  };

  /**
   * A function that filters the list of places by a category.
   */
  const filterPlaces = (t) => {
    if (t === "All") {
      setPlaces(tempPlaces);
    } else {
      const filteredPlaces = [...tempPlaces].filter((p) => p.alias === t);
      setPlaces(filteredPlaces);
    }
  };

  /**
   * A function that deletes a place from the list.
   */
  const deletePlace = (num) => {
    const newPlaces = [...places].filter((p) => p.number !== num);
    setPlaces(newPlaces);
  };

  /**
   * A function that saves a schedule into the database.
   */
  const generateSchedule = async () => {
    const docSnap = await getDoc(docRef);

    let newPlaces = [...places];
    for (let i = 0; i < newPlaces.length; i++) {
      newPlaces[i] = {
        ...newPlaces[i],
        number: i + 1,
      };
    }

    const newSchedulesList = [
      ...docSnap.data().schedules,
      {
        scheduleName: scheduleName,
        description: description,
        places: newPlaces,
      },
    ];

    updateDoc(docRef, { schedules: newSchedulesList }, { merge: true });
  };

  /**
   * Looping through the list of places the user might want to visit,
   * add it to an array, while extracting out the needed information.
   */
  const getPlacesTest = () => {
    let placesData = [];
    let aliasData = [];
    console.log(route.params.places);
    for (let i = 0; i < route.params.places.length; i++) {
      placesData = [
        ...placesData,
        {
          number: i + 1,
          title: route.params.places[i].title,
          address: route.params.places[i].address,
          picture: route.params.places[i].picture,
          alias: route.params.places[i].alias,
        },
      ];
      if (
        !aliasData.find((element) => element == route.params.places[i].alias)
      ) {
        aliasData = [...aliasData, route.params.places[i].alias];
      }
    }
    setPlaces(placesData);
    setNewAliasList(aliasData);
    setTempPlaces(placesData);
  };

  /**
   * Renders an item of the list of places.
   * Makes use of the PlacesComponent.
   */
  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <PlacesComponent
            key={item.number}
            place={item}
            index={index + 1}
            navigation={navigation}
            delFunction={deletePlace}
            ui={true}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  /**
   * Renders the Places List screen.
   */
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.background}>
          <ImageBackground
            style={{ flex: 1 }}
            source={require("../assets/maarten-van-den-heuvel-gZXx8lKAb7Y-unsplash.jpg")}
          >
            <View style={styles.btns}>
              <TouchableOpacity>
                <Icon
                  style={{ textAlign: "right", padding: 10 }}
                  name="more-vert"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.infoWrapper}>
              <View style={styles.info}>
                <Text style={styles.h1}>{scheduleName}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setNameInputModalVisible(!nameInputModalVisible)
                  }
                >
                  <Icon name="edit" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.info}>
                <Text style={styles.p}>{description}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setDescriptionModalVisible(!descriptionModalVisible)
                  }
                >
                  <Icon name="edit" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white",
            borderBottomWidth: 2,
            borderColor: "#FFD56D",
            paddingTop: 7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 10,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Schedule
          </Text>
          <TouchableOpacity
            onPress={() => setSortModalVisible(!sortModalVisible)}
          >
            <Text>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterModalVisible(!filterModalVisible)}
          >
            <Text>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "90%", alignSelf: "center" }}>
          <DraggableFlatList
            data={places}
            onDragEnd={({ data }) => setPlaces(data)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
        <TouchableOpacity onPress={generateSchedule} style={styles.btn}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Generate</Text>
        </TouchableOpacity>

        <ScheduleNameInputModal
          toggleNameInputModalVisible={toggleNameInputModalVisible}
          scheduleName={scheduleName}
          onChangeText={(text) => setScheduleName(text)}
          nameInputModalVisible={nameInputModalVisible}
        />

        <ScheduleDescriptionInputModal
          toggleDescriptionInputModalVisible={
            toggleDescriptionInputModalVisible
          }
          description={description}
          onChangeText={(text) => setDescription(text)}
          descriptionModalVisible={descriptionModalVisible}
        />

        <ListSortModal
          toggleSortModalVisible={toggleSortModalVisible}
          sortModalVisible={sortModalVisible}
          sortPlacesAsc={sortPlacesAsc}
          sortPlacesDes={sortPlacesDes}
        />

        <ListFilterModal
          toggleFilterModalVisible={toggleFilterModalVisible}
          filterModalVisible={filterModalVisible}
          aliasList={newAliasList}
          filterPlaces={(text) => filterPlaces(text)}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFD56D",
    width: "100%",
    height: 150,
  },
  infoWrapper: {
    paddingLeft: 10,
    paddingTop: 55,
  },
  info: {
    flexDirection: "row",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  h1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  p: {
    fontSize: 16,
    color: "white",
  },
  bar: {
    alignSelf: "center",
    bottom: 20,
  },
  btn: {
    backgroundColor: "#FFD56D",
    borderRadius: 50,
    margin: 10,
    padding: 10,
    width: "45%",
    alignSelf: "center",
    alignItems: "center",
  },
});

export default PlacesListScreen;
