import React from 'react';
import { Center, Heading } from 'native-base';

const LoadingScreen: React.FC = () => {
  return (
    <Center flex={1}>
      <Heading>App is loading...</Heading>
    </Center>
  );
};

export default LoadingScreen;
