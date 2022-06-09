import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { observer } from 'mobx-react';
import { Text, Button, Center, Input, HStack, VStack } from 'native-base';
import { Card } from '../api/card/types';
interface Props {
  route: { params: { card: Card } };
  navigation: NavigationStackProp;
}

const CardEditScreen: React.FC<Props> = ({ route, navigation }) => {
  const card = route.params.card;
  const [isFetching, setFetching] = useState(false);
  const [phrase, setPhrase] = useState(card.phrase);
  const [description, setDescription] = useState(card.description);

  const handlePhraseInputChange = (value: string) => {
    setPhrase(value);
  };

  const handleDescriptionInputChange = (value: string) => {
    setDescription(value);
  };

  const handleEditPress = () => {
    if (phrase.length <= 0) return;

    setFetching(true);
    // TODO: make update card api call
    setFetching(false);
  };

  const handleDeletePress = () => {
    // TODO: make delete card api call
  };

  return (
    <Center>
      <VStack w={'90%'}>
        <Text mt={6}>Фраза</Text>
        <Input
          editable={true}
          width="100%"
          background={'warmGray.50'}
          placeholder={'Введите новое название карточки'}
          onChangeText={handlePhraseInputChange}
          value={phrase}
        />
        <Text mt={6}>Описание</Text>
        <Input
          editable={true}
          width="100%"
          background={'warmGray.50'}
          placeholder={'Введите новое описание карточки'}
          onChangeText={handleDescriptionInputChange}
          value={description}
        />
        <Button
          width="100%"
          mt={3}
          size={'10'}
          backgroundColor={isFetching ? 'gray.400' : 'cyan.500'}
          onPress={handleEditPress}
          disabled={isFetching}
        >
          Обновить карточку
        </Button>
        <Button
          width="100%"
          mt={3}
          size={'10'}
          backgroundColor={isFetching ? 'gray.400' : 'cyan.500'}
          onPress={handleDeletePress}
          disabled={isFetching}
        >
          Удалить карточку
        </Button>
      </VStack>
    </Center>
  );
};

export default observer(CardEditScreen);
