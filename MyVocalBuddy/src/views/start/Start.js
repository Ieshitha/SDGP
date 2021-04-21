import React, { Component, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Image,Input } from 'react-native-elements';
import { APP_DOMAIN } from '../../util/Constants';

// import { withSafeAreaInsets } from "react-native-safe-area-context";

const Start = ({navigation}) => {

const handleGuestSubmit = () => {
  navigation.navigate("Home");
}
        
        
return (
  
  <View style={styles.container}>
     <View style={{flexDirection:"row"}}>
     <View style={{flexDirection:"column"}}>
     <Text style={styles.inputView}>My Vocal Buddy</Text>
     <Text style={styles.inputViewOne}>To Witness your dream</Text>
    </View>
    <Image
  source={require('../../assets/logo.jpeg')}
    style={styles.image} />
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#00004d",
  alignItems: "center",
  justifyContent: "center",
},

image: {
  marginBottom: 40,
   width: 200,
  height: 200, 
  borderRadius: 100,
},

inputView: {
  // backgroundColor: "#e6e6e6",
  borderRadius: 10,
  width: "30%",
  height: 300,
  marginTop: 50,
  marginBottom: 10,
  fontSize: 25,
  // marginLeft:10,
  marginRight:20,
  alignItems: "center",
  color:"#ffffff",
  
},
inputViewOne: {
  borderRadius: 10,
  // width: "30%",
  // height: 300,
  // marginTop: 10,
  // marginBottom: 10,
  fontSize: 15,
  alignItems: "center",
  color:"#ffffff",
},

TextInput: {
  height: 50,
  flex: 1,
  padding: 10,
  marginLeft: 20,
},

forgot_button: {
  height: 30,
  marginBottom: 20,
  width:120,
    backgroundColor:"#5FE3DB",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
    textAlign: "center",
    fontSize: 15,
    padding: 13,
    color: '#000000',
  
},

loginBtn: {
  width: 120,
  fontSize: 15,
  color: '#000000',
  textAlign: "center",
  borderRadius: 25,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:"#5FE3DB",
},
});

export default Start;

