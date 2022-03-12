import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

//JSON.stringify(routesteps.apisteps[0].html_instructions
const RouteStepsScreen = ({ route, navigation }) => {
  const routesteps = route.params;
  const ListItem = ({ step }) => {
    step.html_instructions = step.html_instructions.replace(/<b>/g, "");
    step.html_instructions = step.html_instructions.replace(/<\/b>/g, "");
    step.html_instructions = step.html_instructions.replace(/<wbr\/>/g, "");

    return (
      <View style={styles.itemcontainer}>
        <Text style={styles.itemtext}>{step.html_instructions}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatlist}
        ListHeaderComponent={
          <Text style={{ fontSize: 19, margin: 10 }}>
            Follow these steps to get to your destination:
          </Text>
        }
        ListFooterComponent={
          <Text style={{ fontSize: 16, margin: 10, alignSelf: "center" }}>
            Arrived at your destination!
          </Text>
        }
        keyExtractor={(item) => item.end_location.lat} // latitude should be unique?
        data={routesteps.apisteps}
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
  itemcontainer: {
    alignSelf: "center",
    width: "95%",
    height: 60,
    backgroundColor: "#FFD56D",
    borderRadius: 7,
    padding: 10,
    margin: 5,
  },
  itemtext: {
    fontSize: 15,
  },
  flatlist: {
    alignItems: "stretch",
  },
});

export default RouteStepsScreen;
