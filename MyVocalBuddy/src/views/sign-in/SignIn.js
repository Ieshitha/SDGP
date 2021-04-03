import React, { Component, useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import { APP_DOMAIN } from '../../util/Constants';


export default class Login extends Component {

    state = {
        password: '', email: '',
    }
    onChangeText = (e, name) => {
        console.log(e.nativeEvent)
        this.setState({ [name]: e.nativeEvent.text })
    }
    onSubmit = () => {

        let obj = {
            "email": this.state.email,
            "password": this.state.password
        }

        fetch(APP_DOMAIN + "login", {
            method: "POST",
            body: obj
        })
            .then(res => {
                console.log(res);
            }).catch(err => {
                alert(JSON.stringify(err));
                console.log('Error -', err, err.message);
            });
    }
    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Login
                </Text>
                <TextInput placeholder='Username' onChange={(e) => this.onChangeText(e, "email")} />
                <TextInput placeholder='Password' onChange={(e) => this.onChangeText(e, "password")} />
                <View style={{ margin: 7 }} />
                <Button

                    onPress={this.onSubmit}
                    title="Submit"

                />
            </ScrollView>
        )
    }
}
