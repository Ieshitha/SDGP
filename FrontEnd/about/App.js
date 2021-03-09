import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={[styles.setFontSize,styles.setColorWhite]}>About Us</Text>
      <Text style={[styles.setFontSize2,styles.setColorBlue]}> </Text>
      <Text style={[styles.setFontSize2,styles.setColorWhite]}>My Vocal Buddy is a </Text>
      <Text style={[styles.setFontSize2,styles.setColorWhite]}>personal assistant which</Text>
      <Text style={[styles.setFontSize2,styles.setColorWhite]}>can identify Stuttering and</Text>
      <Text style={[styles.setFontSize2,styles.setColorWhite]}>assista individuals to reduce</Text>
      <Text style={[styles.setFontSize2,styles.setColorWhite]}>Stuttering. To help them cope with their lives a little</Text>
      <Text style={[styles.setFontSize2,styles.setColorWhite]}>easiar and enjoyable for them and support the </Text>
      <Text style={[styles.setFontSize2,styles.setColorWhite]}>people who are taking care</Text>
      <Text style={[styles.setFontSize2,styles.setColorWhite]}>of them.</Text>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 34,
    backgroundColor: '#270264',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setFontSize: {
    fontSize: 40,
    fontWeight : 'bold' 
  },
  setFontSize2: {
    fontSize: 20 
  },
  setColorWhite : {
    color: '#ffffff'
  },
});
