import React from 'react'
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ position: 'relative', flex: 1, marginLeft: 20, marginRight: 50, marginVertical: 10 }}>
                    <TextInput placeholder="Search Now" style={{ borderWidth: 1, borderColor: '#EEEBEB', borderRadius: 8, fontSize: 18, fontFamily: 'Poppins-ExtraLight', paddingLeft: 60, paddingRight: 20, backgroundColor: '#EEEBEB' }} />
                    <Image source={require('../assets/icons/searchbar.png')} style={{ position: 'absolute', top: 13, left: 20 }} />
                </View>
                <TouchableOpacity style={{ width: 35, alignItems: 'center', justifyContent: 'center', top: -1, right: 25 }} onPress={() => navigation.navigate('Create')}>
                    <Image source={require('../assets/icons/add.png')} />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default SearchBar

const styles = StyleSheet.create({})