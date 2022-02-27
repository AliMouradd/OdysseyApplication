/*
 * Just a simple screen used to test retrieving data from Firestore.
 */
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { db } from "./../../Config";
import { getAuth } from "firebase/auth";

export default function QuestionnaireAnswersTest() {
  // Storing User Data
  const [userDoc, setUserDoc] = useState(null);

  const Read = () => {
    // setup for getting current user's ID:
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    const myDoc = doc(db, "UserQuestionnaireAnswers", uid);

    getDoc(myDoc)
      // handling promises
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
        } else {
          alert("No Doc Found");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Read Doc" onPress={Read}></Button>
      {userDoc != null && (
        <Text>
          Start Date: {userDoc.startDate} {"\n"}
          End Date: {userDoc.endDate} {"\n"}
          Budget: {userDoc.budget} {"\n"}
          Interests: {userDoc.interests[0]}, {userDoc.interests[1]}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
