//npm install @react-native-async-storage/async-storage
//npm install --save react-native-vector-icons

import React, {useState} from 'react';
import { Platform, StyleSheet,Text,View,TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, FlatList, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from "../Config";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
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


const GoalScreen = ()=>{
    const [textInput, setTextInput]  = React.useState('');
    const [todos,setTodos] = React.useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [text, setText] = useState("");

    

    //save current goals to myDoc first.
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(db, "Goals", uid);

    const addPreviousTodos = () => {
        console.log("ran");
        getDoc(docRef)
        .then((doc) => {  
            if (!doc.exists) {
                console.log('No such document!');
                const myDoc = doc(db, "Goals", uid);
            } else if (doc.exists){
                setTodos(doc.get("todos"));
            }
        })
    };

    React.useEffect(() => {
        addPreviousTodos()
      }, [])

    //set current todos to past todos...
    //save from firebase doc to local
    //setTodos(docRef.data());

    const ListItem = ({todo}) => {
        return (
        <View style = {styles.listItem}>
            <View style = {{flex: 1}}>
                {/* Draws line across completed todo */}
                <Text style = {{fontWeight: "bold", fontSize: 15, color: "#000", textDecorationLine: todo?.completed ? 'line-through' : 'none',}}>
                    {todo?.task}
                </Text>
            </View>

            {/* Mark complete button */}
            {!todo?.completed && (
                <TouchableOpacity style = {[styles.actionIcon]} onPress = {()=> markTodoComplete(todo?.id)}>
                    <Icon name = "done" size = {20} color = "black"/>
                </TouchableOpacity>
            )}

            {/* Delete button */}
            <TouchableOpacity style = {[styles.actionIcon]} onPress = {()=>deleteTodo(todo?.id)}>
                <Icon name = "delete" size = {20} color = "black"/>
            </TouchableOpacity>
            
        
            {/* Edit button */}
            <TouchableOpacity style = {[styles.actionIcon]} onPress = {()=> editTodo(todo?.id)}>
                <Icon name = "edit" size = {20} color = "black"/>
            </TouchableOpacity>
        </View>
        );
    };

    {/*Add todo, mark todo done, edit todo, and delete todo functions*/}
    const addTodo = () => {
        //gets users doc then updates it after user adds a todo.
        const docRef = doc(db, "Goals", uid);
        
        if(textInput == ""){
            Alert.alert("Error", "Please input a goal");
        //For editing todo
        } if (textInput && !toggleSubmit){
            setTodos(
                todos.map((todo) => {
                    if(todo.id === isEditItem){
                        return{...todo,task:textInput}
                    }
                    return todo;
                })
            );
            setToggleSubmit(true);
            setTextInput('');
            setIsEditItem(null);
        }
        //For adding brand new todo
        if (textInput && toggleSubmit){
            const newTodo = {
                id:Math.random(),
                task: textInput,
                completed: false,
            };
            setTodos([...todos,newTodo]);
            setTextInput('');

            //makes sure todo gets added to database as it is also added to app
            const recentTodoList = [...todos,newTodo];
            getDoc(docRef)
            .then((doc) => {  
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    updateDoc(docRef, {todos: recentTodoList}, {merge:true});
                }
            })
        }
    };

    const markTodoComplete = (todoId) => {
        //finds selected todo and markes it as complete, which crosses it out
        const newTodos = todos.map((item) => {
            if(item.id == todoId){
                return{...item,completed:true}
            }
            return item;
        });
        setTodos(newTodos);
        updateDoc(docRef, {todos: newTodos}, {merge:true});
    };

    const deleteTodo = (todoId) => {
        //filters out selected todo and removes it
        const newTodos = todos.filter(item => item.id != todoId);
        setTodos(newTodos);
        updateDoc(docRef, {todos: newTodos}, {merge:true});
    }

    const editTodo= (todoId) => {
        let newEditItem = todos.find((todo) => {
            return todo.id === todoId
        });
        setToggleSubmit(false);
        setTextInput(newEditItem.task);
        setIsEditItem(todoId);
    };

    return( 
    <SafeAreaView
        style= {{flex: 1, backgroundColor: "#fff",}}>
            <View style = {styles.header}>
                <Text style={styles.sectionTitle}> To-Do List</Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{padding: 20, paddingBottom: 100}}
                data = {todos} 
                renderItem = {({item}) => <ListItem todo = {item}/>}
            />
            

            <View style = {styles.footer}>
                <View style = {styles.inputContainer}>
                    <TextInput
                        value={textInput}
                        placeholder = "Write a Goal"
                        onChangeText={text => setTextInput(text)}
                    />
                </View>
                <TouchableOpacity onPress={addTodo}>
                    <View style = {styles.iconContainer}>
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
        backgroundColor: '#FFD56D',
        flexDirection: "row",
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    },
    header:{
        padding: 10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "center"
    },

    sectionTitle:{
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
    },

    footer:{
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#fff",
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    inputContainer:{
        elevation: 40,
        flex: 1,
        height: 50,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: "#C4C4C4",
    },

    iconContainer:{
        height: 50,
        width: 50,
        backgroundColor: "#C4C4C4",
        borderRadius: 25,
        elevation: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    addText:{
        fontSize: 24,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default GoalScreen;
  
  

