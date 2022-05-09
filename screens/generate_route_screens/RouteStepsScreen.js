import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

/**
 * Description:
 *
 * The Route Steps screen will show the user the route they searched for in a text-based step-by-step format.
 * Information about the trip, such as distance and estimated length will also be shown.
 *
 * Built by: Quacky Coders
 */
const RouteStepsScreen = ({ route, navigation }) => {
  //JSON.stringify(routesteps.apisteps[0].html_instructions

  const routesteps = route.params?.apisteps; // Get route steps param from MapViewScreen.
  const tripinfo = route.params?.apitripinfo; // get trip information param from MapViewScreen.

  //console.log("ROUTESTEPS\n", routesteps);
  //console.log("TRIPINFO\n", tripinfo);

  /**
   * The List Item component renders each step of the route.
   */
  const ListItem = ({ step }) => {
    // Remove HTML tags from API response text:
    step.html_instructions = step.html_instructions.replace(/<b>/g, "");
    step.html_instructions = step.html_instructions.replace(/<\/b>/g, "");
    step.html_instructions = step.html_instructions.replace(/<wbr\/>/g, "");

    // ListItem return:
    return (
      <View style={styles.itemcontainer}>
        <View style={styles.iconcontainer}>
          <Icon name="circle" size={11} color="black" />
        </View>
        <Text style={styles.itemtext}>{step.html_instructions}</Text>
      </View>
    );
  };

  // Main return:
  return (
    <View style={styles.container}>
      {/* View containing trip information: */}
      <View style={styles.tripinfocontainer}>
        <Text style={{ fontSize: 17 }}>From:</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {tripinfo[0].start_address}
        </Text>
        <Text style={{ fontSize: 17 }}>to:</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {tripinfo[0].end_address}
        </Text>
        <Text style={{ fontSize: 14 }}>
          {tripinfo[0].distance.text}, {tripinfo[0].duration.text}
        </Text>
      </View>

      {/* FlatList containing route steps: */}
      <FlatList
        contentContainerStyle={styles.flatlist}
        ListHeaderComponent={
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              padding: 20,
              borderBottomWidth: 2,
              borderBottomColor: "gainsboro",
            }}
          >
            Follow these steps to get to your destination:
          </Text>
        }
        ListFooterComponent={
          <Text
            style={{
              textAlign: "center",
              width: 350,
              height: 50,
              fontSize: 16,
              fontWeight: "bold",
              padding: 10,
              alignSelf: "center",
            }}
          >
            Arrived at your destination!
          </Text>
        }
        keyExtractor={(item) => item.end_location.lat} // latitude should be unique so it can be used as a key
        data={routesteps}
        renderItem={({ item }) => <ListItem step={item} />}
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
    alignItems: "center",
  },
  tripinfocontainer: {
    padding: 10,
    backgroundColor: "#FFD56D",
    borderBottomWidth: 2,
    borderBottomColor: "#FFD56D",
    width: "100%",
    elevation: 10,
  },
  itemcontainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 350,
    height: 62,
    borderBottomColor: "gainsboro",
    borderBottomWidth: 2,
    padding: 0,
    margin: 3,
  },
  iconcontainer: {
    padding: 6,
  },
  itemtext: {
    width: "95%",
    fontSize: 15,
  },
  flatlist: {
    width: "100%",
    alignItems: "flex-start",
  },
});

export default RouteStepsScreen;
