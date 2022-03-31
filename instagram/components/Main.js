import { Text, View, Button } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


const homeIcon = <Icon name="home" size={25} color="black" />;
const cameraIcon = <Icon name="camera" size={25} color="black" />;
const userIcon = <Icon name="user-circle" size={25} color="black" />;

import Feed from './main/Feed';

import auth from '@react-native-firebase/auth';

import { fetchUser } from '../redux/actions/index';
import Add from './main/Add';
import Profile from './main/Profile';
import { Camera } from 'react-native-vision-camera';

const Tab = createMaterialBottomTabNavigator()
export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  onSignout() {
    auth().signOut().then(() => {
      console.log('User account signout!');
    })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const { currentUser } = this.props;

    console.log(this.props.currentUser)
    if (currentUser == undefined) {
      return (
        <View>
          <Text>No user</Text>
          <Button
            onPress={() => this.onSignout()}
            title="Sign out" />
        </View>

      )
    }
    return (
      <Tab.Navigator initialRouteName="Feed"

                labeled={false}
                tabBarOptions={{
                    showIcon: true, showLabel: false, indicatorStyle: {
                        opacity: 0
                    }
                }}
                barStyle={{ backgroundColor: '#ffffff' }}>
                <Tab.Screen key={Date.now()} name="Feed" component={Feed}
                    options={{
                        tabBarIcon: () => (
                          homeIcon
                        ),
                    }} />
                <Tab.Screen key={Date.now()} name="Camera" component={Add} 
                    options={{
                        tabBarIcon: () => (
                            cameraIcon   ),
                    }} />
              
                <Tab.Screen name="Profile" component={Profile} 
                    // listeners={({ navigation }) => ({
                    //     tabPress: event => {
                    //         event.preventDefault();
                    //         navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
                    //     }
                    // })}
                    options={{
                        tabBarIcon: () => (
                          userIcon
                        ),
                    }} />
            </Tab.Navigator>
    )
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);