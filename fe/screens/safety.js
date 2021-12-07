import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Search = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Safety</Text>
            <Button
                title = "Click Here"
                onPress={() => alert('Button Clicked')}
            />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fccbbc'
    }
})
