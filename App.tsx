import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import Router from './src/components/Router';

export default function App() {
  useEffect(() => {
    console.log('app mounted');
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
