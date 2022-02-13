import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExampleScreen from "./screens/ExampleScreen";
import HomepageScreen from "./screens/HomepageScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Homepage">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Homepage" component={HomepageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
