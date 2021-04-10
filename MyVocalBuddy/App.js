import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/views/home/Home';
import AboutScreen from './src/views/about/about';
import SignInScreen from './src/views/sign-in/SignIn';
import LoadingScreen from './src/views/loading/loading';
import TutorialScreen from './src/views/tutorial/tutorial';
import SignUpScreen from './src/views/sign-up/SignUp';
import 'react-native-gesture-handler';
// import { createStackNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
// import { createAppContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen}/>
        <Stack.Screen name="Tutorials" component={TutorialScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
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
