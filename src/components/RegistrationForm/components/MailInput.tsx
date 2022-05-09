import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, Input } from 'native-base';

import { useStore } from '../../../store/root.store';
import i18n, { localizationTokens } from '../../../localization';

const MailInput = () => {
  const { registrationStore } = useStore();
  const { handleMailChange, errorMail } = registrationStore;

  const { MailLabel, MailPlaceholder } =
    localizationTokens.RegistrationScreen.registrationForm;
  const mailLabelText = i18n.t(MailLabel);
  const mailPlaceholderText = i18n.t(MailPlaceholder);

  return (
    <FormControl isRequired isInvalid={errorMail.length > 0}>
      <FormControl.Label _text={{ bold: true }}>{mailLabelText}</FormControl.Label>
      <Input
        type="email"
        placeholder={mailPlaceholderText}
        onChangeText={handleMailChange}
      />
      <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
        {errorMail.length && errorMail}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(MailInput);
