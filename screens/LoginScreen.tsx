import React from 'react';
import { Center } from 'native-base';
import LoginForm from '../components/LoginForm';

const LoginScreen: React.FC = () => {
  return (
    <Center flex={1}>
      <LoginForm />
    </Center>
  );
};

export default LoginScreen;
