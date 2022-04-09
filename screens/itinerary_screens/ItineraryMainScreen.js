import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import CalendarStrip from "react-native-calendar-strip";

export default class ItineraryMainScreen extends Component {
  constructor(props) {
    super(props);

    let startDate = "2022-04-08";

    // Create a week's worth of custom date styles and marked dates.
    let customDatesStyles = [];
    let markedDates = [];

    let DATA = [
      {
        eventDate: "2022-04-08",
        eventTitle: "The Egg Shack",
      },
      {
        eventDate: "2022-4-08",
        eventTitle: "Downtown Central Park",
      },
      {
        eventDate: "2022-4-08",
        eventTitle: "History Museum",
      },
    ];

    this.state = {
      selectedDate: undefined,
      customDatesStyles,
      markedDates,
      startDate,
      DATA,
    };
  }

  onDateSelected = (selectedDate) => {
    this.setState({ selectedDate });
    this.setState({ formattedDate: selectedDate.format("MM-DD-YYYY") });
  };

  Item = ({ date, title }) => (
    <View style={styles.item}>
      <Text>
        {date}: {title}
      </Text>
    </View>
  );

  renderItem = ({ item }) => (
    <Item date={item.eventDate} title={item.eventTitle}></Item>
  );

  render() {
    return (
      <View style={styles.maincontainer}>
        <CalendarStrip
          scrollable={false}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "background",
            duration: 300,
            highlightColor: "#9265DC",
          }}
          style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: "black" }}
          calendarColor={"#FFD56D"}
          dateNumberStyle={{ color: "black" }}
          dateNameStyle={{ color: "black" }}
          iconContainer={{ flex: 0.1 }}
          customDatesStyles={this.state.customDatesStyles}
          highlightDateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "white" }}
          highlightDateContainerStyle={{ backgroundColor: "black" }}
          markedDates={this.state.markedDates}
          datesBlacklist={this.datesBlacklistFunc}
          selectedDate={this.state.selectedDate}
          onDateSelected={this.onDateSelected}
          useIsoWeekday={false}
        />

        <Text style={{ fontSize: 24 }}>
          Selected Date: {this.state.formattedDate}
        </Text>

        <View style={styles.agendalist}>
          <FlatList
            data={this.state.DATA}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>
                  {item.eventDate}: {item.eventTitle}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.eventTitle} //change this to item.id or similar
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  agendalist: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    backgroundColor: "#FFD56D",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 7,
  },
});
