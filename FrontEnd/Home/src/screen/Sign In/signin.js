import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';


const submit = () => {
    setError(null);
    setLoading(true);

    this.Password = Password.value;
    this.ConfirmPassword = ConfirmPassword.value;

    if(Password===ConfirmPassword){

        fetch('http://127.0.0.1:5000/login', {
         method: 'POST',
        headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json'
    },
        body: JSON.stringify({
        Email: 'Some Name',
        Password: '123'
    })
  });
    }

}



export default class Login extends Component {

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput placeholder='Username' />
                <TextInput placeholder='Password' />
                <View style={{margin:7}} />
                <Button 

                          onPress={this.props.submit}
                          title="Submit"
                      />
                  </ScrollView>
            )
    }
}