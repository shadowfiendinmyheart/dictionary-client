import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Center, ScrollView } from 'native-base';
import { useStore } from '../store/root.store';
import i18n, { localizationTokens } from '../localization';
import { NavigationStackProp } from 'react-navigation-stack';
import getPublicDictionaries from '../api/dictionary/getPublicDictionaries';
import SkeletonDictionariesList from '../components/SkeletonDictionariesList';
import DictionaryItem from '../components/DictionaryItem';
import { TouchableHighlight } from 'react-native';

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

  if (isDictionariesFetching) {
    return <SkeletonDictionariesList />;
  }

  if (publicDictionaries.length === 0) {
    return <Center flex={1}>На данный момент у вас нет словарей :(</Center>;
  }

  return (
    <ScrollView>
      <Center mt={3} mb={3}>
        {publicDictionaries.map((dictionary) => {
          return (
            <TouchableHighlight onPress={() => console.log('press')} key={dictionary.id}>
              <DictionaryItem {...dictionary} />
            </TouchableHighlight>
          );
        })}
      </Center>
    </ScrollView>
  );
};

export default observer(PublicDictionariesScreen);
