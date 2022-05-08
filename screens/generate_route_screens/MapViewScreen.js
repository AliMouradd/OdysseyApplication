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

const MapViewScreen = ({ navigation, route }) => {
  const [coords, setCoords] = useState([]);
  const [origintext, onChangeOrigin] = useState(route.params?.originparam);
  const [destinationtext, onChangeDestination] = useState(
    route.params?.destinationparam
  );
  const [apisteps, setAPISteps] = useState([]);
  const [apitripinfo, setAPITripInfo] = useState([]);

  async function getDirections(startLoc, destinationLoc) {
    try {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyAlQmVRL7LxjWepNA8PvOO-2hYIOvkrAeU`
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
      setAPITripInfo(responseJson.routes[0].legs);
      //console.log(responseJson.routes[0].legs[0]);
      return coordinates;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  return (
    <View style={styles.container}>
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
        <MapView.Polyline
          coordinates={coords}
          strokeWidth={2}
          strokeColor="red"
        />
      </MapView>
      <View style={styles.inputscontainertop}>
        <View style={styles.inputiconcontainer}>
          <Icon name="gps-not-fixed" size={20} color="black" />
        </View>
        <TextInput
          style={styles.origininput}
          // origintext and onChangeOrigin are only used to display text in the text boxes, not for passing to getDirections.
          //onChangeText={() => onChangeOrigin(route.params?.originparam)} this might work too?
          onChangeText={onChangeOrigin}
          //value={origintext}
          value={route.params?.originparam}
          placeholder="Search for origin..."
          onFocus={() =>
            navigation.navigate("Route Input", { navigateFrom: "origininput" })
          }
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.inputscontainerbottom}>
        <View style={styles.inputiconcontainer}>
          <Icon name="place" size={20} color="black" />
        </View>
        <TextInput
          style={styles.destinationinput}
          onChangeText={onChangeDestination}
          //value={destinationtext}
          value={route.params?.destinationparam}
          placeholder="Search for destination..."
          onFocus={() =>
            navigation.navigate("Route Input", {
              navigateFrom: "destinationinput",
            })
          }
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.buttonscontainer}>
        <TouchableOpacity
          style={styles.stepsbutton}
          onPress={() =>
            navigation.navigate("Route Steps", {
              apisteps: apisteps,
              apitripinfo: apitripinfo,
            })
          }
        >
          <View style={styles.routeiconcontainer}>
            <Icon name="list" size={24} color="black" />
          </View>
          <Text style={{ fontSize: 16 }}>View steps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.routebutton}
          onPress={() =>
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
    //backgroundColor: "blue",
  },
  inputscontainerbottom: {
    flex: 0.35,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 5,
    //backgroundColor: "purple",
  },
  inputiconcontainer: {
    paddingVertical: 10,
    paddingLeft: 18,
    paddingRight: 10,
    //backgroundColor: "dodgerblue",
  },
  buttonscontainer: {
    flex: 0.46,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    //backgroundColor: "dodgerblue",
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
    //marginTop: 10,
    //marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gainsboro",
  },
  destinationinput: {
    backgroundColor: "white",
    height: 40,
    width: "80%",
    padding: 10,
    //marginTop: 10,
    //marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gainsboro",
  },
});

export default MapViewScreen;
