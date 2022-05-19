import React from 'react';
import { observer } from 'mobx-react';
import { Icon, HStack, Select, CheckIcon, IconButton } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import { Language } from '../../api/card/types';

const selectItmes = [
  {
    label: 'Russian',
    value: Language.Russian,
  },
  {
    label: 'English',
    value: Language.English,
  },
  {
    label: 'Chinese',
    value: Language.Chinese,
  },
  {
    label: 'German',
    value: Language.German,
  },
  {
    label: 'Spanish',
    value: Language.Spanish,
  },
  {
    label: 'French',
    value: Language.French,
  },
  {
    label: 'Japanese',
    value: Language.Japanese,
  },
];

const LanguagesSelector = () => {
  const { cardStore } = useStore();
  const { fromLanguage, setFromLanguage, toLanguage, setToLanguage, handleShufflePress } =
    cardStore;

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} w="90%">
      <Select
        selectedValue={fromLanguage}
        minWidth="25%"
        accessibilityLabel="From"
        placeholder="From"
        _selectedItem={{
          bg: 'cyan.500',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => setFromLanguage(itemValue as Language)}
      >
        {selectItmes
          .filter((item) => item.value !== toLanguage)
          .map((item) => {
            return <Select.Item label={item.label} value={item.value} key={item.value} />;
          })}
      </Select>
      <IconButton
        mt={2}
        size="5"
        icon={<Icon as={Entypo} name="shuffle" size="5" color="trueGray.400" />}
        onPress={() => handleShufflePress()}
      />
      <Select
        selectedValue={toLanguage}
        minWidth="25%"
        accessibilityLabel="To"
        placeholder="To"
        _selectedItem={{
          bg: 'cyan.500',
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => setToLanguage(itemValue as Language)}
      >
        {selectItmes
          .filter((item) => item.value !== fromLanguage)
          .map((item) => {
            return <Select.Item label={item.label} value={item.value} key={item.value} />;
          })}
      </Select>
    </HStack>
  );
};

export default observer(LanguagesSelector);
