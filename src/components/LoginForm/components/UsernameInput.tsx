import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';

import { useStore } from '../../../store/root.store';
import i18n, { localizationTokens } from '../../../localization';

const UsernameInput = () => {
  const { loginStore } = useStore();
  const { handleUsernameChange, errorUsername } = loginStore;

  const { UsernameLabel, UsernamePlaceholder } = localizationTokens.LoginScreen.loginForm;
  const usernameLabelText = i18n.t(UsernameLabel);
  const usernamePlaceholderText = i18n.t(UsernamePlaceholder);

  return (
    <FormControl isRequired isInvalid={errorUsername.length > 0}>
      <FormControl.Label _text={{ bold: true }}>{usernameLabelText}</FormControl.Label>
      <Input placeholder={usernamePlaceholderText} onChangeText={handleUsernameChange} />
      <FormControl.ErrorMessage color={'warning.400'} _text={{ fontSize: 'xs' }}>
        {errorUsername.length > 0 && errorUsername}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(UsernameInput);
