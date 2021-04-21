import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image } from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
);
const [type, setType] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = () => {
    
    setLoading(true);
    let obj = {type: type};
    console.log(obj);
    navigation.navigate("Home")
    fetch(APP_DOMAIN + "Loading", {
        method: "GET",
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
            "type":obj.type,
        })
    })
        .then(res => {
            console.log(res);
        }).catch(err => {
            alert(JSON.stringify(err));
            console.log('Error -', err, err.message);
        });
    }

const Loading = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
        
        <View>
        <Image
  source={require('../../assets/logo.jpeg')}
    style={styles.image} />
            <Text style={[styles.title1, styles.setColorLBlue]}>
                {/* Type :{[this.state.data.approvedTime]} */}
                
      </Text>
        </View>
        <Separator />
        <View>
            <Text style={[styles.title1, styles.setColorWhite, styles.setFontSize]}>
                Stutter Type :
            </Text>
            <Button
                title="Continue"
                color="#396F81"
                onPress={handleSubmit}
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
    image: {
        marginBottom: 80,
        marginLeft:80,
         width: 200,
        height: 200, 
        borderRadius: 100,
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
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default Loading;