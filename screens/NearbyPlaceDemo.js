import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import NearbyPlaceComponentDemo from "./NearbyPlaceComponentDemo";
import yelp from "./yelp_api/yelp";

//import { HERE_API_KEY } from "@env";

const NearbyPlaceDemo = ({ navigation, route }) => {
  const [places, setPlaces] = useState([]);
  const [finalPlaces, setFinalPlaces] = useState([]);
  //const API_KEY = HERE_API_KEY;
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

  // const getAPI = async () =>{
  //   try{
  //   const response = await yelp.get("/search",{
  //       params: {
  //           limit: 20,
  //           location: term,
  //           categories: "arts",
  //           sort_by: "review_count"
  //       }
  //   })
  //   setResults(response.data.businesses)
  //   console.log(response.data.businesses)

  const getPlaces = async () => {
    try {
      const response = await yelp.get("/search",{
        params: {
            limit: 20,
            location: route.params.text,
            categories: "arts",
            sort_by: "review_count"
        }
    })

      let d = [];
      console.log(response.data.businesses.length );
      for (let i = 0; i < response.data.businesses.length ; i++) {
      d = [
        ...d,
        {
          title: response.data.businesses[i].name,
          address: response.data.businesses[i].location.display_address[0] + "  " + response.data.businesses[i].location.display_address[1],
          picture: response.data.businesses[i].image_url
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
