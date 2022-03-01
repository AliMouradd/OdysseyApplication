import React from  'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    FlatList,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../components/colors';
const ItineraryScreen = ({navigation}) => {

    return (
        <SafeAreaView style ={style.container}> 

            <View style = {style.header}> 
                <Icon style = {style.backBtn}/>
                <Icon style = {style.homeBtn}/>
            </View>

            <ScrollView>


            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        paddingVertical: 20,
        paddingHorizantal: 20,
        flexDirection: 'row',
        justifyContent:'',
        backgroundColor: COLORS.primary
    },
    homeBtn: {
        name = "home",
        size = 28,
        color = COLORS.white
    }

});