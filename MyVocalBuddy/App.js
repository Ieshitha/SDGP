import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/views/home/Home';
import AboutScreen from './src/views/about/about';
import SignInScreen from './src/views/sign-in/SignIn';
import TutorialScreen from './src/views/tutorial/tutorial';
import SignUpScreen from './src/views/sign-up/SignUp';
import 'react-native-gesture-handler';
import LoadingScreen from './src/views/Loading/loading';
import TuteOneScreen from './src/views/tuteOne/tuteOne';
import TuteTwoScreen from './src/views/tuteTwo/tuteTwo';
import TuteThreeScreen from './src/views/tuteThree/tuteThree';
import TuteFourScreen from  './src/views/tuteFour/tuteFour';
import TuteFiveScreen from  './src/views/tuteFive/tuteFive';
import VoiceRecScreen from './src/views/voiceRec/VoiceRec'
// import { createStackNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
// import { createAppContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
     <Stack.Navigator initialRouteName="VoiceRec">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen}/>
        <Stack.Screen name="Tutorials" component={TutorialScreen}/>
        <Stack.Screen name="VoiceRec" component={VoiceRecScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="TuteOne" component={TuteOneScreen} />
        <Stack.Screen name="TuteTwo" component={TuteTwoScreen} />
        <Stack.Screen name="TuteThree" component={TuteThreeScreen} />
        <Stack.Screen name="TuteFour" component={TuteFourScreen} />
        <Stack.Screen name="TuteFive" component={TuteFiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
