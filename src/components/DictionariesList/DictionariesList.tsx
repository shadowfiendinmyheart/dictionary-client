import React from 'react';
import { TouchableHighlight } from 'react-native';
import { observer } from 'mobx-react';
import { Center, ScrollView } from 'native-base';
import { Dictionary } from '../../store/types';
import DictionaryItem from '../DictionaryItem';

interface Props {
  dictionaries: Dictionary[];
  onDictionaryPress: (dictionary: Dictionary) => void;
}

const DictionariesList: React.FC<Props> = ({ dictionaries, onDictionaryPress }) => {
  return (
    <ScrollView>
      <Center mb={3}>
        {dictionaries.map((dictionary) => {
          return (
            <TouchableHighlight
              style={{ width: '90%' }}
              underlayColor={'trueGray.50'}
              onPress={() => onDictionaryPress(dictionary)}
              key={dictionary.id}
            >
              <DictionaryItem mt={2} {...dictionary} />
            </TouchableHighlight>
          );
        })}
      </Center>
    </ScrollView>
  );
};

export default observer(DictionariesList);
