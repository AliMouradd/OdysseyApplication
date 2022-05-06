import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { app } from "../Config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import ProfileScheduleComponent from "../components/ProfileScheduleComponent";
import Icon from "react-native-vector-icons/MaterialIcons";

const db = getFirestore(app);

const ProfileScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [likes, setLikes] = useState(0);
  const [schedules, setSchedules] = useState([]);

  useEffect(async () => {
    if (route.params.id === 0) {
      setName("Guest");
    } else {
      const infoRef = doc(db, "users", route.params.id);
      const info = await getDoc(infoRef);
      if (info.exists()) {
        setName(info.data().name);
        setLikes(info.data().likes);
      } else {
        alert("Something went wrong!");
      }
      const docRef = doc(db, "UserSchedules", route.params.id);
      const schedulesInfo = await getDoc(docRef);
      if (schedulesInfo.exists()) {
        setSchedules(schedulesInfo.data().schedules);
      } else {
        alert("Something went wrong!");
      }
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <TouchableOpacity
          style={{ marginTop: 30, marginLeft: 15 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/icon.png")} style={styles.img} />
        </View>
        <Text style={styles.fullname}>{name}</Text>
        <Text style={styles.about}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </Text>
        <View style={styles.information}>
          <View style={styles.info}>
            <Text style={{ textAlign: "center" }}>{likes}</Text>
            <Text style={{ textAlign: "center" }}>Likes</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ textAlign: "center" }}>0</Text>
            <Text style={{ textAlign: "center" }}>Followers</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ textAlign: "center" }}>0</Text>
            <Text style={{ textAlign: "center" }}>Following</Text>
          </View>
        </View>
        <View style={styles.schedule}>
          <Text style={styles.h1}>My Schedules</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            marginLeft: 15,
            flexDirection: "row",
          }}
        >
          {schedules.map((schedule) => (
            <ProfileScheduleComponent
              navigation={navigation}
              key={schedule.number}
              schedule={schedule}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    backgroundColor: "#FFD56D",
    width: "100%",
    height: 125,
  },
  profile: {
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 5,
    marginTop: -55,
  },
  fullname: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  about: {
    fontSize: 14,
    marginBottom: 5,
    width: "75%",
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 8,
  },
  information: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 15,
    marginLeft: 15,
  },
  info: {
    justifyContent: "center",
  },
  schedule: {
    marginLeft: 15,
    marginBottom: 5,
  },
  h1: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
