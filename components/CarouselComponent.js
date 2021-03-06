/**
 * Description:
 *
 * The Carousel Component. Displays basic information
 * about the application.
 *
 * Library used:
 * https://github.com/meliorence/react-native-snap-carousel
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import FirstImg from "../assets/Travel plans_Flatline.svg";
import SecondImg from "../assets/Travel plans_Outline.svg";
import ThirdImg from "../assets/Traveling_Flatline.svg";

import Carousel, { Pagination } from "react-native-snap-carousel";

const CarouselComponent = () => {
  const [index, setIndex] = useState(0);

  // data contains the picture and information that will be shown.
  let data = [
    {
      picture: FirstImg,
      title: "Plan your vacation!",
    },
    {
      picture: SecondImg,
      title: "Get your routes!",
    },
    {
      picture: ThirdImg,
      title: "Set your goals and budget!",
    },
  ];

  /**
   * Renders an item of the carousel
   */
  CarouselItem = ({ item, index }) => {
    return (
      <View>
        <View style={styles.logo}>
          <item.picture width="275" height="200" />
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  /**
   * Renders the carousel
   */
  return (
    <View style={styles.carousel}>
      <Carousel
        data={data}
        renderItem={CarouselItem}
        sliderWidth={275}
        itemWidth={275}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        dotStyle={{
          width: 32,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#FFD56D",
        }}
        inactiveDotStyle={{ backgroundColor: "black" }}
        inactiveDotScale={0.8}
        inactiveDotOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
});

export default CarouselComponent;
