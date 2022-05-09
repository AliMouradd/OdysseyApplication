import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

navigator.geolocation = require("react-native-geolocation-service");

/**
 * Description:
 *
 * The Route Input screen is where the user will search for an origin or destination, which
 * will then be passed to the Map View screen for use in getting directions. The Route Input screen
 * features a Google Places autocomplete text box that searches for and displays Google Places
 * based on what the user types in.
 *
 * Built by: Quacky Coders
 */
const RouteInputScreen = ({ navigation, route }) => {
  const ref = useRef();

  // Main return:
  return (
    <View style={styles.container}>
      {/* Google Places Autocomplete component, renders search box and results: */}
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={"Search for a location..."}
        onPress={(data) => {
          // When a autocomplete result is selected, pass it back to MapViewScreen and navigate back.
          if (route.params?.navigateFrom == "origininput") {
            // If navigated from origin input box, save to origin param and navigate back.
            navigation.navigate({
              name: "Generate Route",
              params: { originparam: data.description },
              merge: true,
            });
          } else if (route.params?.navigateFrom == "destinationinput") {
            // If navigated from destination input box, save to destination param and navigate back.
            navigation.navigate({
              name: "Generate Route",
              params: { destinationparam: data.description },
              merge: true,
            });
          }
        }}
        query={{
          key: "AIzaSyAlQmVRL7LxjWepNA8PvOO-2hYIOvkrAeU",
          language: "en",
        }}
        debounce={500} // How long to wait to display results after user stops typing.
        // Google Places Autocomplete styles:
        styles={{
          container: {
            flex: 1,
            padding: 7,
          },
          textInputContainer: {
            flexDirection: "row",
          },
          textInput: {
            flex: 1,
            backgroundColor: "white",
            height: 44,
            borderRadius: 10,
            fontSize: 15,
            borderWidth: 2,
            borderColor: "gainsboro",
          },
          poweredContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "gainsboro",
            borderWidth: 2,
          },
          powered: {},
          listView: {
            borderRadius: 10,
          },
          row: {
            backgroundColor: "#FFFFFF",
            padding: 13,
            height: 45,
            flexDirection: "row",
            borderLeftWidth: 3,
            borderRightWidth: 2,
            borderColor: "gainsboro",
          },
          separator: {
            height: 2,
            backgroundColor: "gainsboro",
          },
          description: {},
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 20,
          },
        }}
      />
    </View>
  );
};

/**
 * StyleSheet for all components:
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonscontainer: {
    height: 70,
    alignItems: "center",
  },
  routebutton: {
    color: "#FFD56D",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    padding: 15,
    margin: 3,
    width: 250,
    borderRadius: 10,
  },
  imgcontainer: {
    alignItems: "center",
  },
  img: {
    height: 300,
    width: 300,
  },
});

export default RouteInputScreen;
