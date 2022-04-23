import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import NearbyPlaceComponentDemo from "./NearbyPlaceComponentDemo";

import { HERE_API_KEY } from "@env";

const NearbyPlaceDemo = ({ navigation, route }) => {
  const [places, setPlaces] = useState([]);
  const [finalPlaces, setFinalPlaces] = useState([]);
  const API_KEY = HERE_API_KEY;
  useEffect(() => {
    getPlaces();
  }, []);

  const addPlace = (place) => {
    const newPlaces = [...finalPlaces, place];
    setFinalPlaces(newPlaces);
  };

  const delPlace = (place) => {
    const newPlaces = [...finalPlaces].filter((p) => p.title !== place.title);
    setFinalPlaces(newPlaces);
  };

  const getPlaces = async () => {
    try {
      const response = await fetch(
        "https://places.ls.hereapi.com/places/v1/discover/explore?at=" +
          route.params.lat +
          "," +
          route.params.lng +
          "&cat=sights-museums&apiKey=" +
          API_KEY
      );
      const jsonData = await response.json();

      let d = [];
      console.log(jsonData.results.items.length);
      for (let i = 0; i < jsonData.results.items.length; i++) {
        d = [
          ...d,
          {
            title: jsonData.results.items[i].title,
            address: jsonData.results.items[i].vicinity.replace("<br/>", ", "),
            picture:
              "https://download.vcdn.data.here.com/p/d/places2/icons/categories/" +
              jsonData.results.items[i].icon.substring(
                jsonData.results.items[i].icon.length - 8
              ),
          },
        ];
      }
      setPlaces(d);
    } catch (err) {
      // console.err(err.message);
    }
  };
  return (
    <ScrollView>
      {places.map((place) => (
        <View>
          <NearbyPlaceComponentDemo
            place={place}
            addPlace={addPlace}
            delPlace={delPlace}
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate("PlacesListScreen", { places: finalPlaces })
        }
      >
        <Text>Submit</Text>
      </TouchableOpacity>
      {finalPlaces.map((p) => (
        <Text>{p.title}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    backgroundColor: "#FFD56D",
    padding: 10,
  },
});

export default NearbyPlaceDemo;
