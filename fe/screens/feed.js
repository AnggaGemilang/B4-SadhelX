import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const feed = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Feed Screen</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked')}
            />
        </View>
    )
}

export default feed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fccbbc'
    }
})
