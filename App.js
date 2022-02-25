import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QuestionnaireMainScreen from "./screens/questionnaire_screens/QuestionnaireMainScreen";
import QuestionnaireStartScreen from "./screens/questionnaire_screens/QuestionnaireStartScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
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
