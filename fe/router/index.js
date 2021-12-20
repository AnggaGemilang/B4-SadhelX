import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Feed from '../screens/feed';
import Safety from '../screens/safety';
import Search from '../screens/search';
import Toolbar from '../screens/toolbar';
import Followers from '../screens/Followers';
import Following from '../screens/Following';
import Profile from '../screens/Profile';
import FindFriends from '../screens/FindFriends';
import {
  HeaderSearchBar,
  HeaderClassicSearchBar
} from "react-native-header-search-bar";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs ({ navigation }) {
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
            <Tab.Screen name="Profile" component={Profile} options={{
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

function Router ({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      {/* <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomeAuth"
        component={WelcomeAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      /> */}
      
      {/* <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="CheckEmailToken"
        component={CheckEmailToken}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckEmailForgot"
        component={CheckEmailForgot}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessCreatePassword"
        component={SuccessCreatePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="TabNavigation"
        component={HomeTabs}
        options={{headerShown: false, animationEnabled: false}}
      />
       {/* <Stack.Screen
        name="Following"
        component={Safety}
        options={{headerShown: false, animationEnabled: false}}
      /> */}
        <Stack.Screen
        name="Followers"
        component={Followers}
        options={{
          headerShown: true, 
          animationEnabled: false,
          headerTransparent: true,
        }}
         />

        <Stack.Screen
        name="Following"
        component={Following}
        options={{
          headerShown: true, 
          animationEnabled: false,
          headerTransparent: true,
        }}
         />
        <Stack.Screen
        name="FindFriends"
        component={FindFriends}
        options={{
          title: false,
          headerShown: true, 
          animationEnabled: true,
          headerTransparent: true,
          headerStyle: {
            height:90,
          }
        }}
        
         />
    </Stack.Navigator>
  );
};

export default Router;



const styles = StyleSheet.create({

    
})