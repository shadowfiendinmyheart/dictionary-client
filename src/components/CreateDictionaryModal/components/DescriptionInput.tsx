import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, WarningOutlineIcon, TextArea } from 'native-base';
import { useStore } from '../../../store/root.store';
import i18n, { localizationTokens } from '../../../localization';

const { DescriptionLabel, DescriptionPlaceholder } =
  localizationTokens.PersonalDictionariesScreen.createDictionaryModal;
const descriptionLabelText = i18n.t(DescriptionLabel);
const descriptionPlaceholderText = i18n.t(DescriptionPlaceholder);

const DescriptionInput: React.FC = () => {
  const { createDictionaryStore } = useStore();
  const { errorDescription, handleDescriptionChange } = createDictionaryStore;

  return (
    <FormControl isRequired isInvalid={errorDescription.length > 0} maxW="300px">
      <FormControl.Label _text={{ bold: true }}>{descriptionLabelText}</FormControl.Label>
      <TextArea
        placeholder={descriptionPlaceholderText}
        onChangeText={handleDescriptionChange}
      />
      <FormControl.ErrorMessage
        color={'warning.400'}
        _text={{ fontSize: 'xs' }}
        leftIcon={<WarningOutlineIcon size="xs" />}
      >
        {errorDescription.length > 0 && errorDescription}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default observer(DescriptionInput);
