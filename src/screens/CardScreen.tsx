import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Center,
  Button,
  Input,
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Icon,
  ScrollView,
  Select,
  CheckIcon,
} from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../store/root.store';
import { Language } from '../api/card/types';
import LanguagesSelector from '../components/LanguagesSelector/LanguagesSelector';

const CardScreen: React.FC = () => {
  const [translation, setTranslation] = useState('');
  const [phrase, setPhrase] = useState('');
  const { cardStore } = useStore();
  const {
    translations,
    setTranslations,
    deleteTranslation,
    addTranslation,
    checkAddTranslation,
    getTranslations,
    fromLanguage,
    toLanguage,
  } = cardStore;

  const handleDeleteTranslationPress = (translation: string) => {
    deleteTranslation(translation);
  };

  const handleTranslationInputChange = (value: string) => {
    setTranslation(value);
  };

  const handleAddTranslationButtonPress = () => {
    const isValid = checkAddTranslation(translation);
    if (!isValid) return;

    addTranslation(translation);
    setTranslation('');
  };

  const handlePhraseInputChange = (value: string) => {
    setPhrase(value);
  };

  const handleFindTranslationsButtonPress = async () => {
    if (!phrase || !fromLanguage || !toLanguage) return;

    const translationsResponse = await getTranslations({
      phrase,
      from: fromLanguage,
      to: toLanguage,
    });
    if (!translationsResponse) {
      // show error
      return;
    }

    setTranslations(translationsResponse.translation);
  };

  return (
    <ScrollView w="100%">
      <Center>
        <Input
          editable={true}
          width="90%"
          background={'warmGray.50'}
          mt={6}
          placeholder={'Введите фразу'}
          onChangeText={handlePhraseInputChange}
          value={phrase}
        />
        <LanguagesSelector />
        <Button
          width="90%"
          mt={3}
          size={'10'}
          leftIcon={<Icon as={Entypo} name="magnifying-glass" />}
          onPress={handleFindTranslationsButtonPress}
        >
          Найти перевод
        </Button>
        <Box mt={3} width="90%">
          <VStack space={2}>
            {translations.map((translation) => {
              return (
                <HStack width="100%" key={translation}>
                  <IconButton
                    size="sm"
                    icon={<Icon as={Entypo} name="cross" size="4" color="trueGray.400" />}
                    onPress={() => handleDeleteTranslationPress(translation)}
                  />
                  <Text>{translation}</Text>
                </HStack>
              );
            })}
          </VStack>
          <Input
            width="100%"
            background={'warmGray.50'}
            mt={3}
            placeholder={'Введите перевод фразы'}
            onChangeText={handleTranslationInputChange}
            value={translation}
          />
          <Button
            width="100%"
            mt={3}
            size={'10'}
            leftIcon={<Icon as={Entypo} name="add-to-list" />}
            onPress={handleAddTranslationButtonPress}
          >
            Добавить перевод
          </Button>
        </Box>
        <Button
          width="90%"
          mt={3}
          mb={6}
          size={'10'}
          leftIcon={<Icon as={Entypo} name="star" />}
        >
          Создать ассоциации
        </Button>
      </Center>
    </ScrollView>
  );
};

export default observer(CardScreen);
