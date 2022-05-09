import React from 'react';
import { Center, Heading, Button } from 'native-base';
import { useStore } from '../store/root.store';

const MainScreen: React.FC = () => {
  const { userStore } = useStore();
  const { logout } = userStore;

  const onClick = async () => {
    await logout();
  };

  return (
    <Center flex={1}>
      <Heading>MainScreen</Heading>
      <Button onPress={onClick} mt={5} colorScheme="cyan">
        {'Logout'}
      </Button>
    </Center>
  );
};

export default MainScreen;
