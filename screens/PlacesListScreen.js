import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import PlacesComponent from "./PlacesComponent";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlacesListScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlacesTest();
  }, []);

  const getPlacesTest = () => {
    let sampleData = [
      {
        number: 1,
        name: "Place One",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      },
      {
        number: 2,
        name: "Place Two",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      },
      {
        number: 3,
        name: "Place Three",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      },
      {
        number: 4,
        name: "Place Four",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      },
      {
        number: 5,
        name: "Place Five",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      },
      {
        number: 6,
        name: "Place Six",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      },
      {
        number: 7,
        name: "Place Seven",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
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
              <Text style={styles.h1}>Name Of the Schedule</Text>
              <TouchableOpacity>
                <Icon name="edit" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <Text style={styles.p}>Short Description of the Trip</Text>
              <TouchableOpacity>
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
          <TouchableOpacity>
            <Text>Sort/Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wrapper}>
          {places.map((place) => (
            <PlacesComponent
              key={place.name}
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
});

export default PlacesListScreen;
