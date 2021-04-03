import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
);

const Home = ({ navigation }) => (
   
    <SafeAreaView style={styles.container}>
        <View>
            <Text style={[styles.title1, styles.setColorWhite, styles.setFontSize]}>
                MY VOCAL
      </Text>
        </View>
        <View>
            <Text style={[styles.title1, styles.setColorWhite, styles.setFontSize]}>
                BUDDY
      </Text>
        </View>
        <View>
            <Text style={[styles.title1, styles.setColorLBlue]}>
                To witness your dream
      </Text>
        </View>
        <Separator />
        <View>
            <Text style={styles.title}>

            </Text>
            <Button
                title="Identify Stuttering"
                color="#396F81"
                onPress={() => Alert.alert('Button with adjusted color pressed')}
            />
        </View>
        <Separator />
        <View>
            <Button
                title="Monitor Patients Current Progress"
                color="#3E999E"
                onPress={(e) => Alert.alert('Cannot press this one')}
            />
        </View>
        <Separator />
        <View>
            <Button
                title="Patients Personal Details"
                color="#54BD8A"
                onPress={() => Alert.alert('Cannot press this one')}
            />
        </View>
        <Separator />
        <View>
            <Button
                title="Tutorials"
                color="#32CDA8"
                onPress={() => Alert.alert('Cannot press this one')}
            />
        </View>
        <Separator />
        <View>
            <Button
                title="About Us"
                color="#28C9BF"
                onPress={() => (
                    navigation.navigate("About"))}
            />
        </View>
        <Separator />
        <View>
            <Button
                title="Log out"
                color="#33DCD2"
                onPress={(e) => Alert.alert('Cannot press this one')}
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