import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Toolbar = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Toolbar Screen</Text>
            <Button
                title = "Click Here"
                onPress={() => alert('Button Clicked')}
            />
        </View>
    )
}

export default Toolbar

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fccbbc'
    }
})