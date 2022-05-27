import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Center, Text } from 'native-base';
import SkeletonDictionariesList from '../components/SkeletonDictionariesList';
import { Dictionary } from '../store/types';
import getPersonalDictionaries from '../api/dictionary/getPersonalDictionaries.api';
import DictionariesList from '../components/DictionariesList';
import { useStore } from '../store/root.store';
import getRandomCards, { RandomCardMode } from '../api/card/getRandomCards.api';

const PhraseTranslationGameScreen: React.FC = () => {
  const [dictionaries, setDictionaries] = useState<Dictionary[]>();
  const [isDictionariesFetching, setDictionariesFetching] = useState(false);

  const { phraseTranslationGameStore } = useStore();
  const { pickedDictionary, setPickedDictionary } = phraseTranslationGameStore;

  useEffect(() => {
    void (async () => {
      const dictionaries = await getPersonalDictionaries();
      setDictionaries(dictionaries);
    })();

    return () => {
      setPickedDictionary(null);
    };
  }, []);

  const handleDictionaryPress = async (dictionary: Dictionary) => {
    setPickedDictionary(dictionary);
    const cards = await getRandomCards({
      dictionaryId: dictionary.id,
      counter: 10,
      mode: RandomCardMode.LESS_OR_EQUAL,
      size: 3,
    });
    console.log('cards', cards);
  };

  const handleRepcikDictionaryPress = () => {
    setPickedDictionary(null);
  };

  if (isDictionariesFetching || !dictionaries) {
    return <SkeletonDictionariesList />;
  }

  if (dictionaries.length === 0) {
    return <Center flex={1}>На данный момент у вас нет словарей :(</Center>;
  }

  if (!pickedDictionary) {
    return (
      <>
        <Center mt={3}>
          <Text>Выберите словарь для игры</Text>
        </Center>
        <DictionariesList
          dictionaries={dictionaries}
          onDictionaryPress={handleDictionaryPress}
        />
      </>
    );
  }

  return (
    <Center>
      <Button onPress={handleRepcikDictionaryPress}>Выбрать другой словарь</Button>
    </Center>
  );
};

export default observer(PhraseTranslationGameScreen);
