import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

export default class Search extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FindFriends')}>
                    <View
                        style={styles.pencarian}>
                        <Text style={styles.teksPencarian}>Search</Text>
                        <Image source={require('../assets/icons/sear.png')} style={styles.icon} />
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    pencarian: {
        marginVertical: 100,
        marginHorizontal: 20,
        width: 373,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderColor: '#000',
        borderWidth: 1,
    },
    teksPencarian: {
        position: 'absolute',
        marginVertical: 14,
        marginHorizontal: 10,
    },
    icon: {
        position: 'absolute',
        left: 333,
        top: 15,
    },
})