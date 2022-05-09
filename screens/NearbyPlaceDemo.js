/**
 * Description:
 * The Nearby Place screen displays a list of nearby places
 * after a user inputs a location.
 *
 * Built by: Quacky Coders
 */

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
  const [aliasList, setAliasList] = useState([]);
  //const API_KEY = HERE_API_KEY;

  /**
   * After rendering, call a function
   * to get the list of nearby places
   */
  useEffect(() => {
    getPlaces();
  }, []);

  /**
   * Adds a place from a list of places
   * @param {Object} place - a place to be added to the list
   */
  const addPlace = (place) => {
    const newPlaces = [...finalPlaces, place];
    setFinalPlaces(newPlaces);
  };

  /**
   * Deletes a place from a list of places
   * @param {Object} place - a place to be deleted from the list
   */
  const delPlace = (place) => {
    const newPlaces = [...finalPlaces].filter((p) => p.title !== place.title);
    setFinalPlaces(newPlaces);
  };

  /**
   * Using the Yelp API, get a list of nearby places.
   * Then, extract the needed information from each of the place
   * and add it to a list of places as an object.
   */
  const getPlaces = async () => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 20,
          location: route.params.text,
          categories: "arts",
          sort_by: "review_count",
        },
      });

      // From the JSON data, add each nearby place with only
      // the needed information in an array as an object.
      let d = [];
      let al = [];
      for (let i = 0; i < response.data.businesses.length; i++) {
        d = [
          ...d,
          {
            title: response.data.businesses[i].name,
            address:
              response.data.businesses[i].location.display_address[0] +
              "  " +
              response.data.businesses[i].location.display_address[1],
            picture: response.data.businesses[i].image_url,
            alias: response.data.businesses[i].categories[0].title,
          },
        ];
        if (
          !al.find(
            (element) =>
              element == response.data.businesses[i].categories[0].title
          )
        ) {
          al = [...al, response.data.businesses[i].categories[0].title];
        }
        //aliasList = [...aliasList, response.data.businesses[i].categories[0].title]
      }
      setPlaces(d);
      setAliasList(al);
      //prints alias
    } catch (err) {
      // console.err(err.message);
    }
  };

  /**
   * Renders the Nearby Places screen
   */
  return (
    <ScrollView>
      <Text
        style={{ marginTop: 70, padding: 10, fontSize: 20, fontWeight: "700" }}
      >
        Selection
      </Text>
      <Text style={{ paddingLeft: 10, paddingBottom: 5 }}>
        Check the places you want to visit!
      </Text>
      {places.map((place) => (
        <View>
          <NearbyPlaceComponentDemo
            place={place}
            key = {place.title}
            //aliasList = {aliasList}
            addPlace={addPlace}
            delPlace={delPlace}
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate("PlacesListScreen", {
            places: finalPlaces,
            aliasList: aliasList,
          })
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
