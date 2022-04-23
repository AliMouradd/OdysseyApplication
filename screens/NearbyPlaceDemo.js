import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import { HERE_API_KEY } from "@env";

const NearbyPlaceDemo = ({ navigation, route }) => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    console.log(route.params.lat);
    console.log(route.params.lng);
    getPlaces();
  }, []);
  const getPlaces = async () => {
    try {
      const response = await fetch(
        "https://browse.search.hereapi.com/v1/browse?apiKey=" +
          HERE_API_KEY +
          "&at=" +
          route.params.lat +
          "," +
          route.params.lng +
          "&pretty&categories=100,200,300,350,550,600"
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setPlaces(jsonData.items);
    } catch (err) {
      // console.err(err.message);
    }
  };

  return (
    <ScrollView>
      {places.map((place) => (
        <Text key={place.title}>{place.title}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default NearbyPlaceDemo;
