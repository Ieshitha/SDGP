import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

const App = () => (
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
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Tutorial 2"
        color="#3E999E"
        onPress={() => Alert.alert('Cannot press this one')}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Tutorial 3"
        color="#32CDA8"
        onPress={() => Alert.alert('Cannot press this one')}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Tutorial 4"
        color="#33DCD2"
        onPress={() => Alert.alert('Cannot press this one')}
      />
    </View>
    <Separator />
    <View>
      <Button
        title="Tutorial 5"
        color="#19EEE1"
        onPress={() => Alert.alert('Cannot press this one')}
      />
    </View>
    <Separator />
    
  </SafeAreaView>
);



export default App;