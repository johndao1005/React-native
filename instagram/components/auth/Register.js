import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import {auth,db} from '../../firebase.config'
import {
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"; 
export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        }
        this.onSignup = this.onSignup.bind(this)
    }
    onSignup(){
        const {email, password, name} = this.state;
        const res = createUserWithEmailAndPassword(auth, email, password)
        .then(()=>{
            setDoc(doc(db, "users", auth.currentUser.uid), {
                displayName: name,
                email: email
            })
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
                    title="Signup"/>
            </View>
        )
    }
}