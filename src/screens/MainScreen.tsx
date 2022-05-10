import React from 'react';
import { Center, Heading, Button } from 'native-base';
import { useStore } from '../store/root.store';
import i18n, { localizationTokens } from '../localization';

const MainScreen: React.FC = () => {
  const { userStore } = useStore();
  const { username, logout } = userStore;

  const onClick = async () => {
    await logout();
  };

  const { Header, AddCardButton, LookDictionariesButton, GamesButton, LogoutButton } =
    localizationTokens.MainScreen.index;
  const headerText = i18n.t(Header);
  const addCardButtonText = i18n.t(AddCardButton);
  const lookDictionariesButtonText = i18n.t(LookDictionariesButton);
  const gamesButtonText = i18n.t(GamesButton);
  const logoutButtonText = i18n.t(LogoutButton);

  return (
    <Center flex={1}>
      <Heading textAlign={'center'}>
        {headerText} {username}
      </Heading>
      <Button width="80%" mt={12} colorScheme="cyan">
        {addCardButtonText}
      </Button>
      <Button width="80%" mt={5} colorScheme="cyan">
        {lookDictionariesButtonText}
      </Button>
      <Button width="80%" mt={5} colorScheme="cyan">
        {gamesButtonText}
      </Button>
      <Button onPress={onClick} width="80%" mt={5} colorScheme="cyan">
        {logoutButtonText}
      </Button>
    </Center>
  );
};

export default MainScreen;
