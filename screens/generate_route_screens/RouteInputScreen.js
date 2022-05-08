import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const RouteInputScreen = ({ navigation, route }) => {
  const ref = useRef();

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={"Search for a location..."}
        onPress={(data) => {
          // gets autocomplete result and passes back to mapview screen
          if (route.params?.navigateFrom == "origininput") {
            navigation.navigate({
              name: "Generate Route",
              params: { originparam: data.description },
              merge: true,
            });
          } else if (route.params?.navigateFrom == "destinationinput") {
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
        debounce={500}
        styles={{
          container: {
            flex: 1,
            //backgroundColor: "blue",
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
            // paddingVertical: 5,
            // paddingHorizontal: 10,
            fontSize: 15,
            //elevation: 5,
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
            //marginBottom: 10,
            // backgroundColor: "red",
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
    //backgroundColor: "red",
  },
  img: {
    height: 300,
    width: 300,
  },
});

export default RouteInputScreen;
