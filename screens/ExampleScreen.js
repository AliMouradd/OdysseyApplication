import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ExampleScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello Quacky Coders!</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Homepage"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
