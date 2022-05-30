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
import CreateDictionaryModal from '../components/CreateDictionaryModal';
import DictionariesList from '../components/DictionariesList';
import { Dictionary } from '../store/types';

interface Props {
  navigation: NavigationStackProp;
}

const { CreateDictionaryButton, DictionariesNotFoundText } =
  localizationTokens.PersonalDictionariesScreen.index;
const createDictionaryButtonText = i18n.t(CreateDictionaryButton);
const dictionariesNotFoundText = i18n.t(DictionariesNotFoundText);

const PersonalDictionariesScreen: React.FC<Props> = ({ navigation }) => {
  const [isDictionariesFetching, setDictionariesFetching] = useState(false);
  const { dictionaryStore } = useStore();
  const {
    dictionaries,
    setDictionaries,
    isCreateDictionaryModal,
    setCreateDictionaryModal,
  } = dictionaryStore;

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

  const handleDictionaryPress = (dictionary: Dictionary) => {
    navigation.navigate(ROUTES.DICTIONARY_SCREEN, { dictionary: dictionary });
  };

  const handleCreateDictionaryPress = () => {
    setCreateDictionaryModal(true);
  };

  if (dictionaries.length === 0) {
    return (
      <Center flex={1}>
        <Text>{dictionariesNotFoundText}</Text>
        <Button onPress={handleCreateDictionaryPress} w={'70%'} mt={5}>
          {createDictionaryButtonText}
        </Button>
        <CreateDictionaryModal />
      </Center>
    );
  }

  return (
    <>
      <Center mt={3}>
        <Button onPress={handleCreateDictionaryPress} w={'90%'} mb={3}>
          {createDictionaryButtonText}
        </Button>
      </Center>
      <DictionariesList
        dictionaries={dictionaries}
        onDictionaryPress={handleDictionaryPress}
        isLoading={isDictionariesFetching}
      />
      <CreateDictionaryModal />
    </>
  );
};

export default observer(PersonalDictionariesScreen);
