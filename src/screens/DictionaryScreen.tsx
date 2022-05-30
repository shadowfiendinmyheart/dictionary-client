import React, { useEffect, useState } from 'react';
import { Box } from 'native-base';
import { observer } from 'mobx-react';
import { useStore } from '../store/root.store';
import { NavigationStackProp } from 'react-navigation-stack';
import getCardsByDictionaryId from '../api/card/getCardsByDictionaryId.api';
import { Card } from '../api/card/types';
import CardsGrid from '../components/CardsGrid';
import LoadingScreen from './LoadingScreen';
import ShowAssociationsModal from '../components/ShowAssociationsModal';
import { Dictionary } from '../store/types';

interface Props {
  route: { params: { dictionary: Dictionary } };
  navigation: NavigationStackProp;
}

const DictionaryScreen: React.FC<Props> = ({ route }) => {
  const [isFetchingCards, setFetchingCards] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const { dictionaryStore } = useStore();
  const {
    isAssociationsModal,
    setAssociationsModal,
    cardAssociations,
    setCardAssociations,
    setCurrentDictionary,
  } = dictionaryStore;

  const dictionaryId = route.params.dictionary.id;
  useEffect(() => {
    setCurrentDictionary(route.params.dictionary);
    void (async () => {
      setFetchingCards(true);
      const cards = await getCardsByDictionaryId(dictionaryId);
      if (cards) {
        setCards(cards);
      }
      setFetchingCards(false);
    })();
  }, []);

  if (isFetchingCards) {
    // TODO: make skeleton cards
    return <LoadingScreen />;
  }

  const handleCardPress = (card: Card) => {
    setCardAssociations(card.associations);
    setAssociationsModal(true);
  };

  const handleAssociationModalClose = () => {
    setCardAssociations([]);
    setAssociationsModal(false);
  };

  return (
    <Box mt={4}>
      <CardsGrid cards={cards} onCardPress={handleCardPress} />
      {isAssociationsModal ? (
        <ShowAssociationsModal
          associations={cardAssociations}
          isOpen={isAssociationsModal}
          onClose={handleAssociationModalClose}
        />
      ) : null}
    </Box>
  );
};

export default observer(DictionaryScreen);
