import React, { useState } from 'react';
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
import AddAbout from '../AddAbout';
import findImages from '../../api/card/findImages.api';
import { ImageItem } from '../../store/card.store';

const ImagesModal = () => {
  const [imageInputValue, setImageInputValue] = useState('');
  const [isImageFetch, setImageFetch] = useState(false);
  const { cardStore } = useStore();
  const {
    translationItems,
    isImagesModal,
    setImagesModal,
    changeIsPickTranslationItem,
    imageItems,
    setPickImageItem,
    isValidAssociation,
    addAssociationItem,
    clearImagePicked,
    clearTranslationPicked,
    setImageItems,
  } = cardStore;

  const handleStatusChange = (index: number) => {
    changeIsPickTranslationItem(index);
  };

  const handleCreateAssociationPress = () => {
    addAssociationItem();

    clearTranslationPicked();
    clearImagePicked();
    setImageItems([]);
    setImagesModal(false);
    setImageInputValue('');
    cardStore.setAbout('');
  };

  const handleAddAboutTextAreaChange = (text?: string) => {
    if (text) {
      cardStore.setAbout(text);
    }

    if (text?.length === 0) {
      cardStore.setAbout('');
    }
  };

  const handleAddAboutButtonPress = (isOpen?: boolean) => {
    if (isOpen) {
      cardStore.setAbout('');
    }
  };

  const handleImageInputChange = (text: string) => {
    setImageInputValue(text);
  };

  const handleFindImageButtonPress = async () => {
    setImageFetch(true);
    const imagesResponse = await findImages(imageInputValue);
    if (imagesResponse) {
      const imageItems: ImageItem[] = imagesResponse
        .map((image) => {
          return {
            url: image,
            isPicked: false,
          };
        })
        .slice(0, 15);
      // TODO: make a dynamic pagination
      setImageItems(imageItems);
    }
    setImageFetch(false);
  };

  const { Header, TranslationsLabel, ImagePlaceholder, ImageButton, AssociationButton } =
    localizationTokens.CardScreen.imagesModal;
  const headerText = i18n.t(Header);
  const translationsLabeltext = i18n.t(TranslationsLabel);
  const imagePlaceholderText = i18n.t(ImagePlaceholder);
  const imageButtonText = i18n.t(ImageButton);
  const associationButtonText = i18n.t(AssociationButton);

  return (
    <Modal isOpen={isImagesModal} size={'xl'} onClose={() => setImagesModal(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{headerText}</Modal.Header>
        <Modal.Body>
          <Text fontSize={'md'}>{translationsLabeltext}</Text>
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

          <Box mt={2}>
            <AddAbout
              onButtonPress={handleAddAboutButtonPress}
              onTextareaChange={handleAddAboutTextAreaChange}
            />
          </Box>

          <Input
            mt={4}
            background={'warmGray.50'}
            placeholder={imagePlaceholderText}
            onChangeText={handleImageInputChange}
            value={imageInputValue}
          />
          <Button
            width="100%"
            mt={2}
            size={'10'}
            backgroundColor={isImageFetch ? 'gray.400' : 'cyan.500'}
            leftIcon={<Icon as={Entypo} name="magnifying-glass" />}
            onPress={handleFindImageButtonPress}
            disabled={isImageFetch}
          >
            {imageButtonText}
          </Button>
          <Box mt={2}>
            <ImagesGrid images={imageItems} onImagePress={setPickImageItem} />
          </Box>
        </Modal.Body>
        {isValidAssociation ? (
          <Modal.Footer>
            <Button
              width="100%"
              size={'10'}
              leftIcon={<Icon as={Entypo} name="star" />}
              onPress={handleCreateAssociationPress}
            >
              {associationButtonText}
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal.Content>
    </Modal>
  );
};

export default observer(ImagesModal);
