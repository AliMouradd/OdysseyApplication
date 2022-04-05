import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const ItineraryMainScreen = ({ route, navigation }) => {
  return (
    <View style={styles.maincontainer}>
      <Agenda
        // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={this.props.planList}
        renderItem={(item, firstItemInDay) =>
          this.renderItem(item, firstItemInDay)
        }
        renderDay={(day, item) => this.renderItemDay(day, item)}
        renderEmptyDate={() => this.renderEmptyDate()}
        rowHasChanged={(r1, r2) => this.rowHasChanged(r1, r2)}
        onDayPress={this.onDaySelected.bind(this)}
        minDate={
          this.props.minDate
            ? this.props.minDate
            : Moment(today).format("YYYY-MM-DD")
        }
        maxDate={
          this.props.maxDate
            ? this.props.maxDate
            : Moment(today).format("YYYY-MM-DD")
        }
        renderKnob={() => {
          return (
            <View style={{ height: 14, padding: 4 }}>
              <View
                style={{
                  height: "100%",
                  width: 40,
                  backgroundColor: "#DCDCDC",
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#DCDCDC",
                }}
              />
            </View>
          );
        }}
        //markedDates={}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#f8f5f0",
          selectedDayBackgroundColor: "#E0D2BC",
          selectedDayTextColor: "#000000",
          todayTextColor: "#000000",
          textDisabledColor: "#888888",
          dayTextColor: "#000000",
          agendaKnobColor: "#DCDCDC",
          dotColor: COLORS.GREEN,
          selectedDotColor: COLORS.PRIMARY,
          "stylesheet.calendar.header": {
            week: {
              marginTop: Platform.OS == "ios" ? 6 : 2,
              flexDirection: "row",
              justifyContent: "space-between",
            },
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
});

export default ItineraryMainScreen;
