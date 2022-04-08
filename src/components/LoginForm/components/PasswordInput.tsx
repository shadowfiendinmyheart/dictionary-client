import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';

import { useStore } from '../../../store/root.store';

const PasswordInput = () => {
  const { loginStore } = useStore();
  const { handlePasswordChange, errorPassword } = loginStore;

  return (
    <FormControl isRequired isInvalid={errorPassword.length > 0}>
      <FormControl.Label _text={{ bold: true }}>Пароль</FormControl.Label>
      <Input type="password" placeholder="*****" onChangeText={handlePasswordChange} />
      <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
        {errorPassword.length && errorPassword}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(PasswordInput);
