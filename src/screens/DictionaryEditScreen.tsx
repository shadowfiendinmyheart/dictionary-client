import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { observer } from 'mobx-react';
import { Text, Button, Center, Input, VStack } from 'native-base';
import { Dictionary } from '../store/types';
interface Props {
  route: { params: { dictionary: Dictionary } };
  navigation: NavigationStackProp;
}

const DictionaryEditScreen: React.FC<Props> = ({ route, navigation }) => {
  const dictionary = route.params.dictionary;
  const [isFetching, setFetching] = useState(false);
  const [name, setName] = useState(dictionary.name);
  const [description, setDescription] = useState(dictionary.description);

  const handleNameInputChange = (value: string) => {
    setName(value);
  };

  const handleDescriptionInputChange = (value: string) => {
    setDescription(value);
  };

  const handleEditPress = () => {
    if (name.length <= 0) return;

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
        <Text mt={6}>Название</Text>
        <Input
          editable={true}
          width="100%"
          background={'warmGray.50'}
          placeholder={'Введите новое название словаря'}
          onChangeText={handleNameInputChange}
          value={name}
        />
        <Text mt={6}>Описание</Text>
        <Input
          editable={true}
          width="100%"
          background={'warmGray.50'}
          placeholder={'Введите новое описание словаря'}
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
          Обновить словарь
        </Button>
        <Button
          width="100%"
          mt={3}
          size={'10'}
          backgroundColor={isFetching ? 'gray.400' : 'cyan.500'}
          onPress={handleDeletePress}
          disabled={isFetching}
        >
          Удалить словарь
        </Button>
      </VStack>
    </Center>
  );
};

export default observer(DictionaryEditScreen);
