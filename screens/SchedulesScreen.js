/**
 * Description:
 *
 * The SchedulesScreen displays public schedules
 * that other users has made. It will also display
 * schedules that the user has made too.
 *
 * Built by: Quacky Coders
 */

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { app } from "../Config";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import ScheduleComponent from "../components/ScheduleComponent";

const db = getFirestore(app);

const SchedulesScreen = ({ navigation }) => {
  const [schedules, setSchedules] = useState([]);
  const [publicSchedules, setPublicSchedules] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  /**
   * After rendering, get the user's schedules.
   * Also, get the public schedules.
   */
  useEffect(async () => {
    const docRef = doc(db, "UserSchedules", uid);
    const schedulesInfo = await getDoc(docRef);
    if (schedulesInfo.exists()) {
      setSchedules(schedulesInfo.data().schedules);
    } else {
      alert("Something went wrong!");
    }
    const docRefTwo = collection(db, "PublicSchedules");
    const schedulesInfoTwo = await getDocs(docRefTwo);
    let s = [];
    schedulesInfoTwo.forEach((doc) => {
      doc.data().schedules.forEach((ns) => {
        s = [...s, ns];
      });
    });
    setPublicSchedules(s);
  }, []);

  /**
   * Renders the Schedule Screen.
   */
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "#FFD56D" }}>
          <Text style={style.h1}>Schedules</Text>
        </View>

        <Text style={style.title}>Public Plans</Text>
        <FlatList
          data={publicSchedules}
          renderItem={({ item }) => (
            <ScheduleComponent
              navigation={navigation}
              key={item.number}
              schedule={item}
            />
          )}
          horizontal
        />

        <Text style={style.title}>Revisit Your Plans</Text>

        {schedules.map((schedule) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PlacesScreen", {
                schedule: schedule,
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                width: "80%",
                margin: 5,
                padding: 10,
                borderWidth: 1,
              }}
            >
              <Image
                style={{ height: 50, width: 50 }}
                source={{ uri: schedule.places[0].picture }}
              />
              <View style={{ marginLeft: 5 }}>
                <Text>{schedule.scheduleName}</Text>
                <Text>{schedule.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  h1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 10,
    marginTop: 50,
    marginBottom: 15,
  },
  title: {
    marginTop: 20,
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SchedulesScreen;
