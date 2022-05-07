import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { SimpleSurvey } from "react-native-simple-survey";
import { db } from "./../../Config";
import { getAuth } from "firebase/auth";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Survey array of question objects will contain all questions and possible answers:
const survey = [
  {
    questionType: "TextInput",
    questionText: "Question 1 of 6:\nWhen is the start date of your vacation?",
    questionId: "startDate",
    placeholderText: "MM/DD/YYYY",
  },
  {
    questionType: "TextInput",
    questionText: "Question 2 of 6:\nWhen is the end date of your vacation?",
    questionId: "endDate",
    placeholderText: "MM/DD/YYYY",
  },
  {
    questionType: "TextInput", // maybe make this numberinput
    questionText: "Question 3 of 6:\nWhat is your budget for your vacation?",
    questionId: "budget",
    placeholderText: "Enter budget in dollars here...",
  },
  {
    questionType: "MultipleSelectionGroup",
    questionText: "Question 4 of 6:\nWhat are your methods of travel?",
    questionId: "travelMethods",
    questionSettings: {
      maxMultiSelect: 4,
      minMultiSelect: 1,
    },
    options: [
      {
        optionText: "Car",
        value: "car",
      },
      {
        optionText: "Train",
        value: "train",
      },
      {
        optionText: "Bike",
        value: "bike",
      },
    ],
    placeholderText: "Please select your methods....",
  },
  {
    questionType: "MultipleSelectionGroup",
    questionText: "Question 5 of 6:\nWhat are your interests?",
    questionId: "interests",
    questionSettings: {
      maxMultiSelect: 8,
      minMultiSelect: 1,
    },
    options: [
      {
        optionText: "Nature",
        value: "nature",
      },
      {
        optionText: "Sports",
        value: "sports",
      },
      {
        optionText: "Exercise",
        value: "exercise",
      },
      {
        optionText: "Photography",
        value: "photography",
      },
      {
        optionText: "Music",
        value: "music",
      },
      {
        optionText: "Visual Arts",
        value: "visual arts",
      },
      {
        optionText: "Cooking",
        value: "cooking",
      },
      {
        optionText: "History",
        value: "history",
      },
    ],
    placeholderText: "Please select your interests...",
  },
  {
    questionType: "MultipleSelectionGroup",
    questionText: "Question 6 of 6:\nWhat are your food interests?",
    questionId: "foodInterests",
    questionSettings: {
      maxMultiSelect: 8,
      minMultiSelect: 1,
    },
    options: [
      {
        optionText: "Spicy",
        value: "spicy",
      },
      {
        optionText: "Savory",
        value: "savory",
      },
      {
        optionText: "Aromatic",
        value: "aromatic",
      },
      {
        optionText: "Unique",
        value: "unique",
      },
      {
        optionText: "Noodles",
        value: "noodles",
      },
      {
        optionText: "Sour",
        value: "sour",
      },
      {
        optionText: "Curry",
        value: "curry",
      },
    ],
    placeholderText: "Please select your food interests",
  },
  {
    questionType: "Info",
    questionText:
      "That's all for the questionnaire, tap finish to go to your homepage.",
  },
];

/**
 * Description:
 *
 * The Survey Screen will show the user the questionnaire and allow the user to
 * input their answers. After all answers are inputted, the answers will be saved to the database.
 *
 * Built by: Quacky Coders
 */
export default class SurveyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { answersSoFar: "" };
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <TouchableOpacity
          style={styles.surveyNavButton}
          onPress={onPress}
          disabled={!enabled}
        >
          <Text style={{ fontSize: 16 }}>Previous</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <TouchableOpacity
          style={
            enabled ? styles.surveyNavButton : styles.surveyNavButtonDisabled
          }
          onPress={onPress}
          disabled={!enabled}
          activeOpacity={!enabled ? 1 : 0.5}
        >
          <Text style={{ fontSize: 16 }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <TouchableOpacity
          style={styles.surveyNavButton}
          onPress={onPress}
          disabled={!enabled}
        >
          <Text style={{ fontSize: 16 }}>Finished</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        {/* add a question counter here with states? (text with variable) */}
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: "flex-start" }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={
            isSelected
              ? styles.selectionButtonSelected
              : styles.selectionButtonUnselected
          }
          key={`button_${index}`}
        >
          <Text>{data.optionText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async onSurveyFinished(answers) {
    console.log("User finished questionnaire!");
    const infoQuestionsRemoved = [...answers];

    // convert from array to object:
    const answersAsObject = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObject[elem.questionId] = elem.value;
      console.log(elem.questionId);
      console.log(elem.value[0]);
    }

    // setup for getting current user's ID:
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    //console.log("finished, user id is: ", uid);

    console.log(answersAsObject.startDate);
    console.log(answersAsObject.travelMethods);
    console.log(answersAsObject.travelMethods[0].value);

    var travelMethodsArrayLength = answersAsObject.travelMethods.length;
    var interestsArrayLength = answersAsObject.interests.length;
    var foodInterestsArrayLength = answersAsObject.foodInterests.length;

    // doc reference
    const userAnswersDocRef = doc(db, "UserQuestionnaireAnswers", uid);

    // maybe add user ID's to documents?
    const docData = {
      startDate: answersAsObject.startDate,
      endDate: answersAsObject.endDate,
      budget: answersAsObject.budget,
      travelMethods: [],
      interests: [],
      foodInterests: [],
    };

    // update the doc
    setDoc(userAnswersDocRef, docData, { merge: true })
      .then(() => {
        ToastAndroid.show("Document Updated", ToastAndroid.SHORT);
      })
      .catch((error) => {
        alert(error.message);
      });

    // loop through the multiple selection answers array, adding them to the database
    for (var i = 0; i < travelMethodsArrayLength; i++) {
      console.log(answersAsObject.travelMethods[i].value);
      await updateDoc(userAnswersDocRef, {
        travelMethods: arrayUnion(answersAsObject.travelMethods[i].value),
      });
    }

    for (var i = 0; i < interestsArrayLength; i++) {
      console.log(answersAsObject.interests[i].value);
      await updateDoc(userAnswersDocRef, {
        interests: arrayUnion(answersAsObject.interests[i].value),
      });
    }

    for (var i = 0; i < foodInterestsArrayLength; i++) {
      console.log(answersAsObject.foodInterests[i].value);
      await updateDoc(userAnswersDocRef, {
        foodInterests: arrayUnion(answersAsObject.foodInterests[i].value),
      });
    }

    this.props.navigation.navigate("Home");
  }

  onAnswerSubmitted(answer) {
    // do input validation here
    console.log(answer);

    // if (answer.questionId == "startDate" || "endDate") {
    //   this.renderNextButton()
    // }

    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
    });
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={"white"}
          placeholder={placeholder}
          placeholderTextColor={"rgba(184,184,184,1)"}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    );
  }

  renderInfoText(infoText) {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SimpleSurvey
          ref={(s) => {
            this.surveyRef = s;
          }}
          survey={survey}
          containerStyle={styles.surveyContainer}
          selectionGroupContainerStyle={styles.selectionGroupContainer}
          navButtonContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
          renderPrevious={this.renderPreviousButton.bind(this)}
          renderNext={this.renderNextButton.bind(this)}
          renderFinished={this.renderFinishedButton.bind(this)}
          renderQuestionText={this.renderQuestionText}
          renderSelector={this.renderButton.bind(this)} // for selection buttons
          onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
          onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
          renderTextInput={this.renderTextBox}
          renderNumericInput={this.renderNumericInput}
          renderInfo={this.renderInfoText}
        />

        {/*<ScrollView style={styles.answersContainer}>
          <Text style={{ textAlign: "center" }}>JSON output</Text>
          <Text>{this.state.answersSoFar}</Text>
        </ScrollView>*/}
      </View>
    );
  }
}

/**
 * StyleSheet for components.
 */
const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: 30,
    width: 140,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    // main parent view
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    //borderRadius: 10,
    flex: 1,
  },
  answersContainer: {
    width: "100%",
    height: "30%",
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 5,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
  },
  surveyContainer: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    alignContent: "center",
    padding: 5,
    height: "70%",
    flex: 1,
    //flexGrow: 1,
    //elevation: 20,
  },
  selectionGroupContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "space-between",
    flexWrap: "wrap",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  selectionButtonUnselected: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#70889F",
    padding: 2,
    marginHorizontal: 10,
    height: 45,
    width: 150,
    borderRadius: 10,
    //elevation: 3
  },
  selectionButtonSelected: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    padding: 2,
    marginHorizontal: 10,
    height: 45,
    width: 150,
    borderRadius: 10,
    //elevation: 3
  },
  navButtonText: {
    margin: 10,
    fontSize: 20,
    color: "black",
    width: "auto",
  },
  surveyNavButton: {
    alignItems: "center",
    backgroundColor: "#FFD56D",
    padding: 15,
    width: 100, //maybe make these 150 and fix formatting
    borderRadius: 10,
    //elevation: 3,
  },
  surveyNavButtonDisabled: {
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 15,
    width: 100,
    borderRadius: 10,
    //elevation: 3,
  },
  questionText: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 20,
  },
  textBox: {
    borderWidth: 2,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 10,

    padding: 10,
    textAlignVertical: "top",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 10,

    padding: 10,
    textAlignVertical: "top",
    marginLeft: 10,
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: "center",
    alignContent: "center",
    height: "75%",
    margin: 10,
    padding: 5,
    fontSize: 20,
    backgroundColor: "white",
  },
  infoText: {
    textAlign: "center",
    fontSize: 20,
  },
});
