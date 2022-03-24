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

const MapViewScreen = ({ navigation, route }) => {
  const [coords, setCoords] = useState([]);
  const [origintext, onChangeOrigin] = useState("");
  const [destinationtext, onChangeDestination] = useState("");
  const [apisteps, setAPISteps] = useState([]);

  async function getDirections(startLoc, destinationLoc) {
    try {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyCYeXwGAufetFuE8BQzIL5BFREfbUk9v4o`
      );
      let responseJson = await response.json();
      let points = polyline.decode(
        responseJson.routes[0].overview_polyline.points
      );
      let coordinates = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      setCoords(coordinates);
      setAPISteps(responseJson.routes[0].legs[0].steps);
      return coordinates;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  return (
    <View style={styles.container}>
      <Text>Location: {route.params?.locationtext}</Text>
      <TextInput
        style={styles.origininput}
        onChangeText={onChangeOrigin}
        value={origintext}
        placeholder="Search for origin..."
        onFocus={() => navigation.navigate("Route Input")}
        showSoftInputOnFocus={false}
        defaultValue={route.params?.locationtext}
      />
      <TextInput
        style={styles.destinationinput}
        onChangeText={onChangeDestination}
        value={destinationtext}
        placeholder="Search for destination..."
      />
      <MapView
        style={styles.mapstyle}
        initialRegion={{
          latitude: 34.0522,
          longitude: -118.2437,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Polyline
          coordinates={coords}
          strokeWidth={2}
          strokeColor="red"
        />
      </MapView>
      <View style={styles.buttonscontainer}>
        <TouchableOpacity
          style={styles.routebutton}
          onPress={() => getDirections(origintext, destinationtext)}
        >
          <Text style={{ fontSize: 16 }}>Press to generate route</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stepsbutton}
          onPress={() => navigation.navigate("Route Steps", { apisteps })}
        >
          <Text style={{ fontSize: 16 }}>View steps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
  },
  buttonscontainer: {
    alignItems: "flex-start",
    width: "100%",
    flexDirection: "row",
  },
  mapstyle: {
    height: "75%",
    width: "100%",
  },
  routebutton: {
    color: "#FFD56D",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    padding: 15,
    margin: 10,
    width: 250,
    borderRadius: 10,
  },
  stepsbutton: {
    color: "#FFD56D",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    padding: 15,
    margin: 10,
    width: 120,
    borderRadius: 10,
  },
  origininput: {
    backgroundColor: "gainsboro",
    height: 40,
    width: "90%",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  destinationinput: {
    backgroundColor: "gainsboro",
    height: 40,
    width: "90%",
    padding: 10,
    //marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default MapViewScreen;
