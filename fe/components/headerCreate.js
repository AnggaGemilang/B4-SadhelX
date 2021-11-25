import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeaderCreate = () => {
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.titleheader}>Create Data</Text>
            </View>
        </View >
    )
}

export default HeaderCreate

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleheader: {
        flexDirection: 'row',
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        color: 'black',
        marginLeft: 19,
        marginTop: 20
    }
})
