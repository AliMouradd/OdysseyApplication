/**
 * Description:
 *
 * The List Sort Modal displays a modal
 * for the user to sort a list of nearby places
 * alphabetically, A to Z or Z to A.
 *
 * Built by: Quacky Coders
 */

import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from "react-native";

const ListSortModal = (props) => {
  /**
   * Renders the Sort Modal.
   */
  return (
    <Modal transparent={true} visible={props.sortModalVisible}>
      <TouchableWithoutFeedback onPress={() => props.toggleSortModalVisible()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity onPress={() => props.sortPlacesAsc()}>
              <Text style={styles.modalText}>A to Z</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.sortPlacesDes()}>
              <Text style={styles.modalText}>Z to A</Text>
            </TouchableOpacity>
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
});

export default ListSortModal;
