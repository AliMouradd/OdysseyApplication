import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExampleScreen from "./screens/ExampleScreen";
import QuestionnaireMainScreen from "./screens/questionnaire_screens/QuestionnaireMainScreen";
import QuestionnaireStartScreen from "./screens/questionnaire_screens/QuestionnaireStartScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Questionnaire">
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Travel Questionnaire"
          component={QuestionnaireStartScreen}
        />
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireMainScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//testing -jacob
