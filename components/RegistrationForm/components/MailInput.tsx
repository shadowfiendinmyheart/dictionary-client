import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';

import { useStore } from '../../../store/root.store';

const MailInput = () => {
  const { authStore } = useStore();
  const { handleMailChange, errorMail } = authStore;

  return (
    <FormControl isRequired isInvalid={errorMail.length > 0}>
      <FormControl.Label _text={{ bold: true }}>Почта</FormControl.Label>
      <Input
        type="email"
        placeholder="garfield@cat.com"
        onChangeText={handleMailChange}
      />
      <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
        {errorMail.length && errorMail}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(MailInput);
