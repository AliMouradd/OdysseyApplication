import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ItineraryEventView = ({ route, navigation }) => {
  console.log(route.params?.title);
  console.log(route.params?.datetime);
  console.log(route.params?.place);

  const deleteEvent = () => {
    console.log("deleteEvent called!");
  };

  return (
    <View>
      <Text>{route.params?.title}</Text>
      <Text>{route.params?.datetime.toString()}</Text>
      <Text>{route.params?.place}</Text>
      <TouchableOpacity
        style={styles.deletebutton}
        onPress={() => deleteEvent()}
      >
        <Text>Delete Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  deletebutton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD56D",
    height: 45,
    width: 100,
    borderRadius: 10,
  },
});

export default ItineraryEventView;
