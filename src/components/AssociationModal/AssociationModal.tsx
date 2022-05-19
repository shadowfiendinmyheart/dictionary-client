import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Icon, IconButton, Box, Button, Modal, Center, VStack } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import i18n, { localizationTokens } from '../../localization';
import AssociationItem from '../AssociationItem';
import SelectDictionary from '../SelectDictionary';
import createCard from '../../api/card/createCard.api';
import { NavigationStackProp } from 'react-navigation-stack';
import ROUTES from '../../constants/routes';
import { Language } from '../../api/card/types';

interface Props {
  navigation: NavigationStackProp;
}

const AssociationModal: React.FC<Props> = ({ navigation }) => {
  const [isCardCreating, setCardCreating] = useState(false);
  const { cardStore } = useStore();
  const {
    isAssociationModal,
    setImagesModal,
    setAssociationModal,
    associationItems,
    avalibleDictionaries,
    pickedDictionary,
    setPickedDictionaryByName,
    setAssociationItems,
    setTranslations,
    setFromLanguage,
    setToLanguage,
  } = cardStore;

  const handleCreateCardPress = async () => {
    setCardCreating(true);
    await createCard({
      dictionaryId: pickedDictionary.id,
      phrase: cardStore.phrase,
      associations: associationItems.map((a) => {
        return {
          translate: a.translations,
          image: a.imageUrl,
          description: a.about,
        };
      }),
      description: 'cardDescription',
    });
    setCardCreating(false);

    setAssociationModal(false);
    setAssociationItems([]);
    setTranslations([]);
    setFromLanguage(Language.English);
    setToLanguage(Language.Russian);
    navigation.navigate(ROUTES.MAIN_SCREEN);
  };

  const { Header, CardButton } = localizationTokens.CardScreen.associationModal;
  const headerText = i18n.t(Header);
  const cardButtonText = i18n.t(CardButton);

  return (
    <Modal isOpen={isAssociationModal} onClose={() => setAssociationModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{headerText}</Modal.Header>
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
                  disabled={isCardCreating}
                  onPress={handleCreateCardPress}
                >
                  {cardButtonText}
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
