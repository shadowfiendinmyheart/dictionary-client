import React from 'react';
import { observer } from 'mobx-react';
import { Input, FormControl, WarningOutlineIcon } from 'native-base';
import { useStore } from '../../../store/root.store';

const NameInput: React.FC = () => {
  const { createDictionaryStore } = useStore();
  const { errorName, handleNameChange } = createDictionaryStore;

  return (
    <FormControl isRequired isInvalid={errorName.length > 0} maxW="300px">
      <FormControl.Label _text={{ bold: true }}>
        Введите название словаря
      </FormControl.Label>
      <Input placeholder="Название словаря" onChangeText={handleNameChange} />
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
