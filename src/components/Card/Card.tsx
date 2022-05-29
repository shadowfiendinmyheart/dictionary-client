import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Box, Text } from 'native-base';
import { ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { Card } from '../../api/card/types';

type Props = {
  card: Card;
  onCardPress: (card: Card) => void;
};

const CardsGrid: React.FC<Props> = ({ card, onCardPress }) => {
  return (
    <TouchableHighlight onPress={() => onCardPress(card)} underlayColor={'white'}>
      <Box rounded="lg">
        <ImageBackground
          source={{ uri: card.associations[0].image }}
          style={styles.shape}
          imageStyle={styles.image}
          accessibilityLabel={'background-image'}
        >
          <ScrollView contentContainerStyle={styles.container}>
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
};

const styles = StyleSheet.create({
  shape: {
    width: 150,
    height: 150,
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  image: {
    opacity: 0.4,
    borderRadius: 8,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default observer(CardsGrid);
