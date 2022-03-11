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

const MapViewScreen = ({ navigation }) => {
  const [coords, setCoords] = useState([]);
  const [origintext, onChangeOrigin] = useState("");
  const [destinationtext, onChangeDestination] = useState("");

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
      return coordinates;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.origininput}
        onChangeText={onChangeOrigin}
        value={origintext}
        placeholder="Origin..."
      />
      <TextInput
        style={styles.destinationinput}
        onChangeText={onChangeDestination}
        value={destinationtext}
        placeholder="Destination..."
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => getDirections(origintext, destinationtext)}
      >
        <Text style={{ fontSize: 16 }}>Press to generate route</Text>
      </TouchableOpacity>
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
  mapstyle: {
    height: "75%",
    width: "100%",
  },
  button: {
    color: "#FFD56D",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    padding: 15,
    marginVertical: 10,
    width: 250,
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
