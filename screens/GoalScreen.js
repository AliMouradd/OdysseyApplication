//npm install @react-native-async-storage/async-storage
//npm install --save react-native-vector-icons

import React, {useState} from 'react';
import { Platform, StyleSheet,Text,View,TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, FlatList, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GoalScreen = ()=>{
    const [textInput, setTextInput]  = React.useState('');
    const [todos,setTodos] = React.useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    
    React.useEffect(() => {
        getTodosFromUserDevice();
      }, []);
    
      React.useEffect(() => {
        saveTodoToUserDevice(todos);
      }, [todos]);

    const ListItem = ({todo}) => {
        return (
        <View style = {styles.listItem}>
            <View style = {{flex: 1}}>
                <Text style = {{fontWeight: "bold", fontSize: 15, color: "#000", textDecorationLine: todo?.completed ? 'line-through' : 'none',}}>
                    {todo?.task}
                </Text>
            </View>

            {/*Done and Delete buttons*/}
            {!todo?.completed && (
                <TouchableOpacity style = {[styles.actionIcon]} onPress = {()=> markTodoComplete(todo?.id)}>
                    <Icon name = "done" size = {20} color = "black"/>
                </TouchableOpacity>
            )}

            <TouchableOpacity style = {[styles.actionIcon]} onPress={()=>deleteTodo(todo?.id)}>
                <Icon name = "delete" size = {20} color = "black"/>
            </TouchableOpacity>
            
        
            {/* Attempt at edit. */}
            <TouchableOpacity style = {[styles.actionIcon]} onPress = {()=> editTodo(todo?.id)}>
                <Icon name = "edit" size = {20} color = "black"/>
            </TouchableOpacity>
            {/**/}

        </View>
        );
    };

    {/*Add todo, mark todo done, edit todo, and delete todo functions*/}
    const addTodo = () => {
        if(textInput == ""){
            Alert.alert("Error", "Please input a goal");
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
        if (toggleSubmit){
            const newTodo = {
                id:Math.random(),
                task: textInput,
                completed: false,
            };
            setTodos([...todos,newTodo])
            setTextInput('');
        }
    };

    const saveTodoToUserDevice = async todos => {
        try {
          const stringifyTodos = JSON.stringify(todos);
          await AsyncStorage.setItem('todos', stringifyTodos);
        } catch (error) {
          console.log(error);
        }
      };

      const getTodosFromUserDevice = async () => {
        try {
          const todos = await AsyncStorage.getItem('todos');
          if (todos != null) {
            setTodos(JSON.parse(todos));
          }
        } catch (error) {
          console.log(error);
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
    };

    const deleteTodo = (todoId) => {
        //filters out selected todo and removes it
        const newTodos = todos.filter(item => item.id != todoId);
        setTodos(newTodos);
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
  
  

