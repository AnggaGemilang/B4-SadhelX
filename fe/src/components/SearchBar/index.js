import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { IconAdd } from '../../assets';

const SearchBar = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ position: 'relative', flex: 1, marginLeft: 20, marginRight: 70, marginVertical: 10 }}>
                    <TextInput placeholder="Search Now" style={{ borderWidth: 1, borderColor: '#EEEBEB', borderRadius: 25, fontSize: 18, fontFamily: 'Poppins-ExtraLight', paddingLeft: 60, paddingRight: 20, marginTop: 25, backgroundColor: '#EEEBEB' }} />
                    <Image source={require('../../assets/icons/SearchApng.png')} style={{ position: 'absolute', top: 38, left: 20 }} />
                </View>
                <TouchableOpacity style={{ width: 35, alignItems: 'center', justifyContent: 'center', top: 10, right: 35 }}>
                    <IconAdd onPress={() => navigation.navigate('Create')} />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default SearchBar

const styles = StyleSheet.create({})