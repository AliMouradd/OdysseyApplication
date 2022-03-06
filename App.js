import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { firebaseConfig } from "./Config";

import QuestionnaireMainScreen from "./screens/questionnaire_screens/QuestionnaireMainScreen";
import QuestionnaireStartScreen from "./screens/questionnaire_screens/QuestionnaireStartScreen";
import QuestionnaireAnswersTest from "./screens/questionnaire_screens/QuestionnaireAnswersTest";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import GoalScreen from "./screens/GoalListScreen";
import MapViewScreen from "./screens/generate_route_screens/MapViewScreen";

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
        <Stack.Screen name="Answers" component={QuestionnaireAnswersTest} />
        <Stack.Screen name="Goals" component={GoalScreen} />
        <Stack.Screen name="MapView" component={MapViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//testing -jacob
