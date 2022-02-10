import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExampleScreen from "./screens/ExampleScreen";
import QuestionnaireStartScreen from "./screens/questionnaire_screens/QuestionnaireStartScreen";
import Question1Screen from "./screens/questionnaire_screens/Question1Screen";
import Question2Screen from "./screens/questionnaire_screens/Question2Screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Questionnaire">
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireStartScreen}
        />
        <Stack.Screen name="Question 1" component={Question1Screen} />
        <Stack.Screen name="Question 2" component={Question2Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
