import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Icon,
  Input,
  Modal,
  VStack,
  Text,
} from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';

import ImagesGrid from '../ImagesGrid';
import i18n, { localizationTokens } from '../../localization';

const ImagesModal = () => {
  const { cardStore } = useStore();
  const {
    translationItems,
    isImagesModal,
    setImagesModal,
    changeIsPickTranslationItem,
    imageItems,
    setPickImageItem,
    isValidAssociation,
  } = cardStore;

  const handleStatusChange = (index: number) => {
    changeIsPickTranslationItem(index);
  };

  return (
    <Modal isOpen={isImagesModal} size={'xl'} onClose={() => setImagesModal(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Создание ассоциации</Modal.Header>
        <Modal.Body>
          <Text fontSize={'md'}>
            Выберите переводы, которые хотите включить в ассоциацию
          </Text>
          <VStack mt={2} space={1}>
            {translationItems.map((item, index) => {
              return (
                <HStack w="100%" justifyContent="space-between" key={item.translation}>
                  <Checkbox
                    isChecked={item.isPicked}
                    onChange={() => handleStatusChange(index)}
                    value={item.translation}
                    accessibilityLabel={`${item.translation} checkbox`}
                  />
                  <Text
                    width="100%"
                    flexShrink={1}
                    textAlign="left"
                    mx="2"
                    _light={{
                      color: item.isPicked ? 'coolGray.800' : 'gray.400',
                    }}
                    onPress={() => handleStatusChange(index)}
                  >
                    {item.translation}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
          <Input
            mt={4}
            // width="90%"
            background={'warmGray.50'}
            placeholder={'Введите фразу для поиска изображения'}
            // onChangeText={handlePhraseInputChange}
            // value={phrase}
          />
          <Button
            width="100%"
            mt={2}
            size={'10'}
            // backgroundColor={isFetching ? 'gray.400' : 'cyan.500'}
            leftIcon={<Icon as={Entypo} name="magnifying-glass" />}
            // onPress={handleFindTranslationsButtonPress}
            // disabled={isFetching}
          >
            Найти изображение
          </Button>
          <Box mt={2}>
            <ImagesGrid images={imageItems} onImagePress={setPickImageItem} />
          </Box>
        </Modal.Body>
        {isValidAssociation && (
          <Modal.Footer>
            <Button
              width="100%"
              size={'10'}
              leftIcon={<Icon as={Entypo} name="star" />}
              onPress={() => alert('false')}
            >
              Создать ассоциацию
            </Button>
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default observer(ImagesModal);
