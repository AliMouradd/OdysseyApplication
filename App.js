import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomepageScreen from "./screens/HomepageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SchedulesScreen from "./screens/SchedulesScreen";
import GoalScreen from "./screens/GoalScreen";
import QuestionnaireMainScreen from "./screens/questionnaire_screens/QuestionnaireMainScreen";
import QuestionnaireStartScreen from "./screens/questionnaire_screens/QuestionnaireStartScreen";
import MapViewScreen from "./screens/generate_route_screens/MapViewScreen";
import RouteStepsScreen from "./screens/generate_route_screens/RouteStepsScreen";
import LookUpScreen from "./screens/LookUpScreen";
import PlacesListScreen from "./screens/PlacesListScreen";
import PlacesScreen from "./screens/PlacesScreen";
import NearbyPlaceDemo from "./screens/NearbyPlaceDemo";
import BudgetPlanner from "./screens/BudgetPlanner";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomepageScreen} />
        <Stack.Screen name="Itinerary" component={SchedulesScreen} />
        <Stack.Screen name="Goal Screen" component={GoalScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Add Places" component={LookUpScreen} />
        <Stack.Screen name="Budget Planner" component={BudgetPlanner} />
        <Stack.Screen
          name="Travel Questionnaire"
          component={QuestionnaireStartScreen}
        />
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireMainScreen}
        />
        <Stack.Screen name="Generate Route" component={MapViewScreen} />
        <Stack.Screen name="Route Steps" component={RouteStepsScreen} />
        <Stack.Screen name="PlacesListScreen" component={PlacesListScreen} />
        <Stack.Screen name="PlacesScreen" component={PlacesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Nearby Place Demo" component={NearbyPlaceDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
