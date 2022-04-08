import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';

import { useStore } from '../../../store/root.store';

const UsernameInput = () => {
  const { loginStore } = useStore();
  const { handleUsernameChange, errorUsername } = loginStore;

  return (
    <FormControl isRequired isInvalid={errorUsername.length > 0}>
      <FormControl.Label _text={{ bold: true }}>Псевдоним</FormControl.Label>
      <Input placeholder="Введите ваш псевдоним" onChangeText={handleUsernameChange} />
      <FormControl.ErrorMessage color={'warning.400'} _text={{ fontSize: 'xs' }}>
        {errorUsername.length > 0 && errorUsername}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(UsernameInput);
