import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Button,
  Center,
  Input,
  Text,
  Image,
  HStack,
  IconButton,
  Icon,
  VStack,
} from 'native-base';
import { Entypo } from '@native-base/icons';
import SkeletonDictionariesList from '../components/SkeletonDictionariesList';
import { Dictionary } from '../store/types';
import getPersonalDictionaries from '../api/dictionary/getPersonalDictionaries.api';
import DictionariesList from '../components/DictionariesList';
import { useStore } from '../store/root.store';
import getRandomCards, { RandomCardMode } from '../api/card/getRandomCards.api';
import { COUNTER_LIMITER, NUMBER_OF_GAME_CARDS } from '../constants/game';
import LoadingScreen from './LoadingScreen';
import increaseCardCounter from '../api/card/increaseCardCounter.api';
import EndGameScreen from './EndGameScreen';

const PhraseTranslationGameScreen: React.FC = () => {
  const [answerInput, setAnswerInput] = useState('');
  const [dictionaries, setDictionaries] = useState<Dictionary[]>();
  const [isDictionariesFetching, setDictionariesFetching] = useState(false);

  const { phraseTranslationGameStore } = useStore();
  const {
    pickedDictionary,
    setPickedDictionary,
    setGameCounter,
    gameCards,
    setGameCards,
    updateGameCard,
    gameCounter,
    incrementGameCounter,
    associationCounter,
    setAssociationCounter,
    incrementAssociationCounter,
    decrementAssociationCounter,
    isGameEnd,
    setGameEnd,
  } = phraseTranslationGameStore;

  useEffect(() => {
    setGameCards([]);
    setGameCounter(0);
    setAssociationCounter(0);

    void (async () => {
      setDictionariesFetching(true);
      const dictionaries = await getPersonalDictionaries();
      setDictionaries(dictionaries);
      setDictionariesFetching(false);
    })();

    return () => {
      setPickedDictionary(null);
    };
  }, []);

  const handleDictionaryPress = async (dictionary: Dictionary) => {
    setPickedDictionary(dictionary);
    const cards = await getRandomCards({
      dictionaryId: dictionary.id,
      counter: COUNTER_LIMITER,
      mode: RandomCardMode.LESS_OR_EQUAL,
      size: NUMBER_OF_GAME_CARDS,
    });

    if (cards) {
      setGameCards(cards);
    }
  };

  const handleRepcikDictionaryPress = () => {
    setPickedDictionary(null);
  };

  const handleInputChange = (value: string) => {
    setAnswerInput(value);
  };

  const handleEnterPress = async () => {
    if (
      gameCards[gameCounter].associations.find((assciation) => {
        return assciation.translate.find(
          (translate) => translate.toLowerCase() === answerInput.toLowerCase(),
        );
      })
    ) {
      await increaseCardCounter(gameCards[gameCounter].id);
      updateGameCard(gameCounter, true, answerInput);
    }

    updateGameCard(gameCounter, false, answerInput);
    setAssociationCounter(0);
    const isNextCardExist = incrementGameCounter();
    setAnswerInput('');

    if (!isNextCardExist) {
      setGameEnd(true);
    }
  };

  if (isGameEnd) {
    return <EndGameScreen />;
  }

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

  if (gameCards.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <Center flex={1}>
      <VStack height="70%" space={3} w="90%">
        <Text textAlign={'center'}>{gameCards[gameCounter].phrase}</Text>
        <HStack justifyContent="space-around" alignItems="center">
          <IconButton
            backgroundColor={'warmGray.50'}
            size="8"
            paddingTop={2}
            onPress={decrementAssociationCounter}
            icon={
              <Center>
                <Icon
                  as={Entypo}
                  name="chevron-thin-left"
                  size="4"
                  color="trueGray.400"
                />
              </Center>
            }
          />
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: gameCards[gameCounter].associations[associationCounter].image,
            }}
            alt={
              gameCards[gameCounter].associations[associationCounter].description ||
              'association image'
            }
          />
          <IconButton
            backgroundColor={'warmGray.50'}
            size="8"
            paddingTop={2}
            onPress={incrementAssociationCounter}
            icon={
              <Center>
                <Icon
                  as={Entypo}
                  name="chevron-thin-right"
                  size="4"
                  color="trueGray.400"
                />
              </Center>
            }
          />
        </HStack>
        <Input
          placeholder="Введите перевод"
          value={answerInput}
          onChangeText={handleInputChange}
        />
        <Button onPress={handleEnterPress}>Принять</Button>
      </VStack>
    </Center>
  );
};

export default observer(PhraseTranslationGameScreen);
