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

const SignIn = ({navigation}) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorText,setErrorText] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = () => {
setErrorText('');
if(!email){
  alert('Please Fill Email');
  return;
}
if(!password){
  alert('Please Fill Password');
  return;
}
setLoading(true);
let obj = {email: email, password: password};
console.log(obj);
navigation.navigate("Home")
fetch(APP_DOMAIN + "login", {
    method: "POST",
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
    body: JSON.stringify({
        "email":obj.email,
        "password": obj.password,
    })
})
    .then(res => {
        console.log(res);
    }).catch(err => {
        alert(JSON.stringify(err));
        console.log('Error -', err, err.message);
    });
}

const handleGuestSubmit = () => {
  navigation.navigate("Home");
}
        
        
return (
  
  <View style={styles.container}>
    <Image
  source={require('../../assets/logo.jpeg')}
    style={styles.image} />
    
   
    <View style={styles.inputView}>
    <View style={styles.inputViewOne}>
      <TextInput>Text</TextInput>
      <TextInput>Text</TextInput>
      </View>
      <Input
        style={styles.TextInput}
        placeholder="Username"
        placeholderTextColor="##B1A2A2"
        onChangeText={(email) => setEmail(email)}
      />
  
      <Input
        style={styles.TextInput}
        placeholder="Password"
        placeholderTextColor="##B1A2A2"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity>
      <Text onPress={handleGuestSubmit}>Forgot Password</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text style={styles.loginBtn} onPress={handleSubmit}>Login</Text>
    </TouchableOpacity>
    </View>
       </View>
       
    {/* </View> */}
   
<View style={{flexDirection:'column'}}>
      <Text>New User? </Text>
      <TouchableOpacity>
      <Text style={styles.forgot_button} onPress={handleGuestSubmit}>Sign Up</Text>
    </TouchableOpacity>
   
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
  backgroundColor: "#e6e6e6",
  borderRadius: 10,
  width: "70%",
  height: 300,
  marginBottom: 20,
  alignItems: "center",
  
},
inputViewOne: {
  backgroundColor: "#4ECBC3",
  borderRadius: 10,
  width: "100%",
  flexDirection:'row',
  height: 55,
  marginBottom: 20,
  alignItems: "center",
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

export default SignIn;

