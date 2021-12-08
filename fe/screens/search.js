import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class Search extends Component{
    render(){
        return(
            <View
            style={styles.container}
            >
            <Text>PENCET PLOK</Text>
            <TouchableOpacity
            style={styles.border}
            onPress={() => this.props.navigation.navigate('FindFriends')}
            >
                <Text>PENCET BROOOO</Text>
            </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fccbbc'
    },
    border: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ff1694',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ff1694',
        position: 'relative',
        borderRadius: 10
  }
})