import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

function Question1Screen({ navigation }) {
  const [text, onChangeText] = React.useState(null);

  return (
    <View style={styles.container}>
      <Text>Question 1 of 5:</Text>
      <Text>When will your vacation be?</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={onChangeText}
        placeholder="Start Date..."
      />
      <Text>to</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={onChangeText}
        placeholder="End Date..."
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

export default Question1Screen;
