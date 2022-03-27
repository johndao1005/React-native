import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './components/auth/Landing';
import {Register} from './components/auth/Register';
import {  onAuthStateChanged } from "firebase/auth"
import {auth} from './firebase.config'
const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }
  componentDidMount() {
    //ANCHOR call when component is mounted part of react lifecycle

    const unsub = onAuthStateChanged(auth,user=>{
      console.log(user);
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
      unsub()
    })
  }
  
  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    // if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name='Landing' component={LandingScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Register' component={Register}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    // }
    // return (
    //   <View>
    //     <Text>User is logged in</Text>
    //   </View>
    //)
  
  }
}


export default App;