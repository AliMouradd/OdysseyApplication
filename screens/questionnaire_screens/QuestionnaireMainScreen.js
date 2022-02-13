import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SimpleSurvey } from "react-native-simple-survey";

// this will contain all questions and possible answers
const survey = [
  {
    questionType: "Info",
    questionText: "Welcome to the Odyssey Questionnaire! Tap next to continue:",
  },
  {
    questionType: "TextInput",
    questionText: "What is the start date of your vacation?",
    questionId: "startDate",
    placeholderText: "MM/DD/YYYY",
  },
  {
    questionType: "TextInput",
    questionText: "What is the end date of your vacation?",
    questionId: "endDate",
    placeholderText: "MM/DD/YYYY",
  },
  {
    questionType: "TextInput", // maybe make this numberinput
    questionText: "What is your budget for your vacation?",
    questionId: "budget",
    placeholderText: "Enter budget in dollars here...",
  },
  {
    questionType: "Info",
    questionText:
      "That is all for the questionnaire, tap finish to go to your homepage.",
  },
];

export default class SurveyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { backgroundColor: "black", answersSoFar: "" };
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          //color={{ color: "dodgerblue" }}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={{ color: "dodgerblue" }}
          title={"Previous"}
        />
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          //color={{ color: "dodgerblue" }}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={{ color: "dodgerblue" }}
          title={"Next"}
        />
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          //color={{ color: "dodgerblue" }}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={{ color: "dodgerblue" }}
          title={"Finished"}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  onSurveyFinished(answers) {
    console.log("User finished questionnaire!");
    //TODO: send answers to database
    //this.props.navigation.navigate("HomeScreen"); something like this to go to homepage
  }

  onAnswerSubmitted(answer) {
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
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
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
          //renderSelector={this.renderButton.bind(this)} for selection buttons
          onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
          onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
          renderTextInput={this.renderTextBox}
          renderNumericInput={this.renderNumericInput}
          renderInfo={this.renderInfoText}
        />

        <ScrollView style={styles.answersContainer}>
          <Text style={{ textAlign: "center" }}>JSON output</Text>
          <Text>{this.state.answersSoFar}</Text>
        </ScrollView>
      </View>
    );
  }
}

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
    minWidth: "70%",
    maxWidth: "90%",
    alignItems: "stretch",
    justifyContent: "center",
    //borderRadius: 10,
    flex: 1,
  },
  answersContainer: {
    width: "100%",
    maxHeight: "50%",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
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
    flexGrow: 1,
    //elevation: 20,
  },
  selectionGroupContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    alignContent: "flex-end",
  },
  navButtonText: {
    margin: 10,
    fontSize: 20,
    color: "black",

    width: "auto",
  },
  answers: {
    alignSelf: "center",
    marginBottom: 10,
  },
  navigationButton: {
    minHeight: 40,
    backgroundColor: "dodgerblue",
    padding: 0,
    borderRadius: 100,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: "rgba(204,204,204,1)",
    backgroundColor: "white",
    borderRadius: 5,

    padding: 10,
    textAlignVertical: "top",
    marginLeft: 10,
    marginRight: 10,
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
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10,
  },
});
