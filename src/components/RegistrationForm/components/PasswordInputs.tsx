import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';

import { useStore } from '../../../store/root.store';
import i18n, { localizationTokens } from '../../../localization';

const PasswordInputs = () => {
  const { authStore } = useStore();
  const {
    handlePasswordChange,
    handleRepeatPasswordChange,
    errorPassword,
    errorRepeatPassword,
  } = authStore;

  const { PasswordLabel, RepeatPasswordLabel } =
    localizationTokens.RegistrationScreen.registrationForm;
  const passwordLabelText = i18n.t(PasswordLabel);
  const repeatPasswordLabelText = i18n.t(RepeatPasswordLabel);

  return (
    <FormControl
      isRequired
      isInvalid={errorPassword.length > 0 || errorRepeatPassword.length > 0}
    >
      <FormControl.Label _text={{ bold: true }}>{passwordLabelText}</FormControl.Label>
      <Input type="password" placeholder="*****" onChangeText={handlePasswordChange} />
      <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
        {errorPassword.length && errorPassword}
      </FormControl.ErrorMessage>

      <FormControl.Label mt={2} _text={{ bold: true }}>
        {repeatPasswordLabelText}
      </FormControl.Label>
      <Input
        type="password"
        placeholder="*****"
        onChangeText={handleRepeatPasswordChange}
      />
      <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
        {errorRepeatPassword.length && errorRepeatPassword}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(PasswordInputs);
