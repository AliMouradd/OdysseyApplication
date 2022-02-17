import React from 'react';
import { StyleSheet,Text,View,} from "react-native";
import Task from 'components/Task.js';

export default function GoalListScreen() {
    return (
      <View style={styles.tasksContainer}>
        <Text style={styles.sectionTitle}> To-Do List</Text>

        <View style={styles.goals}>
            {/*Where goals will be*/}
            <Task />

        </View>

      </View>
    );
  }

  const styles = StyleSheet.create({
    tasksContainer: {
        flex: 1,
        backgroundColor: '#fff',


    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",


    },

    goals: {
        paddingTop: 80,
        paddingHorizontal: 20,

    },
  });

