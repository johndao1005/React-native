import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './components/auth/Landing';
import {Register} from './components/auth/Register';

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
  
  }
}


export default App;