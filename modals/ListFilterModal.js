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


const ListFilterModal = (props) => {
  console.log(props.aliasList)
  return (

    <Modal transparent={true} visible={props.filterModalVisible}>
      <TouchableWithoutFeedback
        onPress={() => props.toggleFilterModalVisible()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
        
          <Text style={styles.modalTitle}>Filter By</Text>
            <TouchableOpacity onPress={() => props.filterPlaces("All")}>
              <Text style={styles.modalText}>All</Text>
            </TouchableOpacity>

            {props.aliasList.map((e) => (         
              <TouchableOpacity onPress={() => props.filterPlaces(e)}>
                <Text style={styles.modalText}>{e}</Text>
              </TouchableOpacity>))}
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

export default ListFilterModal;
