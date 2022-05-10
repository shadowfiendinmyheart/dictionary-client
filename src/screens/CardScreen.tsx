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
} from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../store/root.store';

const CardScreen: React.FC = () => {
  const [translation, setTranslation] = useState('');
  const { cardStore } = useStore();
  const { translations, images, deleteTranslation, addTranslation, checkAddTranslation } =
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
    <ScrollView w="100%">
      <Center>
        <Input editable={true} width="80%" mt={6} placeholder={'Введите фразу'} />
        <Button
          width="80%"
          mt={3}
          size={'10'}
          leftIcon={<Icon as={Entypo} name="magnifying-glass" />}
        >
          Найти перевод
        </Button>
        <Box mt={3} width="80%">
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
          width="80%"
          mt={3}
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
