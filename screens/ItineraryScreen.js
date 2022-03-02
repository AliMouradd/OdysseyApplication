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
import places from "../components/places";
import CardComponent from "../components/CardComponent"

const {width} = Dimensions.get('screen');
const ItineraryScreen = ({navigation}) => {

    

    return (
        <SafeAreaView style ={style.container}> 

            <View style = {style.header}> 
                <Icon name="back" size={28} color={COLORS.white} />
                <Icon name="home" size={28} color={COLORS.white} />
            </View>

            <ScrollView showsVerticalScrollIndicator ={false}>
                <View style = {style.scrollHeader}>
                    <View style ={{flex: 1}}>
                        <Text style = {style.headerTitle}> Take an</Text>
                        <Text style = {style.headerTitle}> Odyssey</Text>
                        <View style={style.inputContainer}>
                            <Icon name = "search" size = {28} />
                            <TextInput 
                                placeholder="Search"
                                style = {{color: COLORS.dark}}
                            />
                        </View>
                    </View>
                </View>
                
                <Text style={style.sectionTitle}>Your Plans</Text>
                <View>
                    <FlatList
                    snapToInterval={width -20}
                    contentContainerStyle ={{paddingLeft:20, paddingBottom:20}}
                    showsHorizontalScrollIndicator = {true}
                    horizontal
                    data = {places}
                    renderItem = {({item}) => <CardComponent place = {item}/>}
                    />
                </View>
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: COLORS.primary
    },
    scrollHeader: {
        backgroundColor: COLORS.primary,
        height: 120,
        paddingHorizontal: 20
    },
    headerTitle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 23
    },
    inputContainer:{
        height: 40,
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        position: 'absolute',
        top: 90,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 12,
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 20
    },
    cardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden'
      }

});

export default ItineraryScreen;