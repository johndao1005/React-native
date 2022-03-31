import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {  backgroundColor: "#c4c5c4",
},
})