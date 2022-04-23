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
  const [scheduleName, setScheduleName] = useState("Name of the Schedule");
  const [description, setDescription] = useState(
    "Short Description of the Trip"
  );
  const [places, setPlaces] = useState([]);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [nameInputModalVisible, setNameInputModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, "UserSchedules", uid);

  useEffect(() => {
    getPlacesTest();
  }, []);

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

  const deletePlace = (num) => {
    const newPlaces = [...places].filter((p) => p.number !== num);
    setPlaces(newPlaces);
  };

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

  const getPlacesTest = () => {
    let placesData = [];
    console.log(route.params.places);
    for (let i = 0; i < route.params.places.length; i++) {
      placesData = [
        ...placesData,
        {
          number: i + 1,
          title: route.params.places[i].title,
          address: route.params.places[i].address,
          picture: route.params.places[i].picture,
        },
      ];
    }
    setPlaces(placesData);
  };

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
