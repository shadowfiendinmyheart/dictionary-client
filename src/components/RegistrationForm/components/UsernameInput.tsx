import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';
import { usernameHelperText } from '../utils';

import { useStore } from '../../../store/root.store';
import i18n, { localizationTokens } from '../../../localization';

const UsernameInput = () => {
  const { authStore } = useStore();
  const { handleUsernameChange, errorUsername } = authStore;

  const { UsernameLabel, UsernamePlaceholder } =
    localizationTokens.RegistrationScreen.registrationForm;
  const usernameLabelText = i18n.t(UsernameLabel);
  const usernamePlaceholderText = i18n.t(UsernamePlaceholder);

  return (
    <FormControl isRequired isInvalid={errorUsername.length > 0}>
      <FormControl.Label _text={{ bold: true }}>{usernameLabelText}</FormControl.Label>
      <Input placeholder={usernamePlaceholderText} onChangeText={handleUsernameChange} />
      <FormControl.HelperText _text={{ fontSize: 'xs' }}>
        {usernameHelperText}
      </FormControl.HelperText>
      <FormControl.ErrorMessage color={'warning.400'} _text={{ fontSize: 'xs' }}>
        {errorUsername.length > 0 && errorUsername}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(UsernameInput);
