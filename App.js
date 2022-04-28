import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomepageScreen from "./screens/HomepageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ItineraryScreen from "./screens/ItineraryScreen";
import AddPlacesScreen from "./screens/AddPlacesScreen";
import GoalScreen from "./screens/GoalScreen";
import QuestionnaireMainScreen from "./screens/questionnaire_screens/QuestionnaireMainScreen";
import QuestionnaireStartScreen from "./screens/questionnaire_screens/QuestionnaireStartScreen";
import LocationQuestionScreen from "./screens/questionnaire_screens/LocationQuestionScreen";
import MapViewScreen from "./screens/generate_route_screens/MapViewScreen";
import RouteStepsScreen from "./screens/generate_route_screens/RouteStepsScreen";
import RouteInputScreen from "./screens/generate_route_screens/RouteInputScreen";
import ItineraryMainScreen from "./screens/itinerary_screens/ItineraryScreen";
import ItineraryAddEvent from "./screens/itinerary_screens/ItineraryAddEvent";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Log In"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomepageScreen} />
        <Stack.Screen name="Itinerary" component={ItineraryScreen} />
        <Stack.Screen name="Goal Screen" component={GoalScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Add Places" component={AddPlacesScreen} />
        <Stack.Screen
          name="Travel Questionnaire"
          component={QuestionnaireStartScreen}
        />
        <Stack.Screen
          name="Getting Started"
          component={LocationQuestionScreen}
        />
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireMainScreen}
        />
        <Stack.Screen
          name="Generate Route"
          component={MapViewScreen}
          options={{ title: "Find Routes" }}
        />
        <Stack.Screen name="Route Steps" component={RouteStepsScreen} />
        <Stack.Screen
          name="Route Input"
          component={RouteInputScreen}
          options={{ title: "Location Search" }}
        />
        <Stack.Screen name="User Itinerary" component={ItineraryMainScreen} />
        <Stack.Screen name="Add Event" component={ItineraryAddEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// add dark mode
