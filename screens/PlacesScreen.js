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

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, "PublicSchedules", uid);

  const toggleNameInputModalVisible = () => {
    setNameInputModalVisible(!nameInputModalVisible);
  };

  const toggleDescriptionInputModalVisible = () => {
    setDescriptionModalVisible(!descriptionModalVisible);
  };

  const toggleSortModalVisible = () => {
    setSortModalVisible(!sortModalVisible);
  };

  const toggleFilterModalVisible = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const sortPlacesAsc = () => {
    const sortedPlaces = [...places].sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    setPlaces(sortedPlaces);
  };

  const sortPlacesDes = () => {
    const sortedPlaces = [...places].sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    setPlaces(sortedPlaces);
  };

  const filterPlaces = (t) => {
    getPlacesTest();
    if (t === "All") {
      return;
    }
    const filteredPlaces = [...places].filter((p) => p.type === t);
    setPlaces(filteredPlaces);
  };

  const shareSchedule = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newSchedulesList = [
        ...docSnap.data().schedules,
        {
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
            scheduleName: scheduleName,
            description: description,
            places: places,
          },
        ],
      });
    }

    alert("Schedule Uploaded.");
  };

  return (
    <ScrollView>
      <View style={styles.background}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/maarten-van-den-heuvel-gZXx8lKAb7Y-unsplash.jpg")}
        >
          <View style={styles.btns}>
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterModalVisible(!filterModalVisible)}
          >
            <Text>Filter</Text>
          </TouchableOpacity> */}
      </View>

      <View style={{ width: "90%", alignSelf: "center" }}>
        {places.map((place) => (
          <PlacesComponent
            key={place.name}
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
      <ListSortModal
        toggleSortModalVisible={toggleSortModalVisible}
        sortModalVisible={sortModalVisible}
        sortPlacesAsc={sortPlacesAsc}
        sortPlacesDes={sortPlacesDes}
      />
      <ListFilterModal
        toggleFilterModalVisible={toggleFilterModalVisible}
        filterModalVisible={filterModalVisible}
        filterPlaces={(text) => filterPlaces(text)}
      />
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

export default PlacesScreen;
