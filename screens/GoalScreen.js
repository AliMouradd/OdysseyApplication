/**
 * Description:
 *
 * The GoalScreen displays a screen for a user to input goals they
 * want to accomplish during their trip. They can add, delete, and
 * update their goals.
 *
 * Built by: Quacky Coders
 */

import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { db } from "../Config";
import { getAuth } from "firebase/auth";

import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  addDoc,
  Firestore,
  getDoc,
} from "firebase/firestore";

const GoalScreen = ({ navigation }) => {
  const [textInput, setTextInput] = React.useState("");
  // The todos the user creates
  const [todos, setTodos] = React.useState([]);
  // Condition set for checking when to edit a todo
  const [toggleSubmit, setToggleSubmit] = useState(true);
  // The id of the todo to be edited
  const [isEditItem, setIsEditItem] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [text, setText] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, "Goals", uid);

    /**
    * Takes Todos saved in database and adds them to list
    */
  const addPreviousTodos = () => {
    getDoc(docRef).then((doc) => {
      setTodos(doc.get("todos"));
    });
  };

  React.useEffect(() => {
    addPreviousTodos();
  }, []);

    /**
    * Set current todos to past todos...
    * save from firebase doc to local
    */
  const ListItem = ({ todo }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          {/* Draws line across completed todo */}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "#000",
              textDecorationLine: todo?.completed ? "line-through" : "none",
            }}
          >
            {todo?.task}
          </Text>
        </View>

        {/* Mark complete button */}
        {!todo?.completed && (
          <TouchableOpacity
            style={[styles.actionIcon]}
            onPress={() => markTodoComplete(todo?.id)}
          >
            <Icon name="done" size={20} color="black" />
          </TouchableOpacity>
        )}

        {/* Delete button */}
        <TouchableOpacity
          style={[styles.actionIcon]}
          onPress={() => deleteTodo(todo?.id)}
        >
          <Icon name="delete" size={20} color="black" />
        </TouchableOpacity>

        {/* Edit button */}
        <TouchableOpacity
          style={[styles.actionIcon]}
          onPress={() => editTodo(todo?.id)}
        >
          <Icon name="edit" size={20} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  {
    /*Add todo, mark todo done, edit todo, and delete todo functions*/
  }
  const addTodo = () => {
    //Gets users doc then updates it after user adds a todo.
    if (textInput == "") {
      Alert.alert("Error", "Please input a goal");
    }
    //For editing todo
    if (textInput && !toggleSubmit) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === isEditItem) {
            return { ...todo, task: textInput };
          }
          return todo;
        })
      );
      setToggleSubmit(true);
      setTextInput("");
      setIsEditItem(null);
    }
    //For adding brand new todo
    if (textInput && toggleSubmit) {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput("");

      //makes sure todo gets added to database as it is also added to app
      const recentTodoList = [...todos, newTodo];
      updateDoc(docRef, { todos: recentTodoList }, { merge: true });
    }
  };

    /**
    * Marks a todo complete by drawing a line across the text
    * Changes state of todo to complete
    */
  const markTodoComplete = (todoId) => {
    //finds selected todo and marks it as complete, which crosses it out
    const newTodos = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTodos(newTodos);
    updateDoc(docRef, { todos: newTodos }, { merge: true });
  };

    /**
    * Deletes todo from database and list
    */
  const deleteTodo = (todoId) => {
    //filters out selected todo and removes it
    const newTodos = todos.filter((item) => item.id != todoId);
    setTodos(newTodos);
    updateDoc(docRef, { todos: newTodos }, { merge: true });
  };

    /**
    * Edits todo and asks for new input
    */
  const editTodo = (todoId) => {
    //finds todo to be edited and sets it state to be edited
    let newEditItem = todos.find((todo) => {
      return todo.id === todoId;
    });
    setToggleSubmit(false);
    setTextInput(newEditItem.task);
    setIsEditItem(todoId);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={{ marginTop: 25, marginLeft: 15 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}> To-Do List</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Write a Goal"
            onChangeText={(text) => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Text style={styles.addText}> + </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionIcon: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  listItem: {
    padding: 20,
    backgroundColor: "#FFD56D",
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  inputContainer: {
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#C4C4C4",
  },

  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#C4C4C4",
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GoalScreen;
