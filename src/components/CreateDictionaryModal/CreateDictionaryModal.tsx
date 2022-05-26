import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Checkbox, Icon, Modal, VStack } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import i18n, { localizationTokens } from '../../localization';
import NameInput from './components/NameInput';
import DescriptionInput from './components/DescriptionInput';
import LanguagesSelector from '../LanguagesSelector';

const CreateDictionaryModal: React.FC = () => {
  const [isDictionaryCreating, setDictionaryCreating] = useState(false);
  const { dictionaryStore, createDictionaryStore } = useStore();
  const { isCreateDictionaryModal, setCreateDictionaryModal } = dictionaryStore;
  const {
    fromLanguage,
    setFromLanguage,
    toLanguage,
    setToLanguage,
    handleShufflePress,
    isPrivate,
    setPrivate,
    validate,
    createDictionary,
  } = createDictionaryStore;

  const handlePrivateCheckboxPress = () => {
    setPrivate(!isPrivate);
  };

  const handleCreateDictionaryButton = async () => {
    try {
      setDictionaryCreating(true);
      await createDictionary();
      setCreateDictionaryModal(false);
    } catch (error) {
      // show user error
    } finally {
      setDictionaryCreating(false);
    }
  };

  return (
    <Modal
      isOpen={isCreateDictionaryModal}
      onClose={() => setCreateDictionaryModal(false)}
    >
      <Modal.Content width="300px">
        <Modal.CloseButton />
        <Modal.Header>Новый словарь</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <NameInput />
            <DescriptionInput />
            <LanguagesSelector
              fromLanguage={fromLanguage}
              setFromLanguage={setFromLanguage}
              toLanguage={toLanguage}
              setToLanguage={setToLanguage}
              handleShufflePress={handleShufflePress}
            />
            <Checkbox
              isChecked={isPrivate}
              onTouchStart={handlePrivateCheckboxPress}
              value={''}
            >
              Приватный словарь
            </Checkbox>
          </VStack>
        </Modal.Body>
        {validate ? (
          <Modal.Footer>
            <Button
              width="100%"
              size={'10'}
              mt={2}
              leftIcon={<Icon as={Entypo} name="star" />}
              disabled={isDictionaryCreating}
              onPress={handleCreateDictionaryButton}
            >
              Создать
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal.Content>
    </Modal>
  );
};

export default observer(CreateDictionaryModal);
