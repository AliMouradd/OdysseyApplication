import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const RouteStepsScreen = ({ route, navigation }) => {
  const routesteps = route.params;
  return (
    <View>
      <ScrollView style={styles.scrollview}>
        <Text>{JSON.stringify(routesteps.apisteps[0].html_instructions)}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollview: {},
});

export default RouteStepsScreen;
