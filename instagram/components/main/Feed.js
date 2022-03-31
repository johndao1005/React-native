import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class Feed extends Component {
    render() {
        return (
            <View >
                <Text style={styles.container}>Feed</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c4c5c4",
        color : "black",
    },
})