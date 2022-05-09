/**
 * Description:
 *
 * The Places Screen displays a schedule
 * that the user has generated.
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
import Icon from "react-native-vector-icons/MaterialIcons";

import ScheduleNameInputModal from "../modals/ScheduleNameInputModal";
import ScheduleDescriptionInputModal from "../modals/ScheduleDescriptionInputModal";
import ListSortModal from "../modals/ListSortModal";
import ListFilterModal from "../modals/ListFilterModal";
import PlacesComponent from "./PlacesComponent";

import { db } from "../Config";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const PlacesScreen = ({ navigation, route }) => {
  const [scheduleName, setScheduleName] = useState(
    route.params.schedule.scheduleName
  );
  const [description, setDescription] = useState(
    route.params.schedule.description
  );
  const [places, setPlaces] = useState(route.params.schedule.places);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [nameInputModalVisible, setNameInputModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [newAliasList, setNewAliasList] = useState([]);
  const [tempPlaces, setTempPlaces] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    let aliasData = [];
    for (let i = 0; i < route.params.schedule.places.length; i++) {
      if (
        !aliasData.find(
          (element) => element == route.params.schedule.places[i].alias
        )
      ) {
        aliasData = [...aliasData, route.params.schedule.places[i].alias];
      }
    }
    setNewAliasList(aliasData);
    setTempPlaces(places);
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
  // const sortPlacesAsc = () => {
  //   const sortedPlaces = [...places].sort(function (a, b) {
  //     if (a.title.toLowerCase() < b.title.toLowerCase()) {
  //       return -1;
  //     }
  //     if (a.title.toLowerCase() > b.title.toLowerCase()) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   setPlaces(sortedPlaces);
  // };

  /**
   * A function that sorts the list of places in descending order.
   */
  // const sortPlacesDes = () => {
  //   const sortedPlaces = [...places].sort(function (a, b) {
  //     if (a.title.toLowerCase() < b.title.toLowerCase()) {
  //       return 1;
  //     }
  //     if (a.title.toLowerCase() > b.title.toLowerCase()) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  //   setPlaces(sortedPlaces);
  // };

  /**
   * A function that filters the list of places by a category
   */
  const filterPlaces = (t) => {
    if (t === "All") {
      setPlaces(tempPlaces);
    } else {
      const filteredPlaces = [...tempPlaces].filter((p) => p.alias === t);
      // console.log('Filtered places: ')
      // for(let i = 0; i < filteredPlaces.length; i ++){
      //   console.log(filteredPlaces[i])
      // }
      setPlaces(filteredPlaces);
    }
  };

  /**
   * A function to upload a user's schedule to a public schedule database.
   */
  const shareSchedule = async () => {
    const docRef = doc(db, "PublicSchedules", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newSchedulesList = [
        ...docSnap.data().schedules,
        {
          creator: uid,
          scheduleName: scheduleName,
          description: description,
          places: places,
        },
      ];
      updateDoc(docRef, { schedules: newSchedulesList }, { merge: true });
    } else {
      await setDoc(doc(db, "PublicSchedules", auth.currentUser.uid), {
        schedules: [
          {
            creator: uid,
            scheduleName: scheduleName,
            description: description,
            places: places,
          },
        ],
      });
    }

    alert("Schedule Uploaded.");
  };

  /**
   * A function that copies another user's schedule
   * and add it to the current user's list of schedules
   */
  const copySchedule = async () => {
    const docRefTwo = doc(db, "UserSchedules", uid);
    const docSnapTwo = await getDoc(docRefTwo);

    let newPlaces = [...places];
    for (let i = 0; i < newPlaces.length; i++) {
      newPlaces[i] = {
        ...newPlaces[i],
        number: i + 1,
      };
    }

    const newSchedulesList = [
      ...docSnapTwo.data().schedules,
      {
        scheduleName: scheduleName,
        description: description,
        places: newPlaces,
      },
    ];

    updateDoc(docRefTwo, { schedules: newSchedulesList }, { merge: true });
  };

  /**
   * A function that likes a schedule
   */
  const likeSchedule = async () => {
    const docRefThree = doc(db, "users", route.params.schedule.creator);
    const docSnapThree = await getDoc(docRefThree);
    if (docSnapThree.exists()) {
      let newLikes = docSnapThree.data().likes + 1;
      updateDoc(docRefThree, { likes: newLikes }, { merge: true });
    }
  };

  return (
    <ScrollView>
      <View style={styles.background}>
        <ImageBackground
          style={{ flex: 1 }}
          source={{ uri: route.params.schedule.places[0].picture }}
        >
          <View style={styles.btns}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                style={{ padding: 5 }}
                name="arrow-back"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => shareSchedule()}>
                <Icon
                  style={{ textAlign: "right", padding: 10 }}
                  name="share"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  style={{ textAlign: "right", padding: 10 }}
                  name="more-vert"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.info}>
              <Text style={styles.h1}>{scheduleName}</Text>
              <TouchableOpacity
                onPress={() => setNameInputModalVisible(!nameInputModalVisible)}
              >
                <Icon name="edit" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <Text style={styles.p}>{description}</Text>
              <TouchableOpacity
                onPress={() =>
                  setDescriptionModalVisible(!descriptionModalVisible)
                }
              >
                <Icon name="edit" size={20} color="black" />
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
        {/* <TouchableOpacity
           onPress={() => setSortModalVisible(!sortModalVisible)}
         >
           <Text>Sort</Text>
         </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setFilterModalVisible(!filterModalVisible)}
        >
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: "90%", alignSelf: "center" }}>
        {places.map((place) => (
          <PlacesComponent
            key={place.title}
            place={place}
            index={place.number}
            ui={false}
          ></PlacesComponent>
        ))}
      </View>
      <ScheduleNameInputModal
        toggleNameInputModalVisible={toggleNameInputModalVisible}
        scheduleName={scheduleName}
        onChangeText={(text) => setScheduleName(text)}
        nameInputModalVisible={nameInputModalVisible}
      />
      <ScheduleDescriptionInputModal
        toggleDescriptionInputModalVisible={toggleDescriptionInputModalVisible}
        description={description}
        onChangeText={(text) => setDescription(text)}
        descriptionModalVisible={descriptionModalVisible}
      />
      {/* <ListSortModal
         toggleSortModalVisible={toggleSortModalVisible}
         sortModalVisible={sortModalVisible}
         sortPlacesAsc={sortPlacesAsc}
         sortPlacesDes={sortPlacesDes}
       /> */}
      <ListFilterModal
        toggleFilterModalVisible={toggleFilterModalVisible}
        filterModalVisible={filterModalVisible}
        aliasList={newAliasList}
        filterPlaces={(text) => filterPlaces(text)}
      />
      {route.params.owned && (
        <View>
          <TouchableOpacity
            onPress={() => {
              copySchedule();
            }}
            style={styles.btn}
          >
            <Text>Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              likeSchedule();
            }}
            style={styles.btn}
          >
            <Text>Like</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
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

export default PlacesScreen;
