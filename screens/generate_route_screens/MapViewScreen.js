import React, { useState } from "react";
import MapView from "react-native-maps";
import polyline from "@mapbox/polyline";
import { StyleSheet, Text, View, Button } from "react-native";

const MapViewScreen = ({ navigation }) => {
  const [coords, setCoords] = useState([]);

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
      <Button
        style={styles.button}
        title="Press to generate route"
        onPress={() => getDirections("Los Angeles, CA", "Long Beach, CA")}
      ></Button>
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
    height: "80%",
    width: "100%",
  },
  button: {},
});

export default MapViewScreen;
