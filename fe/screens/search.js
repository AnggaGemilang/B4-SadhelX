import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HeaderNavigation from './HeaderNavigator';
import SuggestnAccept from './SuggestnAccept';

const Tab = createNativeStackNavigator();

const Search = () => {

    return (
        <Tab.Navigator
            style={{
                flex: 1
            }}

        >
            <Tab.Screen
                name="Friends"
                component={SuggestnAccept}
                options={{ headerShown: false }}
            />


        </Tab.Navigator>
    );
}

export default Search;