import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CreateDocs = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Not Found</Text>
        </View>
    )
}

export default CreateDocs

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
