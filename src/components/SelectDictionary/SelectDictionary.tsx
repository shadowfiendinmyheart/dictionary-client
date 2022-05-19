import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { CheckIcon, Select, Text } from 'native-base';
import { Dictionary } from '../../store/types';
import i18n, { localizationTokens } from '../../localization';

type Props = {
  dictionaries: Dictionary[];
  onSelectDictionary: (dictionaryName: string) => void;
};

const SelectDictionary: React.FC<Props> = ({ dictionaries, onSelectDictionary }) => {
  const [selectedDictionary, setSelectedDictionary] = useState<string>('');

  const handleSelectDictionary = (value: string) => {
    setSelectedDictionary(value);
    onSelectDictionary(value);
  };

  if (dictionaries.length === 0) {
    return <Text>К сожалению у вас нет подходящих словарей...</Text>;
  }
  const { DictionaryPlaceholder } = localizationTokens.CardScreen.associationModal;
  const dictionaryPlaceholderText = i18n.t(DictionaryPlaceholder);

  return (
    <Select
      selectedValue={selectedDictionary}
      accessibilityLabel={dictionaryPlaceholderText}
      placeholder={dictionaryPlaceholderText}
      _selectedItem={{
        bg: 'cyan.500',
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      onValueChange={handleSelectDictionary}
    >
      {dictionaries.map((dictionary) => {
        return (
          <Select.Item
            label={dictionary.name}
            value={dictionary.name}
            key={dictionary.name}
          />
        );
      })}
    </Select>
  );
};

export default observer(SelectDictionary);
