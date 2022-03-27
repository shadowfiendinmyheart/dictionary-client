import React from 'react';
import { observer } from 'mobx-react';
import { VStack, Button, Icon } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';

const LoginForm = () => {
  const { loginStore } = useStore();
  const { validate } = loginStore;

  const onSubmit = () => {
    // TODO: make api request
    validate ? console.log('Submitted!') : console.log('Validation Failed');
  };

  return (
    <VStack space={4} width="90%">
      <UsernameInput />
      <PasswordInput />
      <Button
        leftIcon={<Icon as={Entypo} name="user" />}
        onPress={onSubmit}
        mt={5}
        colorScheme="cyan"
        isDisabled={!validate}
      >
        Войти
      </Button>
    </VStack>
  );
};

export default observer(LoginForm);