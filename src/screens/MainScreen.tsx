import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { Button, Center, Heading } from 'native-base';
import ROUTES from '../constants/routes';

type Props = {
  navigation: NavigationStackProp;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate(ROUTES.LOGIN_SCREEN);
  };

  return (
    <Center flex={1}>
      <Heading>MainScreen</Heading>
      <Button onPress={handleButtonPress}>Go to registration screen</Button>
    </Center>
  );
};

export default MainScreen;
