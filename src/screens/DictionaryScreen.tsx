import React, { useEffect, useState } from 'react';
import { Center, Heading, Button, Box } from 'native-base';
import { useStore } from '../store/root.store';
import i18n, { localizationTokens } from '../localization';
import { NavigationStackProp } from 'react-navigation-stack';
import ROUTES from '../constants/routes';
import getCardsByDictionaryId from '../api/card/getCardsByDictionaryId.api';
import ImagesGrid from '../components/ImagesGrid';
import { Card } from '../api/card/types';
import CardsGrid from '../components/CardsGrid/CardsGrid';

interface Props {
  route: { params: { dictionaryId: number } };
  navigation: NavigationStackProp;
}

const DictionaryScreen: React.FC<Props> = ({ route, navigation }) => {
  const [isFetchingCards, setFetchingCards] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const { userStore } = useStore();
  const { username, logout } = userStore;

  const dictionaryId = route.params.dictionaryId;
  useEffect(() => {
    void (async () => {
      setFetchingCards(true);
      const cards = await getCardsByDictionaryId(dictionaryId);
      if (cards) {
        setCards(cards);
      }
      setFetchingCards(false);
    })();
  }, []);

  return (
    <Box mt={4}>
      <CardsGrid cards={cards} />
    </Box>
  );
};

export default DictionaryScreen;
