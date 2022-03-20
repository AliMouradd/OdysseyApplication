import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import PlacesComponent from "./PlacesComponent";
import Icon from "react-native-vector-icons/MaterialIcons";

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

  return (
    <SafeAreaView style={styles.container}>
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
          <TouchableOpacity>
            <Icon name="edit" size={20} color="black" />
          </TouchableOpacity>
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

        <View style={styles.wrapper}>
          {places.map((place) => (
            <PlacesComponent
              key={place.number}
              place={place}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.bar}>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Generate</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={nameInputModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setNameInputModalVisible(!nameInputModalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setNameInputModalVisible(!nameInputModalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput value={scheduleName} onChangeText={setScheduleName} />
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    setNameInputModalVisible(!nameInputModalVisible)
                  }
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>Okay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    setNameInputModalVisible(!nameInputModalVisible)
                  }
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent={true}
        visible={descriptionModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setDescriptionModalVisible(!descriptionModalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setDescriptionModalVisible(!descriptionModalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput value={description} onChangeText={setDescription} />
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    setDescriptionModalVisible(!descriptionModalVisible)
                  }
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>Okay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    setDescriptionModalVisible(!descriptionModalVisible)
                  }
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSortModalVisible(!sortModalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setSortModalVisible(!sortModalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => sortPlacesAsc()}>
                <Text style={styles.modalText}>A to Z</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sortPlacesDes()}>
                <Text style={styles.modalText}>Z to A</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setFilterModalVisible(!filterModalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setFilterModalVisible(!filterModalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Filter By</Text>
              <TouchableOpacity onPress={() => filterPlaces("All")}>
                <Text style={styles.modalText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filterPlaces("Park")}>
                <Text style={styles.modalText}>Park</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filterPlaces("Restaurant")}>
                <Text style={styles.modalText}>Restaurant</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filterPlaces("Store")}>
                <Text style={styles.modalText}>Store</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filterPlaces("Attraction")}>
                <Text style={styles.modalText}>Attraction</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
  },
  modalTitle: {
    marginBottom: 5,
    fontSize: 18,
    borderBottomWidth: 2,
    borderColor: "black",
  },
  modalText: {
    fontSize: 16,
  },
});

export default PlacesListScreen;
