/**
 * Description:
 *
 * The WelcomeScreen displays a screen to give users some information
 * about the mobile application. It also gives an user the option to
 * sign up for an account or log in to an existing account.
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";

const WelcomeScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  //placeholder data
  let data = [
    {
      title: "Text 1",
    },
    {
      title: "Text 2",
    },
    {
      title: "Text 3",
    },
  ];

  CarouselItem = ({ item, index }) => {
    return (
      <View>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Odyssey</Text>

      <Carousel
        data={data}
        renderItem={CarouselItem}
        sliderWidth={275}
        itemWidth={275}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination dotsLength={data.length} activeDotIndex={index} />

      <Text style={styles.text}>Don't know where to go? We can help!</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.p} onPress={() => navigation.navigate("Log In")}>
          Log In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Sign Up")}
      >
        <Text style={styles.p}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  h1: {
    color: "black",
    fontSize: 32,
    marginBottom: 10,
  },
  logo: {
    width: 250,
    height: 200,
  },
  btn: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFD56D",
    padding: 10,
    width: "50%",
  },
  text: {
    marginBottom: 10,
  },
  p: {
    textAlign: "center",
  },
});

export default WelcomeScreen;
