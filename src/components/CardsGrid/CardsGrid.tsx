import React from 'react';
import { observer } from 'mobx-react';
import { VStack, HStack, Box, Text } from 'native-base';
import { chunkArray } from '../../utils/chunkArray';
import { Card as CardInterface } from '../../api/card/types';
import Card from '../Card/Card';

type Props = {
  cards: CardInterface[];
  onCardPress?: (card: CardInterface) => void;
  onAudioPress?: (text: string) => void;
  onLongPress?: (card: CardInterface) => void;
  numberOfColumns?: number;
};

const CardsGrid: React.FC<Props> = ({
  cards,
  onCardPress,
  onLongPress,
  onAudioPress,
  numberOfColumns = 2,
}) => {
  const cardsGrid = chunkArray(cards, numberOfColumns);

  const handleCardPress = (card: CardInterface) => {
    if (!onCardPress) {
      return;
    }

    onCardPress(card);
  };

  return (
    <VStack space={5}>
      {cardsGrid.map((row, rowIndex) => {
        return (
          <HStack justifyContent={'space-evenly'} key={rowIndex}>
            {row.map((card) => {
              return (
                <Card
                  card={card}
                  onCardPress={handleCardPress}
                  onLongPress={onLongPress}
                  onAudioPress={onAudioPress}
                  key={card.id}
                />
              );
            })}
          </HStack>
        );
      })}
    </VStack>
  );
};

export default observer(CardsGrid);
