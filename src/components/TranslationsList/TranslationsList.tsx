import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Icon, HStack, IconButton, Box, VStack, Input, Button, Text } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import i18n, { localizationTokens } from '../../localization';

const TranslationsList = () => {
  const [translation, setTranslation] = useState('');
  const { cardStore } = useStore();
  const { translations, deleteTranslation, checkAddTranslation, addTranslation } =
    cardStore;

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

  return (
    <Box mt={3} width="90%">
      <VStack space={2}>
        {translations.map((translation) => (
          <HStack width="100%" key={translation}>
            <IconButton
              size="sm"
              icon={<Icon as={Entypo} name="cross" size="4" color="trueGray.400" />}
              onPress={() => handleDeleteTranslationPress(translation)}
            />
            <Text>{translation}</Text>
          </HStack>
        ))}
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
  );
};

export default observer(TranslationsList);
