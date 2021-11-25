import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Edit = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Not Found</Text>
        </View>
    )
}

export default Edit

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 90
    },
    text: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold'
    }
})