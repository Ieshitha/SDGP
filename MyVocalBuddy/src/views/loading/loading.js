import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
);

const Home = ({ navigation }) => (
   
    <SafeAreaView style={styles.container}>
        
        <View>
            <Text style={[styles.title1, styles.setColorLBlue]}>
                aaaaaaaaaaa
      </Text>
        </View>
        <Separator />
        <View>
            <Text style={styles.title}>

            </Text>
            <Button
                title="Continue"
                color="#396F81"
                onPress={() => (
                    navigation.navigate("Home"))}
            />
        </View>
        <Separator />
        
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#270264',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    title1: {
        textAlign: 'left',
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
    setColorLBlue: {
        color: '#1FFBEE'
    },
    setColorWhite: {
        color: '#ffffff'
    },
    setFontSize: {
        fontSize: 40,
        fontWeight: 'bold'
    },
});

export default Home;