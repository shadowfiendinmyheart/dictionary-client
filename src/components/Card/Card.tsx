import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Box, Center, Icon, IconButton, Text } from 'native-base';
import { Entypo } from '@native-base/icons';
import { ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { Card } from '../../api/card/types';

type Props = {
  card: Card;
  onCardPress: (card: Card) => void;
  onAudioPress?: (text: string) => void;
  onLongPress?: (card: Card) => void;
};

const CardsGrid: React.FC<Props> = ({ card, onCardPress, onAudioPress, onLongPress }) => {
  const handleCardPress = () => onCardPress(card);

  const handleLongPress = () => {
    if (!onLongPress) return;

    onLongPress(card);
  };

  return (
    <TouchableHighlight
      onLongPress={handleLongPress}
      onPress={handleCardPress}
      underlayColor={'white'}
    >
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
          {onAudioPress ? (
            <IconButton
              style={styles.iconButton}
              size="8"
              paddingTop={1}
              icon={
                <Center>
                  <Icon
                    as={Entypo}
                    name="controller-play"
                    size="6"
                    color="trueGray.400"
                  />
                </Center>
              }
              onPress={() => onAudioPress(card.phrase)}
            />
          ) : null}
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
  iconButton: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
});

export default observer(CardsGrid);
