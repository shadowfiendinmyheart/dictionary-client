import React from 'react';
import { Center, Heading, Button } from 'native-base';
import { useStore } from '../store/root.store';

const CardScreen: React.FC = () => {
  const { userStore } = useStore();
  const { username, logout } = userStore;

  return (
    <Center flex={1}>
      <Heading textAlign={'center'}>card screen</Heading>
      {/* <Button width="80%" mt={12} colorScheme="cyan">
        {addCardButtonText}
      </Button> */}
    </Center>
  );
};

export default CardScreen;
