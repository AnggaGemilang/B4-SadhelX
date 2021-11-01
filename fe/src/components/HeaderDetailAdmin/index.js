import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconArrowLeft } from '../../assets'
import { useNavigation } from '@react-navigation/native';

const HeaderDetailAdmin = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.titleheader}>Detail Admin</Text>
            </View>
            <TouchableOpacity style={styles.arrowleft}>
                <IconArrowLeft onPress={() => navigation.navigate('ListTips')} />
            </TouchableOpacity>
        </View >
    )
}

export default HeaderDetailAdmin

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleheader: {
        flexDirection: 'row',
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 40,
        paddingTop: 30,
    },
    arrowleft: {
        paddingHorizontal: 50,
        paddingTop: 34,
    },
})