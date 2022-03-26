import React from 'react';
import { observer } from 'mobx-react';
import { VStack, Button, Icon } from 'native-base';
import { Entypo } from '@native-base/icons';
import UsernameInput from './components/UsernameInput';
import MailInput from './components/MailInput';
import PasswordInputs from './components/PasswordInputs';
import { useStore } from '../../store/root.store';

const RegistrationForm = () => {
  const { authStore } = useStore();
  const { validate } = authStore;

  const onSubmit = () => {
    // TODO: make api request
    validate ? console.log('Submitted!') : console.log('Validation Failed');
  };

  return (
    <VStack space={4} width="90%">
      <UsernameInput />
      <MailInput />
      <PasswordInputs />
      <Button
        leftIcon={<Icon as={Entypo} name="add-user" />}
        onPress={onSubmit}
        mt={5}
        colorScheme="cyan"
        isDisabled={!validate}
      >
        Зарегистрироваться
      </Button>
    </VStack>
  );
};

export default observer(RegistrationForm);
