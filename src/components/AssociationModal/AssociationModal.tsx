import React from 'react';
import { observer } from 'mobx-react';
import { Icon, IconButton, Box, Button, Modal, Center } from 'native-base';
import { Entypo } from '@native-base/icons';
import { useStore } from '../../store/root.store';
import i18n, { localizationTokens } from '../../localization';

const AssociationModal = () => {
  const { cardStore } = useStore();
  const { isAssociationModal, setImagesModal, setAssociationModal } = cardStore;

  return (
    <Modal isOpen={isAssociationModal} onClose={() => setAssociationModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Список ассоциаций</Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            width="100%"
            size={'10'}
            leftIcon={<Icon as={Entypo} name="star" />}
            onPress={() => setAssociationModal(false)}
          >
            Создать карточку
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default observer(AssociationModal);
