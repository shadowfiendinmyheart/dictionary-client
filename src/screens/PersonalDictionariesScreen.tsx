import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Box,
  Center,
  Divider,
  ScrollView,
  VStack,
  Text,
  HStack,
  Button,
} from 'native-base';
import { useStore } from '../store/root.store';
import i18n, { localizationTokens } from '../localization';
import { NavigationStackProp } from 'react-navigation-stack';
import ROUTES from '../constants/routes';
import getPersonalDictionaries from '../api/dictionary/getPersonalDictionaries.api';
import SkeletonDictionariesList from '../components/SkeletonDictionariesList';
import DictionaryItem from '../components/DictionaryItem';
import { TouchableHighlight } from 'react-native';

interface Props {
  navigation: NavigationStackProp;
}

const PersonalDictionariesScreen: React.FC<Props> = ({ navigation }) => {
  const [isDictionariesFetching, setDictionariesFetching] = useState(false);
  const { dictionaryStore } = useStore();
  const { dictionaries, setDictionaries } = dictionaryStore;

  useEffect(() => {
    void (async () => {
      setDictionariesFetching(true);
      const dictionaries = await getPersonalDictionaries();
      if (dictionaries) {
        setDictionaries(dictionaries);
      }
      setDictionariesFetching(false);
    })();
  }, []);

  if (isDictionariesFetching) {
    return <SkeletonDictionariesList />;
  }

  if (dictionaries.length === 0) {
    return <Center flex={1}>На данный момент у вас нет словарей :(</Center>;
  }

  const handleDictionaryPress = (dictionaryId: number) => {
    navigation.navigate(ROUTES.DICTIONARY_SCREEN, { dictionaryId });
  };

  return (
    <ScrollView>
      <Center mt={3} mb={3}>
        <Button onPress={() => console.log('add dictionary press')} w={'90%'} mb={3}>
          Добавить новый словарь
        </Button>
        {dictionaries.map((dictionary) => {
          return (
            <TouchableHighlight
              style={{ width: '90%' }}
              underlayColor={'white'}
              onPress={() => handleDictionaryPress(dictionary.id)}
              key={dictionary.id}
            >
              <DictionaryItem {...dictionary} />
            </TouchableHighlight>
          );
        })}
      </Center>
    </ScrollView>
  );
};

export default observer(PersonalDictionariesScreen);
