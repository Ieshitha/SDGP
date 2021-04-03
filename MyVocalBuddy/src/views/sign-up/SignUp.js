// SignUp.js
import React from 'react'
import {
    View,
    Button,
    TextInput,
    StyleSheet
} from 'react-native'

export default class SignUp extends React.Component {
    state = {
        username: '', password: '', email: '', phone_number: ''
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    signUp = async () => {
        const { username, password, email, phone_number } = this.state
        try {
            // here place your signup logic
            console.log('user successfully signed up!: ', success)
        } catch (err) {
            console.log('error signing up: ', err)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Full Name:'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Age:'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('age', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Gender:'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('gender', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('email', val)}
                />
                <Button
                    title='Sign Up'
                    onPress={this.signUp}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: '#2F9589',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})