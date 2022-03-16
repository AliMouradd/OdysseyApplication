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


const AddPlacesScreen = ()=>{
    const [textInput, setTextInput]  = React.useState('');
    //save current goals to myDoc first.
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(db, "Goals", uid);

    return( 
        <SafeAreaView
            style= {{flex: 1, backgroundColor: "#fff",}}>
                <View style = {styles.header}>
                    <Text style={styles.sectionTitle}> Add Places </Text>
                </View>

                <View style = {styles.header2}>
                    <Text style={styles.sectionTitle2}> Search a Location: </Text>
                </View>

                <View style = {styles.inputContainer}>
                    <TextInput
                        //value = {textInput}
                        placeholder = "Enter a City"
                        onChangeText = {text => setTextInput(text)}
                    />
                </View>

                <View style = {styles.footer}>
                <Text style={styles.sectionTitle}> Add Places </Text>
                </View>
    
    
        </SafeAreaView>
        );
};
  
const styles = StyleSheet.create({
    header:{
        padding: 10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "center"
    },

    header2:{
        padding: 10,
        flexDirection: "row",
        alignItems:"center",
        marginLeft: 20,
    },

    sectionTitle:{
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
    },

    sectionTitle2:{
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },

    footer:{
        //position: 'absolute',
        //bottom: 0,
        backgroundColor: "#000",
        width: '100%',
        //flexDirection: 'row',
        //alignItems: 'center',
        //addingHorizontal: 20,
    },

    inputContainer:{
        //elevation: 40,
        height: 50,
        marginVertical: 20,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: "#C4C4C4",
    },
});

export default AddPlacesScreen;