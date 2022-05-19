import React from 'react';
import { observer } from 'mobx-react';
import { VStack, Button, Icon } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import i18n, { localizationTokens } from '../../localization';

const LoginForm = () => {
  const { loginStore } = useStore();
  const { validate, handleLoginSubmit } = loginStore;

  const { AuthButton } = localizationTokens.LoginScreen.loginForm;
  const authText = i18n.t(AuthButton);

  const handlePress = async () => {
    await handleLoginSubmit();
  };

  return (
    <VStack space={4} width="90%">
      <UsernameInput />
      <PasswordInput />
      <Button
        leftIcon={<Icon as={Entypo} name="user" />}
        onPress={handlePress}
        mt={5}
        colorScheme="cyan"
        isDisabled={!validate}
      >
        {authText}
      </Button>
    </VStack>
  );
};

export default observer(LoginForm);
