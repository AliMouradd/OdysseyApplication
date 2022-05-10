import React, { useState } from "react";
import MapView from "react-native-maps";
import polyline from "@mapbox/polyline";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

/**
 * Description:
 *
 * The Map View Screen will be the starting point for the user in finding routes
 * between locations. From this screen the user can input an origin and destination,
 * then tap the "Find route" button to view the route between origin and destination
 * on the map. The user can also tap "View steps" to view the route in a text-based
 * step by step format.
 *
 * Built by: Quacky Coders
 */
const MapViewScreen = ({ navigation, route }) => {
  /**
   * States used by MapViewScreen
   */
  const [coords, setCoords] = useState([
    { latitude: 34.0522, longitude: -118.2437 },
  ]); // use starting values so the screen loads
  const [origintext, onChangeOrigin] = useState(route.params?.originparam); // holds origin text
  const [destinationtext, onChangeDestination] = useState(
    route.params?.destinationparam
  ); // holds destination text
  const [apisteps, setAPISteps] = useState([]); // holds array of api step objects
  const [apitripinfo, setAPITripInfo] = useState([]); // holds array of trip information

  /**
   * Function that gets directions information from the Google Maps Directions API.
   */
  async function getDirections(startLoc, destinationLoc) {
    try {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=GoogleAPIKEY`
      ); // API call with origin and destination parameters.
      let responseJson = await response.json();
      let points = polyline.decode(
        responseJson.routes[0].overview_polyline.points
      ); // Used to draw the route line on the map.
      let coordinates = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });

      // Setting states:
      setCoords(coordinates);
      setAPISteps(responseJson.routes[0].legs[0].steps);
      setAPITripInfo(responseJson.routes[0].legs);

      //console.log(responseJson.routes[0].legs[0]);
      return coordinates;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  // Main return:
  return (
    <View style={styles.container}>
      {/* Renders MapView component, shows the map on screen:*/}
      <MapView
        style={styles.mapcontainer}
        initialRegion={{
          latitude: 34.0522,
          longitude: -118.2437,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: coords[0].latitude,
          longitude: coords[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Handles drawing the route line: */}
        <MapView.Polyline
          coordinates={coords}
          strokeWidth={3}
          strokeColor="red"
        />
      </MapView>

      {/* View containing origin text box: */}
      <View style={styles.inputscontainertop}>
        <View style={styles.inputiconcontainer}>
          <Icon name="gps-not-fixed" size={20} color="black" />
        </View>
        <TextInput
          style={styles.origininput}
          onChangeText={onChangeOrigin}
          value={route.params?.originparam} // Recieves value from Route Input screen
          placeholder="Search for origin..."
          onFocus={() =>
            // When text box is tapped, this will navigate to the Route Input screen with info about navigating from origin text box.
            navigation.navigate("Route Input", { navigateFrom: "origininput" })
          }
          showSoftInputOnFocus={false} // Don't show keyboard / allow typing.
        />
      </View>

      {/* View containing destination text box: */}
      <View style={styles.inputscontainerbottom}>
        <View style={styles.inputiconcontainer}>
          <Icon name="place" size={20} color="black" />
        </View>
        <TextInput
          style={styles.destinationinput}
          onChangeText={onChangeDestination}
          value={route.params?.destinationparam} // Recieves value from Route Input screen
          placeholder="Search for destination..."
          onFocus={() =>
            // When text box is tapped, this will navigate to the Route Input screen with info about navigating from destination text box.
            navigation.navigate("Route Input", {
              navigateFrom: "destinationinput",
            })
          }
          showSoftInputOnFocus={false} // Don't show keyboard / allow typing.
        />
      </View>

      {/* View containing bottom buttons: */}
      <View style={styles.buttonscontainer}>
        <TouchableOpacity
          style={styles.stepsbutton}
          onPress={() => {
            // If user hasn't searched for a route then display alert, else navigate to steps:
            if (apitripinfo[0] === undefined) {
              alert("Please enter a route.");
            } else {
              // Navigate to Route Steps screen
              navigation.navigate("Route Steps", {
                apisteps: apisteps,
                apitripinfo: apitripinfo,
              });
            }
          }}
        >
          <View style={styles.routeiconcontainer}>
            <Icon name="list" size={24} color="black" />
          </View>
          <Text style={{ fontSize: 16 }}>View steps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.routebutton}
          onPress={() =>
            // Get directions from API call using destination and origin params from Route Input screen
            getDirections(
              route.params?.originparam,
              route.params?.destinationparam
            )
          }
          //onPress={() => console.log(origintext, destinationtext)}
        >
          <View style={styles.routeiconcontainer}>
            <Icon name="navigation" size={20} color="black" />
          </View>
          <Text style={{ fontSize: 16, color: "black" }}>Find route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * StyleSheet for all components:
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  mapcontainer: {
    flex: 4,
    height: "75%",
    width: "100%",
  },
  inputscontainertop: {
    flex: 0.35,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
    borderTopWidth: 2.5,
    borderTopColor: "#FFD56D",
  },
  inputscontainerbottom: {
    flex: 0.35,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 5,
  },
  inputiconcontainer: {
    paddingVertical: 10,
    paddingLeft: 18,
    paddingRight: 10,
  },
  buttonscontainer: {
    flex: 0.46,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
  },
  routebutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    paddingLeft: 55,
    height: 51,
    width: 230,
    borderRadius: 10,
  },
  routeiconcontainer: {
    paddingHorizontal: 5,
  },
  stepsbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    paddingLeft: 4,
    height: 51,
    width: 130,
    borderRadius: 10,
  },
  origininput: {
    backgroundColor: "white",
    height: 40,
    width: "80%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gainsboro",
  },
  destinationinput: {
    backgroundColor: "white",
    height: 40,
    width: "80%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gainsboro",
  },
});

export default MapViewScreen;
