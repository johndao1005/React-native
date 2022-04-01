import React, { Component } from 'react';
import { View, Platform,Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import LandingScreen from './components/auth/Landing';
import Register from './components/auth/Register';
import Main from './components/Main';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

//fix font awesome not imported in ios
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont('FontAwesome');

//Start the app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
    }
  }

  componentDidMount() {
    //ANCHOR call when component is mounted part of react lifecycle
    auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })

  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>

          <NavigationContainer>
            <Stack.Navigator initialRouteName='Main'>
              <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
      </Provider>
      )
  }
}

StyleSheet.create({
  iosSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0
  }
});

export default App;