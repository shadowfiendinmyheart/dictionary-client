import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Center, Button, Input, Icon, ScrollView, Box } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../store/root.store';
import LanguagesSelector from '../components/LanguagesSelector';
import TranslationsList from '../components/TranslationsList';
import AssociationModal from '../components/AssociationModal';
import ImagesModal from '../components/ImagesModal';
import getPersonalDictionaries from '../api/dictionary/getPersonalDictionaries.api';
import { NavigationStackProp } from 'react-navigation-stack';
import i18n, { localizationTokens } from '../localization';

interface Props {
  navigation: NavigationStackProp;
}

const CardScreen: React.FC<Props> = ({ navigation }) => {
  const [phrase, setPhrase] = useState('');
  const { cardStore, dictionaryStore } = useStore();
  const {
    translationItems,
    setTranslations,
    getTranslationsFromApi,
    isTranslationsFetching,
    fromLanguage,
    toLanguage,
    setAssociationModal,
    updateAvalibleDictionaries,
    setFromLanguage,
    setToLanguage,
    handleShufflePress,
  } = cardStore;

  const { setDictionaries } = dictionaryStore;

  useEffect(() => {
    void (async () => {
      const dictionaries = await getPersonalDictionaries();
      if (dictionaries) {
        setDictionaries(dictionaries);
      }

      updateAvalibleDictionaries();
    })();

    return () => {
      setTranslations([]);
    };
  }, []);

  const handlePhraseInputChange = (value: string) => {
    setPhrase(value);
  };

  const handleFindTranslationsButtonPress = async () => {
    if (!phrase || !fromLanguage || !toLanguage) return;

    const translationsResponse = await getTranslationsFromApi({
      phrase,
      from: fromLanguage,
      to: toLanguage,
    });
    if (!translationsResponse) {
      // show error
      return;
    }

    cardStore.setPhrase(phrase);
    setTranslations(translationsResponse);
  };

  const { PhrasePlaceholder, PhraseButton, AssociationButton } =
    localizationTokens.CardScreen.index;
  const phrasePlaceholderText = i18n.t(PhrasePlaceholder);
  const phraseButtonText = i18n.t(PhraseButton);
  const associationButtonText = i18n.t(AssociationButton);

  return (
    <ScrollView w="100%">
      <Center>
        <Input
          editable={true}
          width="90%"
          background={'warmGray.50'}
          mt={6}
          placeholder={phrasePlaceholderText}
          onChangeText={handlePhraseInputChange}
          value={phrase}
        />
        <Box w="90%">
          <LanguagesSelector
            fromLanguage={fromLanguage}
            setFromLanguage={setFromLanguage}
            toLanguage={toLanguage}
            setToLanguage={setToLanguage}
            handleShufflePress={handleShufflePress}
          />
        </Box>
        <Button
          width="90%"
          mt={3}
          size={'10'}
          backgroundColor={isTranslationsFetching ? 'gray.400' : 'cyan.500'}
          leftIcon={<Icon as={Entypo} name="magnifying-glass" />}
          onPress={handleFindTranslationsButtonPress}
          disabled={isTranslationsFetching}
        >
          {phraseButtonText}
        </Button>
        {translationItems.length > 0 ? (
          <>
            <TranslationsList />
            <Button
              width="90%"
              mt={3}
              mb={6}
              size={'10'}
              leftIcon={<Icon as={Entypo} name="star" />}
              onPress={() => setAssociationModal(true)}
            >
              {associationButtonText}
            </Button>
          </>
        ) : null}
        <AssociationModal navigation={navigation} />
        <ImagesModal />
      </Center>
    </ScrollView>
  );
};

export default observer(CardScreen);
