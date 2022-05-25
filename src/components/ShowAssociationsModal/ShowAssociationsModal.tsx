import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box, Modal, VStack } from 'native-base';
import { useStore } from '../../store/root.store';
import i18n, { localizationTokens } from '../../localization';
import AssociationItem from '../AssociationItem';
import { Assoctiation } from '../../api/card/types';

interface Props {
  associations: Assoctiation[];
}

const ShowAssociationsModal: React.FC<Props> = ({ associations }) => {
  const { dictionaryStore } = useStore();
  const { isAssociationsModal, setAssociationsModal, setCardAssociations } =
    dictionaryStore;

  useEffect(() => {
    return () => {
      setCardAssociations([]);
    };
  });

  return (
    <Modal isOpen={isAssociationsModal} onClose={() => setAssociationsModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Ассоциации</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            {associations.map((item, index) => {
              return (
                <AssociationItem
                  imageUrl={item.image}
                  translations={item.translate}
                  about={item?.description}
                  width={'100%'}
                  height={'100px'}
                  key={index}
                />
              );
            })}
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default observer(ShowAssociationsModal);
