import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import HomeTab from './router'

const navTheme = DefaultTheme;
navTheme.colors.background = '#FFFFFF';

const App = () => {
  return (
    <NavigationContainer
      theme={navTheme}>
      <HomeTab />
    </NavigationContainer>
  );
}

export default App