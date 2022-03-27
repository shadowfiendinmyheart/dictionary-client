import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  useEffect(() => {
    console.log('app mounted');
  }, []);

  return (
    <NativeBaseProvider>
      <LoginScreen />
    </NativeBaseProvider>
  );
}
