import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Button } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import CalendarStrip from "react-native-calendar-strip";

const ItineraryMainScreen = ({ route, navigation }) => {
  const [items, setItems] = useState([]);

  return (
    <View style={styles.maincontainer}>
      <CalendarStrip
        scrollable={true}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "background",
          duration: 300,
          highlightColor: "#9265DC",
        }}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: "white" }}
        calendarColor={"#3343CE"}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white", fontSize: 12 }}
        iconContainer={{ flex: 0.1 }}
        //customDatesStyles={this.state.customDatesStyles}
        highlightDateNameStyle={{ color: "white" }}
        highlightDateNumberStyle={{ color: "yellow" }}
        highlightDateContainerStyle={{ backgroundColor: "black" }}
        //markedDates={this.state.markedDates}
        //datesBlacklist={this.datesBlacklistFunc}
        //selectedDate={this.state.selectedDate}
        //onDateSelected={this.onDateSelected}
        useIsoWeekday={false}
      />

      <Text style={{ fontSize: 24 }}>
        {/* Selected Date: {this.state.formattedDate} */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
});

export default ItineraryMainScreen;
