import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Create from '../create'
import Edit from '../edit'
import Detail from '../detail'
import ListTips from '../listtips'

const RootStack = createNativeStackNavigator()

const Safety = () => {
    return (
        <RootStack.Navigator style={styles.page}>
            <RootStack.Screen name="ListTips" component={ListTips} options={{ headerShown: false }} />
            <RootStack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
            <RootStack.Screen name="Create" component={Create} options={{ headerShown: false }} />
            <RootStack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
        </RootStack.Navigator>
    )
}

export default Safety

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
})