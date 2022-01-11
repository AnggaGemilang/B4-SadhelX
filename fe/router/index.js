import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Image } from 'react-native';
import Feed from '../screens/feed';
import Safety from '../screens/safety';
import Search from '../screens/search';
import Toolbar from '../screens/toolbar';
import Followers from '../screens/Followers';
import Following from '../screens/Following';
import Profile from '../screens/Profile';
import FindFriends from '../screens/FindFriends';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs({ navigation }) {
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
      }} >
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

        headerShown: false,

        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 10, backgroundColor: '#fff' }}>
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
      <Tab.Screen name="mpit_parker02" component={Profile} options={{
         headerShown: true, headerTransparent: true, tabBarIcon: ({ focused }) => (
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

function Router({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="TabNavigation"
        component={HomeTabs}
        options={{ headerShown: false, animationEnabled: false }}
      />

      <Stack.Screen
        name="Followers"
        component={Followers}
        options={{
          headerShown: true,
          animationEnabled: true,
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="Following"
        component={Following}
        options={{
          headerShown: true,
          animationEnabled: true,
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
            height: 90,
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;