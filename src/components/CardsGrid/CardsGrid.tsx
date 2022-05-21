import React from 'react';
import { observer } from 'mobx-react';
import { VStack, HStack, Box, Center, Text, Image } from 'native-base';
import { chunkArray } from '../../utils/chunkArray';
import { ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { Card } from '../../api/card/types';

type Props = {
  cards: Card[];
  onCardPress?: (card: Card) => void;
  numberOfColumns?: number;
};

const CardsGrid: React.FC<Props> = ({ cards, onCardPress, numberOfColumns = 2 }) => {
  const cardsGrid = chunkArray(cards, numberOfColumns);

  const handleImagePress = (card: Card) => {
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
            {row.map((card, columnIndex) => {
              return (
                <TouchableHighlight
                  onPress={() => handleImagePress(card)}
                  underlayColor={'white'}
                  key={columnIndex}
                >
                  <Box rounded="lg">
                    <ImageBackground
                      source={{ uri: card.associations[0].image }}
                      style={{
                        width: 150,
                        height: 150,
                        backgroundColor: '#000000',
                        borderRadius: 8,
                      }}
                      imageStyle={{
                        opacity: 0.4,
                        borderRadius: 8,
                      }}
                      accessibilityLabel={'background-image'}
                    >
                      <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                      >
                        <Text
                          p={2}
                          textAlign={'center'}
                          color={'trueGray.50'}
                          fontSize={card.phrase.length > 30 ? 'md' : 'xl'}
                        >
                          {card.phrase}
                        </Text>
                      </ScrollView>
                    </ImageBackground>
                  </Box>
                </TouchableHighlight>
              );
            })}
          </HStack>
        );
      })}
    </VStack>
  );
};

export default observer(CardsGrid);
