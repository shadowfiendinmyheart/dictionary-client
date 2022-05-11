import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Center, Button, Input, Icon, ScrollView } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../store/root.store';
import LanguagesSelector from '../components/LanguagesSelector';
import TranslationsList from '../components/TranslationsList';
import AssociationModal from '../components/AssociationModal';
import ImagesModal from '../components/ImagesModal';

const CardScreen: React.FC = () => {
  const [phrase, setPhrase] = useState('');
  const { cardStore } = useStore();
  const {
    translations,
    setTranslations,
    getTranslations,
    fromLanguage,
    toLanguage,
    setAssociationModal,
  } = cardStore;

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
        {translations.length > 0 && (
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
              Создать ассоциации
            </Button>
          </>
        )}
        <AssociationModal />
        <ImagesModal />
      </Center>
    </ScrollView>
  );
};

export default observer(CardScreen);
