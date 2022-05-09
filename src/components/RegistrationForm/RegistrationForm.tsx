import React from 'react';
import { observer } from 'mobx-react';
import { VStack, Button, Icon } from 'native-base';
import { Entypo } from '@native-base/icons';

import UsernameInput from './components/UsernameInput';
import MailInput from './components/MailInput';
import PasswordInputs from './components/PasswordInputs';
import { useStore } from '../../store/root.store';
import i18n, { localizationTokens } from '../../localization';

const RegistrationForm = () => {
  const { authStore } = useStore();
  const { validate, handleSubmit } = authStore;

  const onSubmit = async () => {
    validate ? await handleSubmit() : console.log('Validation Failed');
  };

  const { RegistrationButton } = localizationTokens.RegistrationScreen.registrationForm;
  const registrationButtonText = i18n.t(RegistrationButton);

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
        {registrationButtonText}
      </Button>
    </VStack>
  );
};

export default observer(RegistrationForm);
