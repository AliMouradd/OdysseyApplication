/**
 * Description:
 *
 * The Schedule Description Input Modal displays
 * a modal for the user to input a short description
 * of their created schedule.
 *
 * Built by: Quacky Coders
 */

import React from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from "react-native";

const ScheduleDescriptionInputModal = (props) => {
  /**
   * Renders the Description Input Modal
   */
  return (
    <Modal transparent={true} visible={props.descriptionModalVisible}>
      <TouchableWithoutFeedback
        onPress={() => props.toggleDescriptionInputModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              value={props.description}
              onChangeText={(text) => props.onChangeText(text)}
              placeholder="Enter Schedule Name..."
              style={styles.textInput}
            />
            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.toggleDescriptionInputModalVisible()}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Okay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => props.toggleDescriptionInputModalVisible()}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    width: "75%",
  },
  modalTitle: {
    marginBottom: 5,
    fontSize: 18,
    borderBottomWidth: 2,
    borderColor: "black",
  },
  modalText: {
    fontSize: 16,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  btn: {
    backgroundColor: "#FFD56D",
    borderRadius: 50,
    marginBottom: 25,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default ScheduleDescriptionInputModal;
