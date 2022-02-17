import React from 'react';
import { StyleSheet,Text,View,} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Goal = (props) => {

  return(
    <View style = {styles.item}>
      <View style = {styles.itemLeft}>
        <View style = {styles.square}></View>
        <Text style = {styles.itemText}>{props.text}</Text>
      </View>
      <View style = {styles.circular}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  item:{
    backgroundColor: '#FFD56D',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,

  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#C4C4C4',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },

});

export default Goal;