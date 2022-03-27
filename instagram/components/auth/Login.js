import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import {auth} from '../../firebase.config'
import {
    createUserWithEmailAndPassword,
} from 'firebase/auth'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '', 
        }
        this.onSignup = this.onSignup.bind(this)
    }
    onSignup(){
        const {email, password} = this.state;
        createUserWithEmailAndPassword(auth, email, password)
        .then((result)=>{
            db.collection('users').doc(auth.currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder="Name"
                    onChangeText={(name) => this.setState({name})} />
                <TextInput
                    placeholder="Email"
                    onChangeText={(email) => this.setState({email})} />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})} />
                {/* <TextInput
                    placeholder="ConfirmPassword"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => this.setState(confirmPassword)} /> */}
                    <Button
                    onPress={() => this.onSignup()}
                    title="Sign in"/>
            </View>
        )
    }
}