import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        }
        this.onSignup = this.onSignup.bind(this)
    
    }
    onSignup() {
        const { email, password, name } = this.state;
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                firestore().collection('user').doc(auth().currentUser.uid).set({
                    email,
                    name
                })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
            
    
        // save in firestore
        // firestore().collection('user').doc(auth().currentUser.uid).set({
        //     email,
        //     name
        // }).then(()=>{
        //     console.log("save in Firestore")
        // }).catch(error=>{
        //     console.log(error)
        // })
    }
    
    render() {
        return (
            <View>
                <TextInput
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })} />
                <TextInput
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })} />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })} />
                {/* <TextInput
                    placeholder="ConfirmPassword"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => this.setState(confirmPassword)} /> */}
                <Button
                    onPress={() => this.onSignup()}
                    title="Signup" />
            </View>
        )
    }
}