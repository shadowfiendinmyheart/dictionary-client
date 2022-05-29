import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Heading, VStack, Text, HStack } from 'native-base';
import { GameCard } from '../store/game.store';
import Card from '../components/Card';
import { Assoctiation, Card as CardInterface } from '../api/card/types';
import { ScrollView } from 'react-native';
import ShowAssociationsModal from '../components/ShowAssociationsModal';

interface Props {
  gameCards: GameCard[];
}

const EndGameScreen: React.FC<Props> = ({ gameCards }) => {
  const [isAssociationsModal, setAssociationsModal] = useState(false);
  const [cardAssociation, setCardAssociations] = useState<Assoctiation[]>([]);

  const handleCardPress = (card: CardInterface) => {
    setCardAssociations(card.associations);
    setAssociationsModal(true);
  };

  const handleAssociationModalClose = () => {
    setCardAssociations([]);
    setAssociationsModal(false);
  };

  const rightAnswersCounter = gameCards.reduce((counter, gameCard) => {
    if (gameCard.isAnswered) {
      return ++counter;
    }

    return counter;
  }, 0);

  return (
    <>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Heading mt={3}>Итоги игры</Heading>
        <Text>
          Правильных ответов {rightAnswersCounter} из {gameCards.length}
        </Text>
        <VStack mt={5} space={3}>
          {gameCards.map((gameCard) => {
            return (
              <HStack w={'90%'} justifyContent={'space-evenly'} key={gameCard.id}>
                <Card card={{ ...gameCard }} onCardPress={handleCardPress} />
                <VStack space={2} justifyContent={'center'}>
                  <Text>Ваш ответ:</Text>
                  <Text color={gameCard.isAnswered ? 'success.500' : 'error.500'}>
                    {gameCard.answer}
                  </Text>
                </VStack>
              </HStack>
            );
          })}
        </VStack>
      </ScrollView>
      <ShowAssociationsModal
        associations={cardAssociation}
        isOpen={isAssociationsModal}
        onClose={handleAssociationModalClose}
      />
    </>
  );
};

export default observer(EndGameScreen);
