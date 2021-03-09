import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>About Us</Text>
      <Text > </Text>
      <Text >My Vocal Buddy is a </Text>
      <Text >personal assistant which</Text>
      <Text >can identify Stuttering and</Text>
      <Text >assista individuals to reduce</Text>
      <Text >Stuttering. To help them cope with their lives a little</Text>
      <Text >easiar and enjoyable for them and support the </Text>
      <Text >people who are taking care</Text>
      <Text >of them.</Text>
      <StatusBar style="auto" />

    </View>
  );
}

