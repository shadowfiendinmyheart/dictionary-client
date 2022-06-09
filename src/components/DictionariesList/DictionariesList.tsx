import React from 'react';
import { TouchableHighlight } from 'react-native';
import { observer } from 'mobx-react';
import { Center, ScrollView } from 'native-base';
import { Dictionary } from '../../store/types';
import DictionaryItem from '../DictionaryItem';
import SkeletonDictionariesList from '../SkeletonDictionariesList';
import i18n, { localizationTokens } from '../../localization';

interface Props {
  dictionaries: Dictionary[];
  onDictionaryPress: (dictionary: Dictionary) => void;
  onLongPress?: (dictionary: Dictionary) => void;
  isLoading?: boolean;
}

const { DictionariesNotFoundText } = localizationTokens.PersonalDictionariesScreen.index;
const dictionariesNotFoundText = i18n.t(DictionariesNotFoundText);

const DictionariesList: React.FC<Props> = ({
  dictionaries,
  onDictionaryPress,
  onLongPress,
  isLoading,
}) => {
  const handleLongPress = (dictionary: Dictionary) => {
    if (!onLongPress) return;

    onLongPress(dictionary);
  };

  if (isLoading) {
    return <SkeletonDictionariesList />;
  }

  if (dictionaries.length === 0) {
    return <Center flex={1}>{dictionariesNotFoundText}</Center>;
  }

  return (
    <ScrollView>
      <Center mb={3}>
        {dictionaries.map((dictionary) => {
          return (
            <TouchableHighlight
              style={{ width: '90%' }}
              underlayColor={'trueGray.50'}
              onPress={() => onDictionaryPress(dictionary)}
              onLongPress={() => handleLongPress(dictionary)}
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
