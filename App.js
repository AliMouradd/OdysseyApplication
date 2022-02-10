import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExampleScreen from "./screens/ExampleScreen";
import QuestionnaireStartScreen from "./screens/QuestionnaireStartScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Questionnaire">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireStartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
