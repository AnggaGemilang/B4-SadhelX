import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'


export default class Search extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.borderP}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('FindFriends')}>
                        <View
                            style={styles.pencarian}>
                            <Text style={styles.teksPencarian}>Search</Text>
                            <Image source={require('../assets/icons/sear.png')} style={styles.icon} />
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}



const styles = StyleSheet.create({
    pencarian: {
        width: 373,
        height: 50,
        borderWidth: 1,
        borderRadius: 8
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
    borderP: {
        width: 373,
        height: 50,
        top: 100,
        left: 20,
    }
})