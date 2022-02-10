import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

export default function QuestionnaireStartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Odyssey Questionnaire!</Text>
      <Text>
        Here we will ask you a series of questions about your trip in order to
        help you with your vacation.
      </Text>
      <Button title="Next" onPress={() => navigation.navigate("Question 1")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
