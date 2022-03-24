import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const RouteInputScreen = ({ navigation, route }) => {
  const [text, setText] = useState("");
  const ref = useRef();

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={"Search for a location..."}
        // this doesnt work, navigates before text box is updated (try using the actual data returned instead of gettting from text box)
        // onPress={() => {
        //   navigation.navigate({
        //     name: "Generate Route",
        //     params: { locationtext: ref.current?.getAddressText() },
        //     merge: true,
        //   });
        // }}
        query={{
          key: "AIzaSyCYeXwGAufetFuE8BQzIL5BFREfbUk9v4o",
          language: "en",
        }}
        debounce={500}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            flexDirection: "row",
          },
          textInput: {
            backgroundColor: "#FFFFFF",
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            elevation: 5,
          },
          poweredContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "#c8c7cc",
            borderWidth: 2,
          },
          powered: {},
          listView: {
            //elevation: 5,
            borderRadius: 10,
            // backgroundColor: "red",
            marginBottom: 10,
          },
          row: {
            backgroundColor: "#FFFFFF",
            padding: 13,
            height: 44,
            flexDirection: "row",
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: "#c8c7cc",
          },
          separator: {
            height: 2,
            backgroundColor: "#c8c7cc",
          },
          description: {},
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 20,
          },
        }}
      />

      <View style={styles.buttonscontainer}>
        <TouchableOpacity
          style={styles.routebutton}
          //onPress={() => getDirections(origintext, destinationtext)}
        >
          <Text style={{ fontSize: 16 }}>Press to generate route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default RouteInputScreen;
