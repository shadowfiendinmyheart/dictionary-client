import React from 'react';
import { observer } from 'mobx-react';
import { Input, FormControl, WarningOutlineIcon } from 'native-base';
import { useStore } from '../../../store/root.store';
import i18n, { localizationTokens } from '../../../localization';

const { NameLabel, NamePlaceholder } =
  localizationTokens.PersonalDictionariesScreen.createDictionaryModal;
const nameLabelText = i18n.t(NameLabel);
const namePlaceholderText = i18n.t(NamePlaceholder);

const NameInput: React.FC = () => {
  const { createDictionaryStore } = useStore();
  const { errorName, handleNameChange } = createDictionaryStore;

  return (
    <FormControl isRequired isInvalid={errorName.length > 0} maxW="300px">
      <FormControl.Label _text={{ bold: true }}>{nameLabelText}</FormControl.Label>
      <Input placeholder={namePlaceholderText} onChangeText={handleNameChange} />
      <FormControl.ErrorMessage
        color={'warning.400'}
        _text={{ fontSize: 'xs' }}
        leftIcon={<WarningOutlineIcon size="xs" />}
      >
        {errorName.length > 0 && errorName}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(NameInput);
