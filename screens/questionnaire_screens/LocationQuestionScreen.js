import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { db } from "./../../Config";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

/**
 * Description:
 *
 * The Location Question Screen allows the user to search for and input a location
 * that will serve as their vacation location. This user inputted location will
 * then be saved to the database.
 *
 * Built by: Quacky Coders
 */
const LocationQuestionScreen = ({ navigation }) => {
  const ref = useRef();

  const testReadAnswer = () => {
    console.log(ref.current?.getAddressText());
  };

  /**
   * Function to save inputted location to database.
   */
  const writeToDatabase = () => {
    // setup for getting current user's ID:
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    // initializing doc data
    const docData = {
      vacationLocation: ref.current?.getAddressText(),
    };

    // check if doc data is empty (no input)
    if (docData.vacationLocation == "") {
      alert("Please enter a location.");
    } else {
      // initializing doc reference:
      const userAnswersDocRef = doc(db, "UserQuestionnaireAnswers", uid);

      // creates the doc and adds vacationLocation
      setDoc(userAnswersDocRef, docData)
        .then(() => {
          ToastAndroid.show("Document Created", ToastAndroid.SHORT);
        })
        .catch((error) => {
          alert(error.message);
        });

      navigation.navigate("Questionnaire");
    }
  };

  // Main return:
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        In order to better help you with your vacation and reccommend you places
        to visit, we need to know where you plan on spending your vacation.
      </Text>
      <Text style={styles.questionText}>
        Where are you planning to go for your vacation?
      </Text>
      {/* Location Search Box*/}
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={"Search for a city..."}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          //console.log("data", data);
          //console.log("details", details);
        }}
        query={{
          key: "Google API Key",
          language: "en",
        }}
        debounce={500}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            flexDirection: "row",
          },
          textInput: {
            backgroundColor: "#FFFFFF",
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            elevation: 5,
          },
          poweredContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "#c8c7cc",
            borderWidth: 2,
          },
          powered: {},
          listView: {
            //elevation: 5,
            borderRadius: 10,
            // backgroundColor: "red",
            marginBottom: 10,
          },
          row: {
            backgroundColor: "#FFFFFF",
            padding: 13,
            height: 44,
            flexDirection: "row",
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: "#c8c7cc",
          },
          separator: {
            height: 2,
            backgroundColor: "#c8c7cc",
          },
          description: {},
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 20,
          },
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => writeToDatabase()}
        >
          <Text style={{ fontSize: 16 }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * StyleSheet for components.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  questionText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
  },
  inputBox: {
    width: "66%",
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  nextButton: {
    color: "#FFD56D",
    alignItems: "center",
    backgroundColor: "#FFD56D",
    padding: 15,
    width: 250,
    borderRadius: 10,
  },
});

export default LocationQuestionScreen;
