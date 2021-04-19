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

const SignUp = ({navigation}) => {
const [fullName, setFullName] = useState("");
const [age, setAge] = useState("");
const [gender, setGender] = useState("");
const [email, setEmail] = useState("");
const [errorText,setErrorText] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = () => {
setErrorText('');
if(!fullName){
  alert('Please Fill your Name');
  return;
}
if(!age){
  alert('Please Fill your age');
  return;
}
if(!gender){
    alert('Please Fill your gender');
    return;
  }
if(!email){
    alert('Please Fill your email');
    return;
  }
setLoading(true);
let obj = {fullName: fullName, age: age, gender: gender, email:email};
console.log(obj);
navigation.navigate("Home")
fetch(APP_DOMAIN + "login", {
    method: "POST",
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
    body: JSON.stringify({
        "fullName":obj.fullName,
        "age": obj.age,
        "gender": obj.gender,
        "email": obj.email,
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
      {/* <Input
        style={styles.TextInput}
        placeholder="Username"
        placeholderTextColor="#B1A2A2"
        onChangeText={(email) => setEmail(email)}
      />
  
      <Input
        style={styles.TextInput}
        placeholder="Password"
        placeholderTextColor="#B1A2A2"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      /> */}

    <Input
                    style={styles.TextInput}
                    placeholder='Full Name:'
                    autoCapitalize="none"
                    placeholderTextColor='#B1A2A2'
                    onChangeText={(fullName) => setFullName(fullName)}
                />
    <Input
                    style={styles.TextInput}
                    placeholder='Age:'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='#B1A2A2'
                    onChangeText={(age) => setAge(age)}
                />
                <Input
                    style={styles.TextInput}
                    placeholder='Gender:'
                    autoCapitalize="none"
                    placeholderTextColor='#B1A2A2'
                    onChangeText={(gender) => setGender(gender)}
                />
                <Input
                    style={styles.TextInput}
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor='#B1A2A2'
                    onChangeText={(email) => setEmail(email)}
                />
      {/* <TouchableOpacity>
      <Text onPress={handleGuestSubmit}>Forgot Password</Text>
    </TouchableOpacity> */}
       </View>
       
    {/* </View> */}
   
<View style={{flexDirection:'column'}}>

<TouchableOpacity>
      <Text style={styles.forgot_button} onPress={handleGuestSubmit}>Sign Up</Text>
    </TouchableOpacity>
      {/* <Text>New User? </Text>
    <TouchableOpacity>
      <Text style={styles.forgot_button} onPress={handleSubmit}>Login</Text>
    </TouchableOpacity> */}

   
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
  marginTop:30,
  borderRadius: 100,
},

inputView: {
  backgroundColor: "#e6e6e6",
  borderRadius: 10,
  width: "80%",
  height: 375,
  marginBottom: 20,
  alignItems: "flex-start",
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
 height:10,
  flex: 1,
  padding: 10,
  marginLeft: 10,
},

forgot_button: {
  marginBottom: 20,
  width:120,
    backgroundColor:"#5FE3DB",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:30,
    textAlign: "center",
    fontSize: 18,
    padding: 13,
    color: '#000000',
  
},

// loginBtn: {
//   width: "80%",
//   borderRadius: 25,
//   height: 50,
//   alignItems: "center",
//   justifyContent: "center",
//   marginTop: 40,
//   backgroundColor: "#FF1493",
// },
});

export default SignUp;



// SignUp.js
// import React from 'react'
// import {
//     View,
//     Button,
//     TextInput,
//     StyleSheet
// } from 'react-native'

// export default class SignUp extends React.Component {
//     state = {
//         username: '', password: '', email: '', phone_number: ''
//     }
//     onChangeText = (key, val) => {
//         this.setState({ [key]: val })
//     }
//     signUp = async () => {
//         const { username, password, email, phone_number } = this.state
//         try {
//             // here place your signup logic
//             console.log('user successfully signed up!: ', success)
//         } catch (err) {
//             console.log('error signing up: ', err)
//         }
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Full Name:'
//                     autoCapitalize="none"
//                     placeholderTextColor='white'
//                     onChangeText={val => this.onChangeText('username', val)}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Age:'
//                     secureTextEntry={true}
//                     autoCapitalize="none"
//                     placeholderTextColor='white'
//                     onChangeText={val => this.onChangeText('age', val)}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Gender:'
//                     autoCapitalize="none"
//                     placeholderTextColor='white'
//                     onChangeText={val => this.onChangeText('gender', val)}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Email'
//                     autoCapitalize="none"
//                     placeholderTextColor='white'
//                     onChangeText={val => this.onChangeText('email', val)}
//                 />
//                 <Button
//                     title='Sign Up'
//                     onPress={this.signUp}
//                 />
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     input: {
//         width: 350,
//         height: 55,
//         backgroundColor: '#2F9589',
//         margin: 10,
//         padding: 8,
//         color: 'white',
//         borderRadius: 14,
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })