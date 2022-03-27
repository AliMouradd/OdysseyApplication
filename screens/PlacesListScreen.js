import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
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

const PlacesListScreen = ({ navigation }) => {
  const [scheduleName, setScheduleName] = useState("Name of the Schedule");
  const [description, setDescription] = useState(
    "Short Description of the Trip"
  );
  const [places, setPlaces] = useState([]);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [nameInputModalVisible, setNameInputModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

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

  const getPlacesTest = () => {
    let sampleData = [
      {
        number: 1,
        name: "Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        type: "Restaurant",
      },
      {
        number: 2,
        name: "A",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        type: "Restaurant",
      },
      {
        number: 3,
        name: "C",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        type: "Attraction",
      },
      {
        number: 4,
        name: "B",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        type: "Store",
      },
      {
        number: 5,
        name: "G",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        type: "Park",
      },
      {
        number: 6,
        name: "H",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        type: "Store",
      },
      {
        number: 7,
        name: "I",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        type: "Park",
      },
    ];
    setPlaces(sampleData);
  };

  const _renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <PlacesComponent
            key={item.number}
            place={item}
            navigation={navigation}
            delFunction={deletePlace}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.background}>
          <View style={styles.btns}>
            <TouchableOpacity>
              <Text style={{ textAlign: "right" }}>Share</Text>
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
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
            renderItem={_renderItem}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.btn}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Generate</Text>
          </TouchableOpacity>
        </View>

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
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  background: {
    backgroundColor: "#FFD56D",
    height: 125,
    justifyContent: "space-between",
    marginBottom: 5,
    padding: 5,
  },
  info: {
    flexDirection: "row",
  },
  h1: {
    fontSize: 18,
    fontWeight: "bold",
  },
  p: {
    fontSize: 16,
  },
  bar: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
  },
  btn: {
    backgroundColor: "#FFD56D",
    borderRadius: 50,
    marginBottom: 25,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default PlacesListScreen;
