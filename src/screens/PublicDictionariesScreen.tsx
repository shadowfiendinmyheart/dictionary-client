import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Center, ScrollView } from 'native-base';
import { useStore } from '../store/root.store';
import { NavigationStackProp } from 'react-navigation-stack';
import getPublicDictionaries from '../api/dictionary/getPublicDictionaries';
import SkeletonDictionariesList from '../components/SkeletonDictionariesList';
import DictionaryItem from '../components/DictionaryItem';
import { TouchableHighlight } from 'react-native';
import ROUTES from '../constants/routes';
import DictionariesList from '../components/DictionariesList';
import { Dictionary } from '../store/types';

interface Props {
  navigation: NavigationStackProp;
}

const PublicDictionariesScreen: React.FC<Props> = ({ navigation }) => {
  const [isDictionariesFetching, setDictionariesFetching] = useState(false);
  const { dictionaryStore } = useStore();
  const { publicDictionaries, setPublicDictionaries } = dictionaryStore;

  useEffect(() => {
    void (async () => {
      setDictionariesFetching(true);
      const dictionaries = await getPublicDictionaries();
      if (dictionaries) {
        setPublicDictionaries(dictionaries);
      }
      setDictionariesFetching(false);
    })();
  }, []);

  const handleDictionaryPress = (dictionary: Dictionary) => {
    navigation.navigate(ROUTES.DICTIONARY_SCREEN, { dictionaryId: dictionary.id });
  };

  return (
    <DictionariesList
      dictionaries={publicDictionaries}
      onDictionaryPress={handleDictionaryPress}
      isLoading={isDictionariesFetching}
    />
  );
};

export default observer(PublicDictionariesScreen);
