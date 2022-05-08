import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

//JSON.stringify(routesteps.apisteps[0].html_instructions
const RouteStepsScreen = ({ route, navigation }) => {
  const routesteps = route.params?.apisteps;
  const tripinfo = route.params?.apitripinfo;

  //console.log("ROUTESTEPS\n", routesteps);
  //console.log("TRIPINFO\n", tripinfo);

  const ListItem = ({ step }) => {
    step.html_instructions = step.html_instructions.replace(/<b>/g, "");
    step.html_instructions = step.html_instructions.replace(/<\/b>/g, "");
    step.html_instructions = step.html_instructions.replace(/<wbr\/>/g, "");

    return (
      <View style={styles.itemcontainer}>
        <View style={styles.iconcontainer}>
          <Icon name="circle" size={11} color="black" />
        </View>
        <Text style={styles.itemtext}>{step.html_instructions}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
        keyExtractor={(item) => item.end_location.lat} // latitude should be unique?
        data={routesteps}
        renderItem={({ item }) => <ListItem step={item} />}
      />
    </View>
  );
};

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
