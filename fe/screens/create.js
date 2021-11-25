import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderCreate from '../components/headerCreate'
import HeaderTabs from '../components/headerTabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateTips from '../components/createTips'
import CreateVideo from '../components/createVideo'
import CreateDocs from '../components/createDocs'
import Item from '../components/Item'

const RootStack = createNativeStackNavigator()

const Create = () => {
    return (
        <View style={styles.page}>
            <HeaderCreate />
            <HeaderTabs />
            <View style={{
                borderBottomWidth: 0.5, shadowColor: "#000", top: 10.5,
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                marginBottom: 10,
                elevation: 4
            }} />
            <RootStack.Navigator style={styles.page}>
                <RootStack.Screen name="CreateTips" component={CreateTips} options={{ headerShown: false }} />
                <RootStack.Screen name="CreateVideo" component={CreateVideo} options={{ headerShown: false }} />
                <RootStack.Screen name="CreateDocs" component={CreateDocs} options={{ headerShown: false }} />
                <RootStack.Screen name="Item" component={Item} options={{ headerShown: false }} />
            </RootStack.Navigator>
        </View>

    )
}

export default Create

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
})
