import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import tuteOne from '../tuteOne/tuteOne';

const Separator = () => (
  <View style={styles.separator} />
);

const Tutorials = ({navigation}) => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={[styles.title1,styles.setColorB,styles.setFontSize]}>
      MY VOCAL
      </Text>    
    </View>
    <View>
      <Text style={[styles.title1,styles.setColorB,styles.setFontSize]}>
      BUDDY
      </Text>    
    </View>
    <View>
      <Text style={[styles.title1,styles.setColorLBlue]}>
      To witness your dream
      </Text> 
    </View>
    <Separator />
    <View>
      <Text style={styles.title}>
        
      </Text>
      <Button
        title="Tutorial 1"
        color="#396F81"
        onPress={() => (
          navigation.navigate("TuteOne"))}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Tutorial 2"
        color="#3E999E"
        onPress={() => (
          navigation.navigate("TuteTwo"))}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Tutorial 3"
        color="#32CDA8"
        onPress={() => (
          navigation.navigate("TuteThree"))}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Tutorial 4"
        color="#33DCD2"
        onPress={() => (
          navigation.navigate("TuteFour"))}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Tutorial 5"
        color="#19EEE1"
        onPress={() => ( navigation.navigate("TuteFive"))}
      />
    </View>
    <Separator />
    
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  setColorLBlue : {
    color: '#4668E0'
  },
  setColorB : {
    color: '#3857C6'
  },
  setFontSize: {
    fontSize: 40,
    fontWeight : 'bold' 
  },
  title1: {
    textAlign: 'left',
    marginVertical: 8,
  },
});

export default Tutorials;
