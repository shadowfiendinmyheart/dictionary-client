import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';

import { useStore } from '../../../store/root.store';

const PasswordInputs = () => {
  const { authStore } = useStore();
  const {
    handlePasswordChange,
    handleRepeatPasswordChange,
    errorPassword,
    errorRepeatPassword,
  } = authStore;

  return (
    <FormControl
      isRequired
      isInvalid={errorPassword.length > 0 || errorRepeatPassword.length > 0}
    >
      <FormControl.Label _text={{ bold: true }}>Пароль</FormControl.Label>
      <Input type="password" placeholder="*****" onChangeText={handlePasswordChange} />
      <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
        {errorPassword.length && errorPassword}
      </FormControl.ErrorMessage>

      <FormControl.Label mt={2} _text={{ bold: true }}>
        Повторите пароль
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
