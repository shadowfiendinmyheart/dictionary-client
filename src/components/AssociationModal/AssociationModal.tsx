import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Icon,
  IconButton,
  Box,
  Button,
  Modal,
  Center,
  VStack,
  CheckIcon,
  Select,
} from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import i18n, { localizationTokens } from '../../localization';
import AssociationItem from '../AssociationItem';
import SelectDictionary from '../SelectDictionary';

const AssociationModal = () => {
  const { cardStore } = useStore();
  const {
    isAssociationModal,
    setImagesModal,
    setAssociationModal,
    associationItems,
    avalibleDictionaries,
    setPickedDictionaryByName,
  } = cardStore;

  return (
    <Modal isOpen={isAssociationModal} onClose={() => setAssociationModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Список ассоциаций</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            {associationItems.map((item, index) => {
              return (
                <AssociationItem
                  imageUrl={item.imageUrl}
                  translations={item.translations}
                  about={item?.about}
                  width={'100%'}
                  height={'100px'}
                  key={index}
                />
              );
            })}
            <Box
              style={{
                borderWidth: 4,
                borderRadius: 4,
                borderStyle: 'dashed',
                borderColor: '#e3e3e3',
              }}
              width="100%"
              p="4"
              height={'100px'}
            >
              <IconButton
                width={'100%'}
                onPress={() => setImagesModal(true)}
                icon={
                  <Center>
                    <Icon
                      as={Entypo}
                      name="circle-with-plus"
                      size="xl"
                      color="trueGray.400"
                    />
                  </Center>
                }
              />
            </Box>
          </VStack>
        </Modal.Body>
        {associationItems.length > 0 ? (
          <Modal.Footer>
            <VStack w={'100%'}>
              <SelectDictionary
                dictionaries={avalibleDictionaries}
                onSelectDictionary={setPickedDictionaryByName}
              />
              {avalibleDictionaries.length > 0 ? (
                <Button
                  width="100%"
                  size={'10'}
                  mt={2}
                  leftIcon={<Icon as={Entypo} name="star" />}
                  onPress={() => setAssociationModal(false)}
                >
                  Создать карточку
                </Button>
              ) : null}
            </VStack>
          </Modal.Footer>
        ) : null}
      </Modal.Content>
    </Modal>
  );
};

export default observer(AssociationModal);
