import React, {useState} from 'react';
import { Platform, StyleSheet,Text,View,TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView} from "react-native";

import Goal from '../components/Goal.js';

export default function GoalListScreen() {
  const [goal, setGoal] = useState();
  const [goalItems, setGoalItems] = useState([]);

  const handleAddGoal = () => {
    console.log(goal);
    Keyboard.dismiss();
    setGoalItems([...goalItems, goal])
    setGoal(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...goalItems];
    itemsCopy.splice(index,1);
    setGoalItems(itemsCopy);
  }

    return (
    <View style = {styles.container}>
      
      {/*Enables scrolling when list is longer than page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps = 'handled'>

      <View style={styles.goalsContainer}>
        <Text style={styles.sectionTitle}> To-Do List</Text>

        <View style={styles.goals}>
          {/*Where goals will be*/}
          {
            goalItems.map((item, index) => {
              return (
                <TouchableOpacity key = {index} onPress={() => completeTask(index)}>
                  <Goal text = {item}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      </ScrollView>

      {/* Write Goals View. Includes "write a goal" and plus button at the bottom of screen*/}
      <KeyboardAvoidingView
        //Adds height or padding depending on IOS or Android
        behavior={Platform.OS === "ios" ? "padding": "height"}
        style = {styles.writeGoalWrapper}
      >
        {/*User input is set to goal*/}
        <TextInput style={styles.input} placeholder = {"Write a goal"} value={goal} onChangeText={text => setGoal(text)}/>

        <TouchableOpacity onPress = {() => handleAddGoal()}>
          <View style = {styles.addWrapper}>
            <Text style={styles.addText}> + </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>


    );
  }

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
    },

    goalsContainer: {
      paddingTop: 60,
      paddingHorizontal: 20,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
    },

    goals: {
        paddingHorizontal: 20,
        marginTop: 30,
    },

    writeGoalWrapper:{
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: "row",
      justifyContent: 'space-around',
      alignItems: "center",
    },

    input:{
      paddingVertical: 15,
      paddingHorizontal: 15,
      width: 250,
      borderRadius: 60,
      backgroundColor: "#C4C4C4",
    },

    addWrapper:{
      width: 60,
      height: 60,
      backgroundColor: "#C4C4C4",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
    },

    addText:{

    },
  });

