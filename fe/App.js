import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router';
import Profile from './screens/Profile';
import HomeTab from './router'

const App = () => {
  return (
    <NavigationContainer>
      <HomeTab />
    </NavigationContainer>
  );
}
export default App
