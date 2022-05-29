import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Button,
  Center,
  Input,
  Text,
  HStack,
  IconButton,
  Icon,
  VStack,
} from 'native-base';
import { Entypo } from '@native-base/icons';
import { Dictionary } from '../store/types';
import getPersonalDictionaries from '../api/dictionary/getPersonalDictionaries.api';
import DictionariesList from '../components/DictionariesList';
import { useStore } from '../store/root.store';
import getRandomCards, { RandomCardMode } from '../api/card/getRandomCards.api';
import { COUNTER_LIMITER, NUMBER_OF_GAME_CARDS } from '../constants/game';
import LoadingScreen from './LoadingScreen';
import increaseCardCounter from '../api/card/increaseCardCounter.api';
import EndGameScreen from './EndGameScreen';
import AssociationItem from '../components/AssociationItem';
import i18n, { localizationTokens } from '../localization';

const { DictionaryHeader, AnswerPlaceholder, EnterButton } =
  localizationTokens.TranslatePhraseGameScreen.index;
const dictionaryHeaderText = i18n.t(DictionaryHeader);
const answerPlaceholderText = i18n.t(AnswerPlaceholder);
const enterButtonText = i18n.t(EnterButton);

const TranslationPhraseGameScreen: React.FC = () => {
  const [answerInput, setAnswerInput] = useState('');
  const [dictionaries, setDictionaries] = useState<Dictionary[]>();
  const [isDictionariesFetching, setDictionariesFetching] = useState(false);

  const { gameStore } = useStore();
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
  } = gameStore;

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
      setGameEnd(false);
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

  const handleInputChange = (value: string) => {
    setAnswerInput(value);
  };

  const handleEnterPress = async () => {
    const isRightAnswer =
      gameCards[gameCounter].phrase.toLowerCase().trim() ===
      answerInput.toLowerCase().trim();

    if (isRightAnswer) {
      await increaseCardCounter(gameCards[gameCounter].id);
      updateGameCard(gameCounter, true, answerInput);
    } else {
      updateGameCard(gameCounter, false, answerInput);
    }

    setAssociationCounter(0);
    const isNextCardExist = incrementGameCounter();
    setAnswerInput('');

    if (!isNextCardExist) {
      setGameEnd(true);
    }
  };

  if (isGameEnd) {
    return <EndGameScreen gameCards={gameCards} />;
  }

  if (!pickedDictionary && dictionaries) {
    return (
      <>
        <Center mt={3}>
          <Text>{dictionaryHeaderText}</Text>
        </Center>
        <DictionariesList
          dictionaries={dictionaries}
          onDictionaryPress={handleDictionaryPress}
          isLoading={isDictionariesFetching}
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
          <AssociationItem
            height={200}
            width={200}
            imageUrl={gameCards[gameCounter].associations[associationCounter].image}
            translations={
              gameCards[gameCounter].associations[associationCounter].translate
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
          placeholder={answerPlaceholderText}
          value={answerInput}
          onChangeText={handleInputChange}
        />
        <Button disabled={answerInput.length === 0} onPress={handleEnterPress}>
          {enterButtonText}
        </Button>
      </VStack>
    </Center>
  );
};

export default observer(TranslationPhraseGameScreen);
