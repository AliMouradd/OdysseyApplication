import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

function Question2Screen({ navigation }) {
  const [text, onChangeText] = React.useState(null);

  return (
    <View style={styles.container}>
      <Text>Question 2 of 5:</Text>
      <Text>What is your current budget for your vacation?</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={onChangeText}
        placeholder="Enter your budget..."
      />
      <Button title="Next" onPress={() => navigation.navigate("Question 2")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  inputBox: {
    backgroundColor: "gainsboro",
    height: 40,
    width: 150,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Question2Screen;
