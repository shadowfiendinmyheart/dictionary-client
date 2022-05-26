import React from 'react';
import { observer } from 'mobx-react';
import { FormControl, WarningOutlineIcon, TextArea } from 'native-base';
import { useStore } from '../../../store/root.store';

const DescriptionInput: React.FC = () => {
  const { createDictionaryStore } = useStore();
  const { errorDescription, handleDescriptionChange } = createDictionaryStore;

  return (
    <FormControl isRequired isInvalid={errorDescription.length > 0} maxW="300px">
      <FormControl.Label _text={{ bold: true }}>
        Введите описание словаря
      </FormControl.Label>
      <TextArea placeholder="Описание словаря" onChangeText={handleDescriptionChange} />
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
