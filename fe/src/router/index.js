import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feed, Profil, Safety, Search, Toolbar } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigator } from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomTabNavigator {...props} />}>
            <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name=" " component={Toolbar} options={{ headerShown: false }} />
            <Tab.Screen name="Safety" component={Safety} options={{ headerShown: false }} />
            <Tab.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})