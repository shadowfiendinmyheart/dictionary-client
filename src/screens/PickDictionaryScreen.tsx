import React from 'react';
import { Center, Text } from 'native-base';
import { Dictionary } from '../store/types';
import DictionariesList from '../components/DictionariesList';

interface Props {
  dictionaries: Dictionary[];
  onDictionaryPress: (dictionary: Dictionary) => void;
}

const PickDictionaryScreen: React.FC<Props> = ({ dictionaries, onDictionaryPress }) => {
  if (dictionaries.length === 0) {
    return <Center flex={1}>На данный момент у вас нет словарей :(</Center>;
  }

  return (
    <>
      <Center mt={3}>
        <Text>Выберите словарь для игры</Text>
      </Center>
      <DictionariesList
        dictionaries={dictionaries}
        onDictionaryPress={onDictionaryPress}
      />
    </>
  );
};

export default PickDictionaryScreen;
