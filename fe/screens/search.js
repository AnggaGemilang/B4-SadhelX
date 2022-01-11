import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuggestnAccept from './SuggestnAccept';

const Tab = createNativeStackNavigator();

const Search = () => {

    return (
        <Tab.Navigator
            style={{
                flex: 1
            }} >
            <Tab.Screen
                name="Friends"
                component={SuggestnAccept}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}

export default Search;