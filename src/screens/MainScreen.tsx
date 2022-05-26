import React from 'react';
import { Center, Heading, Button } from 'native-base';
import { useStore } from '../store/root.store';
import i18n, { localizationTokens } from '../localization';
import { NavigationStackProp } from 'react-navigation-stack';
import ROUTES from '../constants/routes';

interface Props {
  navigation: NavigationStackProp;
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const { userStore } = useStore();
  const { username, logout } = userStore;

  const handleLogoutPress = async () => {
    await logout();
  };

  const handleCardPress = () => {
    navigation.navigate(ROUTES.CARD_SCREEN);
  };

  const handleDictionariesPress = () => {
    navigation.navigate(ROUTES.DICTIONARY_NAVIGATOR, {
      screen: ROUTES.PERSONAL_DICTIONARIES_SCREEN,
    });
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
      <Button onPress={handleCardPress} width="80%" mt={12} colorScheme="cyan">
        {addCardButtonText}
      </Button>
      <Button onPress={handleDictionariesPress} width="80%" mt={5} colorScheme="cyan">
        {lookDictionariesButtonText}
      </Button>
      <Button width="80%" mt={5} colorScheme="cyan">
        {gamesButtonText}
      </Button>
      <Button onPress={handleLogoutPress} width="80%" mt={5} colorScheme="cyan">
        {logoutButtonText}
      </Button>
    </Center>
  );
};

export default MainScreen;
