import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Feed from '../screens/feed';
import Profil from '../screens/profil';
import Safety from '../screens/safety';
import Search from '../screens/search';
import Toolbar from '../screens/toolbar';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 72
                }
            }}
        >
            <Tab.Screen name="Feed" component={Feed} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Image
                            source={require('../assets/icons/feedA.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                                bottom: 3,
                                tintColor: focused ? '#0C8EFF' : '#858585'
                            }}
                        />
                        <Text style={{ color: focused ? '#0C8EFF' : '#858585', fontSize: 12, fontFamily: 'Roboto-Regular' }}>Feed</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Search" component={Search} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Image
                            source={require('../assets/icons/searchA.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                                bottom: 3,
                                tintColor: focused ? '#0C8EFF' : '#858585'
                            }}
                        />
                        <Text style={{ color: focused ? '#0C8EFF' : '#858585', fontSize: 12, fontFamily: 'Roboto-Regular' }}>Search</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Toolbar" component={Toolbar} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Image
                            source={require('../assets/icons/toolbar.png')}
                            resizeMode='contain'
                            style={{
                                width: 67,
                                height: 67,
                                bottom: 7
                            }}
                        />
                    </View>
                ),
            }} />
            <Tab.Screen name="Safety" component={Safety} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Image
                            source={require('../assets/icons/safetyA.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                                bottom: 3,
                                tintColor: focused ? '#0C8EFF' : '#858585'
                            }}
                        />
                        <Text style={{ color: focused ? '#0C8EFF' : '#858585', fontSize: 12, fontFamily: 'Roboto-Regular' }}>Safety</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Profile" component={Profil} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Image
                            source={require('../assets/icons/profilA.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                                bottom: 3,
                                tintColor: focused ? '#0C8EFF' : '#858585'
                            }}
                        />
                        <Text style={{ color: focused ? '#0C8EFF' : '#858585', fontSize: 12, fontFamily: 'Roboto-Regular' }}>Profile</Text>
                    </View>
                ),
            }} />
        </Tab.Navigator>
    );
}

export default Tabs;

const styles = StyleSheet.create({})