import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

/**
 * Description:
 *
 * The QuestionnaireStartScreen is a simple screen that displays the start screen
 * of the Questionnaire. Here the user is shown details about the questionnaire and the
 * option to start filling out their questionnaire.
 *
 * Built by: Quacky Coders
 */
export default function QuestionnaireStartScreen({ navigation }) {
  // Main return
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>
        Welcome to the Odyssey Questionnaire!
      </Text>
      <Text style={styles.welcomeInfo}>
        Here we'll ask you a series of questions about your trip and interests
        in order to help you with your vacation.
      </Text>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("Location Question")} // navigate to location question
      >
        <Text style={{ fontSize: 16 }}>Start Questionnaire</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * StyleSheet for components.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  welcomeTitle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  welcomeInfo: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    //backgroundColor: "gray",
  },
  nextButton: {
    color: "#FFD56D",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    padding: 15,
    width: 250,
    borderRadius: 10,
  },
});
