import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';

import { useStore } from '../../../store/root.store';
import i18n, { localizationTokens } from '../../../localization';

const PasswordInput = () => {
  const { loginStore } = useStore();
  const { handlePasswordChange, errorPassword } = loginStore;

  const { PasswordLabel } = localizationTokens.LoginScreen.loginForm;
  const passwordLabelText = i18n.t(PasswordLabel);

  return (
    <FormControl isRequired isInvalid={errorPassword.length > 0}>
      <FormControl.Label _text={{ bold: true }}>{passwordLabelText}</FormControl.Label>
      <Input type="password" placeholder="*****" onChangeText={handlePasswordChange} />
      <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
        {errorPassword.length && errorPassword}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(PasswordInput);
