import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
<<<<<<< HEAD
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomepageScreen from "./screens/HomepageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ItineraryScreen from "./screens/ItineraryScreen";
=======

import { firebaseConfig } from "./Config";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import GoalScreen from "./screens/GoalScreen";
import AddPlacesScreen from "./screens/AddPlacesScreen";
>>>>>>> origin/GoalListScreen

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Log In"
        screenOptions={{ headerShown: true }}
      >
<<<<<<< HEAD
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomepageScreen} />
        <Stack.Screen name="Itinerary" component={ItineraryScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Log In" component={LoginScreen} />
=======
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Goal Screen" component={GoalScreen} />
>>>>>>> origin/GoalListScreen
      </Stack.Navigator>
    </NavigationContainer>
  );
}
