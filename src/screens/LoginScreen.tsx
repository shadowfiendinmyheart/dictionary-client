import React from 'react';
import { Button, Center } from 'native-base';
import { NavigationStackProp } from 'react-navigation-stack';

import LoginForm from '../components/LoginForm';
import ROUTES from '../constants/routes';
import i18n, { localizationTokens } from '../localization';

type Props = {
  navigation: NavigationStackProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { RegistrationButton } = localizationTokens.LoginScreen.index;
  const registrationButtonText = i18n.t(RegistrationButton);

  const handleButtonPress = () => {
    navigation.navigate(ROUTES.REGISTRATION_SCREEN);
  };

  return (
    <Center flex={1}>
      <LoginForm />
      <Button mt={5} onPress={handleButtonPress} width="90%">
        {registrationButtonText}
      </Button>
    </Center>
  );
};

export default LoginScreen;
